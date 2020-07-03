import {
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  modalContent: {
    flex: 1,
  },
  pictureWrapper: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: STYLES.COLORS.WHITE,
    alignSelf: "center",
    zIndex: -5,
    marginTop: -50,
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
  screen: {
    flex: 1,
    width: widthPercentageToDP("90%"),
    borderRadius: 25,
    backgroundColor: STYLES.COLORS.WHITE,
    marginTop: 40,
  },
  dots: {
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

  unicorn: {},
};

const MultistepModalStyle = () => getThemedStyle(base, themed);

export default MultistepModalStyle;
