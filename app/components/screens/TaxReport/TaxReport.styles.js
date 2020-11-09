import { COLOR_KEYS } from "../../../constants/COLORS";
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  switchContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  footer: {
    marginTop: 40,
  },
  listItem: {
    height: 69,
    borderBottomColor: COLOR_KEYS.SEPARATORS,
    borderBottomWidth: 1,
    justifyContent: "center",
  },
  yearStatusContainer: {
    flexDirection: "column",
  },
  contactSupportContainer: {
    flexDirection: "row",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const TaxReportStyle = () => getThemedStyle(base, themed);

export default TaxReportStyle;
