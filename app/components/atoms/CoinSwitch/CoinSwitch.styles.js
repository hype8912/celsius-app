// import STYLES from '../../../constants/STYLES';
import {
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  // container: {
  //   marginBottom: 10,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  // },
  switchButton: {
    zIndex: 1,
    left: 20,
    top: 77,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 28,
    height: 40,
    width: 40,
    borderRadius: 20,
    position: "absolute",
  },
  balance: {
    width: widthPercentageToDP("65%"),
    height: 35,
    backgroundColor: STYLES.COLORS.CELSIUS_BLUE,
    position: "absolute",
    right: -68,
    top: 82,
    borderTopLeftRadius: 35,
    borderBottomLeftRadius: 35,
    paddingLeft: 30,
    justifyContent: "center",
    alignItems: "flex-start",
  },
};

const themed = {
  light: {
    switchButton: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
  },

  dark: {
    switchButton: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
    },
  },

  celsius: {
    switchButton: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
  },
};

const CoinSwitchStyle = theme =>
  theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed);

export default CoinSwitchStyle;
