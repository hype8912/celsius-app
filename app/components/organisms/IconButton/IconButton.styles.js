import { Platform } from "react-native";
import STYLES from "../../../constants/STYLES";
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderRadius: 8,
    marginVertical: 20,
    minHeight: 50
  }
};

const themed = {
  light: {
    container: {
      backgroundColor: STYLES.COLORS.WHITE
    },
    textColor: {
      color: STYLES.COLORS.DARK_GRAY6
    },
    iconColor: {
      color: STYLES.COLORS.DARK_GRAY6
    }
  },

  dark: {
    container: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
      ...Platform.select({
        android: {
          ...STYLES.ANDROID_BORDER_STYLES
        },
        ios: {
          ...STYLES.SHADOW_STYLES
        }
      })
    },
    textColor: {
      color: STYLES.COLORS.WHITE
    },
    iconColor: {
      color: STYLES.COLORS.WHITE_OPACITY5
    }
  },

  celsius: {
    container: {
      backgroundColor: STYLES.COLORS.WHITE,
      ...Platform.select({
        android: {
          ...STYLES.ANDROID_SHADOW_STYLES,
          borderColor: "#E9E9E9",
        },
        ios: {
          ...STYLES.SHADOW_STYLES
        }
      })
    },
    textColor: {
      color: STYLES.COLORS.DARK_GRAY6
    },
    iconColor: {
      color: STYLES.COLORS.DARK_GRAY6
    }
  }
};

const IconButtonStyle = () => getThemedStyle(base, themed);

export default IconButtonStyle;
