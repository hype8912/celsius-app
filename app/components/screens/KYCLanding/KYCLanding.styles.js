// import STYLES from '../../../constants/STYLES';
import { getThemedStyle, heightPercentageToDP, widthPercentageToDP } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1
  },
  image: {
    resizeMode: "contain",
    width: widthPercentageToDP("40.5%"),
    height: widthPercentageToDP("40.5%"),
    marginBottom: heightPercentageToDP("4%"),
    alignSelf: 'center'
  },
  progressWrapper: {
    height: heightPercentageToDP("21.55%"),
    flexDirection: "row",
    marginTop: heightPercentageToDP("3.69%")
  },
  progressImage: {
    height: "100%",
    resizeMode: "contain"
  },
  stepsWrapper: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: heightPercentageToDP("0.7%")
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: heightPercentageToDP("0.7%"),
    paddingLeft: heightPercentageToDP("0.7%")
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const KYCLandingStyle = () => getThemedStyle(base, themed);

export default KYCLandingStyle;
