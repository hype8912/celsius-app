import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const BasicSectionStyle = () => getThemedStyle(base, themed);

export default BasicSectionStyle;
