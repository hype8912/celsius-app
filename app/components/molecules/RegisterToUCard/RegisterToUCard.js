import React from "react";
import PropTypes from "prop-types";
import { Linking, View } from "react-native";

import Card from "../../atoms/Card/Card";
import CelCheckbox from "../../atoms/CelCheckbox/CelCheckbox";
import CelText from "../../atoms/CelText/CelText";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const RegisterToUCard = props => {
  const { updateFormField, termsOfUse } = props;
  return (
    <Card>
      <View style={{ flexDirection: "row" }}>
        <CelCheckbox
          field="termsOfUse"
          updateFormField={updateFormField}
          value={termsOfUse}
          uncheckedCheckBoxColor={getColor(COLOR_KEYS.PARAGRAPH)}
          checkedCheckBoxColor={getColor(COLOR_KEYS.POSITIVE_STATE)}
        />

        <CelText
          onPress={() => updateFormField("termsOfUse", !termsOfUse)}
          style={{ width: "88%" }}
        >
          I have read and agree to the{" "}
          <CelText
            link
            onPress={() =>
              Linking.openURL("https://celsius.network/terms-of-use/")
            }
          >
            Terms of Use
          </CelText>{" "}
          and{" "}
          <CelText
            link
            onPress={() =>
              Linking.openURL("https://celsius.network/privacy-policy/")
            }
          >
            Privacy Policy
          </CelText>
          .
        </CelText>
      </View>
    </Card>
  );
};

RegisterToUCard.propTypes = {
  updateFormField: PropTypes.func.isRequired,
  termsOfUse: PropTypes.bool,
};

export default RegisterToUCard;
