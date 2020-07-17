import React, { Component } from "react";
import { BackHandler, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationEvents } from "react-navigation";
// eslint-disable-next-line import/no-unresolved
import { openInbox } from "react-native-email-link";
import * as appActions from "../../../redux/actions";

import ActivateSixDigitPinStyle from "./ActivateSixDigitPin.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelButton from "../../atoms/CelButton/CelButton";
import Card from "../../atoms/Card/Card";
import Icon from "../../atoms/Icon/Icon";
import STYLES from "../../../constants/STYLES";

@connect(
  state => ({
    formData: state.forms.formData,
    user: state.user.profile,
    hasSixDigitPin: state.user.profile.hasSixDigitPin,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ActivateSixDigitPin extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    headerSameColor: false,
    transparent: true,
    hideBack: true,
    gesturesEnabled: false,
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () => {
      return true;
    });
    this.setState({
      loading: false,
    });
  }

  onScreenFocus = () => {
    const { actions } = this.props;
    actions.getUserStatus();
  };

  onPressBtn = async () => {
    const { navigation } = this.props;
    this.setState({
      loading: true,
    });
    const onSuccess = navigation.getParam("onSuccess");
    onSuccess();
  };

  renderEmailAppCard = () => {
    return (
      <Card onPress={() => openInbox()}>
        <Icon name={"Mail"} width="25" height="25" />
        <CelText type={"H5"} weight={"300"} align={"center"}>
          Open Email app
        </CelText>
      </Card>
    );
  };

  renderInfoBox = () => {
    const style = ActivateSixDigitPinStyle();
    return (
      <Card color={STYLES.COLORS.GREEN}>
        <View style={style.infoBoxWrapper}>
          <View style={style.infoBoxIconWrapper}>
            <Icon
              name={"CheckCircle"}
              width="25"
              height="25"
              fill={STYLES.COLORS.WHITE}
            />
          </View>
          <View style={style.infoBoxTextWrapper}>
            <CelText type={"H5"} weight={"300"} color={STYLES.COLORS.WHITE}>
              Successfully activated new 6-Digits PIN code
            </CelText>
          </View>
        </View>
      </Card>
    );
  };

  render() {
    const { loading } = this.state;
    const { hasSixDigitPin } = this.props;
    const style = ActivateSixDigitPinStyle();
    return (
      <RegularLayout fabType="hide">
        <NavigationEvents onDidFocus={this.onScreenFocus} />
        <View style={style.container}>
          <View style={style.contentWrapper}>
            <CelText
              weight="bold"
              align="center"
              type="H2"
              margin="20 40 10 40"
              style={style.title}
            >
              Activate your 6-digits PIN
            </CelText>
            <CelText
              weight="light"
              align="center"
              margin="20 30 10 30"
              style={style.subtitle}
            >
              Your request has been sent. Follow email instructions to activate
              6-Digits PIN code.
            </CelText>

            {hasSixDigitPin ? this.renderInfoBox() : this.renderEmailAppCard()}
          </View>

          <View style={style.buttonWrapper}>
            <CelButton
              disabled={!hasSixDigitPin}
              style={style.button}
              loading={loading}
              onPress={this.onPressBtn}
            >
              Continue
            </CelButton>
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default ActivateSixDigitPin;
