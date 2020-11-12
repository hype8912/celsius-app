import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import PropTypes from "prop-types";
import { MODALS } from "../../../constants/UI";
import InfoModal from "../InfoModalNew/InfoModal";
import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import * as appActions from "../../../redux/actions";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TaxReportInPreparationModal extends Component {
  static propTypes = {
    date: PropTypes.string,
  };
  static defaultProps = {
    date: "February 1, 2021",
  };

  render() {
    const { actions, date } = this.props;
    return (
      <InfoModal
        name={MODALS.TAX_REPORT_IN_PREPARATION_MODAL}
        picture={require("../../../../assets/images/icon-report-pending.png")}
        darkPicture={require("../../../../assets/images/icon-report-pending-dark.png")}
        pictureDimensions={{ height: 40, width: 40 }}
        heading={"Your tax report is in preparation"}
        paragraphs={[
          `Your tax report is generated annually and will be available by ${date}. Celsius will notify you once your report is ready.`,
        ]}
        yesCopy={"I understand, close"}
        onYes={actions.closeModal}
      >
        <Card color={getColor(COLOR_KEYS.BACKGROUND)}>
          <CelText color={getColor(COLOR_KEYS.HEADLINE)} margin={"0 20 0 10"}>
            Celsius will notify you once your report is ready.
          </CelText>
        </Card>
      </InfoModal>
    );
  }
}

export default TaxReportInPreparationModal;
