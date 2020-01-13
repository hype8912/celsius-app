// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
    paddingBottom: 10,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const StoryWrapperStyle = () => getThemedStyle(base, themed);

export default StoryWrapperStyle;
