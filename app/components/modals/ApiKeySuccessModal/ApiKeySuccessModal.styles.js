import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  copyShareWrapper: {
    marginVertical: 20,
    marginHorizontal: 20,
    borderColor: COLOR_KEYS.PARAGRAPH,
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
  },

  copyShareButtonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 15,
  },
  buttonWrapper: {
    height: 50,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const ApiKeySuccessModalStyle = () => getThemedStyle(base, themed);

export default ApiKeySuccessModalStyle;
