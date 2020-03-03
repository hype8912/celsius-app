// import STYLES from '../../../constants/STYLES';
import { getThemedStyle, heightPercentageToDP } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1
  },
  wrapper: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  coinWrapper: {
    marginBottom: heightPercentageToDP("3.7%"),
    width: '30%'
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const BorrowCollateralStyle = () => getThemedStyle(base, themed);

export default BorrowCollateralStyle;
