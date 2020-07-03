import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

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
  light: {
    infoBlock: {
      backgroundColor: STYLES.COLORS.LIGHT_GRAY,
    },
  },

  dark: {
    infoBlock: {
      backgroundColor: STYLES.COLORS.DARK_GRAY,
    },
  },

  unicorn: {},
};

const GetCoinsConfirmModalStyle = () => getThemedStyle(base, themed);

export default GetCoinsConfirmModalStyle;
