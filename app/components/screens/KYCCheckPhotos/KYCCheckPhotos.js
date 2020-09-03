import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Image, View } from "react-native";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelButton from "../../atoms/CelButton/CelButton";
import { isForPrimeTrustKYC } from "../../../utils/user-util/user-util";

@connect(
  state => ({
    kycDocuments: state.kyc.kycDocuments,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class KYCCheckPhotos extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    customCenterComponent: { steps: 7, currentStep: 4, flowProgress: false },
    headerSameColor: true,
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

  onContinue = () => {
    const { actions, kycDocuments } = this.props;

    if (isForPrimeTrustKYC() && kycDocuments.type === "passport") {
      actions.navigateTo("KYCAddressProof");
    } else {
      actions.navigateTo("KYCTaxpayer");
    }
  };

  render() {
    const { actions, kycDocuments } = this.props;

    const frontImage = this.getImageSource(kycDocuments.front);
    const backImage = this.getImageSource(kycDocuments.back);

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
            resizeMode="cover"
            style={{
              width: 300,
              height: 180,
              borderRadius: 15,
              marginBottom: 30,
            }}
            source={frontImage}
          />

          {backImage && (
            <View>
              <Image
                resizeMode="cover"
                source={backImage}
                style={{
                  width: 300,
                  height: 180,
                  overflow: "hidden",
                  borderRadius: 15,
                }}
              />
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
          Resubmit document
        </CelButton>

        <CelButton iconRight="IconArrowRight" onPress={this.onContinue}>
          Continue
        </CelButton>
      </RegularLayout>
    );
  }
}

export default KYCCheckPhotos;
