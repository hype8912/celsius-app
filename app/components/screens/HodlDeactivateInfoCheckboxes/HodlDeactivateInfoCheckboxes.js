import React, { Component } from "react";
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import HodlDeactivateInfoCheckboxesStyle from "./HodlDeactivateInfoCheckboxes.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Card from "../../atoms/Card/Card";
import { THEMES } from "../../../constants/UI";
import STYLES from "../../../constants/STYLES";
import CelCheckbox from "../../atoms/CelCheckbox/CelCheckbox";
import CelButton from "../../atoms/CelButton/CelButton";

@connect(
  state => ({
    theme: state.user.appSettings.theme,
    formData: state.forms.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class HodlDeactivateInfoCheckboxes extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "HodlDeactivateInfoCheckboxes Screen",
    right: "profile",
  });

  render() {
    // const style = HodlDeactivateInfoCheckboxesStyle();
    const { theme, actions, formData } = this.props;

    const checkboxCopy = [
      {
        field: "noHodl1",
        explanation: "All features that have been disabled will be available",
      },
      {
        field: "noHodl2",
        explanation:
          "You will have to wait 24 hours for HODL mode deactivation",
      },
    ];

    const canContinue = formData.noHodl1 && formData.noHodl2;

    return (
      <RegularLayout>
        <CelText
          align={"left"}
          margin={"10 0 10 0"}
          type={"H2"}
          weight={"bold"}
        >
          Disabled actions in HODL mode
        </CelText>
        <CelText type={"H4"} align={"left"}>
          HODL mode disables actions on your profile that are at risk of being
          misused. But don’t worry, some actions like depositing or buying
          cryptocurrency will remain enabled.
        </CelText>
        {checkboxCopy.map((text, i) => (
          <Card
            color={
              theme === THEMES.LIGHT
                ? STYLES.COLORS.WHITE
                : STYLES.COLORS.SEMI_GRAY
            }
            margin={"20 0 20 0"}
            padding={"15 15 0 15"}
          >
            <CelCheckbox
              onChange={(field, value) => actions.updateFormField(field, value)}
              field={`${checkboxCopy[i].field}`}
              value={formData[`${checkboxCopy[i].field}`]}
              uncheckedCheckBoxColor={STYLES.COLORS.GRAY}
              checkedCheckBoxColor={STYLES.COLORS.GREEN}
              rightText={text.explanation}
            />
          </Card>
        ))}

        <CelButton
          margin={"10 0 0 0"}
          disabled={!canContinue}
          onPress={() =>
            actions.navigateTo("VerifyProfile", {
              onSuccess: () => actions.navigateTo("HodlDeactivationCode"),
            })
          }
        >
          Continue
        </CelButton>
      </RegularLayout>
    );
  }
}

export default HodlDeactivateInfoCheckboxes;
