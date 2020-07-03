import { getColor, getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { THEMES } from "../../../constants/UI";

const base = {
  container: {
    flex: 1,
    flexDirection: "row",
  },
  left: {
    flex: 1,
    alignItems: "flex-start",
    borderWidth: 0.5,
    height: 1,
    marginTop: 10,
    marginRight: 5,
  },
  leftSegment: {
    alignItems: "flex-start",
    borderColor: "blue",
    borderWidth: 0.5,
    height: 1,
    marginTop: 10,
    width: 21,
  },
  right: {
    flex: 1,
    alignItems: "flex-start",
    borderColor: "red",
    borderWidth: 0.5,
    height: 1,
    marginTop: 10,
    marginLeft: 5,
  },
  centralText: {
    maxWidth: "70%",
    alignContent: "center",
  },
};

const themed = {
  light: {
    leftSegment: { borderColor: getColor(COLOR_KEYS.SEPARATORS, THEMES.LIGHT) },
    left: { borderColor: getColor(COLOR_KEYS.SEPARATORS, THEMES.LIGHT) },
    right: { borderColor: getColor(COLOR_KEYS.SEPARATORS, THEMES.LIGHT) },
    centralText: { color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.LIGHT) },
  },

  dark: {
    leftSegment: { borderColor: getColor(COLOR_KEYS.SEPARATORS, THEMES.DARK) },
    left: { borderColor: getColor(COLOR_KEYS.SEPARATORS, THEMES.DARK) },
    right: { borderColor: getColor(COLOR_KEYS.SEPARATORS, THEMES.DARK) },
    centralText: { color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.DARK) },
  },

  unicorn: {
    leftSegment: {
      borderColor: getColor(COLOR_KEYS.SEPARATORS, THEMES.UNICORN),
    },
    left: { borderColor: getColor(COLOR_KEYS.SEPARATORS, THEMES.UNICORN) },
    right: { borderColor: getColor(COLOR_KEYS.SEPARATORS, THEMES.UNICORN) },
    centralText: { color: getColor(COLOR_KEYS.PARAGRAPH, THEMES.UNICORN) },
  },
};

const ExpandableItemStyle = () => getThemedStyle(base, themed);

export default ExpandableItemStyle;
