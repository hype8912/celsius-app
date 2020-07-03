import { getThemedStyle } from "../../../utils/styles-util";

const base = {};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const SeparatorInfoModalStyle = () => getThemedStyle(base, themed);

export default SeparatorInfoModalStyle;
