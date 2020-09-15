import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  coinImage: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const CoinListCardStyle = () => getThemedStyle(base, themed);

export default CoinListCardStyle;
