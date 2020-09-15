import {
  getThemedStyle,
  heightPercentageToDP,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  coinWrapper: {
    marginBottom: heightPercentageToDP("3.7%"),
    width: "30%",
  },
  addMoreCoinsList: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    width: "100%",
    height: 80,
    borderColor: COLOR_KEYS.DOT_INDICATOR_INACTIVE,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const BorrowCollateralStyle = () => getThemedStyle(base, themed);

export default BorrowCollateralStyle;
