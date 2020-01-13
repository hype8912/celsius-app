// import STYLES from '../../../constants/STYLES';
import {
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  buttonsWrapper: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  buttonsIconText: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
  },
  buttonIconText: {
    flex: 1,
    marginLeft: widthPercentageToDP("1.3%"),
    marginRight: widthPercentageToDP("1.3%"),
  },
  buttonItself: {
    justifyContent: "space-around",
    flex: 1,
  },
  buttonIconHand: {
    alignSelf: "center",
    width: 25,
    height: 29,
    marginBottom: 5,
    marginTop: 6,
  },
  buttonIconEmail: {
    alignSelf: "center",
    marginBottom: 5,
    marginTop: 6,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const WiringBankInfomationStyle = () => getThemedStyle(base, themed);

export default WiringBankInfomationStyle;
