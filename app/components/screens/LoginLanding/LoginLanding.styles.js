import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    justifyContent: "space-between",
    height: "100%",
  },
  header: {
    justifyContent: "flex-start",
    paddingBottom: 5,
    height: 120,
  },
  buttons: {
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  footer: {
    paddingTop: 5,
    justifyContent: "flex-end",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const LoginButtonStyle = () => getThemedStyle(base, themed);

export default LoginButtonStyle;
