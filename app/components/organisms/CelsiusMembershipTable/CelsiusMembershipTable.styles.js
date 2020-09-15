import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  wrapper: {
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    opacity: 8,
  },
  tableWrapper: {
    flexDirection: "column",
    marginTop: 10,
    borderRadius: 3,
    overflow: "hidden",
  },
  tierWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  tierSilver: {
    backgroundColor: COLOR_KEYS.SECTION_TITLE,
    borderTopLeftRadius: 3,
  },
  tierGold: {
    backgroundColor: COLOR_KEYS.ALERT_STATE,
  },
  tierPlatinum: {
    backgroundColor: COLOR_KEYS.PRIMARY_BUTTON,
    borderTopRightRadius: 3,
  },
  tierCommon: {
    flex: 0.3,
    flexGrow: 1,
    paddingVertical: 7,
    alignItems: "center",
  },

  tierData: {
    width: "33%",
    paddingVertical: 12,
  },

  percentageRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: COLOR_KEYS.BACKGROUND,
  },
  separator: {
    alignItems: "center",
    backgroundColor: COLOR_KEYS.SEPARATORS,
    paddingVertical: 5,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};
const CelsiusMembershipTableStyle = theme =>
  getThemedStyle(base, themed, theme);

export default CelsiusMembershipTableStyle;
