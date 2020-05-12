import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    flex: 1,
    padding: 12,
    paddingBottom: 50,
    backgroundColor: STYLES.COLORS.LIGHT_GRAY,
  },
  header: {
    flex: 0.3,
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  buttons: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    flex: 0.55,
    justifyContent: "center",
  },
  footer: {
    flex: 0.15,
    justifyContent: "flex-end",
    marginTop: 10,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const LoginButtonStyle = () => getThemedStyle(base, themed);

export default LoginButtonStyle;
