import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  qrWrapper: {
    marginTop: 15,
    marginBottom: 10,
    padding: 10,
    backgroundColor: COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND,
    borderRadius: 6,
  },
  separatorWrapper: {
    paddingVertical: 15,
    width: "100%",
  },
  secretText: {
    color: COLOR_KEYS.BANNER_INFO,
    marginTop: 15,
    maxWidth: "70%",
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const TwoFactorSettingsStyle = () => getThemedStyle(base, themed);

export default TwoFactorSettingsStyle;
