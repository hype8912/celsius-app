import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  cardWrapper: {
    marginHorizontal: 15,
    marginBottom: 15,
  },
  inputWrapper: {
    marginLeft: 25,
    marginRight: 25,
  },
  buttonWrapper: {
    height: 50,
    flexDirection: "row",
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const RegisterPromoCodeModalStyle = () => getThemedStyle(base, themed);

export default RegisterPromoCodeModalStyle;
