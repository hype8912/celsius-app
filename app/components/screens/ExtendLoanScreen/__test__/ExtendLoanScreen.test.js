import React from "react";
import { shallow } from "enzyme"

import ExtendLoanScreen from "../ExtendLoanScreen";

describe("extendLoanIncrement()", () => {
  it("should increment number by one", () => {
    const wrapper = shallow(<ExtendLoanScreen />);
    const result =  wrapper.inc(2)
    expect(result).toEqual(3)
  })
})


describe("extendLoanCalculateInterest", () => {
  it("should return total new interest, monthly interest, additional interest", () => {
    const wrapper = shallow(<ExtendLoanScreen />);
    const result = wrapper.extendLoanIncrement()
    expect(result).toEqual()
  })
})
