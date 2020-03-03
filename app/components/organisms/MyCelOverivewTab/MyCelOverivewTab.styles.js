// import STYLES from '../../../constants/STYLES';
import { getThemedStyle, heightPercentageToDP, widthPercentageToDP } from "../../../utils/styles-util";
import STYLES from '../../../constants/STYLES';

const base = {

  container: {
      height:heightPercentageToDP("75%"),
      marginHorizontal: 20,
      alignItems: "center",
      justifyContent: "flex-start",
    },
  contentWrapper: {
    marginBottom: 10, 
  },
  starIcon: {
    resizeMode: "contain",
    width: widthPercentageToDP("23.3%"),
    height: widthPercentageToDP("23.3%"),
    marginTop: heightPercentageToDP("2%"),
    marginBottom: heightPercentageToDP("0.5%"),
  },
  wrapper: {
    marginTop: heightPercentageToDP("7%"),
    backgroundColor: STYLES.COLORS.WHITE,
    borderRadius: 8,
  },
  circle: {
    position: 'absolute',
    top: heightPercentageToDP("-7%"),
    width: widthPercentageToDP("17%"),
    height: widthPercentageToDP("17%"),
    borderRadius: heightPercentageToDP("17%") / 2,
    backgroundColor: STYLES.COLORS.WHITE,
    alignSelf: 'center',
    justifyContent: "center",
    alignItems: "center",
    marginTop: heightPercentageToDP("3%"),
    // marginTop: heightPercentageToDP("1,53%"),
    marginRight: widthPercentageToDP("3%"),
    marginBottom: heightPercentageToDP("0.8%"),
  },
  title: {
    marginBottom: heightPercentageToDP("1.4%"),
  },
  loyalityQuestion: {
    marginTop: heightPercentageToDP("1.5%"),
    color: STYLES.COLORS.CELSIUS_BLUE
  },
  explanation: {
    marginBottom: heightPercentageToDP("3.73%")
  },
};

const themed = {
  light: {
    wrapper: {
      backgroundColor: STYLES.COLORS.WHITE
    },
  },

  dark: {
    wrapper: {
      backgroundColor: STYLES.COLORS.DARK_HEADER
    },
  },

  celsius: {}
};

const MyCelOverivewTabStyle = () => getThemedStyle(base, themed);

export default MyCelOverivewTabStyle
