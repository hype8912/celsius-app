import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";


import * as appActions from "../../../redux/actions";
import CelHeadingStyle from "./CelHeading.styles";
import { getPadding } from '../../../utils/styles-util';
import CelButton from '../../atoms/CelButton/CelButton';
import Icon from '../../atoms/Icon/Icon';
import { THEMES } from '../../../constants/UI';
import CelInput from '../../atoms/CelInput/CelInput';

@connect(
  state => ({
    profilePicture: state.user.profile.profile_picture,
    message: state.ui.message,
    theme: state.user.appSettings.theme
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelHeading extends Component {

  static propTypes = {
    left: PropTypes.oneOf(['back']),
    right: PropTypes.oneOf(['action', 'signup', 'login', 'settings', 'info', 'search', 'profile', 'logout', 'close']),
    onInfo: PropTypes.func,
    transparent: PropTypes.bool,
    theme: PropTypes.oneOf(Object.values(THEMES)),
  };
  static defaultProps = {
    transparent: false
  }

  constructor(props) {
    super(props);
    this.state = {
      activeSearch: false,
      searchValue: ''
    }
  }

  getLeftContent = () => {
    const { left, actions } = this.props;
    const { activeSearch } = this.state;
    const leftType = activeSearch ? "search" : left;
    return {
      "back": <CelButton basic onPress={() => { actions.navigateBack(); }} iconRight="IconChevronLeft" />,
      "search": <CelButton basic onPress={() => { this.setState({ activeSearch: true }) }} iconRight="Search" />,
    }[leftType];
  }

  getRightContent = () => {
    const { right, actions, profilePicture, onInfo } = this.props;
    const { activeSearch } = this.state;
    const rightType = activeSearch ? "cancel" : right;
    return {
      "action": <CelButton basic onPress={() => { }}>Action</CelButton>,
      "signup": <CelButton basic onPress={() => { actions.navigateTo('Register') }}>Sign up</CelButton>,
      "login": <CelButton basic onPress={() => { actions.navigateTo('Login') }}>Log in</CelButton>,
      "settings":
        <CelButton basic onPress={() => { actions.navigateTo('Settings'); }}>
          <Icon name="Settings" width="35" height="35" />
        </CelButton>,
      "info": onInfo && <CelButton basic onPress={onInfo}>Info</CelButton>,
      "search": <CelButton basic onPress={() => { this.setState({ activeSearch: true }) }} iconRight="Search" />,
      "profile":
        <CelButton basic onPress={() => { actions.navigateTo('Profile'); }}>
          <Image
            style={{ width: 35, height: 35, borderRadius: 17 }}
            source={profilePicture ? { uri: profilePicture } : require('../../../../assets/images/empty-profile/empty-profile.png')}
            resizeMethod="resize"
          />
        </CelButton>,
      "logout": <CelButton basic onPress={() => { }}>Logout</CelButton>,
      "close": <CelButton basic onPress={() => { actions.navigateBack(); }}>Close</CelButton>, // TODO(sb):
      "cancel": <CelButton basic onPress={() => { this.setState({ activeSearch: false, searchValue: '' }); actions.updateFormField('search', "") }}>Cancel</CelButton>,
    }[rightType];
  }

  getStatusBarTextColor = (theme) => {
    const { message } = this.props;
    if (message) return 'light-content';

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

  getCenterContent = () => {
    const { children } = this.props;
    const style = CelHeadingStyle()
    return (
      <View style={style.center}>
        {children}
      </View>
    );
  }

  getContent = () => {
    const { searchValue } = this.state;
    const style = CelHeadingStyle()
    const paddings = getPadding("15 20 15 20")
    const { activeSearch } = this.state;
    const leftStyle = activeSearch ? [style.left, { flexDirection: 'row', flex: 2 }] : style.left;
    return (
      <View style={[style.content, paddings]}>
        <View style={leftStyle}>
          {this.getLeftContent()}
          {activeSearch && (
            <View style={[{ width: '100%', height: 30, justifyContent: 'center', alignSelf: 'center', marginLeft: 12 }]}>
              <CelInput autoFocus={activeSearch} basic margin="0 0 0 0" field="search" placeholder="Dialing code, country…" type='text' value={searchValue} />
            </View>
          )}
        </View>
        {!activeSearch && this.getCenterContent()}
        <View style={style.right}>
          {this.getRightContent()}
        </View>
      </View>
    )
  }

  render() {
    const { transparent, theme } = this.props
    const style = CelHeadingStyle()
    const statusBarColor = this.getStatusBarTextColor(theme) || 'light-content';
    const containerStyle = transparent ? style.transparentBackground : style.headingBackground;
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
