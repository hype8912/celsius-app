import { Dimensions, Platform } from "react-native";
import STYLES from "../../../constants/STYLES";
import { getThemedStyle } from "../../../utils/styles-util";

const { width } = Dimensions.get("window");

const base = {
  container: {
    flex: 1,
    height: "100%",
    width,
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
    marginBottom: 80,
  },
  selectWrapper: {
    flexDirection: "row",
    alignSelf: "center",
    width: "auto",
    alignItems: "center",
    borderRadius: 8,
    ...Platform.select({
      android: {
        borderColor: "#E9E9E9",
        borderTopWidth: 0.2,
        borderLeftWidth: 0.2,
        borderRightWidth: 0.5,
        borderBottomWidth: 2,
      },
      ios: {
        ...STYLES.SHADOW_STYLES,
      },
    }),
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  selectedAmount: {
    borderBottomWidth: 1,
    paddingBottom: 2,
    borderColor: STYLES.COLORS.CELSIUS_BLUE,
  },
};

const themed = {
  light: {
    selectWrapper: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
  },

  dark: {
    selectWrapper: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
      ...Platform.select({
        android: {
          borderColor: "transparent",
        },
      }),
    },
  },

  celsius: {
    selectWrapper: {
      backgroundColor: STYLES.COLORS.WHITE,
    },
  },
};

const WithdrawEnterAmountStyle = () => getThemedStyle(base, themed);

export default WithdrawEnterAmountStyle;
