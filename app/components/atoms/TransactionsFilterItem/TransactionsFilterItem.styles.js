import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  itemStyle: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 8,
    marginBottom: 8,
    alignItems: "center",
    paddingVertical: 5,
  },
  optionPickerWrapper: {
    flex: 1,
    flexDirection: "row",
  },
  iconWrapper: {
    height: 26,
    width: 26,
    borderRadius: 13,
    marginRight: 20,
    justifyContent: "center",
  },
  clearSelectWrapper: {
    height: 26,
    width: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: COLOR_KEYS.PARAGRAPH,
    paddingVertical: 4,
    marginLeft: "auto",
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const TransactionsFilterItemStyle = () => getThemedStyle(base, themed);

export default TransactionsFilterItemStyle;
