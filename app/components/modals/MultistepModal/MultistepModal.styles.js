import {
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  modalContent: {
    flex: 1,
  },
  pictureWrapper: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: COLOR_KEYS.CARDS,
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
    backgroundColor: COLOR_KEYS.CARDS,
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

  dark: {},

  unicorn: {},
};

const MultistepModalStyle = () => getThemedStyle(base, themed);

export default MultistepModalStyle;
