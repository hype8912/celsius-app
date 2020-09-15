import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    borderRadius: 15,
    backgroundColor: COLOR_KEYS.NEGATIVE_STATE,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const HodlBannerStyle = () => getThemedStyle(base, themed);

export default HodlBannerStyle;
