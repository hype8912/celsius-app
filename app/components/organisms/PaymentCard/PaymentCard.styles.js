// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  cardStyle: {
    flexDirection: "row",
    flex: 1,
  },
  iconWrapper: {
    flex: 0.25,
    alignSelf: "center",
    justifyContent: "center",
  },
  iconStyle: {
    marginLeft: 8,
    marginRight: 23,
    width: 50,
    height: 50,
  },
  cardCopy: {
    flex: 0.75,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const PaymentCardsStyle = () => getThemedStyle(base, themed);

export default PaymentCardsStyle;
