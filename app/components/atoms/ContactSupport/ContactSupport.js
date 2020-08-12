import React from "react";
import PropTypes from "prop-types";
import { Linking, View } from "react-native";

import ContactSupportStyle from "./ContactSupport.styles";
import CelText from "../CelText/CelText";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const ContactSupport = ({
  content,
  align,
  copy = "If you need any help, contact our support at app@celsius.network",
}) => {
  const style = ContactSupportStyle();
  const copyParts = copy.split("app@celsius.network");
  return (
    <View style={[style.container, { justifyContent: content }]}>
      <CelText align={align}>
        {copyParts[0]}
        <SupportLink />
        {copyParts[1]}
      </CelText>
    </View>
  );
};

const SupportLink = () => (
  <CelText
    color={getColor(COLOR_KEYS.LINK)}
    onPress={() => Linking.openURL("mailto:app@celsius.network")}
  >
    {"app@celsius.network"}
  </CelText>
);

ContactSupport.propTypes = {
  copy: PropTypes.string,
  align: PropTypes.string,
  fontSize: PropTypes.string,
  content: PropTypes.string,
};

ContactSupport.defaultProps = {
  align: "center",
  content: "center",
};

export default ContactSupport;
