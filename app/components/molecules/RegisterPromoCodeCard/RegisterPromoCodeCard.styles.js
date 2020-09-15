import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  referralHeading: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  iconWrapper: {
    flex: 0.15,
    paddingRight: 5,
  },
  iconStyle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND,
    justifyContent: "center",
    alignContent: "center",
  },
  titleWrapper: {
    flex: 0.85,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  caretStyle: {
    marginTop: 10,
    paddingTop: 5,
    width: 25,
    height: 25,
  },
  referralBody: {
    flexDirection: "row",
    flex: 1,
  },
  indentation: {
    flex: 0.15,
  },
  referralCopy: {
    flex: 0.85,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const RegisterPromoCodeCardStyle = () => getThemedStyle(base, themed);

export default RegisterPromoCodeCardStyle;
