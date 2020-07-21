import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RESULTS } from "react-native-permissions";
import * as appActions from "../../../redux/actions";
import WithdrawalNewAddressSetupStyle from "./WithdrawNewAddressSetup.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelInput from "../../atoms/CelInput/CelInput";
import addressUtil from "../../../utils/address-util";
import CelButton from "../../atoms/CelButton/CelButton";
import ConfirmWithdrawalAddressModal from "../../modals/ConfirmWithdrawalAddressModal/ConfirmWithdrawalAddressModal";
import { MODALS } from "../../../constants/UI";
import {
  ALL_PERMISSIONS,
  requestForPermission,
} from "../../../utils/device-permissions";

@connect(
  state => ({
    formData: state.forms.formData,
    withdrawalAddresses: state.wallet.withdrawalAddresses,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WithdrawNewAddressSetup extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "New Address Setup",
    right: "profile",
  });

  constructor(props) {
    super(props);

    this.state = {};
  }

  setNewAddress = () => {
    const { actions } = this.props;
    actions.closeModal();
    actions.setCoinWithdrawalAddress("change-address");
  };

  handleScan = code => {
    const { actions } = this.props;
    const address = addressUtil.splitAddressTag(code);
    actions.updateFormFields({
      withdrawAddress: address.newAddress,
      coinTag: address.newTag,
    });
  };

  handleScanClick = async () => {
    const { actions } = this.props;
    const perm = await requestForPermission(ALL_PERMISSIONS.CAMERA);
    if (perm === RESULTS.GRANTED) {
      actions.navigateTo("QRScanner", {
        onScan: this.handleScan,
      });
    } else {
      actions.showMessage(
        "info",
        "You need enable camera permissions in device settings in order to scan a QR code."
      );
    }
  };

  render() {
    const { formData, actions } = this.props;
    const style = WithdrawalNewAddressSetupStyle();

    return (
      <RegularLayout>
        <CelText
          align={"center"}
          weight={"300"}
          type={"H4"}
        >{`Type in your new ${formData.coin} withdrawal address`}</CelText>

        <CelInput
          placeholder={`${formData.coin} address`}
          field={"withdrawAddress"}
          value={formData.withdrawAddress}
          margin={"30 0 0 0"}
          multiline
          type={"text-area"}
          numberOfLines={2}
        />

        {["XRP", "XLM", "EOS"].indexOf(formData.coin) !== -1 && (
          <CelInput
            placeholder={
              formData.coin === "XRP" ? "Destination Tag" : "Memo id"
            }
            field={"coinTag"}
            value={formData.coinTag}
            margin={"20 0 0 0"}
          />
        )}
        <TouchableOpacity
          style={{ marginVertical: 20 }}
          onPress={this.handleScanClick}
        >
          <CelText type={"H5"} style={style.scanText}>
            Scan QR Code
          </CelText>
        </TouchableOpacity>

        <CelButton
          margin={"20 0 20 0"}
          onPress={() =>
            actions.openModal(MODALS.CONFIRM_WITHDRAWAL_ADDRESS_MODAL)
          }
          disabled={!formData.withdrawAddress}
        >
          Confirm
        </CelButton>
        <ConfirmWithdrawalAddressModal
          handleConfirmWithdrawal={this.setNewAddress}
        />
      </RegularLayout>
    );
  }
}

export default WithdrawNewAddressSetup;
