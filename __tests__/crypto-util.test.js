import cryptoUtil from "../app/utils/crypto-util";

describe("Crypto Utils - providing link for currency", () => {
  test("provideLink", () => {
    const result = cryptoUtil.provideLink("BTC");
    expect(result).toBe("https://buy.moonpay.io/celsius");
  });
});

describe("Crypto Utils - isGreaterThan", () => {
  it("should be false", () => {
    const result = cryptoUtil.isGreaterThan("1.0", "2.0");
    expect(result).toBe(false);
  });

  it("should be equal", () => {
    const result = cryptoUtil.isGreaterThan("2.0", "2.0");
    expect(result).toBe(false);
  });

  it("should be greater", () => {
    const result = cryptoUtil.isGreaterThan("3.0", "2.0");
    expect(result).toBe(true);
  });
});
