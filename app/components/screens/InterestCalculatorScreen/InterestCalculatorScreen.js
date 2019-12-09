import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
// import EmptyState from '../../atoms/EmptyState/EmptyState'
import InterestCalculatorScreenStyle from "./InterestCalculatorScreen.styles";
import CelText from "../../atoms/CelText/CelText";
import Separator from "../../atoms/Separator/Separator";
import { EMPTY_STATES } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import InterestCalculator from "../../organisms/InterestCalculator/InterestCalculator";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class InterestCalculatorScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("purpose")
      ? "Interest calculator"
      : "Interest earned",
    right: "profile",
  });

  static propTypes = {
    purpose: PropTypes.oneOf(Object.keys(EMPTY_STATES)),
  };

  getScreenContent = purpose => {
    const { actions } = this.props;
    switch (purpose) {
      case EMPTY_STATES.COMPLIANCE:
        return {
          heading: "Calculate a total interest you may earn.",
          text:
            "We apologize for any inconvenience, but due to local laws and regulations, we are unable to work with users from your region.",
        };
      case EMPTY_STATES.NON_MEMBER_INTEREST:
        return {
          heading: "Calculate a total interest you may earn.",
          text: "Start earning unmatched interest on your coins by depositing.",
          button: (
            <CelButton
              margin="20 0 0 0"
              onPress={() => actions.navigateTo("Deposit", { coin: "CEL" })}
            >
              Deposit
            </CelButton>
          ),
        };

      case EMPTY_STATES.NO_SSN_INTEREST:
        return {
          heading:
            "Calculate a total interest you may earn before you fill your SSN data.",
          text:
            "Fill in your SSN to start earning unmatched interest on your coins. SSN and residency are needed to issue 1099 for the interest paid. Private information is encrypted and highly secured.",
          button: (
            <CelButton
              margin="20 0 0 0"
              onPress={() => actions.navigateTo("Profile")}
            >
              Fill in SSN
            </CelButton>
          ),
        };
      case EMPTY_STATES.ZERO_INTEREST:
        return {
          heading: "Calculate a total interest you may earn.",
          text:
            "Start earning up to 25% interest a year on your coins by depositing.",
          button: (
            <CelButton
              margin="20 0 0 0"
              onPress={() => actions.navigateTo("Deposit")}
            >
              Deposit coins
            </CelButton>
          ),
        };
      case EMPTY_STATES.NON_VERIFIED_INTEREST:
        return {
          heading:
            "Calculate the total interest you could earn before you verify your ID.",
          text:
            "Start earning unmatched interest on your coins by verifying your ID.",
          button: (
            <CelButton
              margin="20 0 0 0"
              onPress={() => actions.navigateTo("KYCVerifyID")}
            >
              Verify identity
            </CelButton>
          ),
        };
      case "FROM_WALLET_INTEREST_SCREEN":
        return {
          heading: "",
          text: "",
          button: (
            <CelButton
              margin="20 0 0 0"
              onPress={() => actions.navigateTo("Deposit")}
            >
              Deposit More Coins
            </CelButton>
          ),
        };
      default:
        return {
          heading:
            "Calculate the total interest you could earn before you verify your ID.",
          text: "",
        };
    }
  };

  render() {
    const { purpose, navigation } = this.props;
    const param = purpose || navigation.getParam("purpose");
    const content = this.getScreenContent(param);

    const style = InterestCalculatorScreenStyle();

    return (
      <RegularLayout padding="20 0 100 0">
        <View style={{ paddingHorizontal: 20 }}>
          <View style={style.wrapper}>
            {purpose && (
              <View>
                <CelText type="H2" align="center" weight="bold">
                  Interest calculator
                </CelText>

                <CelText align="center" margin="0 0 20 0">
                  {content.heading}
                </CelText>

                <Separator />
              </View>
            )}
            <CelText align="center" margin="20 0 0 0">
              How much do you plan to deposit?
            </CelText>
          </View>
        </View>
        <InterestCalculator showCard />

        {/* <CelButton basic margin='20 0 20 0' onPress={() => {}}>
            Lear how to earn interest
          </CelButton>
          <Separator /> */}

        <View style={{ paddingHorizontal: 20 }}>
          {purpose && (
            <CelText margin="10 0 10 0" type="H2" align="center" weight="bold">
              Start earning interest
            </CelText>
          )}
          <CelText align="center">{content.text}</CelText>
          {content.button ? content.button : null}
        </View>
      </RegularLayout>
    );
  }
}

export default InterestCalculatorScreen;
