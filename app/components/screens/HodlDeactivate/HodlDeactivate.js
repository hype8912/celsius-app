import React, { Component } from "react";
import { View } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import HodlDeactivateStyle from "./HodlDeactivate.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import HeadingProgressBar from "../../atoms/HeadingProgressBar/HeadingProgressBar";
import { getPadding } from "../../../utils/styles-util";
import { THEMES } from "../../../constants/UI";
import STYLES from "../../../constants/STYLES";
import CelCheckbox from "../../atoms/CelCheckbox/CelCheckbox";
import Card from "../../atoms/Card/Card";
import CelButton from "../../atoms/CelButton/CelButton";

@connect(
  state => ({
    theme: state.user.appSettings.theme,
    formData: state.forms.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class HodlDeactivate extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "HODL mode",
    right: "profile",
  });

  render() {
    // const style = HodlDeactivateStyle();
    const { formData, theme, actions } = this.props;
    return (
      <RegularLayout padding={"0 0 0 0"}>
        <HeadingProgressBar steps={3} currentStep={3} />
        <View
          style={[
            { flex: 1, width: "100%", height: "100%" },
            { ...getPadding("20 20 100 20") },
          ]}
        >
          <CelText
            align={"left"}
            margin={"10 0 10 0"}
            type={"H2"}
            weight={"bold"}
          >
            How to deactivate HODL mode
          </CelText>
          <CelText type={"H4"} align={"left"}>
            When you want to deactivate HODL mode, you will need to type the
            code below. So, it's very important to remember this code. the
            deactivation process takes 24 hours.
          </CelText>
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
              field={`agreeHodlMode`}
              value={formData.agreeHodlMode}
              uncheckedCheckBoxColor={STYLES.COLORS.GRAY}
              checkedCheckBoxColor={STYLES.COLORS.GREEN}
              rightText={"I memorized my deactivation code"}
            />
          </Card>

          <CelButton
            disabled={!formData.agreeHodlMode}
            // onPress={() => console.log("send verification mode")}
          >
            Send email verification
          </CelButton>
        </View>
      </RegularLayout>
    );
  }
}

export default HodlDeactivate;
