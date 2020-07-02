import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flex: 1,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: "space-around",
  },
  coinList: {
    marginHorizontal: 20,
    borderRadius: 8,
    padding: 10,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    marginHorizontal: 25,
    marginVertical: 0,
  },
  buttonsWrapper: {
    flexDirection: "row",
    marginTop: 20,
    height: 50,
  },
  listCoin: { flexDirection: "row", alignItems: "center", paddingLeft: 10 },
};

const themed = {
  light: {
    background: {
      backgroundColor: STYLES.COLORS.LIGHT_GRAY,
    },
  },

  dark: {
    background: {
      backgroundColor: STYLES.COLORS.DARK_SECONDARY_BUTTON_GRAY,
    },
  },
  unicorn: {},
};

const MultiAddressModalStyle = () => getThemedStyle(base, themed);

export default MultiAddressModalStyle;
