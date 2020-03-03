import React, { Component } from 'react';
import { Constants } from 'expo';
import { View, Image } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as appActions from '../../../redux/actions';


import WelcomeStyle from "./Welcome.styles";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelButton from '../../atoms/CelButton/CelButton';
// import ReferralReceivedModal from '../../organisms/ReferralReceivedModal/ReferralReceivedModal';
// import STYLES from '../../../constants/STYLES';

const { revisionId } = Constants.manifest;

@connect(
  () => ({
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Welcome extends Component {
  static propTypes = {};
  static defaultProps = {}

  static navigationOptions = () => ({
    headerSameColor: false,
    transparent: true
  })

  render() {
    const style = WelcomeStyle();
    const { actions } = this.props
    return (
      <RegularLayout fabType="hide">
        <View style={style.wrapper}>
          <Image
            source={require('../../../../assets/images/Onboarding-Welcome3x.png')} style={{ height: 140, resizeMode: 'contain' }}
          />
          <CelText weight='bold' align='center' type='H1' style={style.title}>Welcome to Celsius Network</CelText>
          <CelText weight="light" align='center' style={style.subtitle}>A new way to earn, borrow and pay on the blockchain. Let’s bring the next 100M people into crypto together.</CelText>
          <CelButton style={style.button} onPress={() => actions.navigateTo('RegisterInitial')}>Join Celsius</CelButton>
          <CelButton basic onPress={() => actions.navigateTo('Login')}>Login</CelButton>

          <CelText margin="30 0 0 0" weight="light" align='center' type="H7" style={{ opacity: 0.5 }}>Celsius App version: {revisionId}</CelText>
        </View>
      </RegularLayout>
    );
  }
}

export default Welcome
