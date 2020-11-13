import React, { Component } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Modal from "react-native-modal";

import { MODALS, THEMES } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import * as appActions from "../../../redux/actions";
import { isIos } from "../../../utils/ui-util";
import Icon from "../../atoms/Icon/Icon";
import CelButton from "../../atoms/CelButton/CelButton";
import TaxReportMarketingModalStyle from "./TaxReportMarketingModal.styles";

@connect(
  state => ({
    openedModal: state.ui.openedModal,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TaxReportMarketingModal extends Component {
  renderTop = () => {
    const { actions } = this.props;
    const style = TaxReportMarketingModalStyle();
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
    const style = TaxReportMarketingModalStyle();
    const { actions } = this.props;

    return (
      <View style={style.wrapper}>
        <Image
          source={require("../../../../assets/images/tax-report-unicorn.png")}
          style={style.image}
        />
        <CelText
          margin="0 40 0 40"
          weight="bold"
          align="center"
          type="H2"
          style={style.title}
        >
          Your tax report is ready
        </CelText>
        <CelText weight="light" align="center" style={style.subtitle}>
          You are now able to download the tax report for the year 2019. Celsius
          provides you 1099s if you earned $600 or more in a given tax year.
        </CelText>

        <CelButton
          style={style.button}
          margin="10 0 2 0"
          size="small"
          iconRight="IconArrowRight"
          iconRightWidth={18}
          iconRightHeight={18}
          onPress={() => actions.closeModal()}
        >
          Download Report
        </CelButton>
        <CelText
          color={getColor(COLOR_KEYS.PRIMARY_BUTTON)}
          onPress={() => actions.closeModal()}
        >
          Remind me later
        </CelText>
      </View>
    );
  };

  render() {
    const style = TaxReportMarketingModalStyle();
    const { openedModal } = this.props;

    return (
      <Modal
        style={style.container}
        isVisible={openedModal === MODALS.TAX_REPORT_MARKETING_MODAL}
        useNativeDriver={!isIos()}
      >
        <View style={style.contentWrapper}>
          {this.renderTop()}
          {this.renderContent()}
        </View>
      </Modal>
    );
  }
}

export default TaxReportMarketingModal;
