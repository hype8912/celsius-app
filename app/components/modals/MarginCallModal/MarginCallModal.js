import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { View } from "react-native";

import MarginCallModalStyle from "./MarginCallModal.styles";
import CelModal from "../CelModal/CelModal.js";
import { MODALS } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import Card from "../../atoms/Card/Card";
import STYLES from "../../../constants/STYLES";
import Separator from "../../atoms/Separator/Separator";

class MarginCallModal extends Component {
  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };

    // binders
  }

  cure = () => {
    // const { actions } = this.props;
  };

  render() {
    const style = MarginCallModalStyle();

    // TODO add map in case there are multiple margin calls
    const marginCall = {
      activeLoan: "1015",
      ltv: "30%",
      remainingTime: "2d 12h 56m",
    };

    return (
      <CelModal
        style={style.container}
        name={MODALS.MARGIN_CALL_MODAL}
        picture={require("../../../../assets/images/alert-icon.png")}
      >
        <View style={style.wrapper}>
          <CelText align={"left"} type={"H2"} weight={"500"}>
            Margin Call Alert
          </CelText>
          <View style={style.loanToValue}>
            <CelText color={STYLES.COLORS.CELSIUS_BLUE}>
              {` Active Loan - #${marginCall.activeLoan}`}
            </CelText>
            <CelText type={"H5"}>
              Current LTV:{" "}
              <CelText color={STYLES.COLORS.RED}>{marginCall.ltv}</CelText>
            </CelText>
            <Separator margin={"10 0 0 0"} />
          </View>

          <CelText align={"left"} margin={"0 0 10 0"}>
            To avoid default and possible liquidation please take action!
          </CelText>

          <Card color={style.background.backgroundColor}>
            <CelText align={"left"} weight={"500"} type={"H5"}>
              Time remaining to cure Margin Call
            </CelText>
            <CelText align={"left"} weight={"500"} type={"H3"}>
              {marginCall.remainingTime}
            </CelText>
          </Card>
        </View>

        <View style={style.buttonsWrapper}>
          <CelModalButton buttonStyle={"red"} onPress={() => this.cure()}>
            Cure Margin Call
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default MarginCallModal;
