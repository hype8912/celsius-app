import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import CelText from "../../../atoms/CelText/CelText";
import CelModal from "../../../organisms/CelModal/CelModal";
import { MODALS } from "../../../../constants/UI";
import RejectionReasonsModalStyle from "./RejectionReasonsModal.styles";

class RejectionReasonsModal extends Component {
  static propTypes = {
    rejectionReasons: PropTypes.arrayOf(PropTypes.string),
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { rejectionReasons } = this.props;
    const style = RejectionReasonsModalStyle();

    return (
      <CelModal name={MODALS.KYC_REJECTION_REASONS_MODAL}>
        <CelText weight={"700"} type={"H3"} margin={"40 0 0 0"}>
          What could have gone wrong?
        </CelText>
        <CelText margin={"10 0 10 0"}>
          There is nothing to worry about if your identity verification failed.
          To prevent it from happening again consider some of options listed
          below before submitting again
        </CelText>
        {rejectionReasons &&
          rejectionReasons.map((r, i) => (
            <View style={style.item} key={i}>
              <CelText style={style.bullet} margin={"10 5 0 0"}>
                &#8226;{" "}
              </CelText>
              <CelText style={style.text} type={"H7"} margin={"15 0 15 0"}>
                {r}
              </CelText>
            </View>
          ))}
      </CelModal>
    );
  }
}

export default RejectionReasonsModal;
