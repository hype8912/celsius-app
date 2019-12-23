// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flex: 1,
    backgroundColor: STYLES.COLORS.CELSIUS_BLUE,
    padding: 12,
  },
  buttonWrapper: {
    alignItems: "flex-start",
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const LoanCardStyle = () => getThemedStyle(base, themed);

export default LoanCardStyle;
