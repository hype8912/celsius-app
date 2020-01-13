import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";
// import MyCelStyle from "./MyCel.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import MyCellHeader from "../../organisms/MyCelHeader/MyCelHeader";
import CelTabs from "../../organisms/CelTabs/CelTabs";
import MyCelOverivewTab from "../../organisms/MyCelOverivewTab/MyCelOverivewTab";
import MyCelInterestTab from "../../organisms/MyCelInterestTab/MyCelInterestTab";
import MyCelLoansTab from "../../organisms/MyCelLoansTab/MyCelLoansTab";

@connect(
  state => ({
    loyaltyInfo: state.user.loyaltyInfo,
    appSettings: state.user.appSettings,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class MyCel extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "My CEL",
    right: "profile",
  });

  componentDidMount() {
    const { actions } = this.props;
    actions.getLoyaltyInfo();
    actions.getUserAppSettings();
  }

  render() {
    const {
      loyaltyInfo,
      appSettings,
      // actions,
    } = this.props;
    // const style = MyCelStyle();

    if (!loyaltyInfo || !appSettings) return <LoadingScreen />;

    const tabs = [
      { label: "OVERVIEW", component: <MyCelOverivewTab /> },
      { label: "INTEREST", component: <MyCelInterestTab /> },
      { label: "LOANS", component: <MyCelLoansTab /> },
    ];

    return (
      <RegularLayout padding={"0 0 100 0"}>
        <MyCellHeader />
        <CelTabs tabs={tabs} />
      </RegularLayout>
    );
  }
}

export default MyCel;
