import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: { width: "100%" },
  percentage: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  amount: { flexDirection: "row", justifyContent: "space-around" },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const BasicCardSectionStyle = () => getThemedStyle(base, themed);

export default BasicCardSectionStyle;
