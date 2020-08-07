import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const AddressOverviewStyle = () => getThemedStyle(base, themed);

export default AddressOverviewStyle;
