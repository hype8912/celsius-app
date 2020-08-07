import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    borderRadius: 5,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const BadgeStyle = () => getThemedStyle(base, themed);

export default BadgeStyle;
