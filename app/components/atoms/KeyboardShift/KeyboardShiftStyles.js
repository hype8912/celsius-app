import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    width: "100%",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const KeyboardShiftStyle = () => getThemedStyle(base, themed);

export default KeyboardShiftStyle;
