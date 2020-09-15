import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  inputCel: {
    borderRadius: 10,
    flex: 1,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const HodlDeactivationCodeStyle = () => getThemedStyle(base, themed);

export default HodlDeactivationCodeStyle;
