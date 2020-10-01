import React, { Component } from "react";
import { View, Animated } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import moment from "moment";
import SecurityFixNowStyle from "../SecurityFixNow/SecurityFixNow.styles";
import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import ToggleInfoCard from "../../molecules/ToggleInfoCard/ToggleInfoCard";
import SecurityStrengthMeter from "../../atoms/SecurityStrengthMeter/SecurityStrengthMeter";
import CelText from "../../atoms/CelText/CelText";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import CelButton from "../../atoms/CelButton/CelButton";
import CheckWithdrawalAddressesCard from "../../organisms/CheckWithdrawalAddressesCard/CheckWithdrawalAddressesCard";
import formatter from "../../../utils/formatter";
import Card from "../../atoms/Card/Card";
import Icon from "../../atoms/Icon/Icon";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    securityOverview: state.security.securityOverview,
    fixNowContent: state.security.securityOverview.fixNowContent,
    twoFAStatus: state.security.twoFAStatus,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class SecurityFixNow extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params.title || `Fix Now (1/${params.fixNowContentLength})`,
      customCenterComponent: {
        steps: params.fixNowContentLength,
        currentStep: params.progressBarCurrentStep || 1,
        flowProgress: true,
      },
    };
  };

  animationDuration = 100;

  constructor(props) {
    super(props);

    this.state = {
      contentAnimation: new Animated.Value(0),
    };
  }

  async componentDidMount() {
    const { actions } = this.props;
    await actions.getSecurityOverview();
    this.setHeaderTitle();
  }

  componentDidUpdate(prevProps) {
    const { actions, fixNowContent } = this.props;
    if (!_.isEqual(prevProps.fixNowContent, fixNowContent)) {
      this.setHeaderTitle();
      actions.updateFixNowContent();
    }
  }

  componentWillUnmount() {
    const { actions } = this.props;
    actions.getSecurityOverview();
  }

  setHeaderTitle = () => {
    const { navigation, fixNowContent } = this.props;
    navigation.setParams({
      title: `Fix Now (${fixNowContent.index + 1}/${
        fixNowContent.content.length
      })`,
      progressBarCurrentStep: fixNowContent.index + 1,
    });
  };

  onPress2fa = () => {
    const { actions, twoFAStatus } = this.props;
    if (!twoFAStatus.isActive) {
      actions.navigateTo(SCREENS.VERIFY_PROFILE, {
        onSuccess: () => {
          actions.fromFixNow();
          actions.navigateTo(SCREENS.TWO_FACTOR_SETTINGS);
        },
        hideBiometrics: true,
      });
    }
  };

  nextItem = async () => {
    const { actions } = this.props;
    await actions.fixNowNextItem();
    await this.setState({ contentAnimation: new Animated.Value(400) });
    this.animateContinue(0);
  };

  animateContinue = (toValue, callback) => {
    const { contentAnimation } = this.state;
    Animated.timing(contentAnimation, {
      toValue,
      duration: this.animationDuration,
      useNativeDriver: true,
    }).start(() => callback && callback());
  };

  onPressContinue = () => {
    this.animateContinue(-400, this.nextItem);
  };

  fixNowContent = type => {
    const { securityOverview, twoFAStatus } = this.props;
    switch (type) {
      case "two_factor":
        return {
          type,
          title: "Two-Factor Authentication",
          cardTitle: "Your 2FA is",
          body:
            "Activate an extra layer of security that prevents the risk of unwanted access to your wallet, even if your login information is compromised.",
          enabled: twoFAStatus.isActive,
          showInfoBox:
            (securityOverview.toFixNow && !twoFAStatus.isActive) ||
            twoFAStatus.status === "Pending Activation",
          infoBoxText:
            "To complete your Two-Factor Authentication request follow the email instructions.",
          infoBoxBackgroundColor: getColor(COLOR_KEYS.ALERT_STATE),
          infoBoxIcon: "Info",
          infoBoxTextColor: "white",
          onContinuePress: this.onPress2fa,
        };
      case "pin":
      case "password":
        return {
          type,
          title: `Change Your ${formatter.capitalize(type)}`,
          body: `Your ${type} was last changed ${moment(
            securityOverview[`${type}_last_change`]
          ).fromNow()}. In order to keep your wallet secure, it is recommended to change your ${type} at least every 180 days.`,
          strength: securityOverview[`${type}_strength`],
          lastChange: securityOverview[`${type}_last_change`],
          navigateToScreen: `Change${formatter.capitalize(type)}`,
          showInfoBox: securityOverview.toFixNow,
          infoBoxText: `Successfully changed your ${type}`,
          infoBoxBackgroundColor: getColor(COLOR_KEYS.POSITIVE_STATE),
          infoBoxIcon: "CheckCircle",
          infoBoxTextColor: "white",
        };
      case "withdrawal_addresses":
        return {
          type,
          title: "Whitelist Withdrawal Addresses",
          body:
            "Add withdrawal addresses for all of your coins. This way you can be 100% sure that your coins will find the right way to your withdrawal wallet.",
        };
    }
  };

  renderCard = content => {
    const { actions, securityOverview } = this.props;
    switch (content.type) {
      case "pin":
      case "password":
        return (
          <>
            <SecurityStrengthMeter
              level={securityOverview.toFixNow ? "strong" : content.strength}
              lastChangePeriod={moment(content.lastChange).fromNow()}
              enhanceText={
                securityOverview.score_parameters.find(
                  e => e.name === content.type && e.fixable === true
                ) && `Change ${formatter.capitalize(content.type)}`
              }
              onPressEnhance={() => {
                actions.navigateTo(SCREENS.VERIFY_PROFILE, {
                  onSuccess: () => {
                    actions.navigateTo(content.navigateToScreen);
                    actions.fromFixNow();
                  },
                  hideBiometrics: true,
                });
              }}
            />
            {content.showInfoBox && this.renderInfoBox(content)}
          </>
        );
      case "two_factor":
        return (
          <>
            <ToggleInfoCard
              subtitle={content.cardTitle}
              onPress={content.onContinuePress}
              enabled={content.enabled}
            />
            {content.showInfoBox && this.renderInfoBox(content)}
          </>
        );
      case "withdrawal_addresses":
        return <CheckWithdrawalAddressesCard fromFixNow />;
    }
  };

  renderInfoBox = content => {
    const style = SecurityFixNowStyle();
    return (
      <Card color={content.infoBoxBackgroundColor}>
        <View style={style.infoBoxWrapper}>
          <View style={style.infoBoxIconWrapper}>
            <Icon
              name={content.infoBoxIcon}
              width="25"
              height="25"
              fill={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
            />
          </View>
          <View style={style.infoBoxTextWrapper}>
            <CelText
              type={"H5"}
              weight={"300"}
              color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
            >
              {content.infoBoxText}
            </CelText>
          </View>
        </View>
      </Card>
    );
  };

  render() {
    const { securityOverview, fixNowContent } = this.props;
    const { content, item, index } = fixNowContent;
    const style = SecurityFixNowStyle();

    if (
      _.isEmpty(securityOverview) ||
      (content && content.length === 0) ||
      _.isEmpty(item)
    )
      return <LoadingScreen />;

    const c = this.fixNowContent(item.name);

    return (
      <RegularLayout>
        <View style={style.container}>
          <Animated.View
            style={[
              style.bodyWrapper,
              {
                transform: [
                  {
                    translateX: this.state.contentAnimation,
                  },
                ],
              },
            ]}
          >
            <CelText
              margin={"0 20 20 20"}
              type={"H2"}
              weight={"600"}
              align={"center"}
            >
              {c.title}
            </CelText>
            <CelText margin={"0 0 20 0"} type={"H5"} align={"center"}>
              {c.body}
            </CelText>

            {this.renderCard(c)}
          </Animated.View>
          <View style={style.buttonWrapper}>
            <CelButton
              onPress={this.onPressContinue}
              style={{ alignSelf: "flex-start" }}
              margin="10 0 2 0"
              iconRight="IconArrowRight"
            >
              {index === content.length - 1 ? "Finish" : "Skip"}
            </CelButton>
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default SecurityFixNow;
