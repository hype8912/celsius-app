import { getThemedStyle } from "../../../utils/styles-util";

const base = {};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const CancelLoanStyle = () => getThemedStyle(base, themed);

export default CancelLoanStyle;
