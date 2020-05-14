import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    flex: 1,
    padding: 20,
    paddingBottom: 84,
    backgroundColor: STYLES.COLORS.LIGHT_GRAY,
  },
  header: {
    flex: 0.3,
    justifyContent: "flex-start",
    paddingBottom: 5,
  },
  buttons: {
    paddingHorizontal: 10,
    flex: 0.55,
    justifyContent: "center",
  },
  footer: {
    paddingTop: 5,
    flex: 0.15,
    justifyContent: "flex-end",
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const LoginButtonStyle = () => getThemedStyle(base, themed);

export default LoginButtonStyle;
