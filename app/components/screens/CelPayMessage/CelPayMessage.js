import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelPayMessageStyle from "./CelPayMessage.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelButton from "../../../components/atoms/CelButton/CelButton";
import CelInput from "../../atoms/CelInput/CelInput";
import mixpanelAnalytics from "../../../utils/mixpanel-analytics";
import { SCREENS } from "../../../constants/SCREENS";
import Constants from "../../../../constants";

const { STORYBOOK } = Constants;

@connect(
  state => ({
    formData: state.forms.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CelPayMessage extends Component {
  static navigationOptions = () => {
    return {
      title: "Enter note to CelPay",
      right: "profile",
    };
  };

  constructor(props) {
    super(props);

    const { formData, navigation } = props;
    const names =
      formData.friend && formData.friend.name
        ? formData.friend.name.split(" ")
        : undefined;
    const screenTitle = names
      ? `Send to ${names[0] ? names[0] : ""} ${
          !!names[1] && !!names[1][0] ? names[1][0] : ""
        }`
      : "Send";

    navigation.setParams({
      title: screenTitle,
    });
  }

  handleSend = () => {
    const { actions, formData } = this.props;

    actions.navigateTo(SCREENS.VERIFY_PROFILE, {
      onSuccess: () => {
        actions.celPayFriend();
      },
    });

    if (formData.message) {
      mixpanelAnalytics.addedNote();
    }
  };

  // Link coin and amount from previous screen
  render() {
    const { formData } = this.props;
    const style = CelPayMessageStyle();

    return (
      <RegularLayout>
        <View style={style.container}>
          <CelInput
            placeholder="Notes (optional)"
            type="text-area"
            field="message"
            value={formData.message}
            numberOfLines={5}
            autoFocus={!STORYBOOK}
          />

          <CelButton
            iconRight={"IconArrowRight"}
            margin="0 0 0 0"
            onPress={this.handleSend}
          >
            Send {formData.coin}
          </CelButton>
        </View>
      </RegularLayout>
    );
  }
}

export default CelPayMessage;
