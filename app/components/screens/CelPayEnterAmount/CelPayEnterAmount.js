import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import * as appActions from '../../../redux/actions'
import CelPayEnterAmountStyle from './CelPayEnterAmount.styles'
import CelButton from '../../atoms/CelButton/CelButton'
import RegularLayout from '../../layouts/RegularLayout/RegularLayout'
import CelNumpad from '../../molecules/CelNumpad/CelNumpad'
import { KEYPAD_PURPOSES, MODALS } from '../../../constants/UI'
import CoinSwitch from '../../atoms/CoinSwitch/CoinSwitch'
import SimpleSelect from '../../molecules/SimpleSelect/SimpleSelect'
import BalanceView from '../../atoms/BalanceView/BalanceView'
import STYLES from '../../../constants/STYLES'
import PredefinedAmounts from '../../organisms/PredefinedAmounts/PredefinedAmounts'
import { PREDIFINED_AMOUNTS } from '../../../constants/DATA'
import formatter from '../../../utils/formatter'
import cryptoUtil from '../../../utils/crypto-util'
import { isMalisaPusonja } from '../../../utils/user-util'
import celUtilityUtil from '../../../utils/cel-utility-util'
import LoseTierModal from "../../molecules/LoseTierModal/LoseTierModal";
import LoseMembershipModal from "../../molecules/LoseMembershipModal/LoseMembershipModal";

