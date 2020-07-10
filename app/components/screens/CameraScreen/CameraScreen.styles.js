import { StyleSheet, Dimensions, Platform } from "react-native";
import { getColor, getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { THEMES } from "../../../constants/UI";

const { height, width } = Dimensions.get("window");
const newWidth = height * (3 / 4);
const widthOffset = -((newWidth - width) / 2);

const base = {
  container: {
    flex: 1,
  },
  camera: {
    position: "absolute",
    ...StyleSheet.absoluteFill,
    ...Platform.select({
      android: {
        left: widthOffset,
        right: widthOffset,
      },
    }),
  },
  mask: { flex: 1 },
  bottomView: {
    position: "absolute",
    bottom: 0,
    backgroundColor: STYLES.COLORS.WHITE,
    ...Platform.select({
      ios: {
        width: "100%",
      },
      android: {
        left: -widthOffset,
        right: -widthOffset,
      },
    }),
  },
  actionBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
};

const themed = {
  light: {
    maskOverlayColor: {
      backgroundColor: "rgba(241,239,238,0.6)",
    },
    actionBar: {
      backgroundColor: getColor(COLOR_KEYS.CARDS, THEMES.LIGHT),
    },
  },

  dark: {
    maskOverlayColor: {
      backgroundColor: STYLES.COLORS.DARK_OVERLAY,
    },
    actionBar: {
      backgroundColor: getColor(COLOR_KEYS.CARDS, THEMES.DARK),
    },
  },

  unicorn: {
    maskOverlayColor: {
      backgroundColor: "rgba(241,239,238,0.6)",
    },
    actionBar: {
      backgroundColor: getColor(COLOR_KEYS.CARDS, THEMES.UNICORN),
    },
  },
};

const CameraScreenStyle = () => getThemedStyle(base, themed);

export default CameraScreenStyle;
