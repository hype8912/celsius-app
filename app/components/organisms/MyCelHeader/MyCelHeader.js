import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";

import MyCellHeaderStyle from './MyCelHeader.styles'
import formatter from "../../../utils/formatter"
import PieProgressBar from "../../graphs/PieProgressBar/PieProgressBar";

import CelText from '../../atoms/CelText/CelText'
import STYLES from '../../../constants/STYLES'

@connect(
  state => ({
    loyaltyInfo: state.user.loyaltyInfo,
    walletSummary: state.wallet.summary,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)

class MyCelHeader extends Component {
  static propTypes = {
    margin: PropTypes.string,
    padding: PropTypes.string,
  }

  render () {
    const { loyaltyInfo, walletSummary } = this.props;
    const style = MyCellHeaderStyle();
    const celAmount = walletSummary.coins.filter(coin => coin.short === "CEL")[0];
    let color;
    if (loyaltyInfo.tier_level === 1) color = STYLES.COLORS.GRAY;
    if (loyaltyInfo.tier_level === 2) color = STYLES.COLORS.ORANGE;
    if (loyaltyInfo.tier_level === 3) color = STYLES.COLORS.CELSIUS_BLUE;
    
    if(loyaltyInfo.tier_level === 0)  return null

    return (
      <View>
        <View
          style={
            [style.mainContainer,
              { backgroundColor: color }
            ]}
        >
          <View style={style.topContainer}>
            <View>
              <CelText
                color={"white"}
                type={"H4"}
                weight={"700"}
              >
                { formatter.usd(celAmount.amount_usd) }
              </CelText>
              <CelText
                color={"white"}
                type={"H5"}
                weight={"300"}
              >
                CEL coins
              </CelText>
            </View>

            <View style={style.arcChart}>
              <PieProgressBar
                color={color}
                level={loyaltyInfo.tier_level}
                tier={loyaltyInfo.tier.title}
              />
            </View>

            <View style={style.otherCoinsContainer}>
              <CelText color={"white"} type={"H4"} weight={"700"}>
                {formatter.usd(walletSummary.total_amount_usd - celAmount.amount_usd, { precision: 0 })}
              </CelText>
              <CelText color={"white"} type={"H5"} weight={"300"}>
                Other coins
              </CelText>
            </View>
          </View>

          { loyaltyInfo.tier_level !== 3 &&
            <View style={style.bottomContainer}>
              <CelText
                color={"white"}
                type={"H5"}
                weight={"300"}
              >
                { 'To achieve next level, deposit '}
              </CelText>
              <CelText
                color={"white"}
                type={"H5"}
                weight={"700"}
              >
                { formatter.crypto(loyaltyInfo.next_level_cel, "CEL")}
              </CelText>
              <CelText
                color={"white"}
                type={"H5"}
                weight={"700"}
              >
                {` (${formatter.usd(loyaltyInfo.next_level_usd)})`}
              </CelText>
            </View>
          }
          
        </View>
      </View>
    ) 
  }
}

export default MyCelHeader
