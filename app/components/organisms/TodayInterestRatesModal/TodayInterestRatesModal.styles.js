// import STYLES from '../../../constants/STYLES';
import { getThemedStyle, heightPercentageToDP } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1
  },
  explanation: {
    marginTop: heightPercentageToDP('3%'),
    marginBottom: heightPercentageToDP('3%'),
    paddingHorizontal: '10%'
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const TodayInterestRatesModalStyle = () => getThemedStyle(base, themed);

export default TodayInterestRatesModalStyle;
