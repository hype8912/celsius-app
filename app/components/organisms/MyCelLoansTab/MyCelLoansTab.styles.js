import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  contentWrapper: {
    marginHorizontal: 20,
    marginTop: heightPercentageToDP("1.5%"),
    alignItems: "center",
    justifyContent: "center",
  },
  starIcon: {
    resizeMode: "contain",
    width: widthPercentageToDP("23.3%"),
    height: widthPercentageToDP("23.3%"),
    marginTop: heightPercentageToDP("2%"),
    marginBottom: heightPercentageToDP("0.5%"),
  },
  wrapper: {
    paddingHorizontal: widthPercentageToDP("5%"),
    paddingVertical: heightPercentageToDP("3%"),
    marginVertical: heightPercentageToDP("1.5%"),
    backgroundColor: COLOR_KEYS.CARDS,
    borderRadius: 8,
  },
  circle: {
    position: "absolute",
    top: heightPercentageToDP("-7%"),
    width: widthPercentageToDP("17%"),
    height: widthPercentageToDP("17%"),
    borderRadius: heightPercentageToDP("17%") / 2,
    backgroundColor: COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: heightPercentageToDP("3%"),
    marginRight: widthPercentageToDP("3%"),
    marginBottom: heightPercentageToDP("0.8%"),
  },
  title: {
    marginTop: heightPercentageToDP("1%"),
  },
  loyalityQuestion: {
    marginTop: heightPercentageToDP("1.5%"),
    color: COLOR_KEYS.PRIMARY_BUTTON,
  },
  explanation: {
    marginBottom: heightPercentageToDP("2.73%"),
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const MyCelLoansTabStyle = () => getThemedStyle(base, themed);

export default MyCelLoansTabStyle;
