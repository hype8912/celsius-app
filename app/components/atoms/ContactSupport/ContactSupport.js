import React from "react";
import PropTypes from "prop-types";
import { Linking, View } from "react-native";

import ContactSupportStyle from "./ContactSupport.styles";
import CelText from "../CelText/CelText";
import STYLES from "../../../constants/STYLES";

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
    color={STYLES.COLORS.CELSIUS_BLUE}
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
