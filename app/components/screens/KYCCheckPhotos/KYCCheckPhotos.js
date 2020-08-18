import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Image, View } from "react-native";
import store from "../../../redux/store";

import * as appActions from "../../../redux/actions";
import { navigateTo } from "../../../redux/nav/navActions";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import STYLES from "../../../constants/STYLES";
import CelButton from "../../atoms/CelButton/CelButton";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import { PRIMETRUST_KYC_STATES } from "../../../constants/DATA";

@connect(
  state => ({
    formData: state.forms.formData,
    callsInProgress: state.api.callsInProgress,
    kycDocuments: state.user.kycDocuments,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class KYCCheckPhotos extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    customCenterComponent: { steps: 7, currentStep: 4, flowProgress: false },
    headerSameColor: true,
    customBack: () => {
      store.dispatch(navigateTo("KYCAddressInfo"));
    },
    gesturesEnabled: false,
  });

  // TODO move to util
  getImageSource = image => {
    let source;
    if (typeof image === "string") {
      source = { uri: image };
    } else {
      source = image;
    }

    return source;
  };

  retakeFrontPhoto = () => {
    const { actions } = this.props;

    actions.activateCamera({
      cameraField: "front",
      cameraHeading: "Capture the front of your document",
      cameraCopy:
        "Center the front of your document in the marked area. Be sure the photo is clear and the document is easy to read.",
      cameraType: "back",
      mask: "document",
    });

    actions.navigateTo("CameraScreen", {
      hideBack: true,
      onSave: frontPhoto => {
        actions.updateFormField("front", frontPhoto);
        actions.navigateTo("KYCCheckPhotos");
      },
    });
  };

  retakeBackPhoto = () => {
    const { actions } = this.props;

    actions.activateCamera({
      cameraField: "back",
      cameraHeading: "Capture the back of your document ",
      cameraCopy:
        "Center the back of your document in the marked area. Be sure the photo is clear and the document is easy to read.",
      cameraType: "back",
      mask: "document",
    });

    actions.navigateTo("CameraScreen", {
      hideBack: true,
      onSave: backPhoto => {
        actions.updateFormField("back", backPhoto);
        actions.navigateTo("KYCCheckPhotos");
      },
    });
  };

  submitKYCDocs = () => {
    const { actions, formData } = this.props;

    if (formData.front || formData.back) {
      actions.createKYCDocs();
    } else if (
      formData.state &&
      PRIMETRUST_KYC_STATES.includes(formData.state)
    ) {
      actions.navigateTo("KYCAddressProof");
    } else {
      actions.navigateTo("KYCTaxpayer");
    }
  };

  render() {
    const { formData, actions, callsInProgress, kycDocuments } = this.props;

    const isLoading = apiUtil.areCallsInProgress(
      [API.CREATE_KYC_DOCUMENTS],
      callsInProgress
    );

    const frontImage = this.getImageSource(
      formData.front || (kycDocuments && kycDocuments.front)
    );
    const backImage = this.getImageSource(
      formData.back || (kycDocuments && kycDocuments.back)
    );
    const onlyFrontPhoto =
      (formData.documentType && formData.documentType === "passport") ||
      (!formData.documentType &&
        kycDocuments &&
        kycDocuments.type === "passport");

    return (
      <RegularLayout>
        <CelText type="H2" weight="bold" margin={"0 0 30 0"} align="center">
          Check Your Photos
        </CelText>

        <CelText type="H4" weight="300" margin="10 0 20 0" align="center">
          Check if your photos are visible and all the details are easy to read.
        </CelText>

        <View
          style={{
            alignItems: "center",
          }}
        >
          <Image
            resizeMode="contain"
            source={frontImage}
            style={{
              width: STYLES.CAMERA_MASK_SIZES.document.width - 5,
              height: STYLES.CAMERA_MASK_SIZES.document.height - 5,
              overflow: "hidden",
              borderRadius: 15,
            }}
          />

          <CelButton basic onPress={this.retakeFrontPhoto} margin="15 0 20 0">
            Retake
          </CelButton>

          {!onlyFrontPhoto && (
            <View>
              <Image
                resizeMode="contain"
                source={backImage}
                style={{
                  width: STYLES.CAMERA_MASK_SIZES.document.width - 5,
                  height: STYLES.CAMERA_MASK_SIZES.document.height - 5,
                  overflow: "hidden",
                  borderRadius: 15,
                }}
              />

              <CelButton
                basic
                onPress={this.retakeBackPhoto}
                margin="15 0 20 0"
              >
                Retake
              </CelButton>
            </View>
          )}
        </View>

        <CelButton
          basic
          size="medium"
          onPress={() =>
            actions.navigateTo("KYCVerifyIdentity", { shouldChangeDoc: true })
          }
          margin="15 0 30 0"
        >
          Use another document
        </CelButton>

        <CelButton
          onPress={this.submitKYCDocs}
          iconRight="IconArrowRight"
          loading={isLoading}
          disabled={isLoading}
        >
          Continue
        </CelButton>
      </RegularLayout>
    );
  }
}

export default KYCCheckPhotos;
