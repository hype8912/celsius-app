import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  fabButtonStyle: {
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: "center",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const FabStyle = () => getThemedStyle(base, themed);

export default FabStyle;
