import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {},
  fabButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
  },
  menuContainer: {
    position: "absolute",
    left: widthPercentageToDP("10%"),
    bottom: heightPercentageToDP("15%"),
    width: widthPercentageToDP("80%"),
  },
  helpCard: {
    position: "absolute",
    left: widthPercentageToDP("30%"),
    top: heightPercentageToDP("5.5%"),
    flexDirection: "row",
    justifyContent: "space-around",
  },
  opacityCircle: {
    backgroundColor: STYLES.COLORS.CELSIUS,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  menuItemsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  background: {
    opacity: 0.95,
    backgroundColor: "white",
  },
};

const themed = {
  light: {
    background: {
      opacity: 0.95,
      backgroundColor: "white",
    },
  },

  dark: {
    background: {
      backgroundColor: "rgba(21, 30, 39, 0.98)",
    },
  },

  celsius: {},
};

const FabMenuStyle = () => getThemedStyle(base, themed);

export default FabMenuStyle;
