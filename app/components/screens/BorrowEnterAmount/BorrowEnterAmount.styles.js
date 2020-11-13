import { Platform } from "react-native";
import { getColor, getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  coinIconWrapper: {
    width: 40,
    position: "absolute",
    height: "100%",
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  coinTextWrapper: {
    position: "absolute",
    right: 0,
    height: "100%",
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  amountInput: {
    borderRadius: 8,
    flex: 1,
    fontSize: 35,
    fontWeight: "600",
    color: getColor(COLOR_KEYS.PRIMARY_BUTTON)
  },
  amountInputWrapper: {
    width: "100%",
    marginTop: 20
  },
};

const themed = {
  light: {},
  dark: {
    selectWrapper: {
      ...Platform.select({
        android: {
          borderColor: COLOR_KEYS.TRANSPARENT,
        },
      }),
    },
  },
  unicorn: {},
};

const BorrowEnterAmountStyle = () => getThemedStyle(base, themed);

export default BorrowEnterAmountStyle;
