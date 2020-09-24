import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import IconButton from "../../organisms/IconButton/IconButton";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    allLoans: state.loans.allLoans,
    loanSettings: state.loans.loanSettings,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class LoanSettings extends Component {
  static navigationOptions = () => ({
    title: "Loan Settings",
    right: "profile",
  });

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    const { actions, navigation } = this.props;
    const id = navigation.getParam("id");
    actions.getLoanSettings(id);
  }

  render() {
    const { navigation, actions, loanSettings } = this.props;
    const id = navigation.getParam("id");

    if (!loanSettings) return <LoadingScreen />;

    return (
      <RegularLayout>
        <IconButton
          margin={"20 0 0 0"}
          onPress={() =>
            actions.navigateTo(SCREENS.INTEREST_PAYMENT_SETTINGS, { id })
          }
        >
          Interest Payment
        </IconButton>
      </RegularLayout>
    );
  }
}

export default LoanSettings;
