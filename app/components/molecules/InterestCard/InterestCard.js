import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Platform, Switch, View } from 'react-native'

import Card from '../../atoms/Card/Card'
import STYLES from '../../../constants/STYLES'
import CelText from "../../atoms/CelText/CelText";
import * as appActions from "../../../redux/actions";
import { getTheme } from "../../../utils/styles-util";
import { THEMES } from "../../../constants/UI";
import Spinner from "../../atoms/Spinner/Spinner";
import { isUSCitizen } from "../../../utils/user-util";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)

class InterestCard extends Component {
  static propTypes = {
    coin: PropTypes.string,
    interestInCoin: PropTypes.bool,
    setUserAppSettings: PropTypes.func.isRequired
  }
  static defaultProps = {}

  constructor (props) {
    super(props)

    this.state = { loading: false }
  }

  handleValueChange = async value => {
    const { setUserAppSettings, coin, interestInCoins } = this.props
    this.setState({ loading: true })
    // // TODO see if needed
    // if(!value) await deleteSecureStoreKey('HIDE_MODAL_INTEREST_IN_CEL')

    await setUserAppSettings({
      interest_in_cel : true,
      interest_in_cel_per_coin: {
        ...interestInCoins,
        [coin]: value,
      }
    });

    this.setState({ loading: false })
  };

  render () {
    const { interestInCoins, tier,coin, actions } = this.props
    const { loading } = this.state

    if (tier === 'NONE') return null
    if (isUSCitizen()) return null

    const falseColor = Platform.OS === 'ios' ? 'transparent' : STYLES.COLORS.DARK_GRAY3
    const theme = getTheme()
    return (
      <View style={{justifyContent: "space-between"}}>
        <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 10}}>
          <CelText color={"#737A82"} type={"H4"} weight={"300"}>Earn interest in CEL</CelText>
          { loading ? (
            <Spinner size={30} />
          ) : (
            <Switch
              thumbColor={ theme === 'light' ? STYLES.COLORS.WHITE : STYLES.COLORS.DARK_TOGGLE_FOREGROUND }
              ios_backgroundColor={ theme === 'light' ? STYLES.COLORS.DARK_GRAY3 : STYLES.COLORS.DARK_TOGGLE_BACKGROUND }
              trackColor={{ false: falseColor, true: STYLES.COLORS.GREEN }}
              value={interestInCoins[coin]}
              onValueChange={this.handleValueChange}
            />
          )}
        </View>
        <Card color={ theme !== THEMES.DARK ? STYLES.COLORS.LIGHT_GRAY : STYLES.COLORS.DARK_GRAY}>
          <CelText weight={"300"} type={"H7"}>To earn interest in CEL on all your deposited coins, visit <CelText onPress={() => actions.navigateTo("MyCel")} weight={"300"} type={"H7"} color={STYLES.COLORS.CELSIUS_BLUE}>My CEL</CelText> page.</CelText>
        </Card>
      </View>
    )
  }
}

export default InterestCard
