// import STYLES from '../../../constants/STYLES';
import { Platform } from "react-native";
import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flex: 1,
  },
  coinPicking: {
    alignSelf: "center",
  },
  circleButton: {
    marginBottom: 0,
    marginTop: 20,
  },
  circleWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    shadowColor: STYLES.COLORS.DARK_GRAY,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    zIndex: -1,
    backgroundColor: "white",
  },
  iconStyle: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  selectWrapper: {
    flexDirection: "row",
    alignSelf: "center",
    width: "auto",
    alignItems: "center",
    borderRadius: 8,
    ...Platform.select({
      android: {
        borderColor: "#E9E9E9",
        borderTopWidth: 0.2,
        borderLeftWidth: 0.2,
        borderRightWidth: 0.5,
        borderBottomWidth: 2,
      },
      ios: {
        ...STYLES.SHADOW_STYLES,
      },
    }),
    paddingHorizontal: 10,
    marginBottom: 5,
  },
};

const themed = {
  light: {
    circleWrapper: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
    selectWrapper: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
    iconWrapper: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
    iconColor: {
      color: STYLES.COLORS.DARK_GRAY,
    },
  },

  dark: {
    circleWrapper: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
    selectWrapper: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
    iconWrapper: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
    iconColor: {
      color: STYLES.COLORS.WHITE_OPACITY3,
    },
  },

  celsius: {
    circleWrapper: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
    selectWrapper: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
    iconWrapper: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
    iconColor: {
      color: STYLES.COLORS.DARK_GRAY_OPACITY,
    },
  },
};

const CoinPickerStyle = () => getThemedStyle(base, themed);

export default CoinPickerStyle;
