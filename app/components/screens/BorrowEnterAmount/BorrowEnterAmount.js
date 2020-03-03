import React, { Component } from 'react'
import { View, TouchableOpacity, Slider } from 'react-native'
// import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import * as appActions from '../../../redux/actions'
import BorrowEnterAmountStyle from './BorrowEnterAmount.styles'
import CelText from '../../atoms/CelText/CelText'
import CelButton from '../../atoms/CelButton/CelButton'
import RegularLayout from '../../layouts/RegularLayout/RegularLayout'
import CelNumpad from '../../molecules/CelNumpad/CelNumpad'
import ProgressBar from '../../atoms/ProgressBar/ProgressBar'
import { KEYPAD_PURPOSES } from '../../../constants/UI'
import formatter from '../../../utils/formatter'
import STYLES from '../../../constants/STYLES'
import PredefinedAmounts from '../../organisms/PredefinedAmounts/PredefinedAmounts'
import { getPadding } from '../../../utils/styles-util'
// import Card from '../../atoms/Card/Card'

@connect(
  state => ({
    loanCompliance: state.compliance.loan,
    formData: state.forms.formData,
    walletSummary: state.wallet.summary,
    minimumLoanAmount: state.generalData.minimumLoanAmount,
    keypadOpen: state.ui.isKeypadOpen
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BorrowEnterAmount extends Component {
  static propTypes = {}
  static defaultProps = {}

  static navigationOptions = () => ({
    title: 'Enter the loan amount'
  })

  constructor (props) {
    super(props)
    const { loanCompliance, walletSummary, minimumLoanAmount } = props
    const eligibleCoins = walletSummary.coins.filter(coinData =>
      loanCompliance.coins.includes(coinData.short)
    )

    this.state = {
      activePeriod: '',
      sliderValue: 12500
    }

    const maxAmount =
      eligibleCoins.reduce(
        (max, element) => (element.amount_usd > max ? element.amount_usd : max),
        0
      ) / 2

    props.actions.initForm({
      loanAmount: minimumLoanAmount.toString(),
      maxAmount
    })
  }

  onPressPredefinedAmount = ({ label, value }) => {
    const { formData, minimumLoanAmount, actions } = this.props
    let amount
    if (value === 'max') amount = formatter.floor10(formData.maxAmount, 0)
    if (value === 'min') amount = minimumLoanAmount.toString()
    this.handleAmountChange(amount, label)
    actions.toggleKeypad(false)
  }

  getAmountColor = () => {
    const { keypadOpen } = this.props

    if (keypadOpen) return STYLES.COLORS.CELSIUS_BLUE

    return STYLES.COLORS.DARK_GRAY
  }

  handleAmountChange = (newValue, predefined = '') => {
    const { actions, formData, minimumLoanAmount } = this.props
    
    if (newValue < minimumLoanAmount) {
      actions.showMessage(
        'warning',
        `$${minimumLoanAmount} is currently the minimum loan amount. Please adjust your loan amount to proceed.`
      )
    }

    if (newValue > formData.maxAmount) {
      return actions.showMessage('warning', 'Insufficient funds!')
    }

    actions.updateFormField('loanAmount', newValue)
    this.setState({ activePeriod: predefined })
  }

  renderButton () {
    const { formData, actions, minimumLoanAmount } = this.props

    if (Number(formData.loanAmount) > Number(formData.maxAmount)) {
      return (
        <CelButton
          onPress={() => {
            actions.navigateTo('Deposit')
            actions.toggleKeypad()
          }}
          margin='40 0 0 0'
        >
          Deposit more
        </CelButton>
      )
    }

    return (
      <CelButton
        disabled={Number(formData.loanAmount) < Number(minimumLoanAmount)}
        onPress={() => {
          actions.navigateTo('BorrowCollateral')
          actions.toggleKeypad()
        }}
        margin='20 0 0 0'
        iconRight='arrowRight'
      >
        Choose collateral
      </CelButton>
    )
  }

  render () {
    const { activePeriod, sliderValue } = this.state
    const {
      actions,
      formData,
      maxAmount,
      walletSummary,
      minimumLoanAmount
    } = this.props
    const predifinedAmount = [
      { label: `$${minimumLoanAmount} min`, value: 'min' },
      {
        label: `${formatter.floor10(formData.maxAmount, 0)} max`,
        value: 'max'
      }
    ]

    const style = BorrowEnterAmountStyle()

    if (maxAmount < minimumLoanAmount) {
      return (
        <RegularLayout fabType={'hide'}>
          <View style={style.amountsWrapper}>
            <View style={[style.value, { backgroundColor: 'white' }]}>
              <CelText type={'H6'} weight={'400'}>
                With coin value of:
              </CelText>
              <CelText type={'H2'} weight={'400'}>
                {formatter.usd(sliderValue, { precision: 0 })}
              </CelText>
            </View>
            <View style={[style.value, { backgroundColor: '#EEEEEE' }]}>
              <CelText type={'H6'} weight={'400'}>
                You can borrow:
              </CelText>
              <CelText type={'H2'} weight={'400'}>
                {formatter.usd(sliderValue / 2, { precision: 0 })}
              </CelText>
            </View>
          </View>

          <View style={style.slider}>
            <Slider
              minimumTrackTintColor={STYLES.COLORS.CELSIUS_BLUE}
              maximumTrackTintColor={STYLES.COLORS.DARK_GRAY_OPACITY}
              minimumValue={10000}
              maximumValue={20000}
              step={500}
              value={this.state.sliderValue}
              onValueChange={value => this.setState({ sliderValue: value })}
            />
          </View>
          <CelText
            margin={'20 0 20 0'}
            align={'center'}
            type={'H3'}
            weight={'600'}
          >{`To apply for a loan you only need ${formatter.usd(
              10000 - walletSummary.total_amount_usd
            )} in crypto to deposit`}</CelText>
          <CelText
            margin={'10 0 20 0'}
            align={'center'}
            type={'H4'}
            weight={'400'}
          >
            Deposit more coins to start your first loan application
          </CelText>

          <CelButton onPress={() => actions.navigateTo('Deposit')}>
            Deposit more coins
          </CelButton>
        </RegularLayout>
      )
    }

    return (
      <RegularLayout padding='0 0 0 0' fabType={'hide'}>
        <View
          style={[
            { flex: 1, width: '100%', height: '100%' },
            { ...getPadding('20 20 100 20') }
          ]}
        >
          <View style={{ paddingTop: 10, alignItems: 'center' }}>
            <ProgressBar steps={6} currentStep={1} />
            <CelText align='center' type='H4' margin='30 0 60 0'>
              How much would you like to borrow?
            </CelText>

            <View style={{ width: '100%' }}>
              <TouchableOpacity
                onPress={actions.toggleKeypad}
                style={{ width: '100%' }}
              >
                <CelText
                  color={this.getAmountColor()}
                  type='H1'
                  weight='regular'
                  align='center'
                >
                  {'$ '}
                  {formatter.usd(formData.loanAmount, {
                    code: '',
                    precision: 0
                  })}
                </CelText>
                <View
                  style={{
                    position: 'absolute',
                    right: 0,
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <CelText color='gray' type='H3'>
                    USD
                  </CelText>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <PredefinedAmounts
            data={predifinedAmount}
            onSelect={this.onPressPredefinedAmount}
            activePeriod={activePeriod}
          />

          {/* <Card margin='20 0 5 0'>
            <CelText type="H6" color='gray' >
              The max amount is based on your wallet balance.
            </CelText>
          </Card> */}

          {this.renderButton()}

          <CelNumpad
            field={'loanAmount'}
            value={formData.loanAmount || ''}
            updateFormField={actions.updateFormField}
            setKeypadInput={actions.setKeypadInput}
            toggleKeypad={actions.toggleKeypad}
            onPress={this.handleAmountChange}
            purpose={KEYPAD_PURPOSES.BORROW}
          />
        </View>
      </RegularLayout>
    )
  }
}

export default BorrowEnterAmount
