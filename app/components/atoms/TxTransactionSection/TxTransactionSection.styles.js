import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  content: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10,
  },
  text: { paddingBottom: 10 },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const TransactionSectionStyle = () => getThemedStyle(base, themed);

export default TransactionSectionStyle;
