import React, { Component } from "react";
import { View, Linking, FlatList } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { MODALS } from "../../../constants/UI";

import * as appActions from "../../../redux/actions";
import { getColor } from "../../../utils/styles-util";
import Card from "../../atoms/Card/Card";
import CelSegmentedControl from "../../atoms/CelSegmentedControl/CelSegmentedControl";
import CelText from "../../atoms/CelText/CelText";
import Icon from "../../atoms/Icon/Icon";
import InfoBox from "../../atoms/InfoBox/InfoBox";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import InfoModal from "../../modals/InfoModalNew/InfoModal";
import TaxReportStyle from "./TaxReport.styles";

@connect(
  state => ({
    user: state.user.profile,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TaxReport extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Tax report",
  });

  showModal = name => {
    const { actions } = this.props;
    actions.openModal(name);
  };

  closeModal = () => {
    const { actions } = this.props;
    actions.closeModal();
  };

  /* Modals */
  configureTaxReportInPreparationModal = date => {
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
        onYes={this.closeModal}
      >
        <Card color={getColor(COLOR_KEYS.BACKGROUND)}>
          <CelText color={getColor(COLOR_KEYS.HEADLINE)} margin={"0 20 0 10"}>
            Celsius will notify you once your report is ready.
          </CelText>
        </Card>
      </InfoModal>
    );
  };

  configureTaxReportDataNotAvailableModal = () => {
    return (
      <InfoModal
        name={MODALS.TAX_REPORT_DATA_NOT_AVAILABLE_MODAL}
        picture={require("../../../../assets/images/icon-report-not-available.png")}
        darkPicture={require("../../../../assets/images/icon-report-not-available-dark.png")}
        pictureDimensions={{ height: 40, width: 40 }}
        heading={"Data not available"}
        paragraphs={["There's no tax report available for the year selected."]}
        yesCopy={"I understand, close"}
        onYes={this.closeModal}
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
  };

  configureTaxReportDataSentModal = date => {
    const style = TaxReportStyle();

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
        onYes={this.closeModal}
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
  };

  render() {
    const data = [
      {
        year: "2020",
        status: "Preparing",
        color: "orange",
      },
      {
        year: "2019",
        status: "Available",
        color: "green",
      },
      {
        year: "2018",
        status: "Not eligible",
        color: "red",
      },
    ];

    const style = TaxReportStyle();

    return (
      <RegularLayout>
        <CelText align="center">Select the desired tax year report</CelText>
        <CelText margin={"30 0 0 0"} align="center" weight={"600"}>
          Receiving method
        </CelText>
        <View style={style.switchContainer}>
          <CelSegmentedControl
            width={214}
            height={42}
            options={[
              { name: "Email", image: "email" },
              { name: "Mail", image: "mail" },
            ]}
          />
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={style.listItem}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={style.yearStatusContainer}>
                  <CelText type={"H3"} weight={"600"}>
                    {item.year}
                  </CelText>
                  <CelText type={"H7"} style={{ color: item.color }}>
                    {item.status}
                  </CelText>
                </View>
                <View>
                  <CelText
                    type={"H5"}
                    link
                    onPress={() => this.showModal(MODALS.TAX_REPORT_SENT_MODAL)}
                  >
                    {item.status === "Available" ? "Get report" : "Info"}
                  </CelText>
                </View>
              </View>
            </View>
          )}
        />
        <View style={style.footer}>
          <CelText align="center">Need help?</CelText>
          <CelText
            align="center"
            link
            onPress={() => Linking.openURL("mailto:app@celsius.network")}
          >
            Contact Support
          </CelText>
        </View>

        {this.configureTaxReportInPreparationModal("February 1, 2021")}
        {this.configureTaxReportDataNotAvailableModal()}
        {this.configureTaxReportDataSentModal("February 1, 2020")}
      </RegularLayout>
    );
  }
}

export default TaxReport;
