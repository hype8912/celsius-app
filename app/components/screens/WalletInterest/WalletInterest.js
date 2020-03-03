import React, { Component } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import formatter from '../../../utils/formatter'
import * as appActions from '../../../redux/actions'
import CelText from '../../atoms/CelText/CelText'
import Card from '../../atoms/Card/Card'
import RegularLayout from '../../layouts/RegularLayout/RegularLayout'
import STYLES from '../../../constants/STYLES'
import TransactionsHistory from '../../molecules/TransactionsHistory/TransactionsHistory'
import CelButton from '../../atoms/CelButton/CelButton'
import WalletInterestStyle from './WalletInterest.styles'
import TodayInterestRatesModal from '../../organisms/TodayInterestRatesModal/TodayInterestRatesModal'
import { EMPTY_STATES, MODALS } from '../../../constants/UI'
import GraphContainer from '../../graphs/GraphContainer/GraphContainer'
import LoadingScreen from '../../screens/LoadingScreen/LoadingScreen'
import Separator from '../../atoms/Separator/Separator'
import InterestCalculatorModal from '../../organisms/InterestCalculatorModal/InterestCalculatorModal'
import InterestCalculatorScreen from '../InterestCalculatorScreen/InterestCalculatorScreen'
import { hasPassedKYC, isUSCitizen } from "../../../utils/user-util";

@connect(
  state => ({
    walletSummary: state.wallet.summary,
    transactions: state.transactions.transactionList,
    currencyRatesShort: state.currencies.currencyRatesShort,
    currencyGraphs: state.currencies.graphs,
    user: state.user.profile,
    loyaltyInfo: state.user.loyaltyInfo,
    appSettings: state.user.appSettings,
    interestCompliance: state.compliance.interest,
    email: state.user.profile.email
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WalletInterest extends Component {
  static navigationOptions = {
    title: 'Interest earned',
    right: 'profile'
  }

  constructor(props) {
    super(props)

    this.state = {
      header: {
        title: 'Interest earned',
        left: 'back',
        right: 'profile'
      },
      loading: true
    }
  }

  async componentDidMount() {
    const { actions } = this.props
    await actions.getLoyaltyInfo()
    await actions.getUserAppSettings()
    this.setState({ loading: false })
  }

  openInterestModal = () => {
    const { actions } = this.props
    actions.openModal(MODALS.TODAY_INTEREST_RATES_MODAL)
  }

  navigateToAllTransactions = () => {
    const { actions } = this.props
    actions.navigateTo('AllTransactions')
  }

  render() {
    const {
      walletSummary,
      user,
      appSettings,
      loyaltyInfo,
      actions,
      interestCompliance
    } = this.props
    const { loading } = this.state
    const style = WalletInterestStyle()

    if (loading || !appSettings || !loyaltyInfo) return <LoadingScreen />
    if (!interestCompliance) {
      return <InterestCalculatorScreen purpose={EMPTY_STATES.COMPLIANCE} />
    }
    if (isUSCitizen() && !user.ssn) {
      return <InterestCalculatorScreen purpose={EMPTY_STATES.NO_SSN_INTEREST} />
    }
    if (!user.celsius_member) {
      return (
        <InterestCalculatorScreen purpose={EMPTY_STATES.NON_MEMBER_INTEREST} />
      )
    }
    if (walletSummary.total_interest_earned <= 0) {
      return <InterestCalculatorScreen purpose={EMPTY_STATES.ZERO_INTEREST} />
    }
    if (!hasPassedKYC()) {
      return <InterestCalculatorScreen purpose={EMPTY_STATES.NON_VERIFIED_INTEREST} />
    }

    return (
      <RegularLayout padding='20 0 100 0'>
        <View style={style.container}>
          <Card onPress={this.openInterestModal}>
            <>
              <CelText type='H6' weight='300'>
                Total interest earned
              </CelText>
              <View style={style.amountWrapper}>
                <CelText weight='600' type='H3'>
                  {formatter.usd(walletSummary.total_interest_earned)}
                </CelText>
                <CelText color={STYLES.COLORS.CELSIUS_BLUE}>
                  Todays rates
                </CelText>
              </View>
              <Separator  margin="10 0 0 0" />
              <TouchableOpacity
                onPress={() => {
                  actions.openModal(MODALS.INTEREST_CALCULATOR_MODAL)
                }}
                style={{ marginTop: 10 }}
              >
                <Image
                  style={{
                    alignSelf: 'center',
                    width: 25,
                    height: 25,
                    marginBottom: 5,
                    marginTop: 6
                  }}
                  source={require('../../../../assets/images/calculator.png')}
                />
                <CelText align='center'>Calculator</CelText>
              </TouchableOpacity>
            </>
          </Card>
        </View>

        <GraphContainer
          showCursor
          showPeriods
          interest
          type={'total-interest'}
        />

        <View style={style.container}>
          <TransactionsHistory
            hasFilter={false}
            additionalFilter={{ type: 'interest', limit: 5 }}
          />

          <CelButton
            basic
            margin='0 0 15 0'
            onPress={this.navigateToAllTransactions}
          >
            See all
          </CelButton>
        </View>
        <TodayInterestRatesModal />
        <InterestCalculatorModal />
      </RegularLayout>
    )
  }
}

export default WalletInterest
