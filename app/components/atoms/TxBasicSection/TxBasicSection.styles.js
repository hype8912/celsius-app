// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const BasicSectionStyle = () => getThemedStyle(base, themed);

export default BasicSectionStyle;
