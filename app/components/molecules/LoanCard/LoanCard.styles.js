// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const CollateralLoanCardStyle = () => getThemedStyle(base, themed);

export default CollateralLoanCardStyle;
