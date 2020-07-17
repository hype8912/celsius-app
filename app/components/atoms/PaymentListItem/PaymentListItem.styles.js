import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  baseWrapper: {
    borderRadius: 8,
  },
  greenWrapper: {
    backgroundColor: COLOR_KEYS.POSITIVE_STATE,
  },
  textWrapper: {
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  upperTextWrapper: {
    flex: 1,
    top: 10,
    zIndex: 1,
    borderRadius: 4,
    alignSelf: "center",
    justifyContent: "center",
    width: 160,
    height: 25,
    backgroundColor: COLOR_KEYS.CARDS,
  },
  upperText: {
    color: COLOR_KEYS.HEADLINE,
  },
  highlightWrapper: {
    backgroundColor: COLOR_KEYS.CARDS,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const PaymentListItemStyle = () => getThemedStyle(base, themed);

export default PaymentListItemStyle;
