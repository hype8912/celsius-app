import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  dontShowStyle: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  buttonsStyle: {
    justifyContent: "flex-end",
    marginTop: 5,
    height: 50,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const LoanAdvertiseModalStyle = () => getThemedStyle(base, themed);

export default LoanAdvertiseModalStyle;
