import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import * as appActions from '../../../redux/actions'
import WithdrawEnterAmountStyle from './WithdrawEnterAmount.styles'
import CelButton from '../../atoms/CelButton/CelButton'
import RegularLayout from '../../layouts/RegularLayout/RegularLayout'
import formatter from '../../../utils/formatter'
import CelNumpad from '../../molecules/CelNumpad/CelNumpad'
import { EMPTY_STATES, KEYPAD_PURPOSES, MODALS } from '../../../constants/UI'
import CoinSwitch from '../../atoms/CoinSwitch/CoinSwitch'
import SimpleSelect from '../../molecules/SimpleSelect/SimpleSelect'
import WithdrawInfoModal from '../../organisms/WithdrawInfoModal/WithdrawInfoModal'
import { KYC_STATUSES, PREDIFINED_AMOUNTS } from '../../../constants/DATA'
import PredefinedAmounts from '../../organisms/PredefinedAmounts/PredefinedAmounts'
import { openModal } from '../../../redux/ui/uiActions'
import store from '../../../redux/store'
import StaticScreen from '../StaticScreen/StaticScreen'
import BalanceView from '../../atoms/BalanceView/BalanceView'
import EmptyState from '../../atoms/EmptyState/EmptyState'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import STYLES from '../../../constants/STYLES'
import cryptoUtil from '../../../utils/crypto-util'
import celUtilityUtil from '../../../utils/cel-utility-util'
import LoseMembershipModal from "../../molecules/LoseMembershipModal/LoseMembershipModal";
import LoseTierModal from "../../molecules/LoseTierModal/LoseTierModal";
import { hasPassedKYC } from "../../../utils/user-util";

