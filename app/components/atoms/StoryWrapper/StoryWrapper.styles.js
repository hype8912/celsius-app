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

  unicorn: {},
};

const StoryWrapperStyle = () => getThemedStyle(base, themed);

export default StoryWrapperStyle;
