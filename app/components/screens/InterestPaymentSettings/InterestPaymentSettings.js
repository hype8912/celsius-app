import React, { Component } from "react";
import { Platform, Switch, View } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Card from "../../atoms/Card/Card";
import IconButton from "../../organisms/IconButton/IconButton";
import STYLES from "../../../constants/STYLES";
import { getTheme } from "../../../utils/styles-util";
import Spinner from "../../atoms/Spinner/Spinner";
import { LOAN_PAYMENT_REASONS, THEMES } from "../../../constants/UI";

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

    const isIos = Platform.OS === "ios";
    const falseColor = isIos ? "transparent" : STYLES.COLORS.DARK_GRAY3;
    const theme = getTheme();
    return (
      <Switch
        onValueChange={this.handleSwitchChange}
        value={isAutomaticInterestPaymentEnabled}
        thumbColor={
          theme === THEMES.LIGHT
            ? STYLES.COLORS.WHITE
            : STYLES.COLORS.DARK_TOGGLE_FOREGROUND
        }
        ios_backgroundColor={
          theme === THEMES.LIGHT
            ? STYLES.COLORS.DARK_GRAY3
            : STYLES.COLORS.DARK_TOGGLE_BACKGROUND
        }
        trackColor={{ false: falseColor, true: STYLES.COLORS.GREEN }}
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
            <Card margin={"20 0 0 0"} color={STYLES.COLORS.ORANGE}>
              <CelText weight="300" alignItems="center" color="#FFFFFF">
                You must manually complete your monthly interest payments.
              </CelText>
            </Card>
          ) : null}

          {isAutomaticInterestPaymentEnabled && (
            <IconButton
              margin={"20 0 0 0"}
              onPress={() =>
                actions.navigateTo("ChoosePaymentMethod", {
                  reason: LOAN_PAYMENT_REASONS.INTEREST,
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
