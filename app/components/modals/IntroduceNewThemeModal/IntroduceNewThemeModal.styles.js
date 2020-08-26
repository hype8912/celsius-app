// import STYLES from '../../../constants/STYLES';
import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
    marginTop: heightPercentageToDP("5%"),
    marginBottom: 0,
    height: heightPercentageToDP("90%"),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: "flex-start",
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
  customButton: {
    marginTop: 20,
    width: 180,
    height: 48,
    borderRadius: 30,
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonText: {
    marginLeft: "auto",
    marginRight: "auto",
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
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const IntroduceNewThemeModalStyle = () => getThemedStyle(base, themed);

export default IntroduceNewThemeModalStyle;
