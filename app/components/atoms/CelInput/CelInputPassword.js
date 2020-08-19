import React, { Component } from "react";
import { TouchableOpacity, View, Platform } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import CelInputText from "./CelInputText";
import CelText from "../CelText/CelText";
import PassMeterTooltip from "../PassMeterTooltip/PassMeterTooltip";
import PassStrengthMeter from "../PassStrengthMeter/PassStrengthMeter";
import * as appActions from "../../../redux/actions";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

@connect(
  state => ({
    forms: state.forms,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CelInputPassword extends Component {
  static propTypes = {
    type: PropTypes.oneOf([
      "text",
      "password",
      "phone",
      "checkbox",
      "pin",
      "tfa",
      "number",
    ]),
    autoFocus: PropTypes.bool,
    // autoComplete: // android only
    disabled: PropTypes.bool,
    maxLenght: PropTypes.number,
    placeholder: PropTypes.string,
    keyboardType: PropTypes.oneOf([
      "default",
      "number-pad",
      "decimal-pad",
      "numeric",
      "email-address",
      "phone-pad",
    ]),
    returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
    style: PropTypes.oneOfType([
      PropTypes.instanceOf(Object),
      PropTypes.number,
    ]),
    autoCapitalize: PropTypes.oneOf([
      "none",
      "sentences",
      "words",
      "characters",
    ]),
    onChange: PropTypes.func, //
    autoCorrect: PropTypes.bool, //
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), //
    field: PropTypes.string.isRequired, //
    error: PropTypes.string, //
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  };

  static defaultProps = {
    type: "text",
    keyboardType: "default",
    autoFocus: false,
    disabled: false,
    maxLenght: 100,
    autoCapitalize: "none",
    value: "",
  };

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      visible: false,
    };
  }

  render() {
    const {
      value,
      disabled,
      showPasswordTooltip,
      toolTipPositionTop,
      forms,
      field,
      showPassMeter,
    } = this.props;
    const { visible } = this.state;
    const iconName = visible ? "HIDE" : "SHOW";
    const activeField = forms.activeField;
    return (
      <React.Fragment>
        <View>
          <View
            style={{
              position: "absolute",
              top: toolTipPositionTop ? -145 : 90,
              left: 0,
            }}
          >
            {!!value && showPasswordTooltip && activeField === field && (
              <>
                <View
                  style={
                    // TODO: move to style after create CelInputPassword component
                    {
                      position: "absolute",
                      width: 0,
                      height: 0,
                      marginLeft: 145,
                      top: !toolTipPositionTop ? -10 : "auto",
                      bottom: toolTipPositionTop ? -10 : "auto",
                      borderLeftWidth: 10,
                      borderRightWidth: 10,
                      borderBottomWidth: 10,
                      borderStyle: "solid",
                      backgroundColor: COLOR_KEYS.TRANSPARENT,
                      borderLeftColor: COLOR_KEYS.TRANSPARENT,
                      borderRightColor: COLOR_KEYS.TRANSPARENT,
                      borderBottomColor: getColor(
                        COLOR_KEYS.CIRCLE_ICON_FOREGROUND
                      ), // TODO: check and create tooltip case in storybook
                      transform: [
                        {
                          rotate: toolTipPositionTop ? "180deg" : "0deg",
                        },
                      ],
                    }
                  }
                />
                <PassMeterTooltip password={value} />
              </>
            )}
          </View>

          <View>
            <CelInputText
              {...this.props}
              secureTextEntry={!visible}
              style={{
                paddingRight: 15,
              }}
            />
            {!!value && showPassMeter && (
              <PassStrengthMeter
                password={value}
                customStyle={{
                  flex: 1,
                  width: "110%",
                  marginHorizontal: "-5%",
                  position: "absolute",
                  bottom: Platform.OS === "android" ? -22 : -26,
                }}
              />
            )}
          </View>
        </View>
        {!!value && !disabled && (
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 10,
              top: 13,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => this.setState({ visible: !visible })}
          >
            <CelText type="H5" align={"center"}>
              {iconName}
            </CelText>
          </TouchableOpacity>
        )}
      </React.Fragment>
    );
  }
}

export default CelInputPassword;
