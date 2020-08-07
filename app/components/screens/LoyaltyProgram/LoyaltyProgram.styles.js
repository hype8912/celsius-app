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
  progressView: {
    height: heightPercentageToDP("25.5%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 40,
  },
  bonusCard: {
    width: widthPercentageToDP("89%"),
    backgroundColor: "white",
    flexDirection: "column",
  },
  image: {
    resizeMode: "contain",
    width: widthPercentageToDP("9%"),
    height: widthPercentageToDP("9%"),
  },
  starIcon: {
    resizeMode: "contain",
    width: widthPercentageToDP("23.3%"),
    height: widthPercentageToDP("23.3%"),
    marginTop: heightPercentageToDP("2%"),
    marginBottom: heightPercentageToDP("0.5%"),
  },
  circle: {
    width: widthPercentageToDP("17%"),
    height: widthPercentageToDP("17%"),
    borderRadius: heightPercentageToDP("17%") / 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: heightPercentageToDP("3%"),
    marginRight: widthPercentageToDP("3%"),
    marginBottom: heightPercentageToDP("0.8%"),
  },
  title: {
    marginBottom: heightPercentageToDP("0.4%"),
  },
  explanation: {
    marginBottom: heightPercentageToDP("1.73%"),
  },
  hodlImage: {
    resizeMode: "contain",
    height: heightPercentageToDP("30%"),
    width: widthPercentageToDP("90%"),
    marginTop: heightPercentageToDP("1.73%"),
  },
  arcChart: {
    marginHorizontal: widthPercentageToDP("8%"),
  },
  contentWrapper: {
    marginHorizontal: 20,
    marginTop: heightPercentageToDP("1.5%"),
    alignItems: "center",
    justifyContent: "center",
  },
  interestCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tableWrapper: {
    flexDirection: "column",
    marginTop: 10,
    borderRadius: 3,
    overflow: "hidden",
  },
  tierWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  minPercentage: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  bonus: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-evenly",
  },
  loan: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-evenly",
  },
  tierCommon: {
    flex: 0.3,
    flexGrow: 1,
    paddingVertical: 7,
    alignItems: "center",
  },
  tierSilver: {
    backgroundColor: COLOR_KEYS.SECTION_TITLE,
    borderTopLeftRadius: 3,
  },
  tierGold: {
    backgroundColor: COLOR_KEYS.ALERT_STATE,
  },
  tierPlatinum: {
    backgroundColor: COLOR_KEYS.PRIMARY_BUTTON,
    borderTopRightRadius: 3,
  },
  tierData: {
    paddingVertical: 10,
  },
  tierDataLast: {
    paddingVertical: 10,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const LoyaltyProgramStyle = () => getThemedStyle(base, themed);

export default LoyaltyProgramStyle;
