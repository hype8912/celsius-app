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

const BiometricAuthenticationStyle = () => getThemedStyle(base, themed);

export default BiometricAuthenticationStyle;
