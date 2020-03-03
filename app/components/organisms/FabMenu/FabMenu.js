import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { BlurView } from 'expo';
import * as appActions from "../../../redux/actions";

import FabMenuStyle from "./FabMenu.styles";
import Fab from '../../molecules/Fab/Fab';
import CircleButton from '../../atoms/CircleButton/CircleButton';
import { THEMES } from '../../../constants/UI';
import { KYC_STATUSES } from "../../../constants/DATA";
import { hasPassedKYC } from "../../../utils/user-util";

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
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class FabMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
    };

    this.springValue = new Animated.Value(1)
    this.pulseValue = new Animated.Value(1)
    this.opacityValue = new Animated.Value(1)
  }

  componentDidMount = () => {
    const { fabType } = this.props;
    this.setState({
      menuItems: this.getMenuItems(fabType)
    });
  }

  componentWillReceiveProps(nextProps) {
    if((nextProps.appInitialized && nextProps.appInitialized !== this.props.appInitialized && nextProps.user.has_pin) || (nextProps.appInitialized && nextProps.user.has_pin &&  nextProps.user.has_pin !== this.props.user.has_pin)) {
      this.doAnimate()
    }
  }

  componentDidUpdate = (prevProps) => {
    if ((prevProps.fabType !== this.props.fabType && this.props.fabType !== 'hide') || (prevProps.kycStatus !== this.props.kycStatus)) {
      this.setState({
        menuItems: this.getMenuItems(this.props.fabType)
      });
    }
  };

  getMenuItems(menu) {
    const {depositCompliance, celpayCompliance, loanCompliance, withdrawCompliance, user,kycStatus} = this.props;
    const main = [
      [
        { iconName: 'Wallet',label: 'Wallet', screen: 'WalletLanding' },
      ],
      [],
      [
        { iconName:'Settings', label: 'Settings', screen: 'Settings' },
        { iconName: 'Community', label: 'Community', screen: 'Community' },
        // { iconName: 'Support', label: 'Support', screen: 'Support' }
      ]
    ];
    if (depositCompliance.allowed) main[0].push({iconName: 'Deposit', label: 'Deposit', screen: 'Deposit' });
    if ((kycStatus && hasPassedKYC()) && withdrawCompliance.allowed) main[0].push({iconName: 'Withdraw', label: 'Withdraw', screen: 'WithdrawEnterAmount' });
    if (celpayCompliance.allowed) main[1].push({iconName:'CelPay', label: 'CelPay', screen: 'CelPayChooseFriend' });
    if (loanCompliance.allowed) main[1].push({iconName: 'Borrow', label: 'Borrow', screen: 'BorrowLanding' });
    if (user) main[1].push({iconName: 'Profile', label: 'Profile', screen: 'Profile'});
    // TODO change borrow landing to new screen
    if (kycStatus && hasPassedKYC()) main[2].splice(1, 0, { iconName: 'MyCel', label: 'My CEL', screen: 'MyCel' })

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
        return THEMES.DARK;
      case THEMES.LIGHT:
      default:
        return THEMES.LIGHT;
    }
  }

  doAnimate () {
    setTimeout(()=>{ this.spring() }, 1000)
    setTimeout(()=>{ this.spring() }, 2500)
    setTimeout(()=>{ this.spring() }, 4000)
  }

  spring () {
    this.springValue.setValue(1.1)
    this.pulseValue.setValue(1)
    this.opacityValue.setValue(0.8)
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 2,
        // damping: 6,
        tension: 9,
        // bounciness: 1,
        // stiffness: 100,
        // overshootClamping: true,
        // speed: 0.01,
        useNativeDriver: true
      }
    ).start()
    Animated.timing(
      this.pulseValue,
      {
        toValue: 1.7,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start()
    Animated.timing(
      this.opacityValue,
      {
        toValue: 0,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start()
  }

  fabAction = () => {
    const { fabType } = this.props;
    switch (fabType) {
      case 'main':
        this.toggleMenu();
        break;

      default:
        break;
    }
  }

  toggleMenu = () => {
    const { fabMenuOpen, actions } = this.props;
    if (fabMenuOpen) {
      actions.closeFabMenu()
    } else {
      actions.openFabMenu()
    }
  }

  iconSize = (label) => {
    switch (label) {
      case "Community":
        return 35
      case "Wallet":
        return 30
      case "Withdraw":
        return 30
      case "Profile":
        return 30
      case "MyCel":
        return 30
      default:
        return 33
    }
  };

  renderMenuItem = (item) => {
    const { theme, actions } = this.props;
    return (
      <CircleButton 
        key={item.label} 
        theme={theme} 
        onPress={() => { actions.resetToFlow(item.screen); actions.closeFabMenu() }} 
        type="menu"
        text={item.label} 
        icon={item.iconName} 
        iconSize={this.iconSize(item.iconName)}   
      />
    )
  }

  renderMenuRow = (menuRow) => {
    const style = FabMenuStyle();
    return (
      <View key={menuRow[0].label} style={style.menuItemsContainer}>
        {menuRow.map(this.renderMenuItem)}
      </View>
    );
  }

  renderFabMenu = () => {
    const style = FabMenuStyle();
    const { menuItems } = this.state;
    const { actions } = this.props;
    const tintColor = this.getTintColor();

    if (Platform.OS !== 'android') {
      return (
        <BlurView tint={tintColor} intensity={100} style={[StyleSheet.absoluteFill, style.menuContainer]} >
          <View>
            {menuItems.map(this.renderMenuRow)}
          </View>
        </BlurView>
      )
    }
    return (
      <TouchableOpacity style={[StyleSheet.absoluteFill, style.menuContainer, style.background]} onPress={() => actions.closeFabMenu()}>
        {menuItems.map(this.renderMenuRow)}
      </TouchableOpacity>
    )

  }

  renderFab = () => {
    const style = FabMenuStyle();
    const { fabType } = this.props;
    return (
      <Fragment>
        <Animated.View style={[style.fabButton, style.opacityCircle, {transform: [{scale: this.pulseValue}],  opacity: this.opacityValue} ]}/>
        <Animated.View style={[style.fabButton, { transform: [{scale: this.springValue} ]} ]}>
          <Fab onPress={this.fabAction} type={fabType} />
        </Animated.View>
      </Fragment>
    );
  }

  render() {
    const style = FabMenuStyle();
    const { fabMenuOpen, fabType } = this.props

    // if (!appInitialized) return null; // Too many bugs with this one line of code :D
    if (fabType === 'hide') return null;

    const FabMenuCmp = this.renderFabMenu;
    const FabButton = this.renderFab;

    return (
      <Fragment>
        {fabMenuOpen ? <FabMenuCmp style={style.menu} /> : null}
        <FabButton />
      </Fragment>
    )
  }
}

export default FabMenu
