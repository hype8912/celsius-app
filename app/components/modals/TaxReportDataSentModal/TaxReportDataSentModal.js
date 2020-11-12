import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View } from "react-native";

import PropTypes from "prop-types";
import { MODALS } from "../../../constants/UI";
import InfoModal from "../InfoModalNew/InfoModal";
import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import * as appActions from "../../../redux/actions";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import TaxReportDataSentModalStyle from "./TaxReportDataSentModal.styles";

@connect(
  state => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TaxReportDataSentModal extends Component {
  static propTypes = {
    date: PropTypes.string,
  };
  static defaultProps = {
    date: "February 1, 2021",
  };

  render() {
    const { actions, date } = this.props;

    const style = TaxReportDataSentModalStyle();

    return (
      <InfoModal
        name={MODALS.TAX_REPORT_SENT_MODAL}
        picture={require("../../../../assets/images/icon-report-sent.png")}
        darkPicture={require("../../../../assets/images/icon-report-sent-dark.png")}
        pictureDimensions={{ height: 40, width: 40 }}
        heading={"Your tax report has been sent"}
        paragraphs={[
          `Your tax report was sent via email on ${date} to the address associated with your Celsius wallet.`,
        ]}
        yesCopy={"I understand, close"}
        onYes={actions.closeModal}
      >
        <Card color={"transparent"}>
          <View style={style.contactSupportContainer}>
            <CelText color={getColor(COLOR_KEYS.HEADLINE)}>
              If you need assistance,
            </CelText>
            <CelText
              align="center"
              link
              onPress={() => Linking.openURL("mailto:app@celsius.network")}
            >
              contact support
            </CelText>
          </View>
        </Card>
      </InfoModal>
    );
  }
}

export default TaxReportDataSentModal;
