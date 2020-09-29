import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { Image, TouchableOpacity, View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Modal from "react-native-modal";

import IntroduceNewThemeModalStyle from "./IntroduceNewThemeModal.styles";
import { MODALS, THEMES } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import * as appActions from "../../../redux/actions";
import { isIos } from "../../../utils/ui-util";
import Icon from "../../atoms/Icon/Icon";
import CelButton from "../../atoms/CelButton/CelButton";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import Spinner from "../../atoms/Spinner/Spinner";
import { STORAGE_KEYS } from "../../../constants/DATA";
import { setSecureStoreKey } from "../../../utils/storage-util";

@connect(
  state => ({
    openedModal: state.ui.openedModal,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class IntroduceNewThemeModal extends Component {
  renderTop = () => {
    const { actions } = this.props;
    const style = IntroduceNewThemeModalStyle();
    return (
      <View style={style.topSection}>
        <TouchableOpacity
          style={style.closeButton}
          onPress={() => actions.closeModal()}
        >
          <Icon
            name={"Close"}
            height={20}
            width={20}
            fill={getColor(COLOR_KEYS.LINK, THEMES.UNICORN)}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderContent = () => {
    const style = IntroduceNewThemeModalStyle();
    const { callsInProgress } = this.props;

    const isSaving = apiUtil.areCallsInProgress(
      [API.SET_APP_SETTINGS],
      callsInProgress
    );

    return (
      <View>
        <CelText
          color={getColor(COLOR_KEYS.LINK, THEMES.UNICORN)}
          allCaps
          type={"H4"}
          weight={"800"}
          align={"center"}
          font="Pangram"
        >
          Welcome to the new
        </CelText>
        <CelText
          color={getColor(COLOR_KEYS.LINK, THEMES.UNICORN)}
          allCaps
          type={"H4"}
          weight={"800"}
          align={"center"}
          font="Pangram"
        >
          Celsius app.
        </CelText>
        <CelText
          margin={"10 0 0 0"}
          color={getColor(COLOR_KEYS.LINK, THEMES.UNICORN)}
          type={"H5"}
          align={"center"}
          font="Pangram"
        >
          Please enjoy our new color theme.
        </CelText>

        {!isSaving ? (
          <View>
            <CelButton
              onPress={() => this.onPress(true)}
              margin="30 0 20 0"
              theme={THEMES.UNICORN}
            >
              <CelText
                font="Pangram"
                color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
              >
                Try it now!
              </CelText>
            </CelButton>

            <CelButton
              basic
              onPress={() => this.onPress()}
              margin="30 0 20 0"
              theme={THEMES.UNICORN}
            >
              <CelText
                font="Pangram"
                color={getColor(COLOR_KEYS.LINK, THEMES.UNICORN)}
              >
                Don't show again
              </CelText>
            </CelButton>
          </View>
        ) : (
          <View style={style.spinnerWrapper}>
            <Spinner />
          </View>
        )}
      </View>
    );
  };

  onPress = async shouldSetTheme => {
    const { actions } = this.props;
    await setSecureStoreKey(
      STORAGE_KEYS.DONT_SHOW_INTRODUCE_NEW_THEME,
      "DONT_SHOW"
    );

    if (shouldSetTheme) {
      await actions.setUserAppSettings({ theme: THEMES.UNICORN });
    }
    actions.closeModal();
  };

  render() {
    const style = IntroduceNewThemeModalStyle();
    const { openedModal } = this.props;
    return (
      <Modal
        style={style.container}
        isVisible={openedModal === MODALS.INTRODUCE_NEW_THEME_MODAL}
        useNativeDriver={!isIos()}
      >
        <View style={style.contentWrapper}>
          <View style={style.imageWrapper}>
            <Image
              source={require("../../../../assets/images/sunset-mockup-02.png")}
              resizeMode={"contain"}
              style={style.image}
            />
          </View>
          {this.renderTop()}

          {this.renderContent()}
        </View>
      </Modal>
    );
  }
}

export default IntroduceNewThemeModal;
