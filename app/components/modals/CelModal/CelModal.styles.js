import { Platform } from "react-native";
import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  wrapper: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor:
      Platform.OS === "android"
        ? "rgba(243,243,243,0.9)"
        : "rgba(243,243,243,0)",
    flex: 1,
  },
  modal: {
    backgroundColor: "white",
    width: widthPercentageToDP("90%"),
    marginBottom: heightPercentageToDP("4%"),
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
    backgroundColor: STYLES.COLORS.WHITE,
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
    backgroundColor: "transparent",
    zIndex: 10,
  },
};

const themed = {
  light: {},

  dark: {
    modal: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
    pictureWrapper: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
  },

  celsius: {},
};

const CelModalStyle = () => getThemedStyle(base, themed);

export default CelModalStyle;
