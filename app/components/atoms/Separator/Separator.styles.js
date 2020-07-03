import { getThemedStyle, getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { THEMES } from "../../../constants/UI";

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
};

const themed = {
  light: {
    separatorColor: {
      color: getColor(COLOR_KEYS.SEPARATORS, THEMES.LIGHT),
    },
  },

  dark: {
    separatorColor: {
      color: getColor(COLOR_KEYS.SEPARATORS, THEMES.DARK),
    },
  },

  unicorn: {
    separatorColor: {
      color: getColor(COLOR_KEYS.SEPARATORS, THEMES.UNICORN),
    },
  },
};

const SeparatorStyle = () => getThemedStyle(base, themed);

export default SeparatorStyle;
