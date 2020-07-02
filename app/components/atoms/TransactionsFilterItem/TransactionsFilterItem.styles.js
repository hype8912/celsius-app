import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

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
    borderColor: STYLES.COLORS.DARK_GRAY1,
    paddingVertical: 4,
    marginLeft: "auto",
  },
};

const themed = {
  light: {
    clearSelectWrapper: {
      borderColor: STYLES.COLORS.DARK_GRAY7,
    },
  },

  dark: {
    clearSelectWrapper: {
      borderColor: STYLES.COLORS.WHITE_OPACITY5,
    },
  },

  unicorn: {},
};

const TransactionsFilterItemStyle = () => getThemedStyle(base, themed);

export default TransactionsFilterItemStyle;
