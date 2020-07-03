import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  fillColor: {},
  pngIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginHorizontal: 2,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const IconStyle = () => getThemedStyle(base, themed);

export default IconStyle;
