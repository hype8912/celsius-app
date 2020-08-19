import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Onfido, OnfidoDocumentType } from "@onfido/react-native-sdk";
import { lookup } from "country-data";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import Icon from "../../atoms/Icon/Icon";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import KYCCheckPhotos from "../KYCCheckPhotos/KYCCheckPhotos";
import Card from "../../atoms/Card/Card";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import mixpanelAnalytics from "../../../utils/mixpanel-analytics";

@connect(
  state => ({
    activeScreen: state.nav.activeScreen,
    formData: state.forms.formData,
    kycDocuments: state.user.kycDocuments,
    callsInProgress: state.api.callsInProgress,
    kycDocTypes: state.kyc.kycDocTypes,
    user: state.user.profile,
    mobileSDKToken: state.kyc.mobileSDKToken,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class KYCVerifyIdentity extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    customCenterComponent: { steps: 7, currentStep: 3, flowProgress: false },
    headerSameColor: true,
    gesturesEnabled: false,
  });

  componentDidMount() {
    const { actions } = this.props;
    actions.getMobileSDKToken();
    actions.getKYCDocTypes();
    actions.getKYCDocuments();
  }

  selectDocument = async type => {
    const { actions, mobileSDKToken, user } = this.props;

    try {
      let docType = OnfidoDocumentType.PASSPORT;
      if (type === "driving_licence")
        docType = OnfidoDocumentType.DRIVING_LICENCE;
      if (type === "identity_card")
        docType = OnfidoDocumentType.NATIONAL_IDENTITY_CARD;

      const countryCode = lookup.countries({ name: user.citizenship })[0]
        .alpha3;

      const onfidoRes = await Onfido.start({
        sdkToken: mobileSDKToken,
        flowSteps: {
          captureDocument: { docType, countryCode },
        },
      });

      const frontImageId = onfidoRes.document.front
        ? onfidoRes.document.front.id
        : null;
      const backImageId = onfidoRes.document.back
        ? onfidoRes.document.back.id
        : null;

      actions.updateFormFields({
        documentType: type,
        frontImageId,
        backImageId,
      });
      actions.saveKYCDocuments();
    } catch (err) {
      mixpanelAnalytics.onfidoSDKError(err);
    }
  };

  render() {
    const {
      kycDocTypes,
      user,
      kycDocuments,
      navigation,
      formData,
      callsInProgress,
    } = this.props;

    if (
      !kycDocTypes ||
      apiUtil.areCallsInProgress(
        [
          API.GET_KYC_DOC_TYPES,
          API.GET_KYC_DOCUMENTS,
          API.GET_ONFIDO_MOBILE_SDK,
        ],
        callsInProgress
      )
    ) {
      return <LoadingScreen />;
    }

    const shouldChangeDoc = navigation.getParam("shouldChangeDoc");
    if (
      (formData.front || (kycDocuments && kycDocuments.front)) &&
      !shouldChangeDoc
    ) {
      return <KYCCheckPhotos />;
    }
    const availableDocs = mapDocs(kycDocTypes[user.citizenship]);

    return (
      <RegularLayout>
        <CelText type="H2" weight="bold" margin={"0 0 30 0"} align="center">
          Verify Identity
        </CelText>

        <CelText type="H4" weight="300" margin="10 0 20 0" align="center">
          Select one of the following to submit
        </CelText>

        {availableDocs.map(d => (
          <Card
            key={d.value}
            onPress={() => this.selectDocument(d.value)}
            padding="20 20 20 20"
            styles={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Icon
              height="30"
              fill={getColor(COLOR_KEYS.PRIMARY_BUTTON)}
              name={d.icon}
            />
            <CelText
              color={getColor(COLOR_KEYS.PRIMARY_BUTTON)}
              margin="0 0 0 15"
              type="H3"
            >
              {d.label}
            </CelText>
          </Card>
        ))}
      </RegularLayout>
    );
  }
}

function mapDocs(docs) {
  const kycDocs = [];

  if (!docs) {
    return [
      {
        value: "passport",
        label: "Passport",
        icon: "Passport",
      },
    ];
  }
  if (docs.identity_card) {
    kycDocs.push({
      value: "identity_card",
      label: "National ID card",
      icon: "IDcard",
    });
  }
  if (docs.passport) {
    kycDocs.push({
      value: "passport",
      label: "Passport",
      icon: "Passport",
    });
  }
  if (docs.driving_licence) {
    kycDocs.push({
      value: "driving_licence",
      label: "Driver's License",
      icon: "DrivingLicense",
    });
  }

  return kycDocs;
}

export default KYCVerifyIdentity;
