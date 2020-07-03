import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {},
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const HorizontalSliderStyle = () => getThemedStyle(base, themed);

export default HorizontalSliderStyle;
