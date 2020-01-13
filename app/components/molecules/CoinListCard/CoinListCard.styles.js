// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  coinImage: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const CoinListCardStyle = () => getThemedStyle(base, themed);

export default CoinListCardStyle;
