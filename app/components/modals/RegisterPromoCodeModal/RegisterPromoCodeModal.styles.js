// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
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

  celsius: {},
};

const RegisterPromoCodeModalStyle = () => getThemedStyle(base, themed);

export default RegisterPromoCodeModalStyle;
