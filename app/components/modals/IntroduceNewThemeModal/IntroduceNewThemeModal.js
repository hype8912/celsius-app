import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { AsyncStorage, Image, TouchableOpacity, View } from "react-native";
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

@connect(
  state => ({
    openedModal: state.ui.openedModal,
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
    return (
      <View>
        <CelText
          color={getColor(COLOR_KEYS.LINK, THEMES.UNICORN)}
          allCaps
          type={"H4"}
          weight={"800"}
          align={"center"}
        >
          We are excited to introduce you to the new look of Celsius app.
        </CelText>
        <CelText
          margin={"10 0 0 0"}
          color={getColor(COLOR_KEYS.LINK, THEMES.UNICORN)}
          type={"H5"}
          align={"center"}
        >
          You can activate the Sunset theme later in the profile settings.
        </CelText>

        <TouchableOpacity
          onPress={() => this.dontShowAgain(true)}
          style={[
            style.customButton,
            {
              backgroundColor: getColor(COLOR_KEYS.LINK, THEMES.UNICORN),
            },
          ]}
        >
          <CelText
            color={getColor(COLOR_KEYS.WHITE)}
            align={"center"}
            weight={"600"}
            style={style.buttonText}
          >
            Try it now!
          </CelText>
        </TouchableOpacity>
        <CelText
          onPress={async () => {
            await this.dontShowAgain();
          }}
          color={getColor(COLOR_KEYS.LINK, THEMES.UNICORN)}
          align={"center"}
          margin={"20 0 0 0"}
          underline
        >
          Don't show again
        </CelText>
      </View>
    );
  };

  dontShowAgain = async theme => {
    const { actions } = this.props;

    if (theme) {
      actions.setUserAppSettings({ theme: THEMES.UNICORN });
    }

    await AsyncStorage.setItem("DONT_SHOW_INTRODUCE_NEW_THEME", "DONT_SHOW");
    actions.closeModal();
  };

  render() {
    const style = IntroduceNewThemeModalStyle();
    const { openedModal } = this.props;
    return (
      <Modal
        style={[
          style.container,
          {
            backgroundColor: getColor(COLOR_KEYS.BACKGROUND, THEMES.UNICORN),
          },
        ]}
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
