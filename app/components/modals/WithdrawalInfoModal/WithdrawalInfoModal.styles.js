import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  buttonsWrapper: {
    flexDirection: "row",
    marginTop: 20,
    height: 50,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const WithdrawalInfoStyle = () => getThemedStyle(base, themed);

export default WithdrawalInfoStyle;
