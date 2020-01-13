// import STYLES from '../../../constants/STYLES';
import {
  getThemedStyle,
  heightPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  explanation: {
    marginTop: heightPercentageToDP("1.5%"),
    marginBottom: heightPercentageToDP("3%"),
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const InterestRatesStyle = () => getThemedStyle(base, themed);

export default InterestRatesStyle;
