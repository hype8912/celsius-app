// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flex: 1,
  },
  qrWrapper: {
    marginTop: 15,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 6,
  },
  separatorWrapper: {
    paddingVertical: 15,
    width: "100%",
  },
  secretText: {
    color: STYLES.COLORS.CELSIUS,
    textDecorationLine: "underline",
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

  celsius: {},
};

const TwoFactorSettingsStyle = () => getThemedStyle(base, themed);

export default TwoFactorSettingsStyle;
