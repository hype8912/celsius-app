import { getThemedStyle, getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  content: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  separator: {
    width: "100%",
  },
  separatorVertical: {
    height: "100%",
  },
  center: {
    alignSelf: "center",
    justifyContent: "center",
  },
  left: {
    flex: 1,
    marginRight: 10,
    alignItems: "flex-start",
  },
  right: {
    flex: 1,
    marginLeft: 10,
    alignItems: "flex-end",
  },
  separatorColor: {
    color: getColor(COLOR_KEYS.SEPARATORS),
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const SeparatorStyle = () => getThemedStyle(base, themed);

export default SeparatorStyle;
