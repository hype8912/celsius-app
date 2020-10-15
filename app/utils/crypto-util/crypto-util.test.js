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
import { SCREENS } from "../../constants/SCREENS";

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

const simplexCoins = ["ETH", "BTC", "BCH", "LTC", "XRP", "XLM", "CEL", "XAUT"];
const gemCoins = ["ETH", "BTC", "DASH", "BCH", "USDC"];
const unsupportedCoins = ["TAUD", "THKD", "TCAD", "TGBP", "ORBS", "MATIC"];

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
  it(`should return true is coins is simplex compliance`, () => {
    simplex.forEach(c => {
      expect(cryptoUtil.buyInApp(c).simplex).toBeTruthy();
    });
  });

  it(`should return true is coin is in gem compliance`, () => {
    gem.forEach(c => {
      expect(cryptoUtil.buyInApp(c).gem).toBeTruthy();
    });
  });
});

describe("simplexOrGem()", () => {
  // const simplexOnly = ["LTC", "XRP", "CEL", "XAUT", "SGA"];
  const gemOnly = ["DASH", "USDC"];
  const both = ["BTC", "ETH", "BCH", "XLM"];
  // it("should return `GetCoinsEnterAmount` screen", () => {
  //   simplexOnly.forEach(c => {
  //     expect(cryptoUtil.simplexOrGem(c)).toBe(SCREENS.GET_COINS_ENTER_AMOUNT);
  //   });
  // });
  it("should return `GetCoinsGem` screen", () => {
    gemOnly.forEach(c => {
      expect(cryptoUtil.simplexOrGem(c)).toBe(SCREENS.GET_COINS_GEM);
    });
  });
  it("should return `GetCoinsLanding` screen", () => {
    both.forEach(c => {
      expect(cryptoUtil.simplexOrGem(c)).toBe(SCREENS.GET_COINS_LANDING);
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

describe("provideText()", () => {
  it("should return string `Buy {coin} Coins in App` for supported coins", () => {
    simplexCoins.forEach(c => {
      expect(cryptoUtil.provideText(c) === `Buy ${c} in App`).toBeTruthy();
    });
    gemCoins.forEach(c => {
      expect(cryptoUtil.provideText(c) === `Buy ${c} in App`).toBeTruthy();
    });
  });
  it("should return string `Buy Coins` for unsupported coins", () => {
    unsupportedCoins.forEach(c => {
      expect(cryptoUtil.provideText(c) === `Buy Coins`).toBeTruthy();
    });
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
