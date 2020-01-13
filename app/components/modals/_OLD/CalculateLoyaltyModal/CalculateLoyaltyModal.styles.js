// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../../utils/styles-util";

const base = {
  footerContainer: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const CalculateLoyaltyModalStyle = () => getThemedStyle(base, themed);

export default CalculateLoyaltyModalStyle;
