import React, { Component, Fragment } from "react";
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Animated,
  Easing,
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
import { hasPassedKYC, isKYCRejectedForever } from "../../../utils/user-util";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import Icon from "../../atoms/Icon/Icon";
import STYLES from "../../../constants/STYLES";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import CircleButtonStyle from "../../atoms/CircleButton/CircleButton.styles";

@connect(
  state => ({
    fabMenuOpen: state.ui.fabMenuOpen,
    theme: state.user.appSettings.theme,
    appInitialized: state.app.appInitialized,
    fabType: state.ui.fabType,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
    celpayCompliance: state.compliance.celpay,
    depositCompliance: state.compliance.deposit,
    loanCompliance: state.compliance.loan,
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
      // FAB Menum
      buttonMoveAnimationX: new Animated.Value(0),
      buttonMoveAnimationY: new Animated.Value(0),
      helpButtonOffset: new Animated.Value(0),
      textOpacity: new Animated.Value(0),
      buttonPulse: new Animated.Value(0),

      // Background
      blurOpacity: new Animated.Value(0),
      backgroundX: new Animated.Value(0),
      backgroundY: new Animated.Value(0),

      // FAB Button
      fabSpring: new Animated.Value(1),
      fabPulse: new Animated.Value(1),
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
      loanCompliance,
      withdrawCompliance,
      user,
      kycStatus,
    } = this.props;
    const main = [
      [{ iconName: "Wallet", label: "Wallet", screen: "WalletLanding" }],
      [],
      [],
    ];
    if (depositCompliance.allowed)
      main[1].push({
        iconName: "Deposit",
        label: "Deposit",
        screen: "Deposit",
      });
    if (kycStatus && hasPassedKYC() && withdrawCompliance.allowed)
      main[2].push({
        iconName: "Withdraw",
        label: "Withdraw",
        screen: "WithdrawEnterAmount",
      });
    if (celpayCompliance.allowed)
      main[0].push({
        iconName: "CelPay",
        label: "CelPay",
        screen: "CelPayLanding",
      });
    main[0].push({
      iconName: "Community",
      label: "Community",
      screen: "Community",
    });
    if (loanCompliance.allowed)
      main[1].push({
        iconName: "Borrow",
        label: "Borrow",
        screen: "BorrowLanding",
      });
    if (kycStatus && hasPassedKYC())
      main[2].splice(1, 0, {
        iconName: "Profile",
        label: "Profile",
        screen: "Profile",
      });
    // TODO change borrow landing to new screen
    if (user)
      main[1].push({
        iconName: "MyCel",
        label: "My CEL",
        screen: "MyCel",
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
      case THEMES.CELSIUS:
        return {
          color: "dark",
          blur: 15,
        };
      case THEMES.LIGHT:
      default:
        return {
          color: "light",
          blur: 12,
        };
    }
  };

  springAnimation = (
    value = undefined,
    friction = undefined,
    tension = undefined,
    velocity = undefined
  ) => {
    const { fabSpring } = this.state;

    Animated.spring(fabSpring, {
      toValue: value || 1.1,
      friction: friction || 0.5,
      tension: tension || 0,
      velocity: velocity || 3,
      overshootClamping: true,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished)
        Animated.spring(fabSpring, {
          toValue: 1,
          friction: 1.5,
          tension: 3,
          useNativeDriver: true,
        }).start();
    });
  };

  pulseAnimation = (pulse, opacity) => {
    const { fabPulse, fabOpacity } = this.state;
    fabPulse.setValue(pulse);
    fabOpacity.setValue(opacity);
    Animated.parallel([
      Animated.timing(fabPulse, {
        toValue: 1.7,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(),
      Animated.timing(fabOpacity, {
        toValue: 0,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(),
    ]);
  };

  animateAttention = () => {
    this.springAnimation(1.3);
    this.pulseAnimation(1.8, 0.8);
    setTimeout(() => {
      this.springAnimation();
      this.pulseAnimation(1.5, 0.6);
    }, 2500);
  };

  animateOpening = () => {
    this.springAnimation(1.2, 1, 1, 5);
  };

  animateClosure = () => {
    this.springAnimation(1.3, 1, 1, 3);
  };

  animateClosing = () => {
    setTimeout(() => {
      this.springAnimation(1.3, 1, 1, 3);
      this.pulseAnimation(1.3, 0.6);
    }, 50);
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
      this.animateOpening();
      this.animateButtons();
      actions.openFabMenu();
    }
  };

  navigate = screen => {
    const { actions } = this.props;
    if (
      [
        "MyCel",
        "Profile",
        "CelPayLanding",
        "WalletLanding",
        "Deposit",
        "WithdrawEnterAmount",
        "Community",
        "BorrowLanding",
      ].indexOf(screen) !== -1
    )
      actions.resetToScreen(screen);
  };

  animateButtons = () => {
    const {
      buttonMoveAnimationX,
      buttonMoveAnimationY,
      blurOpacity,
      textOpacity,
      helpButtonOffset,
    } = this.state;

    this.setState({
      showBackground: true,
    });
    Animated.sequence([
      Animated.parallel([
        Animated.spring(buttonMoveAnimationX, {
          toValue: 1,
          frictions: 3,
          tension: 1,
          velocity: 5,
          useNativeDriver: true,
          extrapolate: "clamp",
        }).start(),
        Animated.spring(buttonMoveAnimationY, {
          toValue: 1,
          frictions: 3,
          tension: 1,
          velocity: 5,
          useNativeDriver: true,
          extrapolate: "clamp",
        }).start(),
        Animated.timing(blurOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          extrapolate: "clamp",
        }).start(),
      ]),
      Animated.timing(helpButtonOffset, {
        toValue: 1,
        duration: 550,
        useNativeDriver: true,
        extrapolate: "clamp",
      }).start(),
    ]);
    Animated.parallel([
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
        extrapolate: "clamp",
      }),
    ]);
  };

  deanimateButtons = screen => {
    const { actions } = this.props;
    const {
      buttonMoveAnimationX,
      buttonMoveAnimationY,
      blurOpacity,
      textOpacity,
      helpButtonOffset,
    } = this.state;
    this.navigate(screen);
    Animated.sequence([
      Animated.parallel([
        Animated.spring(buttonMoveAnimationX, {
          toValue: 0,
          frictions: 3,
          tension: 1,
          velocity: 5,
          useNativeDriver: true,
          extrapolate: "clamp",
        }).start(),
        Animated.spring(buttonMoveAnimationY, {
          toValue: 0,
          frictions: 3,
          tension: 1,
          velocity: 5,
          useNativeDriver: true,
          extrapolate: "clamp",
        }).start(),
        Animated.timing(blurOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
          extrapolate: "clamp",
        }).start(),
        Animated.timing(helpButtonOffset, {
          toValue: 0,
          duration: 550,
          useNativeDriver: true,
          extrapolate: "clamp",
        }).start(({ finished }) => {
          if (finished) {
            this.setState({
              showBackground: false,
            });
            this.animateClosure();
            actions.closeFabMenu();
          }
        }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
          extrapolate: "clamp",
        }),
      ]),
    ]);
  };

  renderFabButtons = (col, value) => {
    const { theme } = this.props;
    const { buttonMoveAnimationX, buttonMoveAnimationY } = this.state;
    const style = FabMenuAnimatedStyle();
    const circleButtonStyle = CircleButtonStyle(theme);
    const multiplierX = widthPercentageToDP("27%");
    const multiplierY = heightPercentageToDP("15%");
    const normalWidthSpread = -widthPercentageToDP("80%");
    const adjustedWidthSpread = -widthPercentageToDP("67.5%");
    const normalHeightSpread = -heightPercentageToDP("60%");

    return (
      <Animated.View style={style.fabButton}>
        {col.map((item, v) => {
          let distanceX = normalWidthSpread + value * multiplierX;
          if (v === 2) distanceX = adjustedWidthSpread + value * multiplierX;
          const distanceY = normalHeightSpread + v * multiplierY;
          return (
            <Animated.View
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
                key={item.label}
                theme={item.theme}
                onPress={() => {
                  this.fabAction(item.screen);
                }}
                type="menu"
                icon={item.iconName}
                iconSize={30}
              />
              <Animated.View style={{ opacity: this.state.textOpacity }}>
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
    const { actions, theme } = this.props;
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
            actions.navigateTo("Support");
            this.fabAction();
          }}
        >
          <Icon
            name={"QuestionCircle"}
            width={25}
            height={25}
            fill={
              theme === "dark"
                ? STYLES.COLORS.WHITE_OPACITY5
                : STYLES.COLORS.DARK_GRAY
            }
          />
          <CelText weight={"300"} type={"H5"}>
            Need help?
          </CelText>
        </Card>
      </Animated.View>
    );
  };

  renderFab = () => {
    const style = FabMenuAnimatedStyle();
    const { fabType } = this.props;
    const { fabPulse, fabSpring, fabOpacity } = this.state;

    return (
      <Fragment>
        <Animated.View
          style={[
            style.fabButton,
            style.opacityCircle,
            {
              transform: [{ scale: fabPulse }],
              opacity: fabOpacity,
            },
          ]}
        />
        <Animated.View
          style={[style.fabButton, { transform: [{ scale: fabSpring }] }]}
        >
          <Fab onPress={this.fabAction} type={fabType} />
        </Animated.View>
      </Fragment>
    );
  };

  render() {
    const { fabMenuOpen, fabType } = this.props;
    if (isKYCRejectedForever()) return null;

    // if (!appInitialized) return null; // Too many bugs with this one line of code :D
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
