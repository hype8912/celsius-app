import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View } from "react-native";

import MarginCallModalStyle from "./MarginCallModal.styles";
import CelModal from "../CelModal/CelModal.js";
import { LOAN_ALERTS, MODALS } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import Card from "../../atoms/Card/Card";
import Separator from "../../atoms/Separator/Separator";
import * as appActions from "../../../redux/actions";
import { presentTime } from "../../../utils/ui-util";
import { SCREENS } from "../../../constants/SCREENS";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { getColor } from "../../../utils/styles-util";

@connect(
  state => ({
    loanAlerts: state.loans.loanAlerts,
    allLoans: state.loans.allLoans,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class MarginCallModal extends Component {
  cure = (multipleAlerts, loansOverview) => {
    const { actions } = this.props;
    if (multipleAlerts) {
      actions.navigateTo(SCREENS.MARGIN_CALL_OVERVIEW_SCREEN, {
        allLoans: true,
      });
    } else {
      actions.navigateTo(SCREENS.SINGLE_MARGIN_CALL_SCREEN, {
        id: loansOverview[0].id,
      });
    }
    actions.closeModal();
  };

  render() {
    const { allLoans, loanAlerts } = this.props;
    const style = MarginCallModalStyle();
    let time;
    const loansOverview = allLoans
      .filter(loan =>
        loanAlerts.find(
          alert =>
            alert.id === loan.id && alert.type === LOAN_ALERTS.MARGIN_CALL_ALERT
        )
      )
      .sort((a, b) => a.id - b.id);

    const multipleAlerts = loansOverview.length > 1;

    return (
      <CelModal
        style={style.container}
        name={MODALS.LOAN_ALERT_MODAL}
        picture={require("../../../../assets/images/alert-icon.png")}
        pictureDimensions={style.modalDimension}
      >
        <View style={style.wrapper}>
          <CelText align={"center"} type={"H2"} weight={"500"}>
            Margin Call Alert
          </CelText>
          <CelText type={"H5"} align={"center"} margin={"10 0 0 0"}>
            To avoid default and possible liquidation please take action!
          </CelText>
          <Separator margin={"10 0 0 0"} />
          {loansOverview.map(loan => {
            if (loan && loan.margin_call) {
              time = presentTime(loan.margin_call.margin_call_detected, true);
            }
            return (
              <View>
                <View style={style.loanToValue}>
                  <CelText weight={"500"} type={"H5"}>
                    {`Loan - #${loan.id}`}
                  </CelText>
                  <CelText weight={"500"} type={"H5"}>
                    Current LTV:{" "}
                    <CelText
                      color={getColor(COLOR_KEYS.NEGATIVE_STATE)}
                    >{`${Math.round(loan.current_ltv)}%`}</CelText>
                  </CelText>
                </View>
                <Separator margin={"5 0 0 0"} />

                {!multipleAlerts && time.days < 1 && (
                  <Card color={getColor(COLOR_KEYS.BACKGROUND)}>
                    <CelText align={"left"} weight={"500"} type={"H6"}>
                      Time remaining to resolve
                    </CelText>
                    <CelText align={"left"} weight={"500"} type={"H3"}>
                      {`${time.hours}h ${time.minutes}m`}
                    </CelText>
                  </Card>
                )}
              </View>
            );
          })}
        </View>

        <View style={style.buttonsWrapper}>
          <CelModalButton
            buttonStyle={"red"}
            onPress={() => this.cure(multipleAlerts, loansOverview)}
          >
            Resolve Margin Call
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default MarginCallModal;
