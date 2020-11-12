import React, { Component } from "react";
import { View, Linking, FlatList } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MODALS } from "../../../constants/UI";

import * as appActions from "../../../redux/actions";
import CelSegmentedControl from "../../atoms/CelSegmentedControl/CelSegmentedControl";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import TaxReportDataNotAvailableModal from "../../modals/TaxReportDataNotAvailableModal/TaxReportDataNotAvailable";
import TaxReportDataSentModal from "../../modals/TaxReportDataSentModal/TaxReportDataSentModal";
import TaxReportInPreparationModal from "../../modals/TaxReportInPreparationModal/TaxReportInPreparationModal";
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

  showMessage = () => {
    const { actions, user } = this.props;
    actions.showMessage(
      "info",
      `Check your email. We've started creating your report and will email it to ${user.email} when is ready. This could take a few minutes.`
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

        <TaxReportInPreparationModal date={"February 1, 2021"} />
        <TaxReportDataNotAvailableModal />
        <TaxReportDataSentModal date={"February 1, 2020"} />
      </RegularLayout>
    );
  }
}

export default TaxReport;
