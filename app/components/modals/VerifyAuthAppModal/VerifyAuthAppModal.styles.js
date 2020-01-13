// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const VerifyAuthAppModalStyle = () => getThemedStyle(base, themed);

export default VerifyAuthAppModalStyle;
