import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import * as appActions from "../../../redux/actions";
import WithdrawalNewAddressSetupStyle from "./WithdrawNewAddressSetup.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelInput from "../../atoms/CelInput/CelInput";
// import UI from "../../../constants/STYLES";
import addressUtil from "../../../utils/address-util";
import CelButton from "../../atoms/CelButton/CelButton";

@connect(
  state => ({
    formData: state.forms.formData,
    withdrawalAddresses: state.wallet.withdrawalAddresses
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WithdrawNewAddressSetup extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "New Address Setup",
    right: "profile"
  });

  constructor(props) {
    super(props);

    this.state = {};
  }

  setNewAddress = () => {
    const { actions } = this.props;
    actions.setCoinWithdrawalAddress("change-address")
  };

  handleScan = (code) => {
    const { actions } = this.props;
    const address = addressUtil.splitAddressTag(code);
    actions.updateFormField("withdrawAddress", address.newAddress);
    actions.updateFormField("coinTag", address.newTag);
  };

  handleScanClick = () => {
    const { actions } = this.props;

    actions.navigateTo("QRScanner", {
      onScan: this.handleScan
    });
  };

  render() {
    const { formData } = this.props;
    const style = WithdrawalNewAddressSetupStyle();

    // const hasTag = addressUtil.hasTag(address.address);
    // const addressDisplay = addressUtil.splitAddressTag(address.address);

    return (
      <RegularLayout>
        <CelText align={"center"} weight={"300"}
                 type={"H4"}>{`Type in your new ${formData.coin} withdrawal address`}</CelText>

        <CelInput placeholder={`${formData.coin} address`} field={"withdrawAddress"}
                  value={formData.withdrawAddress} margin={"30 0 0 0"}
                  multiline type={'text-area'} numberOfLines={formData.withdrawAddress ? 3 : 1}
        />

        {["XRP", "XLM"].indexOf(formData.coin) !== -1 &&
            <CelInput placeholder={formData.coin === "XRP" ? "Destination Tag" : "Memo id"} field={"coinTag"} value={formData.coinTag} margin={"20 0 0 0"}/>
        }
        <TouchableOpacity style={{ marginVertical: 20 }} onPress={this.handleScanClick}>
          <CelText type={"H5"} style={style.scanText}>Scan QR Code</CelText>
        </TouchableOpacity>

        <CelButton
          margin={"20 0 20 0"}
          onPress={() => this.setNewAddress()}
        >
          Confirm
        </CelButton>

      </RegularLayout>
    );
  }
}

export default WithdrawNewAddressSetup
