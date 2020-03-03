import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View } from 'react-native'


import * as appActions from '../../../redux/actions'
import CelText from '../../atoms/CelText/CelText'
import RegularLayout from '../../layouts/RegularLayout/RegularLayout'
import CelButton from '../../atoms/CelButton/CelButton'
import ProgressBar from '../../atoms/ProgressBar/ProgressBar'
import CelInput from '../../atoms/CelInput/CelInput'
import CelSelect from '../../molecules/CelSelect/CelSelect'
import { BANK_ACCOUNT_TYPE } from '../../../constants/DATA'

@connect(
  state => ({
    userProfile: state.user.profile,
    formData: state.forms.formData,
    formErrors: state.forms.formErrors,
    bankAccountInfo: state.user.bankAccountInfo
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BorrowBankAccount extends Component {
  static navigationOptions = () => ({
    title: 'Link bank account'
  })

  constructor (props) {
    super(props)

    this.state = {
      isLoading: false
    }
  }

  componentDidMount () {
    const { actions, userProfile } = this.props
    actions.updateFormField('bank_location', { name: userProfile.country })
  }

  linkBankAccount = async () => {
    const { actions, formData } = this.props
    const isAmerican = this.isAmerican()

    const bankAccountInfo = {
      bank_name: formData.bank_name,
      bank_routing_number: formData.bank_routing_number,
      account_type: formData.selectedAccountType,
      bank_account_number: formData.bank_account_number,
      swift: formData.swift,
      iban: formData.iban,
      location: formData.bank_location.name
    }

    if (isAmerican) {
      delete bankAccountInfo.swift
      delete bankAccountInfo.iban
    } else {
      delete bankAccountInfo.bank_account_number
      delete bankAccountInfo.bank_routing_number
    }

    this.setState({ isLoading: true })
    await actions.linkBankAccount(bankAccountInfo)
    this.setState({ isLoading: false })
  }

  isAmerican = () => {
    const { formData } = this.props
    return (
      formData.bank_location && formData.bank_location.name === 'United States'
    )
  }

  render () {
    const { isLoading } = this.state
    const { formData, formErrors } = this.props
    const isAmerican = this.isAmerican()

    return (
      <RegularLayout>
        <View style={{ alignItems: 'center' }}>
          <ProgressBar steps={6} currentStep={5} />
        </View>
        <CelText
          weight='300'
          type='H4'
          margin={'30 0 30 0'}
          style={{ alignSelf: 'flex-start' }}
        >
          Provide us with your bank account details:
        </CelText>

        <CelSelect
          type='country'
          field='bank_location'
          labelText='Bank Location'
          showCountryFlag
          hideCallingCodes
          value={formData.bank_location}
          error={formErrors.bank_location}
        />

        <CelInput
          placeholder='Bank name'
          field={'bank_name'}
          value={formData.bank_name}
          error={formErrors.bank_name}
          returnKeyType={'next'}
          blurOnSubmiting={false}
          onSubmitEditing={() => {
            if (isAmerican) {
              this.bank_account_number.focus()
            } else {
              this.iban.focus()
            }
          }}
        />

        {isAmerican ? (
          <>
            <CelInput
              placeholder='Account Number'
              field={'bank_account_number'}
              value={formData.bank_account_number}
              error={formErrors.bank_account_number}
              returnKeyType={'next'}
              blurOnSubmiting={false}
              refs={input => {
                this.bank_account_number = input
              }}
              onSubmitEditing={() => {
                this.bank_routing_number.focus()
              }}
            />

            <CelInput
              placeholder='ABA (Routing Number)'
              field={'bank_routing_number'}
              value={formData.bank_routing_number}
              error={formErrors.bank_routing_number}
              returnKeyType={'next'}
              blurOnSubmiting={false}
              refs={input => {
                this.bank_routing_number = input
              }}
            />
          </>
        ) : (
          <>
            <CelInput
              placeholder='Account Number (IBAN)'
              field={'iban'}
              value={formData.iban}
              error={formErrors.iban}
              returnKeyType={'next'}
              blurOnSubmiting={false}
              refs={input => {
                this.iban = input
              }}
              onSubmitEditing={() => {
                this.swift.focus()
              }}
            />

            <CelInput
              placeholder='SWIFT (Bank Identifier Code)'
              field={'swift'}
              value={formData.swift}
              error={formErrors.swift}
              returnKeyType={'next'}
              blurOnSubmiting={false}
              refs={input => {
                this.swift = input
              }}
            />
          </>
        )}

        <CelText
          weight='300'
          type='H4'
          style={{ alignSelf: 'flex-start' }}
          margin={'0 0 10 0'}
        >
          Account type:
        </CelText>

        <CelSelect
          items={BANK_ACCOUNT_TYPE}
          field={'selectedAccountType'}
          labelText={'Account type'}
          value={formData.selectedAccountType}
          error={formErrors.selectedAccountType}
        />

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <CelButton
            iconRight='IconArrowRight'
            onPress={this.linkBankAccount}
            loading={isLoading}
          >
            Confirm your loan
          </CelButton>
        </View>
      </RegularLayout>
    )
  }
}

export default BorrowBankAccount
