// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },

  flexWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const ComingSoonCoinsStyle = () => getThemedStyle(base, themed);

export default ComingSoonCoinsStyle;
