import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LtcAddressChangeModalStyle from "./LtcAddressChangeModal.styles";
import CelModal from "../CelModal/CelModal.js";
import { MODALS } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import Separator from "../../atoms/Separator/Separator";
import CelCheckbox from "../../atoms/CelCheckbox/CelCheckbox";
import STYLES from "../../../constants/STYLES";
import * as appActions from "../../../redux/actions";
import API from "../../../constants/API";
import apiUtil from "../../../utils/api-util";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";

@connect(
  state => ({
    callsInProgress: state.api.callsInProgress,
    userTriggeredActions: state.user.appSettings.user_triggered_actions || {},
    ltcCoinDetails: state.currencies.rates.find(c => c.short === "LTC"),
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class LtcAddressChangeModal extends Component {
  static propTypes = {};
  static defaultProps = {};

  toggleAddressChangeConfirmation = () => {
    const { actions, userTriggeredActions } = this.props;

    actions.setUserAppSettings({
      user_triggered_actions: {
        confirmedLTCAddressChange: !userTriggeredActions.confirmedLTCAddressChange,
      },
    });
  };

  render() {
    const {
      actions,
      userTriggeredActions,
      callsInProgress,
      ltcCoinDetails,
    } = this.props;
    const style = LtcAddressChangeModalStyle();

    const isLoading = apiUtil.areCallsInProgress(
      [API.SET_APP_SETTINGS],
      callsInProgress
    );
    return (
      <CelModal
        hasCloseButton={false}
        style={style.container}
        name={MODALS.LTC_ADDRESS_CHANGE}
        picture={{ uri: ltcCoinDetails.image_url }}
        pictureDimensions={{ height: 35, width: 35 }}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <CelText type="H2" weight="bold" align="center" margin={"0 30 15 30"}>
            Your LTC deposit address has changed
          </CelText>

          <CelText type="H4" weight="300" align="center" margin={"0 0 15 0"}>
            We’ve upgraded our cold storage wallets from BitGo to Fireblocks.
            Your LTC deposit address has been updated to reflect this change.
            Make sure to use this new address when depositing LTC.
          </CelText>

          <Separator margin="5 0 15 0" />

          <CelCheckbox
            field="ltcAddressChangeConfirmed"
            onChange={this.toggleAddressChangeConfirmation}
            loading={isLoading}
            updateFormField={actions.updateFormField}
            value={userTriggeredActions.confirmedLTCAddressChange}
            uncheckedCheckBoxColor={STYLES.COLORS.GRAY}
            checkedCheckBoxColor={STYLES.COLORS.GREEN}
            rightText="I understand that my LTC deposit address has changed"
          />
        </View>
        <View style={style.buttonsWrapper}>
          <CelModalButton
            onPress={actions.closeModal}
            buttonStyle={
              !userTriggeredActions.confirmedLTCAddressChange
                ? "disabled"
                : null
            }
          >
            Continue
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default LtcAddressChangeModal;
