import React, { Component } from "react";
import PropTypes from "prop-types";
import { ScrollView, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import RejectionReasonsModalStyle from "./RejectionReasonsModal.styles";
import CelModal from "../CelModal/CelModal.js";
import { MODALS } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";

import * as appActions from "../../../redux/actions";
import { heightPercentageToDP } from "../../../utils/styles-util";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";

@connect(
  state => ({
    rejectionReasons: state.user.profile.kyc
      ? state.user.profile.kyc.rejectionReasons
      : [],
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
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
    const style = RejectionReasonsModalStyle();
    const { rejectionReasons, actions } = this.props;
    return (
      <CelModal
        style={style.container}
        name={MODALS.KYC_REJECTION_REASONS_MODAL}
      >
        <ScrollView style={{ maxHeight: heightPercentageToDP("60%") }}>
          <CelText align="center" type="H2" margin="0 25 15 25" weight="bold">
            What could have gone wrong?
          </CelText>
          <CelText type="H4" margin="0 25 15 25">
            There is nothing to worry about if your identity verification
            failed. To prevent it from happening again consider some of options
            listed below before submitting again
          </CelText>
          {rejectionReasons &&
            rejectionReasons.map((r, i) => (
              <View style={style.item} key={i}>
                <CelText style={style.bullet} margin={"10 5 0 0"}>
                  &#8226;{" "}
                </CelText>
                <CelText style={style.text} type={"H6"} margin={"15 0 15 0"}>
                  {r}
                </CelText>
              </View>
            ))}
        </ScrollView>
        <View style={style.buttonsWrapper}>
          <CelModalButton onPress={() => actions.closeModal()}>
            I Understand
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default RejectionReasonsModal;
