import React, { Component } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import HODLViewCodeStyles from "./HODLViewCode.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import { getColor, getPadding } from "../../../utils/styles-util";
import { EMPTY_STATES } from "../../../constants/UI";
import CelCheckbox from "../../atoms/CelCheckbox/CelCheckbox";
import Card from "../../atoms/Card/Card";
import CelButton from "../../atoms/CelButton/CelButton";
import Spinner from "../../atoms/Spinner/Spinner";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import StaticScreen from "../StaticScreen/StaticScreen";
import { COLOR_KEYS } from "../../../constants/COLORS";
import InfoBox from "../../atoms/InfoBox/InfoBox";
import Icon from "../../atoms/Icon/Icon";
import ThemedImage from "../../atoms/ThemedImage/ThemedImage";

@connect(
  state => ({
    formData: state.forms.formData,
    hodlCode: state.hodl.hodlCode,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class HODLViewCode extends Component {
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      emptyState: false,
      showHodlCodeOverlay: true,
    };
    props.navigation.setParams({ hideBack: false });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "HODL Mode",
      right: "profile",
      gesturesEnabled: false,
      hideBack: navigation.getParam("hideBack") || false,
      customCenterComponent: { steps: 3, currentStep: 3, flowProgress: true },
    };
  };

  componentWillUnmount() {
    const { actions, navigation } = this.props;
    actions.clearForm();
    navigation.setParams({ hideBack: false });
  }

  checkEmail = async () => {
    const { actions, navigation } = this.props;
    const response = await actions.activateHodlMode();
    if (response && response.success) {
      this.setState({
        emptyState: true,
      });
      navigation.setParams({ hideBack: true });
    }
  };

  render() {
    const style = HODLViewCodeStyles();
    const { emptyState, showHodlCodeOverlay } = this.state;
    const { formData, actions, callsInProgress, hodlCode } = this.props;

    if (emptyState)
      return (
        <StaticScreen emptyState={{ purpose: EMPTY_STATES.CHECK_YOUR_EMAIL }} />
      );

    const loading = apiUtil.areCallsInProgress(
      [API.GET_HODL_CODE],
      callsInProgress,
    );

    return (
      <RegularLayout padding={"0 0 0 0"}>
        <View
          style={[
            { flex: 1, width: "100%", height: "100%" },
            { ...getPadding("20 20 100 20") },
          ]}
        >
          <CelText
            align={"left"}
            margin={"10 0 10 0"}
            type={"H2"}
            weight={"bold"}
          >
            How to deactivate HODL Mode
          </CelText>
          <CelText type={"H5"} align={"left"}>
            {"When you're ready to deactivate HODL Mode, you will need to enter the unique security code below. \n" +
            "\n" +
            "You will NOT be able to access this code once you enable HODL Mode, so you must securely store this code now and remember it in order to deactivate HODL Mode in the future."}
          </CelText>

          {!hodlCode ? (
            <View style={style.spinner}>
              <Spinner />
            </View>
          ) : (
            <Card margin={"20 0 20 0"}>

              <TouchableOpacity
                activeOpacity={1}
                onPressIn={() => this.setState({ showHodlCodeOverlay: false })}
                onPressOut={() => this.setState({ showHodlCodeOverlay: true })}>

                {this.state.showHodlCodeOverlay && <View
                  style={{
                    zIndex: 1,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                  }}
                >
                  <View
                    style={{
                      zIndex: 1,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      flexDirection: "row",
                      justifyContent: "center",
                    }}>
                    <ThemedImage
                      style={{
                        width: 22,
                        height: 20,
                        alignSelf: "center",
                      }}
                      lightSource={require("../../../../assets/images/hold-to-show.png")}
                      darkSource={require("../../../../assets/images/hold-to-show.png")}
                      unicornSource={require("../../../../assets/images/hold-to-show.png")}
                    />
                    <CelText link style={{ marginStart: 10, alignSelf: "center" }}>Long press to reveal</CelText>
                  </View>
                  <ImageBackground
                    style={{ flex: 1 }}
                    imageStyle={{ borderRadius: 6 }}
                    source={require("../../../../assets/images/blur_hodl.png")} />
                </View>

                }

                <View style={style.hodlCodeWrapper}>
                  <View style={style.codeWrapper}>
                    <CelText hideFromRecording align={"left"} type={"H2"} weight={"500"}>
                      {hodlCode}
                    </CelText>
                  </View>
                </View>
              </TouchableOpacity>
            </Card>
          )}

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
              <View style={{ flexDirection: "column" }}>
                <CelText weight="bold" color={getColor(COLOR_KEYS.WHITE)} margin={"0 20 0 10"}>
                  Warning: Do Not Screenshot
                </CelText>
                <CelText color={getColor(COLOR_KEYS.WHITE)} margin={"0 20 0 10"}>
                  For your security, it is strongly advised that you do NOT screenshot your two-factor authentication
                  code.
                </CelText>
              </View>
            </View>
          </InfoBox>

          <Card margin={"20 0 20 0"} padding={"15 15 0 15"}>
            <CelCheckbox
              onChange={(field, value) => actions.updateFormField(field, value)}
              field={`agreeHodlMode`}
              value={formData.agreeHodlMode}
              uncheckedCheckBoxColor={getColor(
                COLOR_KEYS.DOT_INDICATOR_INACTIVE,
              )}
              checkedCheckBoxColor={getColor(COLOR_KEYS.POSITIVE_STATE)}
              rightText={"I memorized my deactivation code"}
            />
          </Card>

          <CelButton
            disabled={!formData.agreeHodlMode}
            onPress={() => this.checkEmail()}
            loading={loading}
          >
            Send email verification
          </CelButton>
        </View>
      </RegularLayout>
    );
  }
}

export default HODLViewCode;
