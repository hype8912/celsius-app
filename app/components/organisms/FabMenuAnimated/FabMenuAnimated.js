import React, { Component, Fragment } from "react";
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BlurView } from "@react-native-community/blur";
import * as appActions from "../../../redux/actions";

import FabMenuAnimatedStyle from "./FabMenuAnimated.styles";
import Fab from "../../molecules/Fab/Fab";
import CircleButton from "../../atoms/CircleButton/CircleButton";
import { THEMES } from "../../../constants/UI";
import { KYC_STATUSES } from "../../../constants/DATA";
import {
  hasPassedKYC,
  isKYCRejectedForever,
} from "../../../utils/user-util/user-util";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import Icon from "../../atoms/Icon/Icon";
import {
  getColor,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import CircleButtonStyle from "../../atoms/CircleButton/CircleButton.styles";
import animationsUtil from "../../../utils/animations-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    fabMenuOpen: state.ui.fabMenuOpen,
    theme: state.user.appSettings.theme,
    fabType: state.ui.fabType,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
    celpayCompliance: state.compliance.celpay,
    depositCompliance: state.compliance.deposit,
    withdrawCompliance: state.compliance.withdraw,
    user: state.user.profile,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class FabMenuAnimated extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
      showBackground: false,
      // ANIMATION VALUES
      // FAB Menu
      buttonMoveAnimationX: new Animated.Value(0),
      buttonMoveAnimationY: new Animated.Value(0),
      helpButtonOffset: new Animated.Value(0),
      buttonPulse: new Animated.Value(0),
      textAnimation: new Animated.Value(0),

      // Background
      blurOpacity: new Animated.Value(0),
      backgroundX: new Animated.Value(0),
      backgroundY: new Animated.Value(0),

      // FAB Button
      fabSpring: new Animated.Value(1),
      fabOpacity: new Animated.Value(1),
    };
  }

  componentDidMount = () => {
    const { fabType } = this.props;
    this.setState({
      menuItems: this.getMenuItems(fabType),
    });
  };

  componentDidUpdate = prevProps => {
    if (
      (prevProps.fabType !== this.props.fabType &&
        this.props.fabType !== "hide") ||
      prevProps.kycStatus !== this.props.kycStatus
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        menuItems: this.getMenuItems(this.props.fabType),
      });
    }
  };

  getMenuItems(menu) {
    const {
      depositCompliance,
      celpayCompliance,
      withdrawCompliance,
      user,
      kycStatus,
    } = this.props;
    const main = [
      [{ iconName: "Wallet", label: "Wallet", screen: SCREENS.WALLET_LANDING }],
      [],
      [],
    ];
    if (depositCompliance.allowed)
      main[1].push({
        iconName: "Deposit",
        label: "Transfer",
        screen: SCREENS.DEPOSIT,
      });
    if (kycStatus && hasPassedKYC() && withdrawCompliance.allowed)
      main[2].push({
        iconName: "Withdraw",
        label: "Withdraw",
        screen: SCREENS.WITHDRAW_ENTER_AMOUNT,
      });
    if (celpayCompliance.allowed)
      main[0].push({
        iconName: "CelPay",
        label: "CelPay",
        screen: SCREENS.CEL_PAY_LANDING,
      });
    main[0].push({
      iconName: "Community",
      label: "Community Info",
      screen: SCREENS.COMMUNITY,
    });
    main[1].push({
      iconName: "Borrow",
      label: "Borrow $",
      screen: SCREENS.BORROW_LANDING,
    });
    main[2].splice(1, 0, {
      iconName: "Profile",
      label: "Profile",
      screen: SCREENS.PROFILE,
    });
    // TODO change borrow landing to new screen
    if (user)
      main[1].push({
        iconName: "MyCel",
        label: "My CEL",
        screen: SCREENS.MY_CEL,
      });

    return {
      main,
      support: [],
    }[menu];
  }

  getTintColor = () => {
    const { theme } = this.props;

    switch (theme) {
      case THEMES.DARK:
        return {
          color: "dark",
          blur: 15,
        };

      case THEMES.LIGHT:
      case THEMES.UNICORN:
      default:
        return {
          color: "light",
          blur: 12,
        };
    }
  };

  fabAction = screen => {
    const { fabType } = this.props;
    Keyboard.dismiss();
    switch (fabType) {
      case "main":
        this.toggleMenu(screen);
        break;

      default:
        break;
    }
  };

  toggleMenu = screen => {
    const { fabMenuOpen, actions } = this.props;
    if (fabMenuOpen) {
      this.deanimateButtons(screen);
    } else {
      animationsUtil.animateOpeningFabMenu(this.state.fabSpring);
      this.animateButtons();
      actions.openFabMenu();
    }
  };

  navigate = screen => {
    const { actions } = this.props;
    if (
      [
        SCREENS.MY_CEL,
        SCREENS.PROFILE,
        SCREENS.CEL_PAY_LANDING,
        SCREENS.WALLET_LANDING,
        SCREENS.DEPOSIT,
        SCREENS.WITHDRAW_ENTER_AMOUNT,
        SCREENS.COMMUNITY,
        SCREENS.BORROW_LANDING,
      ].indexOf(screen) !== -1
    )
      actions.resetToScreen(screen);
  };

  animateButtons = () => {
    this.setState({ showBackground: true });
    animationsUtil.buttonsUp(
      this.state.buttonMoveAnimationX,
      this.state.buttonMoveAnimationY,
      this.state.blurOpacity,
      this.state.helpButtonOffset,
      this.state.textAnimation
    );
  };

  deanimateButtons = screen => {
    const { actions } = this.props;
    this.navigate(screen);
    animationsUtil.buttonsDown(
      this.state.buttonMoveAnimationX,
      this.state.buttonMoveAnimationY,
      this.state.blurOpacity,
      this.state.helpButtonOffset,
      this.state.textAnimation,
      () => {
        this.setState({
          showBackground: false,
        });
        if (screen !== SCREENS.WALLET_LANDING)
          animationsUtil.animateClosure(this.state.fabSpring);
        actions.closeFabMenu();
      }
    );
  };

  renderFabButtons = (col, value) => {
    const { theme } = this.props;
    const {
      buttonMoveAnimationX,
      buttonMoveAnimationY,
      textAnimation,
    } = this.state;
    const style = FabMenuAnimatedStyle();
    const circleButtonStyle = CircleButtonStyle(theme);
    const multiplierX = widthPercentageToDP("27%");
    const multiplierY = heightPercentageToDP("15%");
    const normalWidthSpread = -widthPercentageToDP("80%");
    const adjustedWidthSpread = -widthPercentageToDP("67.5%");
    const normalHeightSpread = -heightPercentageToDP("60%");
    return (
      <Animated.View key={`${col}${value}`} style={style.fabButton}>
        {col.map((item, v) => {
          let distanceX = normalWidthSpread + value * multiplierX;
          if (v === 2) distanceX = adjustedWidthSpread + value * multiplierX;
          const distanceY = normalHeightSpread + v * multiplierY;
          return (
            <Animated.View
              key={`${item}${v}`}
              style={[
                style.item,
                {
                  transform: [
                    {
                      translateX: buttonMoveAnimationX.interpolate({
                        inputRange: [0, 1],
                        outputRange: [
                          -circleButtonStyle.container.width,
                          distanceX,
                        ],
                      }),
                    },
                    {
                      translateY: buttonMoveAnimationY.interpolate({
                        inputRange: [0, 1],
                        outputRange: [
                          -circleButtonStyle.container.height,
                          distanceY,
                        ],
                      }),
                    },
                  ],
                },
              ]}
            >
              <CircleButton
                theme={item.theme}
                onPress={() => {
                  this.fabAction(item.screen);
                }}
                type="menu"
                icon={item.iconName}
                iconSize={30}
              />
              <Animated.View
                style={
                  Platform.OS === "android"
                    ? {
                        opacity: textAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 1],
                        }),
                      }
                    : {
                        transform: [
                          {
                            scaleX: textAnimation.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, 1],
                            }),
                          },
                          {
                            scaleY: textAnimation.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, 1],
                            }),
                          },
                        ],
                      }
                }
              >
                <CelText align="center" type={"H7"} style={style.text}>
                  {item.label}
                </CelText>
              </Animated.View>
            </Animated.View>
          );
        })}
      </Animated.View>
    );
  };

  renderFabMenu = () => {
    const { menuItems } = this.state;
    if (!menuItems) return;
    return <View>{menuItems.map(this.renderFabButtons)}</View>;
  };

  renderBackground = () => {
    const tintColor = this.getTintColor();
    const style = FabMenuAnimatedStyle();
    const { showBackground, blurOpacity } = this.state;

    if (!showBackground) return null;

    return (
      <Animated.View
        style={[style.animatedBackground, { opacity: blurOpacity }]}
      >
        {Platform.OS === "ios" ? (
          <TouchableWithoutFeedback onPress={() => this.fabAction()}>
            <BlurView
              blurType={tintColor.color}
              blurAmount={tintColor.blur}
              style={StyleSheet.absoluteFill}
            />
          </TouchableWithoutFeedback>
        ) : (
          <TouchableOpacity
            style={[StyleSheet.absoluteFill, style.background]}
            onPress={() => this.fabAction()}
          />
        )}
      </Animated.View>
    );
  };

  renderHelpButton = () => {
    const { actions } = this.props;
    const { helpButtonOffset } = this.state;
    const style = FabMenuAnimatedStyle();

    return (
      <Animated.View
        style={[
          style.helpCardWrapper,
          {
            transform: [
              {
                translateY: helpButtonOffset.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    -heightPercentageToDP("15%"),
                    heightPercentageToDP("7%"),
                  ],
                }),
              },
            ],
          },
        ]}
      >
        <Card
          styles={style.helpCard}
          size={"half"}
          onPress={() => {
            actions.navigateTo(SCREENS.SUPPORT);
            this.fabAction();
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name={"QuestionCircle"} width={25} height={25} />
            <CelText weight={"300"} type={"H5"} style={{ paddingLeft: 10 }}>
              Need help?
            </CelText>
          </View>
        </Card>
      </Animated.View>
    );
  };

  renderFab = () => {
    const style = FabMenuAnimatedStyle();
    const { fabType } = this.props;
    const { fabSpring, fabOpacity } = this.state;
    const buttonStyle =
      Platform.OS === "android" ? style.realFabButton : style.fabButton;

    const backgroundColor = {
      backgroundColor: getColor(COLOR_KEYS.PRIMARY_BUTTON),
    };
    return (
      <View>
        <Animated.View
          style={[
            style.fabButton,
            style.opacityCircle,
            backgroundColor,
            {
              transform: [{ scale: fabSpring }],
              opacity: fabOpacity,
            },
          ]}
        />
        <Animated.View
          style={[
            buttonStyle,
            style.shadowStyle,
            { transform: [{ scale: fabSpring }] },
          ]}
        >
          <Fab onPress={this.fabAction} type={fabType} />
        </Animated.View>
      </View>
    );
  };

  render() {
    const { fabMenuOpen, fabType } = this.props;
    if (isKYCRejectedForever()) return null;
    if (fabType === "hide") return null;

    const FabMenuCmp = this.renderFabMenu;
    const FabButton = this.renderFab;
    const FabBackground = this.renderBackground;
    const HelpButton = this.renderHelpButton;

    return (
      <Fragment>
        <FabBackground />
        <HelpButton />
        {fabMenuOpen ? <FabMenuCmp /> : null}
        <FabButton />
      </Fragment>
    );
  }
}

export default FabMenuAnimated;
