import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

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
    backgroundColor: COLOR_KEYS.PRIm,
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
