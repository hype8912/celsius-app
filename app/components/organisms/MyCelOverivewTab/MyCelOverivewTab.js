
import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as appActions from "../../../redux/actions";
import MyCelOverivewTabStyle from "./MyCelOverivewTab.styles";
import CelText from "../../atoms/CelText/CelText";
// import STYLES from "../../../constants/STYLES";
import formatter from "../../../utils/formatter";
import { widthPercentageToDP } from "../../../utils/styles-util";
import ThemedImage from '../../atoms/ThemedImage/ThemedImage'
import CalculateLoyaltyModal from "../../organisms/CalculateLoyaltyModal/CalculateLoyaltyModal"
import { MODALS } from "../../../constants/UI";

@connect(
  state => ({
    loyaltyInfo: state.user.loyaltyInfo,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)

class MyCelOverivewTab extends Component {
  render() {
    const {
      actions,
      width,
      loyaltyInfo
    } = this.props;
    const style = MyCelOverivewTabStyle();

    return (
      <View style={style.container}>
        <View style={[width, style.contentWrapper]}>
          <View style={{ alignSelf: 'center', flexDirection: "row", paddingBottom: 20, }}>
            <CelText
              type={"H5"}
              weight={"500"}
              style={{ marginTop: widthPercentageToDP("23.3") / 3 }}
              // color={color}
            >
              Your CEL Ratio is
            </CelText>
            <CelText
              type={"H3"}
              weight={"700"}
              style={{
                left: 5,
                top: widthPercentageToDP("23.3%") / 3.5
              }}
            >
              {`${Math.round(formatter.percentage(loyaltyInfo.cel_ratio))}%`}
            </CelText>
          </View>
          <View style={style.wrapper}>
            <View style={style.circle}>
              <ThemedImage
                style={[
                  style.starIcon,
                  { marginTop: 6 }
                ]}
                lightSource={require('../../../../assets/images/loyaltyIcons/reward-icon3x.png')}
                darkSource={require('../../../../assets/images/loyaltyIcons/reward-dark-icon3x.png')}
              />
            </View>
            <View style={{ marginTop: 40 }}>
              <CelText
                style={style.title}
                type={"H3"}
                weight={"600"}
                align={"center"}
              >
                Always Updating
              </CelText>
              <CelText
                style={style.explanation}
                align={"center"}
                type={"H4"}
                weight={"300"}
              >
                Your loyalty level is dynamic and will change with changing wallet balances. This includes new wallet
                activity as well as market fluctuations, so be sure to check your status every week!
              </CelText>
            </View>
          </View>

          <TouchableOpacity onPress={() => actions.openModal(MODALS.MY_CEL_LOYALTY_CALCULATOR_MODAL)}>
            <CelText
              style={style.loyalityQuestion}
              type={"H4"}
              align={"center"}
              weight={"400"}
            >
              How do we calculate loyalty level?
            </CelText>
          </TouchableOpacity>
        </View>
        <CalculateLoyaltyModal />
      </View>
    );
  }
}

export default MyCelOverivewTab;
