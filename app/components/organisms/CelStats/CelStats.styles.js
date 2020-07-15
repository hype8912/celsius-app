import {
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  celTierHead: {
    flex: 1,
    flexDirection: "row",
  },
  celTierHeadItem: {
    flex: 0.31,
  },
  celTierHeadIndentation: {
    // flex: 0.07,
    width: 22,
  },
  celTierWrapper: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 8,
    backgroundColor: COLOR_KEYS.CARDS,
    marginTop: 10,
  },
  celTierIndentation: {
    width: 22,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  celTierItem: {
    flex: 0.31,
  },
  celStatsBottomCopy: {
    width: widthPercentageToDP("60%"),
    alignSelf: "center",
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const CelsiusStatsStyle = () => getThemedStyle(base, themed);

export default CelsiusStatsStyle;
