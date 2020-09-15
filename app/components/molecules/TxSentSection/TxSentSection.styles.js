import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  text: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10,
  },
  content: { justifyContent: "space-between", flexDirection: "row" },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderColor: COLOR_KEYS.WHITE,
    borderWidth: 3,
  },
  data: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    paddingLeft: 10,
  },
  icon: { paddingTop: 10 },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const SentSectionStyle = () => getThemedStyle(base, themed);

export default SentSectionStyle;
