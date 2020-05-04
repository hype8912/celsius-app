import { getThemedStyle } from "../../../utils/styles-util";

const base = {};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const SeparatorInfoModalStyle = () => getThemedStyle(base, themed);

export default SeparatorInfoModalStyle;
