// import STYLES from '../../../constants/STYLES';
import {
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

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
    backgroundColor: STYLES.COLORS.WHITE,
    marginTop: 10,
  },
  celTierIndentation: {
    // flex: 0.07,
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
  light: {
    celTierWrapper: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
  },

  dark: {
    celTierWrapper: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
  },

  celsius: {},
};

const CelsiusStatsStyle = () => getThemedStyle(base, themed);

export default CelsiusStatsStyle;
