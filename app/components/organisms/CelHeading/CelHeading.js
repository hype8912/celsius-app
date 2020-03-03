import React, { Component, Fragment } from 'react';
import { Image as RNImage, View, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { Image } from "react-native-expo-image-cache";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";


import * as appActions from "../../../redux/actions";
import CelHeadingStyle from "./CelHeading.styles";
import { getPadding } from '../../../utils/styles-util';
import CelButton from '../../atoms/CelButton/CelButton';
import { THEMES } from '../../../constants/UI';
import CelInput from '../../atoms/CelInput/CelInput';
import CelText from '../../atoms/CelText/CelText'
import STYLES from "../../../constants/STYLES";
import Icon from "../../atoms/Icon/Icon";

@connect(
  state => ({
    profilePicture: state.user.profile.profile_picture,
    message: state.ui.message,
    formData: state.forms.formData,
    theme: state.user.appSettings.theme
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelHeading extends Component {

  /**
   * List of possible scene props (props that comes through navigationOptions)
   *
   * @type {boolean}
   * hideBack
   *
   * @type {string}
   * right: oneOf(['action', 'signup', 'login', 'settings', 'info', 'search', 'profile', 'logout', 'close'])
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
    }
  }

  getLeftContent = (sceneProps) => {
    const { hideBack, right, headerLeft } = sceneProps;
    const { actions, scenes, formData } = this.props;
    const backScreenName = scenes[this.props.index - 1] ? scenes[this.props.index - 1].route.routeName : '';

    // if search is active and right part of header is type of search
    if (right === "search" && formData.activeSearch) return <CelButton basic onPress={() => { actions.updateFormField('activeSearch', true) }} iconRight="Search" />

    if (headerLeft === "celPay") return <CelButton iconRightColor={STYLES.COLORS.GRAY} basic onPress={() => { actions.navigateTo("CelPayChooseFriend"); }} iconRight="IconChevronLeft" />

    // By default if scene prop hideBack is true or it's first screen in the stack, hide back arrow
    return this.props.scene.index === 0 || hideBack === true ? null : <CelButton iconRightColor={STYLES.COLORS.GRAY} basic onPress={() => { actions.navigateBack(backScreenName); }} iconRight="IconChevronLeft" />
  }

  getRightContent = (sceneProps) => {
    const { right, onInfo } = sceneProps;
    const { profilePicture, formData, actions } = this.props;

    const rightType = formData.activeSearch ? "cancel" : right;
    const style = CelHeadingStyle()

    return {
      "action": <CelButton basic onPress={() => { }}>Action</CelButton>,
      "signup": <CelButton basic onPress={() => { this.props.actions.navigateTo('RegisterInitial') }}>Sign up</CelButton>,
      "login": <CelButton basic onPress={() => { this.props.actions.navigateTo('Login') }}>Log in</CelButton>,
      "settings":
        <TouchableOpacity onPress={() => { this.props.actions.navigateTo('Settings'); }}>
          <Icon
            fill="primary"
            name="Settings"
            width="32"
          />
        </TouchableOpacity>,
      "info": onInfo && <CelButton basic onPress={onInfo}>Info</CelButton>,
      "search": <CelButton basic onPress={() => { actions.updateFormField('activeSearch', true) }} iconRight="Search" />,
      "profile":
        <TouchableOpacity onPress={() => { this.props.actions.navigateTo('Profile'); }}>
          { profilePicture ? (
            <Image
              style={style.profilePicture}
              uri={profilePicture}
              resizeMethod="resize"
              resizeMode="cover"
            />
          ) : (
            <RNImage
              style={style.profilePicture}
              source={require('../../../../assets/images/empty-profile/empty-profile.png')}
              resizeMethod="resize"
              resizeMode="cover"
            />
          )}
        </TouchableOpacity>
      ,
      "logout": <CelButton basic onPress={() => this.props.actions.logoutUser()}>Logout</CelButton>,
      "close": <CelButton basic onPress={() => { this.props.actions.navigateBack(); }}>Close</CelButton>, // TODO(sb):
      "cancel": <CelButton basic onPress={() => { actions.updateFormField('activeSearch', false); this.props.actions.updateFormField('search', "") }}>Cancel</CelButton>,
    }[rightType];
  }

  getStatusBarTextColor = (theme) => {
    const { message } = this.props

    if (message && message.text) return 'light-content';

    switch (theme) {
      case THEMES.LIGHT:
        return 'dark-content'
      case THEMES.DARK:
        return 'light-content'
      case THEMES.CELSIUS:
        return 'light-content'
      default:
        return 'light-content'
    }
  }

  getCenterContent = (sceneProps) => {
    const { title, customCenterComponent } = sceneProps;
    const style = CelHeadingStyle()

    return (
      <View style={style.center}>
        {customCenterComponent
          ?
          <Fragment>
            {customCenterComponent}
          </Fragment>

          :
          <CelText style={style.headerTitle} align="center" weight='medium' type="H3">{title || ""}</CelText>
        }
      </View>
    );
  }

  getContent = () => {
    const { formData } = this.props;
    const scene = this.props.scene.descriptor

    const style = CelHeadingStyle()
    const paddings = getPadding("15 20 15 20")
    const leftStyle = formData.activeSearch ? [style.left, { flexDirection: 'row', flex: 2 }] : style.left;

    return (
      <View style={[style.content, paddings]}>
        <View style={leftStyle}>
          {this.getLeftContent(scene.options)}
          {formData.activeSearch && (
            <View style={[{ width: '100%', justifyContent: 'center', alignSelf: 'center', marginLeft: 12 }]}>
              <CelInput debounce autoFocus={formData.activeSearch} basic margin="0 0 0 0" field="search" placeholder="Dialing code, country…" type='text' value={this.props.formData.search} />
            </View>
          )}
        </View>
        {!formData.activeSearch && this.getCenterContent(scene.options)}
        <View style={style.right}>
          {this.getRightContent(scene.options)}
        </View>
      </View>
    )
  }

  render() {
    let containerStyle
    const scene = this.props.scene.descriptor;
    const { headerSameColor, transparent } = scene.options
    const { theme } = this.props;
    const style = CelHeadingStyle()
    const statusBarColor = this.getStatusBarTextColor(theme)

    if (headerSameColor) {
      containerStyle = style.sameBackground
    } else if (transparent) {
      containerStyle = style.transparentBackground
    } else {
      containerStyle = style.headingBackground
    }

    const Content = this.getContent;

    return (
      <SafeAreaView style={containerStyle}>
        <StatusBar barStyle={statusBarColor} />
        <Content />
      </SafeAreaView>
    );
  }
}

export default CelHeading
