import React, { Component } from 'react';
import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import ConfirmCelPayModalStyle from "./ConfirmCelPayModal.styles";
import { MODALS } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import Separator from "../../atoms/Separator/Separator";
import CelModal from "../../organisms/CelModal/CelModal";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import STYLES from "../../../constants/STYLES";
import {SentTo} from "../../screens/TransactionDetails/TransactionDetailsSections";
import Card from "../../atoms/Card/Card";

@connect(
  state => ({
    transaction: state.transactions.transactionDetails,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class ConfirmCelPayModal extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const style = ConfirmCelPayModalStyle();
    const { actions, transaction } = this.props;

    return (
        <CelModal
          style={style.container}
          name={MODALS.CONFIRM_CELPAY_MODAL}
        >
          <CelText align={"center"} type={"H2"} margin={"20 0 0 0"} weight={"700"}>Confirm CelPay Details</CelText>
          <CelText align={"center"} type={"H5"} margin={"20 0 0 0"}>
            You are about to CelPay
          </CelText>
          <CelText align={"center"} type={"H1"}>
            0.01186547 BTC
          </CelText>
          <CelText align={"center"} type={"H3"}>
            $ 20 USD
          </CelText>

          <Separator color={STYLES.COLORS.MEDIUM_GRAY1} margin={"20 0 0 0"}/>

          <View style={style.amount}>
            <CelText type="H6">New wallet balance:</CelText>
            <CelText type="H6" weight="bold">
              {`${1000} | ${1000}`}
            </CelText>
          </View>

          <Separator color={STYLES.COLORS.MEDIUM_GRAY1} margin={"0 0 0 0"}/>

          {/*<SentTo*/}
          {/*  transaction={transaction}*/}
          {/*  text="Sent to:"*/}
          {/*  actions={actions}*/}
          {/*/>*/}

          <Card color={STYLES.COLORS.LIGHT_GRAY}>
            <CelText align={"center"} weight={"300"}>Follow instructions in email to complete this CelPay.</CelText>
          </Card>

          <View style={style.buttonsWrapper}>
            <CelModalButton position={"single"} buttonStyle={"basic"} onPress={() => {
              actions.closeModal()
            }}>
              Send Email Verification
            </CelModalButton>
          </View>

        </CelModal>
    );
  }
}

export default ConfirmCelPayModal
