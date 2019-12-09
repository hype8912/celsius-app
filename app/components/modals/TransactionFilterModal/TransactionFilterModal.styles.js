// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";
// import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flex: 1,
  },
  allFiltersContainer: {
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonsWrapper: {
    justifyContent: "flex-end",
    marginTop: 20,
    height: 50,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const TransactionFilterModalStyle = () => getThemedStyle(base, themed);

export default TransactionFilterModalStyle;
