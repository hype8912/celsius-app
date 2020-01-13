// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  heading: {
    paddingBottom: 20,
    paddingTop: 20,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const TermsOfUseStyle = () => getThemedStyle(base, themed);

export default TermsOfUseStyle;
