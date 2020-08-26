import { Platform } from "react-native";
import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  wrapper: {
    alignItems: "center",
    flex: 1,
  },
  modal: {
    backgroundColor: COLOR_KEYS.CARDS,
    width: widthPercentageToDP("90%"),
    marginBottom: heightPercentageToDP("4%"),
    maxHeight: heightPercentageToDP("90%"),
    borderRadius: 8,
    zIndex: 3,
  },
  outsideCloseModal: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    position: "absolute",
    zIndex: 0,
  },
  pictureWrapper: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: COLOR_KEYS.CARDS,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    transform: [
      {
        translateY: -40,
      },
    ],
    ...STYLES.SHADOW_STYLES,
  },
  pictureStyle: {
    alignSelf: "center",
    height: 80,
    width: 80,
  },
  closeBtn: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 40,
    height: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR_KEYS.TRANSPARENT,
    zIndex: 10,
  },
};

const themed = {
  light: {
    outsideCloseModal: {
      backgroundColor:
        Platform.OS === "android"
          ? STYLES.COLORS.LIGHT_MODAL_ANDROID__OUTSIDE_BACKGROUND_COLOR // TODO: Get rid of this, and find different way to handle modal overlay on Android platform
          : null,
    },
  },

  dark: {
    outsideCloseModal: {
      backgroundColor:
        Platform.OS === "android"
          ? STYLES.COLORS.DARK_MODAL_ANDROID_OUTSIDE_BACKGROUND_COLOR
          : null,
    },
  },

  unicorn: {},
};

const CelModalStyle = () => getThemedStyle(base, themed);

export default CelModalStyle;
