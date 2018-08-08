import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, Platform } from 'react-native';
import { View } from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import Icon from '../../atoms/Icon/Icon';
import * as appActions from "../../../redux/actions";
import { actions as mixpanelActions } from '../../../services/mixpanel'
import {STYLES} from "../../../config/constants/style";


import BottomNavigationStyle from "./BottomNavigation.styles";

const walletScreens = ['NoKyc', 'WalletLanding', 'WalletDetails', 'WalletTotals', 'Home', 'AmountInput', 'ConfirmTransaction', 'TransactionDetails'];

@connect(
  state => ({
    activeScreen: state.nav.routes[state.nav.index].routeName,
    bottomNavigationDimensions: state.ui.dimensions.bottomNavigation,
    screenHeight: state.ui.dimensions.screenHeight,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BottomNavigation extends Component {
  static propTypes = {
    navItemsLeft: PropTypes.instanceOf(Array),
    navItemsRight: PropTypes.instanceOf(Array),
  }

  static defaultProps = {
    navItemsLeft: [
      { label: 'Tracker', screen: 'Portfolio', icon: 'Portfolio', active: ['ManagePortfolio', 'AddCoins'] },
      { label: 'Borrow', screen: 'EstimatedLoan', icon: 'Borrow', active: [] },
    ],
    navItemsRight: [
      { label: 'Earn', screen: 'DepositCoins', icon: 'Lend', active: [] },
      { label: 'Profile', screen: 'Profile', icon: 'Profile', active: ['ChangePassword', 'ProfileImage'] },
    ]
  }

  // lifecycle methods
  // event hanlders
  // rendering methods
  renderNavItem = (navItem) => {
    const { activeScreen, actions } = this.props;
    const state = (navItem.active && navItem.active.indexOf(activeScreen) !== -1) || navItem.screen === activeScreen ? 'Active' : 'Inactive';

    const iconFill = state === 'Active' ? STYLES.PRIMARY_BLUE : '#3D4853';
    const iconStyle = state === 'Active' ? { opacity: 1 } : { opacity: 0.5 };

    return (
      <TouchableOpacity
        key={ navItem.label }
        onPress={ () => {
          mixpanelActions.navigation(navItem.label);
          if (state !== 'Active') {
            actions.navigateTo(navItem.screen)
          }
        }}>
        <View style={BottomNavigationStyle[`item${state}`]} >
          <View style={BottomNavigationStyle.iconWrapper}>
            <Icon style={iconStyle} height="25" width="25" name={ navItem.icon } fill={ iconFill } />
          </View>
          <Text style={BottomNavigationStyle[`text${state}`]}>{ navItem.label }</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderWalletButton(navItem) {

    const { activeScreen, actions } = this.props;

    const ios = walletScreens.indexOf(activeScreen) !== -1 ? 'Active' : 'Inactive';
    const state = (navItem.active && navItem.active.indexOf(activeScreen) !== -1) || navItem.screen === activeScreen ? 'Active' : 'Inactive';

    const iconFill = state === 'Active' ? STYLES.PRIMARY_BLUE : '#3D4853';
    const iconStyle = state === 'Active' ? { opacity: 1 } : { opacity: 0.5 };

    if(Platform.OS === 'ios') {
      return (
      <TouchableOpacity
        onPress={ () => {
          mixpanelActions.navigation('Home');
          actions.navigateTo('Home');
        }}>
        <View style={BottomNavigationStyle.wallet} >
          <View style={BottomNavigationStyle.celWrapper}>
            <View style={BottomNavigationStyle[`celsius${ios}`]}>
              <Icon name="CelsiusLogo" fill="white" width={30} height={30} viewBox="0 0 32 32" />
            </View>
          </View>
          <Text style={BottomNavigationStyle[`text${ios}`]}>Wallet</Text>
        </View>
      </TouchableOpacity>
      )
    }

    if(Platform.OS === 'android') {
      return (
        <TouchableOpacity
          key={ navItem.label }
          onPress={ () => {
            mixpanelActions.navigation('Home');
            actions.navigateTo('Home');
          }}>
          <View style={BottomNavigationStyle[`item${state}`]} >
            <View style={BottomNavigationStyle.iconWrapper}>
              <Icon name="CelsiusLogo" width={25} height={25} viewBox="0 0 32 32" style={[iconStyle, {marginBottom: 0}]} fill={ iconFill } />
            </View>
            <Text style={BottomNavigationStyle[`text${state}`]}>{ navItem.label }</Text>
          </View>
        </TouchableOpacity>
      )
    }

  };

  render() {
    const { navItemsLeft, navItemsRight, bottomNavigationDimensions, screenHeight } = this.props;

    const styles = {
      height: bottomNavigationDimensions.height,
      top: screenHeight - bottomNavigationDimensions.height,
      paddingBottom: bottomNavigationDimensions.paddingBottom,
    }

    return (
      <View style={[ BottomNavigationStyle.container, styles ]}>
        { navItemsLeft.map(this.renderNavItem) }

        {this.renderWalletButton({ label: 'Wallet', screen: 'Home', icon: 'CelsiusLogo', active: walletScreens })}

        { navItemsRight.map(this.renderNavItem) }
      </View>
    );
  }
}

export default BottomNavigation;
