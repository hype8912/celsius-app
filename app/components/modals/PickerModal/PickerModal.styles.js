import { Dimensions } from "react-native";
import { getThemedStyle } from '../../../utils/styles-util';

const { height } = Dimensions.get("window");

const base = {
  wrapper: { maxHeight: 0.7 * height, paddingVertical: 20 },
  scroll: { paddingHorizontal: 40 },
  item: { height: 40, justifyContent: "center" },
}

const themed = {
    light: {},

    dark: {},

    unicorn: {}
}

const PickerModalStyle = () => getThemedStyle(base, themed);

export default PickerModalStyle
