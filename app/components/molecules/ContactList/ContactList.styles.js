import { getThemedStyle } from "../../../utils/styles-util";

const base = {};

const themed = {
  light: {},

  dark: {},

  unicorn: {},
};

const ContactListStyle = () => getThemedStyle(base, themed);

export default ContactListStyle;
