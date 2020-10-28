import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "react-native";
import CheckBox from "react-native-check-box";

import CelText from "../CelText/CelText";
import Spinner from "../Spinner/Spinner";
import Icon from "../Icon/Icon";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const checked = (
  <Icon
    name="CheckedBorder"
    width="23"
    height="23"
    fill={getColor(COLOR_KEYS.POSITIVE_STATE)}
  />
);

const unchecked = <Icon name="Unchecked" width="23" height="23" />;

const CelCheckbox = ({
  field,
  updateFormField,
  onChange,
  value,
  rightText,
  checkedImage = checked,
  unCheckedImage = unchecked,
  textWeight,
  loading,
  fillColor = getColor(COLOR_KEYS.PARAGRAPH),
}) => {
  const onPress = onChange || updateFormField;

  return (
    <TouchableOpacity
      style={{ flexDirection: "row", marginBottom: 15, alignItems: "center" }}
      onPress={() => onPress(field, !value)}
    >
      {loading ? (
        <View style={{ marginRight: 10 }}>
          <Spinner size={24} />
        </View>
      ) : (
        <CheckBox
          style={{ paddingRight: 10 }}
          onClick={() => onPress(field, !value)}
          isChecked={value}
          checkedImage={checkedImage}
          unCheckedImage={unCheckedImage}
        />
      )}

      {rightText && (
        <CelText
          type="H4"
          weight={textWeight}
          color={fillColor}
          style={{ marginRight: 30 }}
        >
          {rightText}
        </CelText>
      )}
    </TouchableOpacity>
  );
};

CelCheckbox.propTypes = {
  field: PropTypes.string.isRequired,
  updateFormField: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.bool,
  rightText: PropTypes.string,
  checkedImage: PropTypes.element,
  unChecked: PropTypes.element,
  textWeight: PropTypes.string,
  loading: PropTypes.bool,
  fillColor: PropTypes.string,
};

export default CelCheckbox;
