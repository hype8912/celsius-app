import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelInput from "../../atoms/CelInput/CelInput";
// import UI from "../../../constants/STYLES";
import CelButton from "../../atoms/CelButton/CelButton";
import BadgeSelector from "../../atoms/BadgeSelector/BadgeSelector";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";

@connect(
  state => ({
    formData: state.forms.formData,
    withdrawalAddresses: state.wallet.withdrawalAddresses,
    walletAddressLabels: state.wallet.walletAddressLabels,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WithdrawAddressLabel extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Add label",
    right: "profile",
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };

    this.badges = [
      "Coinbase address",
      "Exodus address",
      "Electrum address",
      "Trezor address",
      "Guarda address",
      "Robinhood address",
      "Blokchain.info address",
      "Mycelium address",
      "HitBTC address",
      "Liquid address",
      "IDEX address",
      "Switcheo address",
    ];
  }

  componentDidMount() {
    const { actions, withdrawalAddresses } = this.props;
    const usersLabels = this.badges;
    // add custom user labels to this.badges array
    Object.keys(withdrawalAddresses).forEach(key => {
      const label = withdrawalAddresses[key].label;
      if (label) {
        if (!this.badges.includes(label)) usersLabels.unshift(label);
      }
    });
    // add labels to redux
    actions.setCoinWithdrawalAddressLabels(usersLabels);
  }

  onPressBadge = badge => {
    const { actions } = this.props;
    actions.updateFormField("withdrawAddressLabel", badge);
  };

  setWithdrawAddressLabel = async () => {
    const { actions, formData } = this.props;
    const coin = formData.coin;

    actions.updateFormField(
      "withdrawAddressLabel",
      formData.withdrawAddressLabel
    );
    await actions.setCoinWithdrawalAddressLabel(
      coin,
      formData.withdrawAddressLabel
    );
  };

  render() {
    const { formData, walletAddressLabels, callsInProgress } = this.props;

    const isLoading = apiUtil.areCallsInProgress(
      [API.SET_COIN_WITHDRAWAL_ADDRESS_LABEL],
      callsInProgress
    );

    return (
      <RegularLayout>
        <CelText align={"center"} weight={"300"} type={"H4"}>
          With which wallet is this address connected?
        </CelText>

        <CelInput
          placeholder={"Enter address label (optional)"}
          field={"withdrawAddressLabel"}
          value={formData.withdrawAddressLabel}
          margin={"30 0 0 0"}
        />
        <BadgeSelector
          onPressBadge={this.onPressBadge}
          badges={
            walletAddressLabels && walletAddressLabels.length > 0
              ? walletAddressLabels
              : this.badges
          }
        />
        <CelButton
          loading={isLoading}
          margin={"20 0 20 0"}
          onPress={this.setWithdrawAddressLabel}
        >
          Finish
        </CelButton>
      </RegularLayout>
    );
  }
}

export default WithdrawAddressLabel;
