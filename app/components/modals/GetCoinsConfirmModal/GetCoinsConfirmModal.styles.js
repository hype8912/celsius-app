import { getThemedStyle } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const base = {
  container: {
    flex: 1,
  },
  infoBlock: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 8,
    padding: 10,
    backgroundColor: COLOR_KEYS.BACKGROUND,
  },
  transferData: {
    marginHorizontal: 20,
  },
  transferDataItem: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 25,
    justifyContent: "space-between",
  },
  buttonsWrapper: {
    justifyContent: "flex-end",
    marginTop: 20,
    height: 50,
  },
};

const themed = {
  light: {},
  dark: {},
  unicorn: {},
};

const GetCoinsConfirmModalStyle = () => getThemedStyle(base, themed);

export default GetCoinsConfirmModalStyle;
