// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flex: 1,
  },
  installmentsWrapper: {
    borderRadius: 5,
    padding: 10,
    margin: 10,
    backgroundColor: STYLES.COLORS.LIGHT_GRAY,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const LoanOverviewScreenStyle = () => getThemedStyle(base, themed);

export default LoanOverviewScreenStyle;
