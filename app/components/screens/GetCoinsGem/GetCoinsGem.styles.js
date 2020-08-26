import DeviceInfo from "react-native-device-info";
import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const hasNotch = DeviceInfo.hasNotch();

const base = {
  container: {
    flex: 1,
    backgroundColor: COLOR_KEYS.DOT_INDICATOR_INACTIVE,
    paddingTop: hasNotch ? 60 : 30,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const GetCoinsGemStyle = () => getThemedStyle(base, themed);

export default GetCoinsGemStyle;
