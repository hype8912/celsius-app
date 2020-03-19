import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import BasicSectionStyle from "./BasicSection.styles";
import CelText from "../../CelText/CelText";
import Separator from "../../Separator/Separator";

const BasicSection = ({ label, value, noSeparator = false, color = null }) => {
  const style = BasicSectionStyle();
  return (
    <View style={style.container}>
      <View style={style.content}>
        <CelText type="H6">{label}:</CelText>
        <CelText type="H6" color={color}>
          {value}
        </CelText>
      </View>
      {!noSeparator && <Separator />}
    </View>
  );
};

BasicSection.propTypes = {
  label: PropTypes.string,
  noSeparator: PropTypes.bool,
  value: PropTypes.string,
  color: PropTypes.string,
};

export default BasicSection;

// cekiraj za boju
