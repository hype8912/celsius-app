import STYLES from "../../../constants/STYLES";
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  wrapper: {
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    opacity: 8,
  },
  tableWrapper: {
    flexDirection: "column",
    marginTop: 10,
    borderRadius: 3,
    overflow: "hidden",
  },
  tierWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  tierSilver: {
    backgroundColor: STYLES.COLORS.MEDIUM_GRAY,
    borderTopLeftRadius: 3,
  },
  tierGold: {
    backgroundColor: STYLES.COLORS.ORANGE,
  },
  tierPlatinum: {
    backgroundColor: STYLES.COLORS.CELSIUS_BLUE,
    borderTopRightRadius: 3,
  },
  tierCommon: {
    flex: 0.3,
    flexGrow: 1,
    paddingVertical: 7,
    alignItems: "center",
  },

  tierData: {
    paddingVertical: 12,
  },
  tierDataLast: {
    paddingVertical: 10,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },

  minPercentage: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  bonus: {
    flexDirection: "row",
    backgroundColor: STYLES.COLORS.WHITE,
    justifyContent: "space-evenly",
  },
  loan: {
    flexDirection: "row",
    backgroundColor: STYLES.COLORS.WHITE,
    justifyContent: "space-evenly",
  },
  separator: {
    alignItems: "center",
    backgroundColor: STYLES.COLORS.DARK_GRAY3,
    paddingVertical: 5,
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
const CelsiusMembershipTableStyle = theme =>
  getThemedStyle(base, themed, theme);

export default CelsiusMembershipTableStyle;
