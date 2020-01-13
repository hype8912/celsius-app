// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    marginBottom: 5,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterIcon: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const TransactionsHistoryStyle = () => getThemedStyle(base, themed);

export default TransactionsHistoryStyle;