@connect(
  state => ({
    walletSummary: state.wallet.summary,
    withdrawCompliance: state.compliance.withdraw,
    currencyRatesShort: state.currencies.currencyRatesShort,
    currencies: state.currencies.rates,
    formData: state.forms.formData,
    withdrawalAddresses: state.wallet.withdrawalAddresses,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
    keypadOpen: state.ui.isKeypadOpen,
    withdrawalSettings: state.generalData.withdrawalSettings,
    loyaltyInfo: state.user.loyaltyInfo
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WithdrawEnterAmount extends Component {
  static navigationOptions = () => ({
    title: 'Withdraw',
    right: 'info',
    onInfo: () => {
      store.dispatch(openModal(MODALS.WITHDRAW_INFO_MODAL))
    }
  })

  constructor (props) {
    super(props)

    const {
      navigation,
      currencies,
      withdrawCompliance,
      walletSummary
    } = this.props

    const coin = navigation.getParam(
      'coin',
      (coinSelectItems &&
        coinSelectItems.length > 0 &&
        coinSelectItems[0].value) ||
        ''
    )

    const coinSelectItems = currencies
      .filter(c => withdrawCompliance.coins.includes(c.short))
      .filter(c => {
        const balanceUsd = walletSummary.coins.filter(
          wCoin => wCoin.short === c.short.toUpperCase()
        )[0].amount_usd
        return balanceUsd > 0
      })
      .map(c => ({ label: `${c.displayName} - ${c.short}`, value: c.short }))

    this.state = {
      coinSelectItems,
      activePeriod: { label: '', value: '' }
    }

    props.actions.initForm({ coin: coin || coinSelectItems[0].value })
    props.actions.openModal(MODALS.WITHDRAW_INFO_MODAL)
    props.actions.getAllCoinWithdrawalAddresses()
  }

  onPressPredefinedAmount = ({ label, value }) => {
    const { formData, walletSummary, currencyRatesShort, actions } = this.props
    let amount

    const coinRate = currencyRatesShort[formData.coin.toLowerCase()]
    const walletSummaryObj = walletSummary.coins.find(
      c => c.short === formData.coin.toUpperCase()
    )

    if (label === 'ALL') {
      amount = formData.isUsd
        ? walletSummaryObj.amount_usd.toString()
        : walletSummaryObj.amount
    } else {
      amount = formData.isUsd ? value : (Number(value) / coinRate).toString()
    }
    this.handleAmountChange(amount, { label, value })
    actions.toggleKeypad(false)
  }

  getUsdValue = amountUsd =>
    formatter.removeDecimalZeros(formatter.floor10(amountUsd, -2) || '')

  handleAmountChange = (newValue, predefined = { label: '' }) => {
    const { formData, currencyRatesShort, actions, walletSummary } = this.props
    const coinRate = currencyRatesShort[formData.coin.toLowerCase()]

    const splitedValue = newValue.toString().split('.')

    if (splitedValue && splitedValue.length > 2) return

    const {
      amount_usd: balanceUsd,
      amount: balanceCrypto
    } = walletSummary.coins.find(c => c.short === formData.coin.toUpperCase())

    let amountCrypto
    let amountUsd

    if (formData.isUsd) {
      // if no predefined label is forwarded and the value is in usd
      if (predefined.label.length === 0) {
        amountUsd = formatter.setCurrencyDecimals(newValue, 'USD')
        amountCrypto = amountUsd / coinRate
      } else {
        amountUsd = predefined.label === 'ALL' ? balanceUsd : newValue
        amountUsd = this.getUsdValue(amountUsd)
        amountCrypto =
          predefined.label === 'ALL' ? balanceCrypto : amountUsd / coinRate
        amountCrypto = formatter.removeDecimalZeros(amountCrypto)
      }
      // if no predefined label is forwarded and the value is no in usd (crypto)
    } else if (predefined.label.length === 0) {
      amountCrypto = formatter.setCurrencyDecimals(newValue)
      amountUsd = amountCrypto * coinRate
      amountUsd = this.getUsdValue(amountUsd)
      if (amountUsd === '0') amountUsd = ''
    } else {
      amountCrypto = predefined.label === 'ALL' ? balanceCrypto : newValue
      amountCrypto = formatter.removeDecimalZeros(amountCrypto)
      amountUsd = predefined.label === 'ALL' ? balanceUsd : predefined.value
      amountUsd = this.getUsdValue(amountUsd)
    }

    // Change value '.' to '0.'
    if (amountUsd[0] === '.') amountUsd = `0${amountUsd}`
    // if the crypto amount is eg. 01 the value will be 1, 00 -> 0
    if (amountUsd.length > 1 && amountUsd[0] === '0' && amountUsd[1] !== '.') {
      amountUsd = amountUsd[1]
    }

    // if crypto amount is undefined, set it to empty string
    if (!amountCrypto) amountCrypto = ''
    // Change value '.' to '0.'
    if (amountCrypto[0] === '.') amountCrypto = `0${amountCrypto}`
    // if the crypto amount is eg. 01 the value will be 1, 00 -> 0
    if (
      amountCrypto.length > 1 &&
      amountCrypto[0] === '0' &&
      amountCrypto[1] !== '.'
    ) {
      amountCrypto = amountCrypto[1]
    }

    if (cryptoUtil.isGreaterThan(amountCrypto, balanceCrypto)) {
      return actions.showMessage('warning', 'Insufficient funds!')
    }

    this.setState({ activePeriod: predefined })

    actions.updateFormFields({
      amountCrypto: amountCrypto.toString(),
      amountUsd
    })
  }

  handleCoinChange = (field, value) => {
    const { actions } = this.props

    actions.updateFormFields({
      [field]: value,
      amountUsd: undefined,
      amountCrypto: undefined
    })
  }

  handleNextStep = () => {
    const { actions, formData, walletSummary } = this.props

    const coinData = walletSummary.coins.find(
      c => c.short === formData.coin.toUpperCase()
    )
    const newBalance = Number(coinData.amount) - Number(formData.amountCrypto)

    if (celUtilityUtil.isLosingMembership(formData.coin, newBalance)) {
      return actions.openModal(MODALS.LOSE_MEMBERSHIP_MODAL)
    }
    if (celUtilityUtil.isLosingTier(formData.coin, newBalance)) {
      return actions.openModal(MODALS.LOSE_TIER_MODAL)
    }

    this.navigateToNextStep()
  }

  navigateToNextStep = (modal) => {
    const { withdrawalAddresses, formData, actions } = this.props
    const coinAddress = withdrawalAddresses[formData.coin.toUpperCase()]




    if (coinAddress) {
      actions.navigateTo('WithdrawConfirmAddress')
    } else {
      actions.navigateTo('WithdrawCreateAddress')
    }
    if (modal) actions.closeModal()
  }



  render () {
    const { coinSelectItems, activePeriod } = this.state
    const {
      formData,
      actions,
      walletSummary,
      keypadOpen,
      withdrawalSettings,
      withdrawalAddresses,
      loyaltyInfo
    } = this.props

    const style = WithdrawEnterAmountStyle()
    if (!hasPassedKYC()) {
      return (
        <StaticScreen
          emptyState={{ purpose: EMPTY_STATES.NON_VERIFIED_WITHDRAW }}
        />
      )
    }
    if (!cryptoUtil.isGreaterThan(walletSummary.total_amount_usd, 0)) {
      return (
        <StaticScreen
          emptyState={{ purpose: EMPTY_STATES.INSUFFICIENT_FUNDS }}
        />
      )
    }
    const coin = formData.coin || ''

    const coinData = walletSummary.coins.find(
      c => c.short === coin.toUpperCase()
    ) || { amount: '', amount_usd: '' }

    if (!hasPassedKYC()) return <StaticScreen emptyState={{ purpose: EMPTY_STATES.NON_VERIFIED_WITHDRAW }} />
    if (!withdrawalAddresses) return <LoadingScreen />

    const isAddressLocked = withdrawalAddresses[formData.coin] && withdrawalAddresses[formData.coin].locked


    let hours
    let minutes

    if (withdrawalAddresses[formData.coin] && withdrawalAddresses[formData.coin].will_unlock_in) {
      hours = withdrawalAddresses[formData.coin].will_unlock_in.split(':')[0]
      minutes = withdrawalAddresses[formData.coin].will_unlock_in.split(':')[1]
    }

    return (
      <RegularLayout padding='20 0 0 0'>
        <View style={style.container}>
          <View style={style.wrapper}>
            <BalanceView
              opacity={0.65}
              coin={coin}
              crypto={coinData.amount}
              usd={coinData.amount_usd}
            />

            <View>
              <View style={style.selectWrapper}>
                <SimpleSelect
                  items={coinSelectItems}
                  field='coin'
                  displayValue={coin}
                  updateFormField={actions.updateFormField}
                  onChange={this.handleCoinChange}
                  placeholder='Choose a coin'
                />
              </View>

              {!isAddressLocked && (
                <CoinSwitch
                  updateFormField={actions.updateFormField}
                  onAmountPress={actions.toggleKeypad}
                  amountUsd={formData.amountUsd}
                  amountCrypto={formData.amountCrypto}
                  isUsd={formData.isUsd}
                  coin={coin}
                  amountColor={
                    keypadOpen
                      ? STYLES.COLORS.CELSIUS_BLUE
                      : STYLES.COLORS.DARK_GRAY
                  }
                />
              )}
            </View>

            {!isAddressLocked ? (
              <View>
                <PredefinedAmounts
                  data={PREDIFINED_AMOUNTS}
                  onSelect={this.onPressPredefinedAmount}
                  activePeriod={activePeriod}
                />

                <CelButton
                  margin='40 0 0 0'
                  disabled={
                    !(formData.amountUsd && Number(formData.amountUsd) > 0)
                  }
                  onPress={this.handleNextStep}
                  iconRight='IconArrowRight'
                >
                  {formData.amountUsd && Number(formData.amountUsd) > 0
                    ? 'Check wallet address'
                    : 'Enter amount above'}
                </CelButton>
              </View>
            ) : (
              <EmptyState
                heading='Address locked'
                paragraphs={[
                  `You have recently changed your ${coin} withdrawal address.`,
                  `Due to our security protocols, your address will be active in ${ hours } hours and ${ minutes } minutes.`
                ]}
              />
            )}
          </View>
        </View>

        <CelNumpad
          field={formData.isUsd ? 'amountUsd' : 'amountCrypto'}
          value={
            formData.isUsd ? formData.amountUsd : formData.amountCrypto || ''
          }
          updateFormField={actions.updateFormField}
          setKeypadInput={actions.setKeypadInput}
          toggleKeypad={actions.toggleKeypad}
          onPress={this.handleAmountChange}
          purpose={KEYPAD_PURPOSES.WITHDRAW}
          autofocus={false}
        />
        <LoseMembershipModal
          navigateToNextStep={() => this.navigateToNextStep(true)}
          closeModal={actions.closeModal}
        />
        {loyaltyInfo && (
          <LoseTierModal
            navigateToNextStep={this.navigateToNextStep}
            tierTitle={loyaltyInfo.tier.title}
            closeModal={actions.closeModal}
          />
        )}
        <WithdrawInfoModal
          type={coin === 'CEL'}
          closeModal={actions.closeModal}
          toggleKeypad={actions.toggleKeypad}
          withdrawalSettings={withdrawalSettings}
        />
      </RegularLayout>
    )
  }
}

export default WithdrawEnterAmount
