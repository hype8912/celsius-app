import React, { Component } from "react";
import { View } from "react-native";
import GoogleReCaptcha from "../../../utils/recaptcha-util";

import { MODALS } from "../../../constants/UI";
import CelModal from "../CelModal/CelModal";
import ReCaptchaModalStyle from "./ReCaptchaModal.styles";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import Constants from "../../../../constants";

 class ReCaptchaModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    const style = ReCaptchaModalStyle();
    const { RECAPTCHA_KEY, RECAPTCHA_URL } = Constants;
    const { closeModal, onMessage } = this.props;

    return (
      <CelModal
        name={MODALS.RECAPTCHA_MODAL}
      >
        <View style={style.wrapper}>
          <GoogleReCaptcha
            siteKey={RECAPTCHA_KEY}
            url={RECAPTCHA_URL}
            languageCode='en'
            onMessage={onMessage}
          />
          <View style={style.buttonsWrapper}>
            <CelModalButton
              position={"single"}
              onPress={() => {closeModal()}}
              buttonStyle={"red"}
            >
              Cancel
            </CelModalButton>
          </View>
        </View>
      </CelModal>
    );
  }
};

export default ReCaptchaModal;
