import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  contactSupportContainer: {
    flexDirection: "row",
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const TaxReportDataSentModalStyle = () => getThemedStyle(base, themed);

export default TaxReportDataSentModalStyle;
