import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "react-native";
import CheckBox from "react-native-check-box";

import CelText from "../CelText/CelText";
import STYLES from "../../../constants/STYLES";
import { THEMES } from "../../../constants/UI";
import Spinner from "../Spinner/Spinner";

const CelCheckbox = props => {
  const onPress = props.onChange || props.updateFormField;

  return (
    <TouchableOpacity
      style={{ flexDirection: "row", marginBottom: 15, alignItems: "center" }}
      onPress={() => onPress(props.field, !props.value)}
    >
      {props.loading ? (
        <View style={{ marginRight: 10 }}>
          <Spinner size={24} />
        </View>
      ) : (
        <CheckBox
          checkBoxColor={STYLES.COLORS.MEDIUM_GRAY}
          checkedCheckBoxColor={STYLES.COLORS.GREEN}
          style={{ paddingRight: 10 }}
          onClick={() => onPress(props.field, !props.value)}
          isChecked={props.value}
          checkedImage={props.checkedImage}
          unCheckedImage={props.unChecked}
        />
      )}

      {props.rightText && (
        <CelText
          type="H4"
          weight={props.textWeight}
          color={props.fillColor}
          style={{ marginRight: 30 }}
          theme={props.theme}
        >
          {props.rightText}
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
  theme: PropTypes.oneOf(Object.values(THEMES)),
};

export default CelCheckbox;
