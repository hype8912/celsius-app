import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Card from "../../atoms/Card/Card";
import IconButton from "../../organisms/IconButton/IconButton";
import { getColor } from "../../../utils/styles-util";
import Spinner from "../../atoms/Spinner/Spinner";
import { LOAN_PAYMENT_REASONS } from "../../../constants/UI";
import { COLOR_KEYS } from "../../../constants/COLORS";
import CelSwitch from "../../atoms/CelSwitch/CelSwitch";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    allLoans: state.loans.allLoans,
    loanSettings: state.loans.loanSettings,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class InterestPaymentSettings extends Component {
  static navigationOptions = () => ({
    title: "Interest Payment",
    right: "profile",
  });

  constructor(props) {
    super(props);

    this.state = {
      isAutomaticInterestPaymentEnabled: undefined,
      loading: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.loanSettings &&
      nextProps.loanSettings.automatic_interest_payment !==
        prevState.isAutomaticInterestPaymentEnabled
    ) {
      return {
        isAutomaticInterestPaymentEnabled:
          nextProps.loanSettings.automatic_interest_payment,
      };
    }
    return null;
  }

  // TODO - move to new component
  rightSwitch = () => {
    const { isAutomaticInterestPaymentEnabled } = this.state;

    return (
      <CelSwitch
        onValueChange={this.handleSwitchChange}
        value={isAutomaticInterestPaymentEnabled}
      />
    );
  };

  handleSwitchChange = async () => {
    const { navigation, actions } = this.props;
    const { isAutomaticInterestPaymentEnabled } = this.state;
    const id = navigation.getParam("id");

    this.setState({
      loading: true,
    });

    await actions.updateLoanSettings(id, {
      automatic_interest_payment: !isAutomaticInterestPaymentEnabled,
    });

    this.setState({
      loading: false,
    });

    const msg = !isAutomaticInterestPaymentEnabled
      ? `Automatic Interest Payments Enabled.`
      : `Manual Interest Payments Enabled.`;
    actions.showMessage("success", msg);
  };

  render() {
    const { navigation, actions } = this.props;
    const { loading, isAutomaticInterestPaymentEnabled } = this.state;
    const Switcher = this.rightSwitch;
    const id = navigation.getParam("id");

    return (
      <RegularLayout>
        <View>
          <Card close>
            <CelText weight={"500"} type={"H5"}>
              Automatic Interest Payment
            </CelText>
            <CelText weight={"300"} type={"H6"} margin={"10 0 0 0"}>
              By enabling automatic interest payments, your monthly payment will
              be automatically deducted from your total wallet balance.
            </CelText>
          </Card>
          <IconButton
            margin={"20 0 0 0"}
            right={loading ? <Spinner size={30} /> : <Switcher />}
            hideIconRight
          >
            Automatic Interest Payment
          </IconButton>

          {!isAutomaticInterestPaymentEnabled ? (
            <Card margin={"20 0 0 0"} color={getColor(COLOR_KEYS.ALERT_STATE)}>
              <CelText
                weight="300"
                alignItems="center"
                color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
              >
                You must manually complete your monthly interest payments.
              </CelText>
            </Card>
          ) : null}

          {isAutomaticInterestPaymentEnabled && (
            <IconButton
              margin={"20 0 0 0"}
              onPress={() =>
                actions.navigateTo(SCREENS.CHOOSE_PAYMENT_METHOD, {
                  reason: LOAN_PAYMENT_REASONS.INTEREST_SETTINGS,
                  id,
                })
              }
            >
              Change Interest Payment Type
            </IconButton>
          )}
        </View>
      </RegularLayout>
    );
  }
}

export default InterestPaymentSettings;
