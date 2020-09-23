import React, { Component } from "react";
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Image, View } from "react-native";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import CelButton from "../../atoms/CelButton/CelButton";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import STYLES from "../../../constants/STYLES";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    utilityBill: state.user.utilityBill,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class KYCCheckUtilityBill extends Component {
  static propTypes = {};
  static defaultProps = {};

  retakeUtilityBillPhoto = () => {
    const { actions } = this.props;
    actions.activateCamera({
      cameraField: "utility",
      cameraHeading: "Take a Photo",
      cameraCopy:
        "Take a photo of a utility bill, so that your address is clearly visible.",
      cameraType: "back",
      mask: "utility",
    });

    actions.navigateTo(SCREENS.CAMERA_SCREEN, {
      onSave: utilityBillPhoto => actions.setUtilityBill(utilityBillPhoto),
    });
  };

  render() {
    const { utilityBill, actions } = this.props;

    return (
      <RegularLayout>
        <CelText type="H2" weight="bold" margin={"0 0 30 0"} align="center">
          Check Your Photo
        </CelText>

        <CelText type="H4" weight="300" margin="10 0 20 0" align="center">
          Check if your photos are visible and all the important details of
          utility bill are easy to read.
        </CelText>

        <View
          style={{
            alignItems: "center",
          }}
        >
          <Image
            resizeMode="contain"
            source={{ uri: utilityBill.front }}
            style={{
              width: STYLES.CAMERA_MASK_SIZES.utility.width - 5,
              height: STYLES.CAMERA_MASK_SIZES.utility.height - 5,
              overflow: "hidden",
              borderRadius: 15,
            }}
          />

          <CelButton
            basic
            onPress={this.retakeUtilityBillPhoto}
            margin="15 0 20 0"
          >
            Retake
          </CelButton>
        </View>

        <CelButton
          onPress={() => actions.navigateTo(SCREENS.KYC_TAXPAYER)}
          margin="15 0 20 0"
          iconRight="IconArrowRight"
        >
          Continue
        </CelButton>
      </RegularLayout>
    );
  }
}

export default KYCCheckUtilityBill;
