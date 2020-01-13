// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";
// import { FONT_SCALE } from "../../../config/constants/style";

const base = {
  container: {
    flex: 1,
  },
  balance: {
    flex: 1,
  },
  text: {
    color: "#FFFF",
  },
  // },
  // interest: {
  //     flex: 1,
  //     marginLeft: 10
  // },
  // usd: {
  //     fontSize: FONT_SCALE * 28,
  //     paddingBottom: 5,
  //     fontWeight: 'bold',
  // },
  cardInnerView: {
    flexDirection: "row",
    marginHorizontal: 12,
  },
  wrapper: {
    width: "100%",
  },
  coinTextWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const CoinCardStyle = () => getThemedStyle(base, themed);

export default CoinCardStyle;
