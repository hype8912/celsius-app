import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const BadgeSelectorStyle = () => getThemedStyle(base, themed);

export default BadgeSelectorStyle;
