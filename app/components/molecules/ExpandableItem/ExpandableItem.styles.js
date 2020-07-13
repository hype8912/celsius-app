import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

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
    borderColor: COLOR_KEYS.SEPARATORS,
  },
  leftSegment: {
    alignItems: "flex-start",
    borderWidth: 0.5,
    height: 1,
    marginTop: 10,
    width: 21,
    borderColor: COLOR_KEYS.SEPARATORS,
  },
  right: {
    flex: 1,
    alignItems: "flex-start",
    borderWidth: 0.5,
    height: 1,
    marginTop: 10,
    marginLeft: 5,
    borderColor: COLOR_KEYS.SEPARATORS,
  },
  centralText: {
    maxWidth: "70%",
    alignContent: "center",
    color: COLOR_KEYS.PARAGRAPH,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const ExpandableItemStyle = () => getThemedStyle(base, themed);

export default ExpandableItemStyle;
