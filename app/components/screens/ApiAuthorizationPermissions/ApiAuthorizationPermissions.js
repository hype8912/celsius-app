import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";


import * as appActions from "../../../redux/actions";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import STYLES from "../../../constants/STYLES";
import CelButton from "../../atoms/CelButton/CelButton";
import SwitchButton from "../../organisms/SwitchButton/SwitchButton";
import ApiKeySuccessModal from "../../organisms/ApiKeySuccessModal/ApiKeySuccessModal";


@connect(
  state => ({
    formData: state.forms.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class ApiAuthorizationPermissions extends Component {
  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  static navigationOptions = () => ({
    title: "API Authorization",
  });

  constructor(props) {
    super(props);

    const { actions } = this.props;

    actions.updateFormFields({
      readWalletBalance: false,
      readTransactions: false,
      readDeposits: false,
      readWithdrawals: false
    })
  }

  generateApiKey = async () => {
    const { formData, actions } = this.props;

    const permissions = {
      read_balance: formData.readWalletBalance,
      read_transactions: formData.readTransactions,
      read_deposit_address: formData.readDeposits,
      withdraw: formData.readWithdrawals
    };

    await actions.createAPIKey(permissions);
    actions.getAllAPIKeys()
  };

  render() {
    const { actions, formData } = this.props;

    return (
      <RegularLayout>
        <CelText color={STYLES.COLORS.MEDIUM_GRAY} type={"H4"} weight={"400"}>Generate your API key by selecting permissions from the list below: </CelText>

        <SwitchButton field={"readWalletBalance"} updateFormField={actions.updateFormField} value={formData.readWalletBalance}>Read wallet balance</SwitchButton>
        <SwitchButton field={"readTransactions"} updateFormField={actions.updateFormField} value={formData.readTransactions}>Read transactions</SwitchButton>
        <SwitchButton field={"readDeposits"} updateFormField={actions.updateFormField} value={formData.readDeposits}>Read deposits</SwitchButton>
        <SwitchButton field={"readWithdrawals"} updateFormField={actions.updateFormField} value={formData.readWithdrawals}>Read withdrawals</SwitchButton>

        <CelButton
          onPress={this.generateApiKey}
          margin={"30 0 10 0"}
          disabled={!formData.readWithdrawals && !formData.readDeposits && !formData.readTransactions && !formData.readWalletBalance}
        >
          Generate API key
        </CelButton>
        <ApiKeySuccessModal />
      </RegularLayout>
    );
  }
}

export default ApiAuthorizationPermissions
