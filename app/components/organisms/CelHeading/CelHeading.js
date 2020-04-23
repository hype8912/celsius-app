import React, { Component } from "react";
import {
  Image,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelHeadingStyle from "./CelHeading.styles";
import { getPadding, getTheme } from "../../../utils/styles-util";
import CelButton from "../../atoms/CelButton/CelButton";
import { THEMES } from "../../../constants/UI";
import CelInput from "../../atoms/CelInput/CelInput";
import CelText from "../../atoms/CelText/CelText";
import STYLES from "../../../constants/STYLES";
import HodlBanner from "../../atoms/HodlBanner/HodlBanner";
import Icon from "../../atoms/Icon/Icon";

@connect(
  state => ({
    profilePicture: state.user.profile.profile_picture,
    message: state.ui.message,
    formData: state.forms.formData,
    theme: state.user.appSettings.theme,
    hodlStatus: state.hodl.hodlStatus,
    activeScreen: state.nav.activeScreen,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CelHeading extends Component {
  /**
   * List of possible scene props (props that comes through navigationOptions)
   *
   * @type {boolean}
   * hideBack
   *
   * @type {string}
   * right: oneOf(['action', 'signup', 'login', 'info', 'search', 'profile', 'logout', 'close'])
   *
   * @type {function}
   * onInfo
   *
   * @type {boolean}
   * transparent
   *
   * @description if headerSameColor=true it will set header background color same as content background
   * @type {boolean}
   * headerSameColor
   *
   * @type {React.Component}
   * customCenterComponent
   */

  constructor(props) {
    super(props);
    this.state = {
      activeSearch: false,
      screen: props.scene.route.routeName,
    };
  }

  componentDidMount() {
    this.getStatusBarTextColor();
  }

  componentDidUpdate(prevProps) {
    const { theme, actions, scene, activeScreen } = this.props;
    const { screen } = this.state;
    const right = scene.descriptor.options.right;

    if (prevProps.theme !== theme) {
      this.getStatusBarTextColor();
    }

    // iOS renders one CelHeading for the App
    const activateSearchiOS =
      prevProps.activeScreen !== activeScreen && right === "search";
    // Android renders a CelHeading for each screen
    const activateSearchAndroid = screen === activeScreen && activateSearchiOS;
    const activateSearch =
      Platform.OS === "ios" ? activateSearchiOS : activateSearchAndroid;

    if (activateSearch) {
      actions.updateFormField("activeSearch", true);
    }
  }

  navigateBack = (customBack, backScreenName) => {
    const { actions, formData } = this.props;
    if (customBack) {
      customBack();
    } else {
      actions.navigateBack(backScreenName);
    }
    if (formData.activeSearch) {
      actions.updateFormFields({
        activeSearch: false,
        search: "",
      });
    }
  };

  getLeftContent = sceneProps => {
    const { hideBack, customBack } = sceneProps;
    const { scenes, formData } = this.props;

    const backScreenName = scenes[this.props.index - 1]
      ? scenes[this.props.index - 1].route.routeName
      : "";

    // By default if scene prop hideBack is true or it's first screen in the stack, hide back arrow
    return this.props.scene.index === 0 || hideBack === true ? null : (
      <CelButton
        margin={formData.activeSearch ? "8 0 0 4" : null}
        iconRightColor={STYLES.COLORS.GRAY}
        basic
        onPress={() => this.navigateBack(customBack, backScreenName)}
        iconRight="IconChevronLeft"
      />
    );
  };

  getRightContent = sceneProps => {
    const { right, onInfo } = sceneProps;
    const { profilePicture, formData, actions } = this.props;
    const scene = this.props.scene.descriptor;

    const rightType = formData.activeSearch ? "cancel" : right;
    const style = CelHeadingStyle();
    const theme = getTheme();

    return {
      action: (
        <CelButton basic onPress={() => {}}>
          Action
        </CelButton>
      ),
      signup: (
        <CelButton
          basic
          onPress={() => {
            this.props.actions.navigateTo("RegisterInitial");
          }}
        >
          Sign up
        </CelButton>
      ),
      login: (
        <CelButton
          basic
          onPress={() => {
            this.props.actions.navigateTo("Login");
          }}
        >
          Log in
        </CelButton>
      ),
      info: onInfo && (
        <TouchableOpacity basic onPress={onInfo}>
          <Icon
            name={"Info"}
            height={30}
            width={30}
            fill={
              theme === THEMES.LIGHT
                ? STYLES.COLORS.DARK_GRAY3
                : STYLES.COLORS.WHITE_OPACITY5
            }
          />
        </TouchableOpacity>
      ),
      search: (
        <CelButton
          basic
          iconRightColor={STYLES.COLORS.GRAY}
          onPress={() => {
            actions.updateFormField("activeSearch", true);
          }}
          iconRight="Search"
        />
      ),
      profile: (
        <TouchableOpacity
          onPress={() => {
            this.props.actions.navigateTo("Profile");
          }}
        >
          {profilePicture ? (
            <Image
              style={style.profilePicture}
              source={{
                uri: profilePicture,
                cache: "default",
              }}
              resizeMethod="resize"
              resizeMode="cover"
            />
          ) : (
            <Image
              style={style.profilePicture}
              source={require("../../../../assets/images/empty-profile/empty-profile.png")}
              resizeMethod="resize"
              resizeMode="cover"
            />
          )}
        </TouchableOpacity>
      ),
      logout: (
        <CelButton basic onPress={() => this.props.actions.logoutUser()}>
          Logout
        </CelButton>
      ),
      close: (
        <CelButton
          basic
          onPress={() => {
            this.props.actions.navigateBack();
          }}
        >
          Close
        </CelButton>
      ), // TODO(sb):
      cancel: scene.state.routeName !== "VerifyProfile" && (
        <CelButton
          basic
          onPress={() => {
            actions.updateFormField("activeSearch", false);
            actions.updateFormField("search", "");
          }}
        >
          Cancel
        </CelButton>
      ),
    }[rightType];
  };

  getStatusBarTextColor = () => {
    const { message, theme } = this.props;
    if (message && message.text) {
      return StatusBar.setBarStyle("light-content");
    }
    switch (theme) {
      case THEMES.LIGHT:
        return StatusBar.setBarStyle("dark-content");
      case THEMES.DARK:
        return StatusBar.setBarStyle("light-content");
      case THEMES.CELSIUS:
        return StatusBar.setBarStyle("light-content");
      default:
        return StatusBar.setBarStyle("light-content");
    }
  };

  getCenterContent = sceneProps => {
    const { title, customCenterComponent } = sceneProps;
    const style = CelHeadingStyle();

    return (
      <View style={style.center}>
        {customCenterComponent ? (
          <View style={style.customCenterComponent}>
            {customCenterComponent}
          </View>
        ) : (
          <CelText align="center" weight="medium" type="H3">
            {title || ""}
          </CelText>
        )}
      </View>
    );
  };

  getContent = () => {
    const { formData, hodlStatus, actions, activeScreen } = this.props;
    const scene = this.props.scene.descriptor;
    const style = CelHeadingStyle();
    const paddings = getPadding("0 15 0 15");
    const leftStyle = formData.activeSearch
      ? [style.left, { flexDirection: "row", flex: 2 }]
      : style.left;

    return (
      <View style={[style.container, paddings]}>
        <HodlBanner
          status={hodlStatus}
          actions={actions}
          activeScreen={activeScreen}
        />
        <View style={[style.content]}>
          <View style={leftStyle}>
            {this.getLeftContent(scene.options)}
            {formData.activeSearch &&
              scene.state.routeName !== "VerifyProfile" && (
                <View
                  style={[
                    {
                      width: "90%",
                      justifyContent: "center",
                      paddingTop: 20,
                      alignSelf: "center",
                      marginLeft: 12,
                    },
                  ]}
                >
                  <CelInput
                    debounce
                    autoFocus
                    basic
                    margin="0 0 0 0"
                    field="search"
                    placeholder="Search..."
                    type="text"
                    value={formData.search}
                  />
                </View>
              )}
          </View>
          {!formData.activeSearch && this.getCenterContent(scene.options)}
          <View style={style.right}>{this.getRightContent(scene.options)}</View>
        </View>
      </View>
    );
  };

  render() {
    let containerStyle;
    const scene = this.props.scene.descriptor;
    const { transparent, headerSameColor } = scene.options;
    const style = CelHeadingStyle();

    if (headerSameColor) {
      containerStyle = style.sameBackground;
    } else if (transparent) {
      containerStyle = style.transparentBackground;
    } else {
      containerStyle = style.headingBackground;
    }

    const Content = this.getContent;

    return (
      <SafeAreaView style={containerStyle}>
        <StatusBar />
        <Content />
      </SafeAreaView>
    );
  }
}

export default CelHeading;
