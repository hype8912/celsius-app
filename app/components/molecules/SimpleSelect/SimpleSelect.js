import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import SimpleSelectStyle from "./SimpleSelect.styles";
import Icon from "../../atoms/Icon/Icon";
import STYLES from "../../../constants/STYLES";
import formatter from "../../../utils/formatter";

const SimpleSelect = props => {
  let additionalStyle = {};

  const {
    displayValue,
    items,
    onChange,
    updateFormField,
    field,
    iconName,
    fillColor,
    iconWidth,
    placeholder,
    style: selectStyle,
    theme,
  } = props;

  const style = SimpleSelectStyle(theme);
  if (selectStyle) {
    additionalStyle = {
      inputAndroid: {
        ...selectStyle,
      },
      inputIOS: {
        ...selectStyle,
      },
    };
  }
  const simpleStyle = StyleSheet.create(
    formatter.deepmerge(style, additionalStyle)
  );

  return (
    <RNPickerSelect
      placeholder={{ label: placeholder } || {}}
      onValueChange={item => {
        if (item) {
          return onChange
            ? onChange(field, item)
            : updateFormField(field, item);
        }
      }}
      style={simpleStyle}
      useNativeAndroidPickerStyle={false}
      value={displayValue}
      Icon={() => (
        <Icon
          name={iconName || "CaretDown"}
          width={iconWidth || 12}
          fill={fillColor || STYLES.COLORS.DARK_GRAY}
        />
      )}
      items={items}
    />
  );
};

SimpleSelect.propTypes = {
  displayValue: PropTypes.string,
  // { label, value }
  items: PropTypes.instanceOf(Array).isRequired,
  updateFormField: PropTypes.func,
  onChange: PropTypes.func,
  field: PropTypes.string.isRequired,
  iconName: PropTypes.string,
  placeholder: PropTypes.string,
  fillColor: PropTypes.string,
  iconWidth: PropTypes.number,
  style: PropTypes.instanceOf(Object),
};

export default SimpleSelect;
