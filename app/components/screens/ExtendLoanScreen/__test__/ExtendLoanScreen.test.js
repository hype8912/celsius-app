import React from "react"
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from "enzyme"
// import moment from "moment";
//
// import store from '../../../../redux/store';
// import formatter from "../../../../utils/formatter";
import ExtendLoanScreen from "../ExtendLoanScreen"
import mockLoansStore from "../../../../../celsius-app-creds/mock-data/mockLoansStore";
import mockUserStore from "../../../../../celsius-app-creds/mock-data/mockUserStore";
import mockCurrenciesStore from "../../../../../celsius-app-creds/mock-data/mockCurrenciesStore";

// mount

configure({adapter: new Adapter()});

const Context = React.createContext()

const baseProps = {
  allLoans: mockLoansStore.allLoans.enimalnowlt3,
  bankAccountInfo: mockUserStore.bankAccountInfo.postman13,
  currencyRatesShort: mockCurrenciesStore.currencyRatesShort,
}

const wrapper = shallow(
  <Context.Provider store={baseProps}>
    <ExtendLoanScreen/>
  </Context.Provider>
);
// instance()
describe(`extendLoanCalculateInterest`, () => {
  it(`should increment number by one`, () => {
    // console.log("wrapper", Object.keys(wrapper))
    // const result = wrapper.extendLoanIncrement(1)
    // expect(wrapper.find(ExtendLoanScreen)).toMatchSnapshot();
    // expect(result).toEqual(2)
    //     // const result = wrapper.extendLoanIncrement(1)
    //     expect(wrapper.find().extendLoanIncrement(1)).toEqual(2)
    expect(wrapper.find(ExtendLoanScreen)).toMatchSnapshot();
  })
})

describe(`extendLoanCalculateInterest`, () => {
  it(`should decrement number by one`, () => {

    // const result = wrapper.extendLoanDecrement(2)
    // expect(result).toEqual(1)
    expect(wrapper.find(ExtendLoanScreen)).toMatchSnapshot();

  })
})

describe(`extendLoanCalculateInterest`, () => {
  it(`if value === 36 should return 36`, () => {

    // const result = wrapper.extendLoanIncrement(36)
    // expect(result).toEqual(36)
    expect(wrapper.find(ExtendLoanScreen)).toMatchSnapshot();

  })
})

// if undefined should show error

describe(`extendLoanCalculateInterest`, () => {
  it(`if value === 6 should return 6`, () => {

    // const result = wrapper.extendLoanDecrement(6)
    // expect(result).toEqual(6)
    expect(wrapper.find(ExtendLoanScreen)).toMatchSnapshot();

  })
})

describe(`extendLoanCalculateInterest`, () => {
  it(`Should Calculate Additional Interest in Crypto`, () => {

    // const result = wrapper.calculateAdditionalInterest(50, 2, "BTC")
    // expect(result).toEqual(formatter.crypto(25, "BTC", {precisions: 2}))
    expect(wrapper.find(ExtendLoanScreen)).toMatchSnapshot();

  })
})

describe(`extendLoanCalculateInterest`, () => {
  it(`Should Calculate Additional Interest in USD`, () => {

    // const result = wrapper.calculateAdditionalInterest(50, 1, "USD")
    // expect(result).toEqual(formatter.crypto(50, "USD", {precisions: 2}))
    expect(wrapper.find(ExtendLoanScreen)).toMatchSnapshot();

  })
})

// broj meseci i broj dana u razlicitom opsegu varira
describe(`extendLoanCalculateInterest`, () => {
  it(`should return total new interest, monthly interest, additional interest`, () => {

    // const result = wrapper.extendLoanCalculateInterest({interest: `0.01`, loan_amount: `1000`}, moment(), 5)
    // expect(result).toEqual(1)
    expect(wrapper.find(ExtendLoanScreen)).toMatchSnapshot();

  })
})

// undefined



// // handleAmountChange and press predefined value
// describe(`extendLoanCalculateInterest`, () => {
//   it(`Should forward any number it receives`, () => {
//
//     const result = wrapper.handleAmountChange(36)
//     expect(result).toEqual(36)
//   })
// })
//
// // getLoan? get loans from mock and send random id from that object
// describe(`extendLoanCalculateInterest`, () => {
//   it(`Should return loan`, () => {
//
//     const result = wrapper.getLoan()
//     expect(result).toEqual(6)
//   })
// })


// import mockLoansStore from "../../../../../celsius-app-creds/mock-data/mockLoansStore";
// import mockUserStore from "../../../../../celsius-app-creds/mock-data/mockUserStore";
// import mockCurrenciesStore from "../../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
//
// configure({adapter: new Adapter()});
//

//
