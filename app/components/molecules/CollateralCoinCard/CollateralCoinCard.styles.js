// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  mainContainer: {
    flex: 1,
  },
  coinInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  coinImage: {
    width: 40,
    height: 40,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const CollateralCoinCardStyle = () => getThemedStyle(base, themed);

export default CollateralCoinCardStyle;
