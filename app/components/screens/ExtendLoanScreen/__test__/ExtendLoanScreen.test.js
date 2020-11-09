import React from "react"
import { shallow } from "enzyme"
import { TextInput } from "react-native";
import moment from "moment";
import {jestFunction, jestSpy} from "../../../../../__mocks__/setup";

import { ExtendLoanScreen } from "../ExtendLoanScreen"
import mockLoansStore from "../../../../../celsius-app-creds/mock-data/mockLoansStore";
import mockUserStore from "../../../../../celsius-app-creds/mock-data/mockUserStore";
import mockCurrenciesStore from "../../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import CircleButton from "../../../atoms/CircleButton/CircleButton";

const baseProps = {
  allLoans: mockLoansStore.allLoans.enimalnowlt3,
  bankAccountInfo: mockUserStore.bankAccountInfo.postman13,
  currencyRatesShort: mockCurrenciesStore.currencyRatesShort,
}
const updateFormFieldMock = jestFunction
const getParamMock = jestFunction.mockReturnValue(1096)
const  navigation = {
    getParam: getParamMock,
  }
const wrapper = shallow(
  <ExtendLoanScreen allLoans={baseProps.allLoans}
                    bankAccountInfo={baseProps.bankAccountInfo}
                    currencyRatesShort={baseProps.currencyRatesShort}
                    actions={{
                      updateFormField: updateFormFieldMock
                    }}
                    navigation={{
                      getParam: getParamMock
                    }}
  />)

