import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    justifyContent: "center",
    alignItems: "center",
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const EmptyStateStyle = () => getThemedStyle(base, themed);

export default EmptyStateStyle;
