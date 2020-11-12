import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View } from "react-native";

import { MODALS } from "../../../constants/UI";
import InfoModal from "../InfoModalNew/InfoModal";
import CelText from "../../atoms/CelText/CelText";
import * as appActions from "../../../redux/actions";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import Icon from "../../atoms/Icon/Icon";
import InfoBox from "../../atoms/InfoBox/InfoBox";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TaxReportDataNotAvailableModal extends Component {
  render() {
    const { actions } = this.props;
    return (
      <InfoModal
        name={MODALS.TAX_REPORT_DATA_NOT_AVAILABLE_MODAL}
        picture={require("../../../../assets/images/icon-report-not-available.png")}
        darkPicture={require("../../../../assets/images/icon-report-not-available-dark.png")}
        pictureDimensions={{ height: 40, width: 40 }}
        heading={"Data not available"}
        paragraphs={["There's no tax report available for the year selected."]}
        yesCopy={"I understand, close"}
        onYes={actions.closeModal}
      >
        <InfoBox
          backgroundColor={getColor(COLOR_KEYS.ALERT_STATE)}
          padding="15 15 15 15"
          left
        >
          <View style={{ flexDirection: "row" }}>
            <Icon
              name={"WarningCircle"}
              height="25"
              width="25"
              fill="#FFFFFF"
            />
            <CelText color={getColor(COLOR_KEYS.WHITE)} margin={"0 20 0 10"}>
              Celsius is currently only providing 1099s to qualified US
              individuals that earner 600 USD or more in a given tax year.
            </CelText>
          </View>
        </InfoBox>
      </InfoModal>
    );
  }
}

export default TaxReportDataNotAvailableModal;
