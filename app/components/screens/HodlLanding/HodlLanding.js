import React, { Component } from "react";
import { View } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import HodlLandingStyle from "./HodlLanding.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelButton from "../../atoms/CelButton/CelButton";
import { getPadding } from "../../../utils/styles-util";
import StaticScreen from "../StaticScreen/StaticScreen";
import { EMPTY_STATES } from "../../../constants/UI";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    hodlStatus: state.hodl.hodlStatus,
    activeHodlMode: state.user.appSettings.activeHodlMode,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class HodlLanding extends Component {
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      activeMode: false,
    };
  }
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: "HODL Mode",
      right: "profile",
      customCenterComponent: {
        steps: params && params.deactivation ? 2 : 3,
        currentStep: 1,
        flowProgress: true,
      },
    };
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.activeHodlMode !== prevState.activeMode) {
      return {
        activeMode: nextProps.activeHodlMode,
      };
    }
  }

  render() {
    // const style = HodlLandingStyle();
    const { actions, hodlStatus } = this.props;
    const { activeMode } = this.state;
    const notInHodlMode = !hodlStatus.isActive;
    const padding = notInHodlMode ? "0 0 0 0" : "20 20 100 20";

    if (activeMode)
      return (
        <StaticScreen
          emptyState={{
            purpose:
              hodlStatus.created_by === "backoffice"
                ? EMPTY_STATES.HODL_MODE_BACKOFFICE
                : EMPTY_STATES.HODL_MODE_ACTIVE,
          }}
        />
      );

    return (
      <RegularLayout padding={padding}>
        {notInHodlMode ? (
          <View>
            <View
              style={[
                { flex: 1, width: "100%", height: "100%" },
                { ...getPadding("20 20 100 20") },
              ]}
            >
              <CelText
                align={"left"}
                margin={"10 0 10 0"}
                type={"H2"}
                weight={"bold"}
              >
                What is HODL Mode?
              </CelText>
              <CelText type={"H4"} align={"left"}>
                {
                  "HODL Mode is a security feature that gives you the ability to temporarily disable outgoing transactions from your Celsius wallet. You control when HODL Mode is activated, and it is an ideal feature for those that do not plan on withdrawing or transferring funds from their wallet for an extended period of time."
                }
              </CelText>
              <CelButton
                margin={"20 0 0 0"}
                onPress={() =>
                  actions.navigateTo(SCREENS.HODL_INFO_CHECK_BOXES)
                }
              >
                Continue
              </CelButton>
            </View>
          </View>
        ) : (
          <View>
            <CelText
              align={"left"}
              margin={"10 0 10 0"}
              type={"H2"}
              weight={"bold"}
            >
              Deactivation of HODL Mode
            </CelText>
            <CelText type={"H4"} align={"left"}>
              {" Once you confirm to deactivate HODL Mode, please note: \n" +
                "- HODL Mode will be deactivated after 24 hours \n" +
                "- You will not be able to add new withdrawal addresses or change a whitelisted address until HODL mode is deactivated"}
            </CelText>
            <CelButton
              onPress={() =>
                actions.navigateTo(SCREENS.VERIFY_PROFILE, {
                  onSuccess: () =>
                    actions.navigateTo(SCREENS.HODL_DEACTIVATION_CODE),
                })
              }
              margin={"20 0 0 0"}
            >
              Deactivate HODL Mode
            </CelButton>
          </View>
        )}
      </RegularLayout>
    );
  }
}

export default HodlLanding;
