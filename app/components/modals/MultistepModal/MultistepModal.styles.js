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
    backgroundColor: STYLES.COLORS.WHITE,
    width: widthPercentageToDP("90%"),
    marginBottom: heightPercentageToDP("4%"),
    borderRadius: 8,
    zIndex: 3,
  },
  modalContent: {
    flex: 1,
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
    alignSelf: "center",
    zIndex: -5,
    transform: [
      {
        translateY: -40,
      },
    ],
    ...STYLES.SHADOW_STYLES,
  },
  pictureNoneWrapper: {
    opacity: 0.0,
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
  screen: {
    flex: 1,
    width: widthPercentageToDP("90%"),
    borderRadius: 25,
    backgroundColor: STYLES.COLORS.WHITE,
    marginTop: 40,
  },
  dots: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -35,
    transform: [
      {
        translateY: -13,
      },
    ],
  },
};

const themed = {
  light: {},

  dark: {
    modal: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
    screen: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
    pictureWrapper: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
  },

  celsius: {},
};

const MultistepModalStyle = () => getThemedStyle(base, themed);

export default MultistepModalStyle;
