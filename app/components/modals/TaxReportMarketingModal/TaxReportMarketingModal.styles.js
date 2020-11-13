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
    width: "100%",
    marginLeft: 0,
    marginBottom: 0,
    height: heightPercentageToDP("90%"),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: "flex-start",
    backgroundColor: getColor(COLOR_KEYS.BACKGROUND, THEMES.UNICORN),
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
    marginRight: 10,
  },
  wrapper: {
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
    width: widthPercentageToDP("15%"),
    height: heightPercentageToDP("15%"),
    marginTop: heightPercentageToDP("10%"),
  },
  subtitle: {
    marginTop: heightPercentageToDP("3%"),
    marginRight: 35,
    marginLeft: 35,
  },
  button: {
    alignSelf: "flex-start",
    marginTop: heightPercentageToDP("5%"),
    marginBottom: heightPercentageToDP("2%"),
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const TaxReportMarketingModalStyle = () => getThemedStyle(base, themed);

export default TaxReportMarketingModalStyle;