@connect(
  state => ({
    walletSummary: state.wallet.summary,
    celpayCompliance: state.compliance.celpay,
    currencyRatesShort: state.currencies.currencyRatesShort,
    currencies: state.currencies.rates,
    formData: state.forms.formData,
    withdrawalAddresses: state.wallet.withdrawalAddresses,
    loyaltyInfo: state.user.loyaltyInfo,
    keypadOpen: state.ui.isKeypadOpen
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CelPayEnterAmount extends Component {
  static propTypes = {}
  static defaultProps = {}

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      right: 'profile',
      title: params && params.title ? params.title : 'CelPay'
    }
  }

  constructor (props) {
    super(props)
    const { currencies, celpayCompliance, formData, walletSummary } = this.props

    const coinSelectItems = currencies
      .filter(c => celpayCompliance.coins.includes(c.short))
      .filter(c => {
        const balanceUsd = walletSummary.coins.filter(
          coin => coin.short === c.short.toUpperCase()
        )[0].amount_usd
        return balanceUsd > 0
      })
      .map(c => ({ label: `${c.displayName}  (${c.short})`, value: c.short }))

    this.setNavigationParams()

    this.state = {
      coinSelectItems,
      activePeriod: { label: '', value: '' }
    }

    if (!formData.coin) {
      props.actions.updateFormField(
        'coin',
        (coinSelectItems &&
          coinSelectItems.length > 0 &&
          coinSelectItems[0].value) ||
          ''
      )
    }
  }

  componentDidMount () {
    const { actions } = this.props
    actions.getLoyaltyInfo()
  }

  componentDidUpdate (prevProps) {
    const { formData } = this.props

    if (prevProps.formData.friend !== formData.friend) {
      this.setNavigationParams()
    }
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

  setNavigationParams () {
    const { formData, navigation } = this.props
    const names =
      formData.friend && formData.friend.name
        ? formData.friend.name.split(' ')
        : undefined
    const screenTitle = names
      ? `Send to ${names[0] ? names[0] : ''} ${
        !!names[1] && !!names[1][0] ? names[1][0] : ''
      }`
      : 'CelPay'

    navigation.setParams({
      title: screenTitle,
      activePeriod: { label: '', value: '' }
    })
  }

  getButtonCopy = () => {
    const { formData } = this.props

    if (formData.amountCrypto && formData.amountCrypto > 0) {
      return formData.friend ? 'Add a note' : 'Send'
    }
    return 'Enter amount above'
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
    if (!isMalisaPusonja() && cryptoUtil.isGreaterThan(amountUsd, 1000)) {
      return actions.showMessage('warning', 'Daily CelPay limit is $1,000!')
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

    this.setState({ activePeriod: { label: '', value: '' } })
  }

  handleNextStep = () => {
    const { actions, formData, walletSummary } = this.props

    const coinData = walletSummary.coins.filter(
      c => c.short === formData.coin.toUpperCase()
    )[0]

    // TODO: move newBalance calc to util
    const newBalance = Number(coinData.amount) - Number(formData.amountCrypto)

    if (celUtilityUtil.isLosingMembership(formData.coin, newBalance)) {
      return actions.openModal(MODALS.LOSE_MEMBERSHIP_MODAL)
    }
    if (celUtilityUtil.isLosingTier(formData.coin, newBalance)) {
      return actions.openModal(MODALS.LOSE_TIER_MODAL)
    }

    this.navigateToNextStep()
  }

  navigateToNextStep = () => {
    const { actions, formData } = this.props

    if (formData.friend) {
      actions.navigateTo('CelPayMessage')
      actions.closeModal()
    } else {
      actions.navigateTo('VerifyProfile', {
        onSuccess: actions.celPayShareLink
      })
      actions.closeModal()
    }
  }

  render () {
    const { coinSelectItems, activePeriod } = this.state
    const {
      formData,
      actions,
      walletSummary,
      loyaltyInfo,
      keypadOpen
    } = this.props
    const style = CelPayEnterAmountStyle()
    if (!formData.coin) return null

    const coinData = walletSummary.coins.filter(
      c => c.short === formData.coin.toUpperCase()
    )[0]

    return (
      <RegularLayout padding='20 0 0 0' fabType={'hide'}>
        <View style={style.container}>
          <View style={style.wrapper}>
            <BalanceView
              opacity={0.65}
              coin={formData.coin}
              crypto={coinData.amount}
              usd={coinData.amount_usd}
            />
            <View style={style.amounts}>
              <View style={style.selectWrapper}>
                <SimpleSelect
                  items={coinSelectItems}
                  field='coin'
                  displayValue={formData.coin}
                  updateFormField={actions.updateFormField}
                  onChange={this.handleCoinChange}
                  placeholder='Choose a coin'
                />
              </View>

              <CoinSwitch
                updateFormField={actions.updateFormField}
                onAmountPress={actions.toggleKeypad}
                amountUsd={formData.amountUsd}
                amountCrypto={formData.amountCrypto}
                isUsd={formData.isUsd}
                coin={formData.coin}
                amountColor={
                  keypadOpen
                    ? STYLES.COLORS.CELSIUS_BLUE
                    : STYLES.COLORS.DARK_GRAY
                }
              />
            </View>

            <PredefinedAmounts
              data={PREDIFINED_AMOUNTS}
              onSelect={this.onPressPredefinedAmount}
              activePeriod={activePeriod}
            />

            <CelButton
              margin='40 0 0 0'
              disabled={
                !(formData.amountCrypto && Number(formData.amountCrypto) > 0)
              }
              onPress={this.handleNextStep}
            >
              {this.getButtonCopy()}
            </CelButton>
          </View>
        </View>

        <CelNumpad
          field={formData.isUsd ? 'amountUsd' : 'amountCrypto'}
          value={formData.isUsd ? formData.amountUsd : formData.amountCrypto}
          updateFormField={actions.updateFormField}
          setKeypadInput={actions.setKeypadInput}
          toggleKeypad={actions.toggleKeypad}
          onPress={this.handleAmountChange}
          purpose={KEYPAD_PURPOSES.CELPAY}
        />

        <LoseMembershipModal
          navigateToNextStep={this.navigateToNextStep}
          closeModal={actions.closeModal}
        />
        {loyaltyInfo && (
          <LoseTierModal
            navigateToNextStep={this.navigateToNextStep}
            tierTitle={loyaltyInfo.tier.title}
            closeModal={actions.closeModal}
          />
        )}

      </RegularLayout>
    )
  }
}

export default CelPayEnterAmount
