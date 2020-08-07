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

const BorrowBankAccountStyle = () => getThemedStyle(base, themed);

export default BorrowBankAccountStyle;
