import STYLES from "../../../constants/STYLES";
import {
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  mainContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 5,
    paddingHorizontal: 40,
  },
  arcChart: {
    marginHorizontal: widthPercentageToDP("8%"),
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  otherCoinsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  celContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    marginVertical: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: 5,
  },
};

const themed = {
  light: {
    minPercentage: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
    bonus: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
    loan: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
    separator: {
      backgroundColor: STYLES.COLORS.MEDIUM_GRAY3,
    },
    tierSilver: {
      backgroundColor: STYLES.COLORS.MEDIUM_GRAY,
    },
  },

  dark: {
    minPercentage: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
    bonus: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
    loan: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
    separator: {
      backgroundColor: "rgb(95,105,122)",
    },
    tierSilver: {
      borderColor: "#000",
      borderRightWidth: 2,
    },
    tierGold: {
      borderColor: "#000",
      borderRightWidth: 2,
    },
    tierPlatinum: {
      borderColor: "#000",
    },
    tierWrapper: {
      borderBottomColor: "#000",
    },
  },

  celsius: {},
};
const MyCelHeaderStyle = () => getThemedStyle(base, themed);

export default MyCelHeaderStyle;
