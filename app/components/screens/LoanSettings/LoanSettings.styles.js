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

const LoanSettingsStyle = () => getThemedStyle(base, themed);

export default LoanSettingsStyle;
