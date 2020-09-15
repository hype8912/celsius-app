import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  title: {},
  text: {
    paddingBottom: 30,
  },
  checkbox: {
    marginVertical: 15,
    flexDirection: "row",
  },
  box: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLOR_KEYS.DOT_INDICATOR_INACTIVE,
    width: 25,
    height: 25,
  },
  buttonWrapper: {
    height: 50,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const ChangeWithdrawalAddressModalStyle = () => getThemedStyle(base, themed);

export default ChangeWithdrawalAddressModalStyle;
