import { StyleSheet, Dimensions, Platform } from "react-native";
import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

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
    backgroundColor: COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND,
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
    backgroundColor: COLOR_KEYS.CARDS,
  },
  maskOverlayColor: {
    backgroundColor: COLOR_KEYS.CAMERA_OVERLAY,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const CameraScreenStyle = () => getThemedStyle(base, themed);

export default CameraScreenStyle;
