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

const CreateNewAccountModalStyle = () => getThemedStyle(base, themed);

export default CreateNewAccountModalStyle;
