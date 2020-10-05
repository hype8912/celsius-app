import BigNumber from "bignumber.js";
import _ from "lodash";
import walletUtil from "./wallet-util";
import mockWalletStore from "../../../celsius-app-creds/mock-data/mockWalletStore";

const walletSummary = mockWalletStore.summary;
describe("mapWalletSummary()", () => {
  it("should return true if daily_diff is BigNumber", () => {
    expect(
      walletUtil.mapWalletSummary(walletSummary.postman13).daily_diff instanceof
        BigNumber
    ).toBeTruthy();
  });

  it("should return true if total_amount_usd is BigNumber", () => {
    expect(
      walletUtil.mapWalletSummary(walletSummary.postman13)
        .total_amount_usd instanceof BigNumber
    ).toBeTruthy();
  });

  it("should return true if total_interest_earned is BigNumber", () => {
    expect(
      walletUtil.mapWalletSummary(walletSummary.postman13)
        .total_interest_earned instanceof BigNumber
    ).toBeTruthy();
  });

  it("should return true if amount in coins array is BigNumber", () => {
    walletUtil.mapWalletSummary(walletSummary.postman13).coins.forEach(c => {
      expect(c.amount instanceof BigNumber).toBeTruthy();
    });
  });

  it("should return true if amount_usd in coins array is BigNumber", () => {
    walletUtil.mapWalletSummary(walletSummary.postman13).coins.forEach(c => {
      expect(c.amount_usd instanceof BigNumber).toBeTruthy();
    });
  });

  it("should return true if interest_earned in coins array is BigNumber", () => {
    walletUtil.mapWalletSummary(walletSummary.postman13).coins.forEach(c => {
      expect(c.interest_earned instanceof BigNumber).toBeTruthy();
    });
  });

  it("should return true if interest_earned_cel in coins array is BigNumber", () => {
    walletUtil.mapWalletSummary(walletSummary.postman13).coins.forEach(c => {
      expect(c.interest_earned_cel instanceof BigNumber).toBeTruthy();
    });
  });

  it("should return true if interest_earned_usd in coins array is BigNumber", () => {
    walletUtil.mapWalletSummary(walletSummary.postman13).coins.forEach(c => {
      expect(c.interest_earned_usd instanceof BigNumber).toBeTruthy();
    });
  });

  it("should return true if it contains coins array", () => {
    expect(
      walletUtil.mapWalletSummary(walletSummary.postman13).coins instanceof
        Array
    ).toBeTruthy();
  });

  it("should return true if walletSummary returns all required keys", () => {
    expect(
      _.isEqual(
        _.sortBy(
          Object.keys(walletUtil.mapWalletSummary(walletSummary.postman13))
        ),
        _.sortBy([
          "coins",
          "daily_diff",
          "total_amount_usd",
          "total_interest_earned",
        ])
      )
    ).toBeTruthy();
  });

  it("should contain coins array", () => {
    expect(
      walletUtil.mapWalletSummary(walletSummary.postman13).coins instanceof
        Array
    ).toBeTruthy();
  });
});
