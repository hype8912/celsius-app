import cryptoUtil from "../app/utils/crypto-util";

describe("Crypto Utils - providing link for currency", () => {
  test("provideLink", () => {
    const result = cryptoUtil.provideLink("BTC");
    expect(result).toBe("https://buy.moonpay.io/celsius");
  });
});
