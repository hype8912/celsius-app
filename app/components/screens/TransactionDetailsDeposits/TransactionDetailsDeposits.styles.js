import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const TransactionDetailsDepositsStyle = () => getThemedStyle(base, themed);

export default TransactionDetailsDepositsStyle;
