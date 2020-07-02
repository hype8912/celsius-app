import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  fillColor: {},
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const IconStyle = () => getThemedStyle(base, themed);

export default IconStyle;
