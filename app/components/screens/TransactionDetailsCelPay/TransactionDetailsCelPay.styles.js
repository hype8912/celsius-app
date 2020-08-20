import STYLES from "../../../constants/STYLES";
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  direction: {
    flexDirection: "row",
  },
  circle: {
    height: 40,
    width: 40,
    backgroundColor: STYLES.COLORS.WHITE,
    borderRadius: 20,
    paddingTop: 10,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const TransactionDetailsCelPayStyle = () => getThemedStyle(base, themed);

export default TransactionDetailsCelPayStyle;
