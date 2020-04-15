import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { lookup } from "country-data";
import { Onfido, OnfidoDocumentType } from "@onfido/react-native-sdk";

import store from "../../../redux/store";
import * as appActions from "../../../redux/actions";
import { navigateTo } from "../../../redux/nav/navActions";
import CelText from "../../atoms/CelText/CelText";
import Icon from "../../atoms/Icon/Icon";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import ProgressBar from "../../atoms/ProgressBar/ProgressBar";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import KYCCheckPhotos from "../KYCCheckPhotos/KYCCheckPhotos";
import Card from "../../atoms/Card/Card";
import STYLES from "../../../constants/STYLES";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import { PRIMETRUST_KYC_STATES } from "../../../constants/DATA";

@connect(
  state => ({
    activeScreen: state.nav.activeScreen,
    formData: state.forms.formData,
    kycDocuments: state.user.kycDocuments,
    callsInProgress: state.api.callsInProgress,
    kycDocTypes: state.kyc.kycDocTypes,
    user: state.user.profile,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class KYCVerifyIdentity extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    customCenterComponent: <ProgressBar steps={7} currentStep={3} />,
    headerSameColor: true,
    customBack: () => {
      store.dispatch(navigateTo("KYCAddressInfo"));
    },
    gesturesEnabled: false,
  });

  componentDidMount() {
    const { actions } = this.props;
    actions.getKYCDocTypes();
    actions.getKYCDocuments();
  }

  selectDocumentType = async type => {
    try {
      const { actions, user } = this.props;
      const token = await actions.getMobileSDKToken();

      let docType = OnfidoDocumentType.PASSPORT;
      if (type === "driving_licence")
        docType = OnfidoDocumentType.DRIVING_LICENCE;
      if (type === "identity_card")
        docType = OnfidoDocumentType.NATIONAL_IDENTITY_CARD;

      const countryCode = lookup.countries({ name: user.citizenship })[0]
        .alpha3;

      const onfidoRes = await Onfido.start({
        sdkToken: token,
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
        frontImageId,
        backImageId,
      });
      this.submitKYCDocs();
    } catch (e) {
      // console.log({ e })
    }
  };

  submitKYCDocs = () => {
    const { actions, formData } = this.props;

    // TODO
    // actions.createKYCDocs();
    if (PRIMETRUST_KYC_STATES.includes(formData.state)) {
      actions.navigateTo("KYCAddressProof");
    } else {
      actions.navigateTo("KYCTaxpayer");
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
        [API.GET_KYC_DOC_TYPES, API.GET_KYC_DOCUMENTS],
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
          Take a photo of one of your documents to confirm your identity.
        </CelText>

        {availableDocs.map(d => (
          <Card
            key={d.value}
            onPress={() => this.selectDocumentType(d.value)}
            padding="20 20 20 20"
            styles={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Icon height="30" fill={STYLES.COLORS.CELSIUS_BLUE} name={d.icon} />
            <CelText color={STYLES.COLORS.CELSIUS_BLUE} margin="0 0 0 15">
              {d.label} >
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
      label: "Drivers License",
      icon: "DrivingLicense",
    });
  }

  return kycDocs;
}

export default KYCVerifyIdentity;
