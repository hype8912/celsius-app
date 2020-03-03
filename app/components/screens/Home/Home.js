import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Image, ScrollView, SafeAreaView, StatusBar } from 'react-native'
import * as appActions from '../../../redux/actions'
import { KYC_STATUSES, RANDOM_MESSAGES } from '../../../constants/DATA'
import Loader from '../../atoms/Loader/Loader'
import {
  heightPercentageToDP,
  widthPercentageToDP,
  getPadding
} from '../../../utils/styles-util'
import CelText from '../../atoms/CelText/CelText'
import { THEMES } from '../../../constants/UI';

const apiCalls = []

@connect(
  state => ({
    appInitialized: state.app.appInitialized,
    user: state.user.profile,
    callsInProgress: state.api.callsInProgress,
    appSettings: state.user.appSettings,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Home extends Component {
  static getDerivedStateFromProps (nextProps, prevState) {
    const { callsInProgress } = nextProps

    if (callsInProgress[0] && apiCalls.indexOf(callsInProgress[0]) === -1) {
      apiCalls.push(callsInProgress[0])
      return { progress: prevState.progress + 1 / 6 }
      // six is current number of calls being called while loading app
    }
    return null
  }

  constructor (props) {
    super(props)

    this.state = {
      progress: 0,
      randomMsg: RANDOM_MESSAGES[Math.floor(Math.random() * RANDOM_MESSAGES.length)]
    }
  }

  async componentDidMount () {
    const { actions, appInitialized } = this.props
    if (!appInitialized) await actions.initCelsiusApp()
  }

  componentDidUpdate (prevProps) {
    const { user } = this.props;

    if (
      prevProps.appInitialized === false &&
      this.props.appInitialized === true
    ) {
      if (user.id) {
        if (
          user.kyc &&
          user.kyc.status === KYC_STATUSES.passed &&
          user.has_pin
        ) {
            return prevProps.actions.navigateTo('VerifyProfile', {
              activeScreen: 'WalletLanding' })
        }
        if (!user.has_pin) {
          return prevProps.actions.navigateTo('RegisterSetPin')
        }
        return prevProps.actions.navigateTo('WalletFab')
      }
      return prevProps.actions.navigateTo('Welcome')
    }
  }

  render () {
    const { randomMsg } = this.state
    const paddings = getPadding('0 20 0 20')

    return (
      <ScrollView contentContainerStyle={[{ flexGrow: 1 }, paddings]}>
        <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>
          <StatusBar barStyle='dark-content' />
          <View
            style={{
              marginTop: heightPercentageToDP('15%'),
              alignItems: 'center'
            }}
          >
            <Image
              source={require('../../../../assets/images/splashScreen-celsius-new.png')}
              style={{
                resizeMode: 'contain',
                width: widthPercentageToDP('33%'),
                height: widthPercentageToDP('33%'),
                marginBottom: 20
              }}
            />
            <CelText
              theme={THEMES.LIGHT}
              align={'center'}
              margin={'20 0 10 0'}
              weight={'600'}
              type={'H2'}
            >
              {randomMsg.title}
            </CelText>
            <CelText
              theme={THEMES.LIGHT}
              align={'center'}
              margin={'0 0 20 0'}
              type={'H4'}
              weight={'300'}
            >
              {randomMsg.text}
            </CelText>
            <Loader progress={this.state.progress} />
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <Image
              source={require('../../../../assets/images/PartnerLogos/BitGo.png')}
              style={{
                resizeMode: 'contain',
                width: widthPercentageToDP('18%'),
                marginLeft: 35,
                marginRight: 5,
                alignSelf: 'flex-end'
              }}
            />
            <Image
              source={require('../../../../assets/images/PartnerLogos/DP.png')}
              style={{
                resizeMode: 'contain',
                width: widthPercentageToDP('18%'),
                marginLeft: 5,
                marginRight: 5,
                alignSelf: 'flex-end'
              }}
            />
            <Image
              source={require('../../../../assets/images/PartnerLogos/EY.png')}
              style={{
                resizeMode: 'contain',
                width: widthPercentageToDP('18%'),
                marginLeft: 5,
                marginRight: 5,
                alignSelf: 'flex-end'
              }}
            />
            <Image
              source={require('../../../../assets/images/PartnerLogos/mvp_workshop.png')}
              style={{
                resizeMode: 'contain',
                width: widthPercentageToDP('22%'),
                opacity: 0.7,
                marginLeft: 0,
                marginRight: 35,
                alignSelf: 'flex-end'
              }}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    )
  }
}

export default Home
