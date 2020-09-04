import {
  getColor,
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { THEMES } from "../../../constants/UI";

const base = {
  container: {
    flex: 1,
    marginTop: heightPercentageToDP("5%"),
    marginBottom: 0,
    height: heightPercentageToDP("90%"),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: "flex-start",
    backgroundColor: getColor(COLOR_KEYS.BACKGROUND, THEMES.UNICORN),
  },
  contentWrapper: {
    width: widthPercentageToDP("72%"),
    marginLeft: "auto",
    marginRight: "auto",
  },
  topSection: {
    height: 40,
    marginTop: 20,
    alignItems: "flex-end",
  },
  closeButton: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: widthPercentageToDP("80%"),
    marginLeft: -30,
    transform: [
      {
        translateY: heightPercentageToDP("60%"),
      },
    ],
  },
  spinnerWrapper: {
    alignItems: "center",
    marginTop: 30,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const IntroduceNewThemeModalStyle = () => getThemedStyle(base, themed);

export default IntroduceNewThemeModalStyle;
