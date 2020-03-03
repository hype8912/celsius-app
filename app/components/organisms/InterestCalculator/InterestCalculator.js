import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'


import * as appActions from '../../../redux/actions'
import { KEYPAD_PURPOSES, THEMES } from '../../../constants/UI'
import CelText from '../../atoms/CelText/CelText'
import Card from '../../atoms/Card/Card'
import formatter from '../../../utils/formatter'
import Separator from '../../atoms/Separator/Separator'
import STYLES from '../../../constants/STYLES'
import CoinSwitch from '../../atoms/CoinSwitch/CoinSwitch'
import SimpleSelect from '../../molecules/SimpleSelect/SimpleSelect'
import InterestCalculatorStyle from './InterestCalculator.styles'
import CelNumpad from '../../molecules/CelNumpad/CelNumpad'

@connect(
  state => ({
    interestRates: state.generalData.interestRates,
    formData: state.forms.formData,
    currencies: state.currencies.rates,
    interestCompliance: state.compliance.interest,
    currencyRatesShort: state.currencies.currencyRatesShort,
    keypadOpen: state.ui.isKeypadOpen
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class InterestCalculator extends Component {
  static propTypes = {
    defaultCoin: PropTypes.string,
    showCard: PropTypes.bool,
    theme: PropTypes.oneOf(Object.values(THEMES))
  }
  static defaultProps = { defaultCoin: 'BTC', showCard: false }

  constructor (props) {
    super(props)
    const { defaultCoin, currencies, interestCompliance } = this.props

    const coinSelectItems = currencies
      .filter(c => interestCompliance.coins.includes(c.short))
      .map(c => ({ label: `${c.displayName} - ${c.short}`, value: c.short }))

    this.state = {
      coinSelectItems,
      activePeriod: '',
      earnInterestIn: false
    }
    props.actions.updateFormField('coin', defaultCoin)
  }

  getUsdValue = amountUsd =>
    formatter.removeDecimalZeros(formatter.floor10(amountUsd, -2) || '')

  handleAmountChange = newValue => {
    const { formData, currencyRatesShort, actions } = this.props
    const coinRate = currencyRatesShort[formData.coin.toLowerCase()]

    const splitedValue = newValue.toString().split('.')

    if (splitedValue && splitedValue.length > 2) return

    let amountCrypto
    let amountUsd

    if (formData.isUsd) {
      amountUsd = formatter.setCurrencyDecimals(newValue, 'USD')
      amountCrypto = amountUsd / coinRate
    } else {
      amountCrypto = formatter.setCurrencyDecimals(newValue)
      amountUsd = amountCrypto * coinRate
      amountUsd = this.getUsdValue(amountUsd)
      if (amountUsd === '0') amountUsd = ''
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

  renderInterestOptions = () => {
    const { earnInterestIn } = this.state
    const { formData, interestRates, currencyRatesShort, theme } = this.props

    const style = InterestCalculatorStyle(theme)

    const selectedCoin = formData.coin || 'BTC'
    const interestRateForCoin =
      interestRates && formData.coin && interestRates[formData.coin]
        ? interestRates[formData.coin]
        : { rate: 0, cel_rate: 0 }
    const weeklyInterest =
      (formData.amountCrypto *
        (earnInterestIn
          ? interestRateForCoin.cel_rate
          : interestRateForCoin.rate)) /
      52
    const yearlyInterest =
      formData.amountCrypto *
      (earnInterestIn ? interestRateForCoin.cel_rate : interestRateForCoin.rate)
    const noCelCardStyle = [style.earningCard]
    const celCardStyle = [style.earningCard]

    const noCelTextColor = !earnInterestIn
      ? STYLES.COLORS.WHITE
      : STYLES.COLORS.DARK_GRAY
    const celTextColor = earnInterestIn
      ? STYLES.COLORS.WHITE
      : STYLES.COLORS.DARK_GRAY

    if (!earnInterestIn) {
      noCelCardStyle.push(style.selectedCard)
    } else {
      celCardStyle.push(style.selectedCard)
    }
    return (
      <>
        <CelText style={style.calculatorInfo} align={'center'} margin='20 0 16 0'>
          Choose how you want to earn interest.
        </CelText>

        <View style={{ flexDirection: 'row' }}>
          <Card
            noBorder
            styles={noCelCardStyle}
            margin='20 10 20 20'
            onPress={() => {
              this.setState({ earnInterestIn: false })
            }}
          >
            <CelText color={noCelTextColor} align={'center'} weight='bold'>
              {formatter.percentageDisplay(interestRateForCoin.rate)}
            </CelText>
            <CelText color={noCelTextColor} align={'center'}>
              Regular rates
            </CelText>
          </Card>
          <Card
            noBorder
            styles={celCardStyle}
            margin='20 20 20 10'
            onPress={() => {
              this.setState({ earnInterestIn: true })
            }}
          >
            <CelText color={celTextColor} align={'center'} weight='bold'>
              {formatter.percentageDisplay(interestRateForCoin.cel_rate)}
            </CelText>
            <CelText color={celTextColor} align={'center'}>
              Earn in CEL rates
            </CelText>
          </Card>
        </View>

        <Separator />

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Card
            styles={{ flex: 1 }}
            color={STYLES.COLORS.LIGHT_GRAY}
            margin='20 10 20 20'
          >
            <CelText theme={THEMES.LIGHT} align={'center'}>
              {formatter.usd(
                weeklyInterest * currencyRatesShort[selectedCoin.toLowerCase()]
              )}
            </CelText>
            <CelText theme={THEMES.LIGHT} align={'center'} weight='bold'>
              {formatter.crypto(weeklyInterest, selectedCoin, {
                precision: 2
              })}
            </CelText>
            <CelText theme={THEMES.LIGHT} type='H6' align={'center'}>
              Interest per week
            </CelText>
          </Card>
          <Card
            styles={{ flex: 1 }}
            color={STYLES.COLORS.LIGHT_GRAY}
            margin='20 20 20 10'
          >
            <CelText theme={THEMES.LIGHT} align={'center'}>
              {formatter.usd(
                yearlyInterest * currencyRatesShort[selectedCoin.toLowerCase()]
              )}
            </CelText>
            <CelText theme={THEMES.LIGHT} align={'center'} weight='bold'>
              {formatter.crypto(yearlyInterest, selectedCoin, {
                precision: 2
              })}
            </CelText>
            <CelText theme={THEMES.LIGHT} type='H6' align={'center'}>
              Interest per year
            </CelText>
          </Card>
        </View>
      </>
    )
  }

  render () {
    const { coinSelectItems } = this.state
    const { actions, formData, keypadOpen, showCard, theme } = this.props

    const selectedCoin = formData.coin || 'BTC'

    const style = InterestCalculatorStyle(theme)
    const InterestOptions = this.renderInterestOptions

    return (
      <View>
        <View
          style={style.amounts}
        >
          <View style={style.selectWrapper}>
            <SimpleSelect
              theme={theme}
              items={coinSelectItems}
              field='coin'
              displayValue={selectedCoin}
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
            noUsdDecimals
            coin={selectedCoin}
            theme={theme}
            amountColor={
              keypadOpen ? STYLES.COLORS.CELSIUS_BLUE : STYLES.COLORS.DARK_GRAY
            }
          />
        </View>

        {showCard ? (
          <View style={{ marginHorizontal: 20 }}>
            <Card>
              <InterestOptions />
            </Card>
          </View>
        ) : (
          <InterestOptions />
        )}

        <CelNumpad
          field={formData.isUsd ? 'amountUsd' : 'amountCrypto'}
          value={formData.isUsd ? formData.amountUsd : formData.amountCrypto}
          updateFormField={actions.updateFormField}
          setKeypadInput={actions.setKeypadInput}
          toggleKeypad={actions.toggleKeypad}
          onPress={this.handleAmountChange}
          purpose={KEYPAD_PURPOSES.INTEREST_CALCULATOR}
        />
      </View>
    )
  }
}

export default InterestCalculator
