import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  coinName: {
    height: 40,
    justifyContent: "center",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const ComingSoonCoinsStyle = () => getThemedStyle(base, themed);

export default ComingSoonCoinsStyle;