describe(`ExtendLoanScreen`, () => {
  // #1
  it('onClickIncrement should increment value by one', () => {
    expect(wrapper.state("months")).toBe(6)
    expect(wrapper.find(CircleButton).length).toBe(2)

    wrapper.find(CircleButton).at(1).simulate("press")
    expect(wrapper.state("months")).toBe(7)
    expect(wrapper.find(TextInput).prop("children")).toBe(7)

    wrapper.find(CircleButton).at(1).simulate("press")
    expect(wrapper.state("months")).toBe(8)
    expect(wrapper.find(TextInput).prop("children")).toBe(8)

    wrapper.find(CircleButton).at(0).simulate("press")
    expect(wrapper.state("months")).toBe(7)
    expect(wrapper.find(TextInput).prop("children")).toBe(7)

    wrapper.find(CircleButton).at(0).simulate("press")
    expect(wrapper.state("months")).toBe(6)
    expect(wrapper.find(TextInput).prop("children")).toBe(6)

    wrapper.find(CircleButton).at(0).simulate("press")
    expect(wrapper.state("months")).toBe(6)
    expect(wrapper.find(TextInput).prop("children")).toBe(6)

    expect(wrapper.find(TextInput).length).toBe(1)
    expect(wrapper.find(TextInput).prop("children")).toBe(6)
  })
  // #2
  it("should call extendLoanIncrement method and return value increased by one", () => {
    const instance = wrapper.instance();
    const regularIncrementResult = instance.extendLoanIncrement(8)
    expect(regularIncrementResult).toBe(9)
    const maxIncrementResult = instance.extendLoanIncrement(36)
    expect(maxIncrementResult).toBe(36)
  })
  // #3
  it("onClickIncrement should increment value by one", () => {
    const instance = wrapper.instance();
    const spy = jestSpy(instance, 'extendLoanIncrement');
    instance.forceUpdate()

    const months = wrapper.state("months")
    expect(months).toBe(6)

    instance.onClickIncrement()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(months)
    expect(wrapper.state("months")).toBe(7)
  })

  it("should call extendLoanDecrement method and return value decreased by one", () => {
    const instance = wrapper.instance();
    const regularDecrementResult = instance.extendLoanDecrement(8)
    expect(regularDecrementResult).toBe(7)
    const minimumDecrementResult = instance.extendLoanDecrement(6)
    expect(minimumDecrementResult).toBe(6)
  })

  it("should calculate extended loan interest", () => {
    const instance = wrapper.instance();
    const interest = instance.extendLoanCalculateInterest(baseProps.allLoans[0], moment("2020-11-08T11:31:22.916"), 6)
    expect(interest).toStrictEqual({
      totalNewInterest: 297.6949315068493,
      monthlyInterest: 9.85582191780822,
      additionalInterest: 59.13493150684931
    })
  })
  it("should return desired loan", () => {
    const properties = {allLoans: baseProps.allLoans, navigation}
    const instance = wrapper.instance();
    const loan = instance.getLoan(properties);
    expect(loan).toStrictEqual(
    { id: 1096,
      amount_collateral_usd: '3000',
      amount_collateral_crypto: '0.32896051176957716',
      collateral_usd_rate: '9119.64',
      originating_date: '2020-06-05T00:00:00.000Z',
      loan_amount: '1500',
      coin: 'BTC',
      status: 'active',
      created_at: '2020-07-05T08:19:33.599Z',
      ltv: '0.5',
      interest: '0.0795',
      term_of_loan: 24,
      monthly_payment: '9.94',
      total_interest: '238.50',
      type: 'COIN_LOAN',
      user_id: '7bcd5ccb-0f01-4676-9fec-286b1637288a',
      loan_amount_usd: '1500',
      coin_loan_asset: 'GUSD',
      amortization_table: [
        { amountToPay: '9.94',
          balance: '1500',
          dueDate: '2020-07-05T00:00:00.000Z',
          status: 'DUE',
          type: 'monthly_interest',
          amountPaid: 0,
          amountLeftToPay: '9.94',
          isPaid: false },
        { amountToPay: '9.94',
          balance: '1500',
          dueDate: '2020-08-05T00:00:00.000Z',
          status: 'DUE',
          type: 'monthly_interest',
          amountPaid: 0,
          amountLeftToPay: '9.94',
          isPaid: false },
        { amountToPay: '9.94',
          balance: '1500',
          dueDate: '2020-09-05T00:00:00.000Z',
          status: 'DUE',
          type: 'monthly_interest',
          amountPaid: 0,
          amountLeftToPay: '9.94',
          isPaid: false },
        { amountToPay: '9.94',
          balance: '1500',
          dueDate: '2020-10-05T00:00:00.000Z',
          status: 'DUE',
          type: 'monthly_interest',
          amountPaid: 0,
          amountLeftToPay: '9.94',
          isPaid: false },
        { amountToPay: '9.94',
          balance: '1500',
          dueDate: '2020-11-05T00:00:00.000Z',
          status: 'DUE',
          type: 'monthly_interest',
          amountPaid: 0,
          amountLeftToPay: '9.94',
          isPaid: false },
        { amountToPay: '9.94',
          balance: '1500',
          dueDate: '2020-12-05T00:00:00.000Z',
          status: 'DUE',
          type: 'monthly_interest',
          amountPaid: 0,
          amountLeftToPay: '9.94',
          isPaid: false },
        { amountToPay: '9.94',
          balance: '1500',
          dueDate: '2021-01-05T00:00:00.000Z',
          status: 'DUE',
          type: 'monthly_interest',
          amountPaid: 0,
          amountLeftToPay: '9.94',
          isPaid: false },
        { amountToPay: '9.94',
          balance: '1500',
          dueDate: '2021-02-05T00:00:00.000Z',
          status: 'DUE',
          type: 'monthly_interest',
          amountPaid: 0,
          amountLeftToPay: '9.94',
          isPaid: false },
        { amountToPay: '9.94',
          balance: '1500',
          dueDate: '2021-03-05T00:00:00.000Z',
          status: 'DUE',
          type: 'monthly_interest',
          amountPaid: 0,
          amountLeftToPay: '9.94',
          isPaid: false },
        { amountToPay: '9.94',
          balance: '1500',
          dueDate: '2021-04-05T00:00:00.000Z',
          status: 'DUE',
          type: 'monthly_interest',
          amountPaid: 0,
          amountLeftToPay: '9.94',
          isPaid: false },
        { amountToPay: '9.94',
          balance: '1500',
          dueDate: '2021-05-05T00:00:00.000Z',
          status: 'DUE',
          type: 'monthly_interest',
          amountPaid: 0,
          amountLeftToPay: '9.94',
          isPaid: false },
        { amountToPay: '9.94',
          balance: '1500',
          dueDate: '2021-06-05T00:00:00.000Z',
          status: 'DUE',
          type: 'monthly_interest',
          amountPaid: 0,
          amountLeftToPay: '9.94',
          isPaid: false },
        { amountToPay: '9.94',
          balance: '1500',
          dueDate: '2021-07-05T00:00:00.000Z',
          status: 'DUE',
          type: 'monthly_interest',
          amountPaid: 0,
          amountLeftToPay: '9.94',
          isPaid: false },
        { amountToPay: '9.94',
          balance: '1500',
          dueDate: '2021-08-05T00:00:00.000Z',
          status: 'DUE',
          type: 'monthly_interest',
          amountPaid: 0,
          amountLeftToPay: '9.94',
          isPaid: false },
        { amountToPay: '9.94',
          balance: '1500',
          dueDate: '2021-09-05T00:00:00.000Z',
          status: 'DUE',
          type: 'monthly_interest',
          amountPaid: 0,
          amountLeftToPay: '9.94',
          isPaid: false },
        { amountToPay: '9.94',
          balance: '1500',
          dueDate: '2021-10-05T00:00:00.000Z',
          status: 'DUE',
          type: 'monthly_interest',
          amountPaid: 0,
          amountLeftToPay: '9.94',
          isPaid: false },
        { amountToPay: '9.94',
          balance: '1500',
          dueDate: '2021-11-05T00:00:00.000Z',
          status: 'DUE',
          type: 'monthly_interest',
          amountPaid: 0,
          amountLeftToPay: '9.94',
          isPaid: false },
        { amountToPay: '9.94',
          balance: '1500',
          dueDate: '2021-12-05T00:00:00.000Z',
          status: 'DUE',
          type: 'monthly_interest',
          amountPaid: 0,
          amountLeftToPay: '9.94',
          isPaid: false },
        { amountToPay: '9.94',
          balance: '1500',
          dueDate: '2022-01-05T00:00:00.000Z',
          status: 'DUE',
          type: 'monthly_interest',
          amountPaid: 0,
          amountLeftToPay: '9.94',
          isPaid: false },
        { amountToPay: '9.94',
          balance: '1500',
          dueDate: '2022-02-05T00:00:00.000Z',
          status: 'DUE',
          type: 'monthly_interest',
          amountPaid: 0,
          amountLeftToPay: '9.94',
          isPaid: false },
        { amountToPay: '9.94',
          balance: '1500',
          dueDate: '2022-03-05T00:00:00.000Z',
          status: 'DUE',
          type: 'monthly_interest',
          amountPaid: 0,
          amountLeftToPay: '9.94',
          isPaid: false },
        { amountToPay: '9.94',
          balance: '1500',
          dueDate: '2022-04-05T00:00:00.000Z',
          status: 'DUE',
          type: 'monthly_interest',
          amountPaid: 0,
          amountLeftToPay: '9.94',
          isPaid: false },
        { amountToPay: '9.94',
          balance: '1500',
          dueDate: '2022-05-05T00:00:00.000Z',
          status: 'DUE',
          type: 'monthly_interest',
          amountPaid: 0,
          amountLeftToPay: '9.94',
          isPaid: false },
        { amountToPay: '9.94',
          balance: '1500',
          dueDate: '2022-06-05T00:00:00.000Z',
          status: 'DUE',
          type: 'monthly_interest',
          amountPaid: 0,
          amountLeftToPay: '9.94',
          isPaid: false },
        { amountToPay: '1500',
          balance: '0',
          dueDate: '2022-06-05T00:00:00.000Z',
          status: 'DUE',
          type: 'receiving_principal_back',
          amountPaid: 0,
          isPaid: false }
      ],
      can_pay_interest: true,
      can_pay_principal: false,
      payments: [{ amount: '-1500',
        usd_value: '-1500',
        discounted_amount: '0',
        id: 'ad1440e7-27aa-4476-9aac-01667f5b41f0',
        balance_entry_id: 'c73a4ba1-7885-4e0b-aa72-216fbd0ef3ea',
        loan_id: 'cbb5bd9b-8475-47c1-b993-dc1fa334a987',
        asset_short: 'GUSD',
        payment_date: '2020-07-05T08:58:52.614Z',
        loyalty_tier: null,
        from_address: null,
        to_address: null,
        bank_confirmation_details: null,
        payment_proof_attachment: null,
        tx_hash: null,
        type: 'principal',
        source: 'backoffice',
        pending: false,
        created_at: '2020-07-05T08:58:52.614Z',
        updated_at: '2020-07-05T08:58:53.908Z',
        deleted_at: null },
        { amount: '-238.49999999999999805',
          usd_value: '-238.5',
          discounted_amount: '0',
          id: 'd1e2e419-a0e3-4775-ba29-b262c0bcb057',
          balance_entry_id: null,
          loan_id: 'cbb5bd9b-8475-47c1-b993-dc1fa334a987',
          asset_short: 'USD',
          payment_date: '2020-07-05T08:20:46.316Z',
          loyalty_tier: null,
          from_address: null,
          to_address: null,
          bank_confirmation_details: null,
          payment_proof_attachment: null,
          tx_hash: null,
          type: 'interest',
          source: 'automatic',
          pending: false,
          created_at: '2020-07-05T08:20:46.522Z',
          updated_at: '2020-07-05T08:20:46.523Z',
          deleted_at: null },
        { amount: '0.32896051176957716',
          usd_value: '3000',
          discounted_amount: '0',
          id: '98ae2079-75c8-46b2-ada7-a844ebf51087',
          balance_entry_id: '157c33ca-35e1-4512-861d-700ae7f5d1ec',
          loan_id: 'cbb5bd9b-8475-47c1-b993-dc1fa334a987',
          asset_short: 'BTC',
          payment_date: '2020-07-05T08:19:33.626Z',
          loyalty_tier: null,
          from_address: null,
          to_address: null,
          bank_confirmation_details: null,
          payment_proof_attachment: null,
          tx_hash: null,
          type: 'collateral',
          source: 'app',
          pending: false,
          created_at: '2020-07-05T08:19:33.858Z',
          updated_at: '2020-07-05T08:20:46.482Z',
          deleted_at: null }],
      max_possible_prepayment_period: 12,
      margin_call_price: '7015.0968276127378290775024196268',
      liquidation_call_price: '5699.7661724353494861486751480067',
      margin_call_activated: false,
      actions_required: [],
      maturity_date: '2022-07-05T00:00:00.000Z',
      approved_at: '2020-07-05T08:20:46.316Z',
      activated_at: '2020-07-05T08:58:52.613Z',
      total_interest_paid: '0.00',
      canceled_at: '1970-01-01T00:00:00.000Z',
      rejected_at: '1970-01-01T00:00:00.000Z',
      refinanced_at: '1970-01-01T00:00:00.000Z',
      transaction_id: '157c33ca-35e1-4512-861d-700ae7f5d1ec',
      loanPaymentSettings: { interest_payment_asset: 'GUSD',
        principal_payment_asset: 'GUSD',
        automatic_interest_payment: true,
        payout_principal_from_collateral: false },
      installments_to_be_paid: {
      installments:  [{
        "amount": "9.94",
           "from": "2020-06-05",
              "to": "2020-07-04", },],
       total: "9.94",
        },
      uiProps: {
        displayAmount: '1,500 GUSD',
        color: '#4156A6',
        displayText: 'Active Loan',
        collateral: 'Collateral:'
        },
      uiSections: [
        'initiation:date',
        'collateral',
        'term',
        'annualInterest',
        'marginCall',
        'liquidation',
        'nextInterest',
        'maturity' ],
      hasInterestPaymentFinished: false,
      isPrincipalPaid: false,
      maxPossiblePrepaymentPeriod: 12,
      canPrepayInterest: true,
    })
  })
})
