import { getThemedStyle } from "../../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  buttonWrapper: {
    height: 50,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const LoanAlertsMarginCallLockAdditionalCoinModalStyle = () =>
  getThemedStyle(base, themed);

export default LoanAlertsMarginCallLockAdditionalCoinModalStyle;
