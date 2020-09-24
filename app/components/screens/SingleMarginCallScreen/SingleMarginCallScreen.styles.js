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

const SingleMarginCallScreenStyle = () => getThemedStyle(base, themed);

export default SingleMarginCallScreenStyle;
