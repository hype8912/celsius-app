
import React, { Component } from "react";
import { View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as appActions from "../../../redux/actions";
import MyCelLoansTabStyle from "./MyCelLoansTab.styles";
import CelText from "../../atoms/CelText/CelText";
// import STYLES from "../../../constants/STYLES";
import ThemedImage from '../../atoms/ThemedImage/ThemedImage'

@connect(
  state => ({
    loyaltyInfo: state.user.loyaltyInfo,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)

class MyCelInterestTab extends Component {
  render() {
    const {
       width,
       loyaltyInfo 
      } = this.props;
    const style = MyCelLoansTabStyle();

    return (
      <View style={style.contentWrapper}>
        <View style={{ width, marginBottom: 10 }}>
          <View style={style.wrapper}>
            <View style={ style.circle }>
              <ThemedImage
                style={[
                  style.starIcon,
                  { marginTop: 6 }
                ]}
                lightSource={ require('../../../../assets/images/loyaltyIcons/celsiusCircleIcon3x.png') }
                  darkSource={ require('../../../../assets/images/loyaltyIcons/celsiusCircleIconDark3x.png') }
              />
            </View>
            <View style={{marginTop: 40}}>
              <CelText 
                style={ style.title }
                type={"H3"}
                weight={"600"}
                align={"center"}
              >
                Lower interest on Loans
              </CelText>
              <CelText
                style={ style.explanation }
                align={"center"}
                type={"H4"}
                weight={"300"}
              >
               Payout your loan interest with CEL to decrease you monthly payment.
              </CelText>
            </View>
          </View>
          <View style={style.wrapper}>
            <CelText
              style={ style.explanation }
              align={"center"}
              type={"H4"}
              weight={"300"}
            >
              Based on your{' '}
                <CelText
                  style={ style.explanation }
                  align={"center"}
                  type={"H4"}
                  weight={"500"}
                >
                  Loyality Level{' '}
                  <CelText
                    style={ style.explanation }
                    align={"center"}
                    type={"H4"}
                    weight={"300"}
                  >
                    your interest payment would be:{' '}
                </CelText>
              </CelText>
            </CelText>
            <CelText
                style={ style.title }
                align={"center"}
                type={"H1"}
                weight={"600"}
              >
                { `${loyaltyInfo.tier.loanInterestBonus * 100}%` } less
              </CelText>
          </View>
        </View>
      </View>
    );
  }
}

export default MyCelInterestTab;
