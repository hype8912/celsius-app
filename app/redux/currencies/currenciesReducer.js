import ACTIONS from "../../constants/ACTIONS";
import formatter from "../../utils/formatter";

/**
 * TODO make it a function add JSDoc & desc for return
 */
const initialState = {
  rates: undefined,
  graphs: undefined,
  currencyRatesShort: undefined,
};

export default function currenciesReducer(state = initialState, action) {
  const currencyRatesShort = {};

  switch (action.type) {
    case ACTIONS.GET_CURRENCY_RATES_SUCCESS:
      action.rates.forEach(sc => {
        currencyRatesShort[sc.short.toLowerCase()] = sc.market_quotes_usd.price;
      });

      return {
        ...state,
        rates: action.rates.map(mapRates),
        currencyRatesShort,
      };
    case ACTIONS.GET_CURRENCY_GRAPHS_SUCCESS:
      return {
        ...state,
        graphs: action.graphs,
      };

    default:
      return { ...state };
  }
}

function mapRates(rate) {
  return {
    ...rate,
    displayName: formatter.capitalize(rate.name),
  };
}
