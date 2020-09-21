import _ from "lodash";
import cryptoUtil, { getBlockExplorerLink } from "./crypto-util";
import store from "../../redux/store";
import mockComplianceStore from "../../../celsius-app-creds/mock-data/mockComplianceStore";

import {
  BLOCKEXPLORER_NAME,
  BLOCKEXPLORERS,
  ERC_20_COINS,
  LINKS_FOR_COINS,
} from "../../constants/DATA";
import mockCurrenciesStore from "../../../celsius-app-creds/mock-data/mockCurrenciesStore";

/* eslint-disable no-undef */
jest.mock("../../redux/store", () => ({
  /* eslint-disable no-undef */
  getState: jest.fn(),
}));

let mockState;
store.getState = () => mockState;

const initialState = {
  compliance: mockComplianceStore.allowedAll,
};

beforeEach(() => {
  mockState = _.cloneDeep(initialState);
});
afterEach(() => {
  mockState = _.cloneDeep(initialState);
});

const allCoinsMock = mockCurrenciesStore.rates.map(c => {
  return c.short.toLowerCase();
});
const simplex = mockComplianceStore.allowedAll.simplex.coins;
const gem = mockComplianceStore.allowedAll.gem.coins;
const eligibleToBuyCoins = [...new Set([...simplex, ...gem])];
const notEligibleToBuyCoins = _.differenceWith(
  allCoinsMock.map(c => c.toLowerCase()),
  eligibleToBuyCoins,
  _.isEqual
);

const nonErc20Coins = _.differenceWith(
  allCoinsMock,
  Object.values(ERC_20_COINS),
  _.isEqual
);
describe("isERC20()", () => {
  it(`should return true if coin is ERC20`, () => {
    Object.values(ERC_20_COINS).forEach(c => {
      expect(cryptoUtil.isERC20(c)).toBeTruthy();
    });
  });

  it(`should return false if coin is not ERC20`, () => {
    nonErc20Coins.forEach(c => {
      expect(cryptoUtil.isERC20(c)).toBeFalsy();
    });
  });
});

describe("buyInApp()", () => {
  it(`should return true is coin is in simplex or gem compliance`, () => {
    eligibleToBuyCoins.forEach(c => {
      expect(cryptoUtil.buyInApp(c)).toBeTruthy();
    });
  });

  it(`should return false if coin is not in simplex or gem compliance`, () => {
    notEligibleToBuyCoins.forEach(c => {
      expect(cryptoUtil.buyInApp(c)).toBeFalsy();
    });
  });
});

describe("provideLink()", () => {
  it(`it should return link to buy coin`, () => {
    Object.keys(LINKS_FOR_COINS)
      .filter(c => notEligibleToBuyCoins.includes(c))
      .forEach(c => {
        expect(cryptoUtil.provideLink(c)).toBe(LINKS_FOR_COINS[`${c}`]);
      });
  });

  it(`should return null as default value`, () => {
    expect(cryptoUtil.provideLink()).toBeNull();
  });
});

let coinForText;
describe("provideText()", () => {
  beforeEach(() => {
    coinForText = null;
  });
  it(`should return string Buy coin in App"`, () => {
    coinForText = ["BTC", "BCH", "ETH", "LTC", "XRP", "CEL", "XLM"];
    coinForText.forEach(c => {
      expect(cryptoUtil.provideText(c)).toBe(`Buy ${c} in App`);
    });
  });

  it(`should return string "Buy TUSD"`, () => {
    coinForText = "TUSD";
    expect(cryptoUtil.provideText(coinForText)).toBe(
      `Buy ${coinForText} from TrustToken`
    );
  });

  it(`should return string "Buy USDC"`, () => {
    coinForText = "USDC";
    expect(cryptoUtil.provideText(coinForText)).toBe(
      `Buy ${coinForText} from Circle`
    );
  });

  it(`should return string "Buy PAX"`, () => {
    coinForText = "PAX";
    expect(cryptoUtil.provideText(coinForText)).toBe(
      `Buy ${coinForText} from Paxos`
    );
  });

  it(`should return string "Buy PAX"`, () => {
    coinForText = ["THKD", "TCAD", "TAUD", "TGBP"];
    coinForText.forEach(c => {
      expect(cryptoUtil.provideText(c)).toBe(`Buy ${c} from TrustToken`);
    });
  });

  it(`should return string "Buy DASH"`, () => {
    coinForText = "DASH";
    expect(cryptoUtil.provideText(coinForText)).toBe(`Buy ${coinForText}`);
  });

  it(`should return string "Buy OMG"`, () => {
    coinForText = "OMG";
    expect(cryptoUtil.provideText(coinForText)).toBe(
      `Buy ${coinForText} on MoonPay`
    );
  });

  it(`should return string "Buy DAI"`, () => {
    coinForText = "DAI";
    expect(cryptoUtil.provideText(coinForText)).toBe(
      `Buy ${coinForText} on MoonPay`
    );
  });

  it(`should return null se default value`, () => {
    expect(cryptoUtil.provideText()).toBeNull();
  });
});

let transaction = {};
describe("getBlockExplorerLink()", () => {
  beforeEach(() => {
    transaction = {};
  });

  it("should return transaction link and blockexplorer name in string", () => {
    allCoinsMock
      .filter(e => e.includes(ERC_20_COINS))
      .forEach(c => {
        transaction.transaction_id = "test_id";
        transaction.coin = c;

        expect(getBlockExplorerLink(transaction)).toStrictEqual({
          link:
            BLOCKEXPLORERS[`${c.toLowerCase()}`] &&
            `${BLOCKEXPLORERS[`${c.toLowerCase()}`]}${
              transaction.transaction_id
            }`,
          text: BLOCKEXPLORER_NAME.ERC20,
        });
      });
  });

  it("should return null as default case", () => {
    expect(getBlockExplorerLink("")).toBeNull();
  });
});
