import { getThemedStyle } from "../../../utils/styles-util";

const base = {};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const InfoBoxStyle = () => getThemedStyle(base, themed);

export default InfoBoxStyle;
