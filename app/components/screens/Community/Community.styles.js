// import STYLES from '../../../constants/STYLES';
import { getThemedStyle, heightPercentageToDP, widthPercentageToDP } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1
  },
  text: { marginTop: heightPercentageToDP("1.25%") },
  secondText: { marginTop: heightPercentageToDP("0.5%") },
  amountsView: { justifyContent: "space-around" },
  amountsCard: { marginTop: heightPercentageToDP("2%") },
  image: { alignItems: "center" },
  communityImage: {
    position: "absolute",
    left: 16,
    bottom: -10,
    resizeMode: "cover",
    height: widthPercentageToDP("35%"),
    width: widthPercentageToDP("30%"),
    overflow: "visible"
  },
  imageView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 12
  },
  coinImage: {
    width: 38,
    height: 38
  },
  bulldogImage: {
    position: "absolute",
    bottom: 0,
    right: 0,
    resizeMode: "cover",
    width: widthPercentageToDP("22%"),
    height: widthPercentageToDP("20.4%"),
    overflow: "hidden"
  }
};


const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const CommunityStyle = () => getThemedStyle(base, themed);

export default CommunityStyle;
