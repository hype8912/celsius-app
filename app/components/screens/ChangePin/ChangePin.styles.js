import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const ChangePinStyle = () => getThemedStyle(base, themed);

export default ChangePinStyle;
