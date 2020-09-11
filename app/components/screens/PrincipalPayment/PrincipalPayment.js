import React, { Component } from "react";
import { Platform, Switch } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import IconButton from "../../organisms/IconButton/IconButton";
import { getColor } from "../../../utils/styles-util";
import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import Spinner from "../../atoms/Spinner/Spinner";
import { COLOR_KEYS } from "../../../constants/COLORS";

@connect(
  state => ({
    user: state.user.profile,
    formData: state.forms.formData,
    loanSettings: state.loans.loanSettings,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class PrincipalPayment extends Component {
  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Principal Payout",
    right: "profile",
  });

  constructor(props) {
    super(props);

    this.state = {
      payOutPrincipalFromCollateral: undefined,
      loading: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.loanSettings &&
      nextProps.loanSettings !== prevState.payOutPrincipalFromCollateral
    ) {
      return {
        payOutPrincipalFromCollateral:
          nextProps.loanSettings.payout_principal_from_collateral,
      };
    }
    return null;
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.getProfileInfo();
  }

  rightSwitch = () => {
    const { payOutPrincipalFromCollateral } = this.state;

    // TODO move to styles
    const isIos = Platform.OS === "ios";
    const falseColor = isIos
      ? getColor(COLOR_KEYS.TRANSPARENT)
      : getColor(COLOR_KEYS.TAB_UNSELECTED); // TODO; missing COLOR_KEYS

    return (
      <Switch
        onValueChange={this.handleSwitchChange}
        value={payOutPrincipalFromCollateral}
        thumbColor={getColor(COLOR_KEYS.TOGGLE_OFF_BACKGROUND)}
        ios_backgroundColor={getColor(COLOR_KEYS.TAB_UNSELECTED)}
        trackColor={{
          false: falseColor,
          true: getColor(COLOR_KEYS.POSITIVE_STATE),
        }}
      />
    );
  };

  handleSwitchChange = async () => {
    const { navigation, actions } = this.props;
    const { payOutPrincipalFromCollateral } = this.state;
    const id = navigation.getParam("id");

    this.setState({
      loading: true,
    });

    await actions.updateLoanSettings(id, {
      payout_principal_from_collateral: !payOutPrincipalFromCollateral,
    });
    this.setState({
      loading: false,
    });
    this.renderMessage();
  };

  renderMessage = () => {
    const { actions } = this.props;
    if (this.state.payOutPrincipalFromCollateral) {
      actions.showMessage(
        "success",
        "You have successfully set up an automatic collateral payout."
      );
    }
  };

  render() {
    const { actions, navigation } = this.props;
    const { payOutPrincipalFromCollateral, loading } = this.state;
    const Switcher = this.rightSwitch;
    const id = navigation.getParam("id");

    // TODO see when are CEL and USD PRINCIPAL PAYMENT TYPE gonna be implemented

    return (
      <RegularLayout>
        <IconButton
          margin={"10 0 10 0"}
          right={loading ? <Spinner size={30} /> : <Switcher />}
          hideIconRight
        >
          Payout From Collateral
        </IconButton>
        {payOutPrincipalFromCollateral ? (
          <Card color={getColor(COLOR_KEYS.ALERT_STATE)}>
            <CelText weight="300" alignItems="center" color="#FFFFFF">
              Your principal loan amount and any unpaid interest will
              automatically be deducted from your collateral upon loan maturity
              date. Any additional collateral will then be unlocked and
              available in your wallet balance.
            </CelText>
          </Card>
        ) : null}

        {!payOutPrincipalFromCollateral ? (
          <IconButton
            margin="10 0 10 0"
            onPress={() => actions.navigateTo("PrincipalPaymentType", { id })}
          >
            Change Principal Payment Type
          </IconButton>
        ) : null}
      </RegularLayout>
    );
  }
}

export default PrincipalPayment;
