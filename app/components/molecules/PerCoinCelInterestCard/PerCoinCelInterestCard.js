import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import _ from 'lodash'

import * as appActions from "../../../redux/actions";
import CelText from '../../atoms/CelText/CelText';
import Card from "../../atoms/Card/Card";
import Separator from "../../atoms/Separator/Separator";
import CelButton from "../../atoms/CelButton/CelButton";
import CelCheckbox from "../../atoms/CelCheckbox/CelCheckbox";
import Icon from "../../atoms/Icon/Icon";
import STYLES from '../../../constants/STYLES';
import { isUSCitizen } from "../../../utils/user-util";

@connect(
  state => ({
    appSettings: state.user.appSettings,
    formData: state.forms.formData,
    currencies: state.currencies.rates,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class PerCoinCelInterestCard extends Component {
  static propTypes = {};
  static defaultProps = {}

  constructor(props) {
    super(props);
    const { appSettings, actions, currencies } = props

    const coinList = Object.keys(appSettings.interest_in_cel_per_coin)
    const coinNames = {}
    currencies.forEach(c => {
      coinNames[c.short] = c.displayName
    })

    this.state = {
      coinList,
      coinNames,
      isLoading: false,
      isExpanded: false,
    };

    actions.initForm({
      interestInCel: appSettings.interest_in_cel,
      ...appSettings.interest_in_cel_per_coin,
    })
  }

  componentWillReceiveProps(nextProps) {
    const { appSettings, actions } = this.props

    if (!_.isEqual(appSettings, nextProps.appSettings)) {
      actions.initForm({
        interestInCel: nextProps.appSettings.interest_in_cel,
        ...nextProps.appSettings.interest_in_cel_per_coin,
      })
    }
  }

  saveSelection = async () => {
    const { actions, formData } = this.props;
    const { coinList } = this.state

    const interestInCelPerCoin = {}
    let areAllCoinsOff = true
    coinList.forEach(c => {
      areAllCoinsOff = areAllCoinsOff && !formData[c]
      interestInCelPerCoin[c] = formData[c]
    })

    this.setState({ isLoading: true })

    await actions.setUserAppSettings({
      interest_in_cel: !areAllCoinsOff,
      interest_in_cel_per_coin: interestInCelPerCoin,
    })

    this.setState({ isLoading: false })
  }

  toggleAll = (field, value) => {
    const { actions } = this.props
    const { coinList } = this.state

    const interestInCel = value
    const interestInCelPerCoin = {}
    coinList.forEach(c => {
      interestInCelPerCoin[c] = interestInCel
    })

    actions.initForm({
      interestInCel,
      ...interestInCelPerCoin,
    })
  }

  render() {
    if (isUSCitizen()) return null

    const { formData, actions } = this.props
    const { coinList, isExpanded, coinNames, isLoading } = this.state
    return (
      <Card>
        <CelCheckbox
          field="interestInCel"
          updateFormField={actions.updateFormField}
          onChange={this.toggleAll}
          value={formData.interestInCel}
          rightText="Earn interest in CEL"
          rightTextStyle={{ color: 'red' }}
        />

        <Separator margin="0 0 15 0" />

        <TouchableOpacity
          onPress={() => this.setState({ isExpanded: !isExpanded })}
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10 }}
        >
          <CelText color={STYLES.COLORS.MEDIUM_GRAY}>Choose each coin separately</CelText>
          <Icon
            name={isExpanded ? "UpArrow" : "DownArrow"}
            height='9'
            fill={STYLES.COLORS.MEDIUM_GRAY}
            width='15'
          />

        </TouchableOpacity>
        {isExpanded && (
          <View style={{ marginTop: 25 }}>
            {coinList.map(c => (
              <CelCheckbox
                key={c}
                field={c}
                updateFormField={actions.updateFormField}
                value={formData[c]}
                rightText={`${coinNames[c]} - ${c}`}
              />
            ))}

            <CelButton
              onPress={this.saveSelection}
              basic
              margin="5 0 0 0"
              loading={isLoading}
            >
              Save
            </CelButton>
          </View>
        )}

      </Card>
    );
  }
}

export default PerCoinCelInterestCard
