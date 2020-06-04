import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import * as appActions from "../../../redux/actions";

import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import BlockExplorerCodeChangeStyle from "./BlockExplorerCodeChange.styles";
import STYLES from "../../../constants/STYLES";
import CelButton from "../../atoms/CelButton/CelButton";
import Icon from "../../atoms/Icon/Icon";

@connect(
  state => ({
    formData: state.forms.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BlockExplorerCodeChange extends Component {
  static propTypes = {
    celTierStats: PropTypes.instanceOf(Object),
    totalCelUsers: PropTypes.number,
  };
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Blockexplorer code change",
    right: "profile",
  });

  componentDidMount() {
    const { actions } = this.props;
    const blockExplorerCode =
      "0xDE082CC5F6F02D8B0F0A43357C77059620358BC272D88E84E922061FFCAE2BDD";
    actions.updateFormField("BlockExplorerCode", blockExplorerCode);
  }

  renderCodeCard = () => {
    const { formData } = this.props;
    return (
      <View>
        <CelText>Your current blockexplorer code</CelText>
        <Card padding={"0 15 0 15"} color={STYLES.COLORS.WHITE}>
          <CelText align={"left"} type={"H6"} margin={"10 0 10 0"}>
            {formData.BlockExplorerCode}
          </CelText>
        </Card>
      </View>
    );
  };

  renderInfoBox = () => {
    const style = BlockExplorerCodeChangeStyle();
    const infoBoxText =
      "For better security, we recommend you to change your unique code from time to time";

    return (
      <Card color={STYLES.COLORS.CELSIUS_BLUE}>
        <View style={style.infoBoxWrapper}>
          <View style={style.infoBoxIconWrapper}>
            <Icon
              name="Info"
              width="25"
              height="25"
              fill={STYLES.COLORS.WHITE}
            />
          </View>
          <View style={style.infoBoxTextWrapper}>
            <CelText type={"H5"} weight={"300"} color={STYLES.COLORS.WHITE}>
              {infoBoxText}
            </CelText>
          </View>
        </View>
      </Card>
    );
  };

  renderButton = () => {
    // const { actions } = this.props
    return (
      <View style={{ alignItems: "center" }}>
        <CelButton
          // onPress={() => console.log('button pressed')}
          style={{ alignSelf: "flex-start" }}
          margin="10 0 2 0"
        >
          Generate new code
        </CelButton>
      </View>
    );
  };

  render() {
    return (
      <RegularLayout>
        {this.renderInfoBox()}
        {this.renderCodeCard()}
        {this.renderButton()}
      </RegularLayout>
    );
  }
}

export default BlockExplorerCodeChange;
