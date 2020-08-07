import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    paddingHorizontal: 20,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const BalanceHistoryStyle = () => getThemedStyle(base, themed);

export default BalanceHistoryStyle;
