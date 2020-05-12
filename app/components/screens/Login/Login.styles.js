// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    justifyContent: "space-between",
    height: "100%",
  },
  form: {
    justifyContent: "flex-start",
  },
  bottom: {
    justifyContent: "flex-end",
  },
  forgotPassword: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 40,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const LoginStyle = () => getThemedStyle(base, themed);

export default LoginStyle;
