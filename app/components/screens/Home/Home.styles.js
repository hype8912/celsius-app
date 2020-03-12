// import STYLES from '../../../constants/STYLES';
import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  container: {},
  contentWrapper: {
    alignItems: "center",
  },
  celImage: {
    resizeMode: "contain",
    width: widthPercentageToDP("35%"),
    height: heightPercentageToDP("20%"),
    marginTop: heightPercentageToDP("20%"),
  },
  partnerLogos: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  logoLeft: {
    resizeMode: "contain",
    width: widthPercentageToDP("22%"),
    marginLeft: 35,
    marginRight: 5,
  },
  logoMiddle: {
    resizeMode: "contain",
    width: widthPercentageToDP("22"),
    marginLeft: 5,
    marginRight: 10,
  },
  logoRight: {
    resizeMode: "contain",
    width: widthPercentageToDP("22%"),
    marginLeft: 40,
    marginRight: 35,
  },
};

const themed = {
  dark: {},

  light: {},

  celsius: {},
};

const HomeStyle = () => getThemedStyle(base, themed);

export default HomeStyle;
