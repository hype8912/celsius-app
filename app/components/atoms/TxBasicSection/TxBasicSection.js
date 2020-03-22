import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import BasicSectionStyle from "./TxBasicSection.styles";
import CelText from "../CelText/CelText";
import Separator from "../Separator/Separator";

const TxBasicSection = ({
  label,
  value,
  noSeparator = false,
  color = null,
}) => {
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

TxBasicSection.propTypes = {
  label: PropTypes.string,
  noSeparator: PropTypes.bool,
  value: PropTypes.string,
  color: PropTypes.string,
};

export default TxBasicSection;

// cekiraj za boju
