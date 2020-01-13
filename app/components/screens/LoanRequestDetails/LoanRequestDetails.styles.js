// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
    alignItems: "center",
  },
  status: { flexDirection: "row", alignItems: "center" },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const LoanRequestDetailsStyle = () => getThemedStyle(base, themed);

export default LoanRequestDetailsStyle;
