import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import Separator from "../../atoms/Separator/Separator";
import CelButton from "../../atoms/CelButton/CelButton";
import CelCheckbox from "../../atoms/CelCheckbox/CelCheckbox";
import Icon from "../../atoms/Icon/Icon";
import STYLES from "../../../constants/STYLES";
import { isUSResident } from "../../../utils/user-util";
import PerCoinCelInterestCardStyle from "./PerCoinCelInterestCard.styles";
import ScrollMore from "../../atoms/ScrollMore/ScrollMore";
import userBehaviorUtil from "../../../utils/user-behavior-util";

@connect(
  state => ({
    appSettings: state.user.appSettings,
    formData: state.forms.formData,
    currencies: state.currencies.rates,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class PerCoinCelInterestCard extends Component {
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    const { appSettings, actions, currencies } = props;

    const coinList = Object.keys(appSettings.interest_in_cel_per_coin).filter(
      coin => coin !== "CEL"
    );
    const coinNames = {};
    currencies.forEach(c => {
      coinNames[c.short] = c.displayName;
    });
    const totalCoins = Object.keys(appSettings.interest_in_cel_per_coin).length;
    let countCoinsTrue = 0;
    let checked = false;

    Object.keys(appSettings.interest_in_cel_per_coin).forEach(key => {
      if (appSettings.interest_in_cel_per_coin[key] === true) countCoinsTrue++;
    });

    if (countCoinsTrue > 0 && countCoinsTrue < totalCoins) {
      checked = true;
    } else if (countCoinsTrue === totalCoins) {
      checked = false;
    }

    this.state = {
      coinList,
      coinNames,
      isLoading: false,
      isExpanded: false,
      checked,
    };

    actions.initForm({
      interestInCel: appSettings.interest_in_cel,
      coinsInCel: { ...appSettings.interest_in_cel_per_coin },
    });
  }

  componentWillReceiveProps(nextProps) {
    const { appSettings, actions, formData } = this.props;

    if (
      !_.isEqual(appSettings, nextProps.appSettings) ||
      !nextProps.formData.coinsInCel
    ) {
      actions.initForm({
        interestInCel: nextProps.appSettings.interest_in_cel,
        coinsInCel: { ...nextProps.appSettings.interest_in_cel_per_coin },
      });
    }

    if (
      !_.isEqual(
        formData.coinsInCel,
        nextProps.formData.coinsInCel && nextProps.formData.coinsInCel
      )
    ) {
      this.changeMainCheck(nextProps.formData.coinsInCel);
    }
  }

  changeMainCheck = coinsInCel => {
    if (!coinsInCel) return;
    const { formData, actions, appSettings } = this.props;
    let countCoinsTrue = 0;
    // cel is in the appSettings list and set to false, but IN REALITY it is true :)
    const totalCoins =
      Object.keys(appSettings.interest_in_cel_per_coin).length - 1;

    Object.keys(coinsInCel).forEach(key => {
      if (coinsInCel[key] === true) return countCoinsTrue++;
    });

    if (
      countCoinsTrue > 0 &&
      countCoinsTrue < totalCoins &&
      !this.state.checked
    ) {
      this.setState({ checked: true });
    } else if (this.state.checked && countCoinsTrue === totalCoins) {
      this.setState({ checked: false });
    }

    if (countCoinsTrue && !formData.interestInCel) {
      actions.updateFormField("interestInCel", true);
    } else if (!countCoinsTrue && formData.interestInCel) {
      actions.updateFormField("interestInCel", false);
    }
  };

  saveSelection = async () => {
    const { actions, formData } = this.props;
    const { coinList } = this.state;

    const interestInCelPerCoin = {};
    let areAllCoinsOff = true;
    coinList.forEach(c => {
      areAllCoinsOff = areAllCoinsOff && !formData.coinsInCel[c];
      interestInCelPerCoin[c] = formData.coinsInCel[c];
    });

    this.setState({ isLoading: true });

    await actions.setUserAppSettings({
      interest_in_cel: !areAllCoinsOff,
      interest_in_cel_per_coin: interestInCelPerCoin,
    });
    userBehaviorUtil.interestInCEL(interestInCelPerCoin);
    this.setState({ isLoading: false });
  };

  toggleAll = (field, value) => {
    const { actions } = this.props;
    const { coinList } = this.state;

    const interestInCel = value;
    const interestInCelPerCoin = {};
    coinList.forEach(c => {
      interestInCelPerCoin[c] = interestInCel;
    });
    actions.initForm({
      interestInCel,
      coinsInCel: { ...interestInCelPerCoin },
    });
  };

  renderImage() {
    let icon;

    if (this.state.checked) {
      icon = (
        <Icon
          name="MinusBorder"
          width="23"
          height="23"
          fill={STYLES.COLORS.CELSIUS_BLUE}
          style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: STYLES.COLORS.GRAY,
          }}
        />
      );
    } else {
      icon = (
        <Icon
          name="CheckedBorder"
          width="23"
          height="23"
          fill={STYLES.COLORS.GREEN}
        />
      );
    }
    return icon;
  }

  render() {
    if (isUSResident()) return null;
    const style = PerCoinCelInterestCardStyle();

    const { formData, actions } = this.props;
    const { coinList, isExpanded, coinNames, isLoading } = this.state;

    if (!formData.coinsInCel) return null;

    return (
      <Card>
        <CelCheckbox
          field="interestInCel"
          onChange={this.toggleAll}
          value={formData.interestInCel}
          fillColor={style.fillColor.color}
          rightText="Earn interest in CEL"
          textWeight="400"
          checkedImage={this.renderImage()}
          unChecked={
            <Icon
              name="Unchecked"
              width={23}
              height={23}
              fill={style.iconFill.color}
              style={{
                borderWidth: 1,
                borderRadius: 6,
                borderColor: STYLES.COLORS.GRAY,
              }}
            />
          }
        />

        <Separator margin="0 0 15 0" />

        <TouchableOpacity
          onPress={() => this.setState({ isExpanded: !isExpanded })}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 10,
          }}
        >
          <CelText weight="300" type="H4" color={STYLES.COLORS.MEDIUM_GRAY}>
            Choose each coin separately
          </CelText>
          <View style={{ paddingTop: 5, paddingRight: 5 }}>
            <Icon
              name={isExpanded ? "IconChevronUp" : "IconChevronDown"}
              height="9"
              fill={STYLES.COLORS.MEDIUM_GRAY}
              width="14"
              iconOpacity={0.5}
            />
          </View>
        </TouchableOpacity>
        {isExpanded && (
          <View>
            <ScrollView
              style={{ marginTop: 25, height: 210 }}
              nestedScrollEnabled
            >
              {coinList.map(c => (
                <CelCheckbox
                  key={c}
                  field={c}
                  onChange={(field, value) => {
                    actions.updateFormFields({
                      ...formData,
                      coinsInCel: {
                        ...formData.coinsInCel,
                        ...{ [field]: value },
                      },
                    });
                  }}
                  value={!!formData.coinsInCel[c]}
                  rightText={`${coinNames[c]} - ${c}`}
                  fillColor={STYLES.COLORS.MEDIUM_GRAY}
                  textWeight="300"
                  checkedImage={
                    <Icon
                      name="CheckedBorder"
                      width="23"
                      height="23"
                      fill={STYLES.COLORS.GREEN}
                    />
                  }
                  unChecked={
                    <Icon
                      name="Unchecked"
                      width="23"
                      height="23"
                      fill={style.iconFill.color}
                      style={{
                        borderWidth: 1,
                        borderRadius: 6,
                        borderColor: STYLES.COLORS.GRAY,
                      }}
                    />
                  }
                />
              ))}
              <View style={{ height: 30 }} />
            </ScrollView>
            <ScrollMore height={210 + 30} />
          </View>
        )}

        <Separator margin="10 0 10 0" />

        <CelButton
          onPress={this.saveSelection}
          margin="5 0 0 0"
          loading={isLoading}
        >
          Save
        </CelButton>
      </Card>
    );
  }
}

export default PerCoinCelInterestCard;
