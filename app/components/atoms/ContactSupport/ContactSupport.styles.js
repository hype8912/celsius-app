import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const ContactSupportStyle = () => getThemedStyle(base, themed);

export default ContactSupportStyle;
