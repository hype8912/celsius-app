import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import CelApiDropdownStyle from "./CelApiDropdown.styles";
import * as appActions from "../../../redux/actions";
import Icon from "../../atoms/Icon/Icon";
import CelText from "../../atoms/CelText/CelText";
import Separator from "../../atoms/Separator/Separator";
import { MODALS } from "../../../constants/UI";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

@connect(
  state => ({
    apiKeys: state.apiKeys.keys,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CelApiDropdown extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
    };
    // binders
  }

  openDropdown = () => {
    const { onOpen, apiKey } = this.props;
    this.setState({ isExpanded: !this.state.isExpanded });
    onOpen(apiKey);
  };

  render() {
    const { children, apiKey, actions } = this.props;
    const { isExpanded } = this.state;
    const { permissions } = apiKey;
    const style = CelApiDropdownStyle();

    const borderRadius = isExpanded
      ? { borderTopLeftRadius: 8, borderTopRightRadius: 8 }
      : { borderRadius: 8 };

    return (
      <View style={style.dropDown}>
        <View>
          <View style={[style.normalButton, borderRadius]}>
            <View>
              <CelText
                type={"H4"}
                weight={"400"}
              >{`xxxx - xxxx - xxxx - ${children}`}</CelText>
            </View>

            <TouchableOpacity
              onPress={this.openDropdown}
              style={style.valueIcon}
            >
              <View style={style.valueIconRight}>
                <Icon
                  name={isExpanded ? "UpArrow" : "DownArrow"}
                  height={"10"}
                />
              </View>
            </TouchableOpacity>
          </View>
          {isExpanded && (
            <View style={style.separator}>
              <Separator />
            </View>
          )}
        </View>
        {isExpanded && (
          <View style={style.expand}>
            <CelText
              type={"H6"}
              weight={"400"}
              color={getColor(COLOR_KEYS.HEADLINE)}
            >
              Last used:
            </CelText>
            <CelText type={"H6"} weight={"400"} style={[{ marginBottom: 12 }]}>
              {moment(apiKey.lastUsed).format("MMMM D, YYYY")}
            </CelText>

            {(permissions.read_balance === "true" ||
              permissions.read_transactions === "true" ||
              permissions.read_deposit_address === "true" ||
              permissions.withdraw === "true") && (
              <View style={{ marginBottom: 12 }}>
                <CelText
                  type={"H6"}
                  weight={"400"}
                  color={getColor(COLOR_KEYS.HEADLINE)}
                >
                  Permissions:
                </CelText>
                {permissions.read_balance === "true" && (
                  <CelText type={"H6"} weight={"400"}>
                    Read wallet balance
                  </CelText>
                )}
                {permissions.read_transactions === "true" && (
                  <CelText type={"H6"} weight={"400"}>
                    Read transactions
                  </CelText>
                )}
                {permissions.read_deposit_address === "true" && (
                  <CelText type={"H6"} weight={"400"}>
                    Read deposits
                  </CelText>
                )}
                {permissions.withdraw === "true" && (
                  <CelText type={"H6"} weight={"400"}>
                    Read withdrawals
                  </CelText>
                )}
              </View>
            )}

            <TouchableOpacity
              onPress={() => actions.openModal(MODALS.API_KEY_REVOKE_MODAL)}
            >
              <CelText
                type={"H6"}
                weight={"400"}
                color={getColor(COLOR_KEYS.NEGATIVE_STATE)}
              >
                Revoke
              </CelText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

export default CelApiDropdown;
