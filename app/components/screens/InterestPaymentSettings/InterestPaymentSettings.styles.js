import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  spinner: { alignItems: "center", justifyContent: "center" },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const InterestPaymentSettingsStyle = () => getThemedStyle(base, themed);

export default InterestPaymentSettingsStyle;
