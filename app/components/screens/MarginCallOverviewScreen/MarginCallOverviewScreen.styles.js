import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const MarginCallOverviewScreenStyle = () => getThemedStyle(base, themed);

export default MarginCallOverviewScreenStyle;
