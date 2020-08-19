import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import store from "../../../redux/store";

import * as appActions from "../../../redux/actions";
import { navigateTo } from "../../../redux/nav/navActions";
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
    customCenterComponent: { steps: 7, currentStep: 3, flowProgress: false },
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

  selectDocument = type => {
    const { actions } = this.props;
    actions.updateFormFields({
      documentType: type,
      front: "",
      back: "",
    });

    actions.activateCamera({
      cameraField: "front",
      cameraHeading: "Take a Front side photo",
      cameraCopy:
        "Center the front side of your document in the marked area. Be sure the photo is clear and the document details are easy to read.",
      cameraType: "back",
      mask: "document",
    });

    actions.navigateTo("CameraScreen", {
      hideBack: true,
      onSave: this.saveFrontPhoto,
    });
  };

  saveFrontPhoto = frontPhoto => {
    const { actions, formData } = this.props;
    actions.updateFormField("front", frontPhoto);

    if (formData.documentType !== "passport") {
      actions.activateCamera({
        cameraField: "back",
        cameraHeading: "Take a Back side photo",
        cameraCopy:
          "Now, turn the back side of your document. Center it in the marked area, and make sure that all the details are easy to read.",
        cameraType: "back",
        mask: "document",
      });

      actions.navigateTo("CameraScreen", {
        onSave: backPhoto => {
          actions.updateFormField("back", backPhoto);
          actions.navigateTo("KYCCheckPhotos");
        },
      });
    } else {
      actions.navigateTo("KYCCheckPhotos");
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
