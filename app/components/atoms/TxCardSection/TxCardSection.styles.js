import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: { marginTop: 20 },
  content: { flexDirection: "row", justifyContent: "space-between" },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const CardSectionStyle = () => getThemedStyle(base, themed);

export default CardSectionStyle;
