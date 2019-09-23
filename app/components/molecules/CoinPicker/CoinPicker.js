import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import CelText from '../../atoms/CelText/CelText';
import CircleButton from '../../atoms/CircleButton/CircleButton';
import Icon from '../../atoms/Icon/Icon';

class CoinPicker extends Component {

  static propTypes = {
    coinList: PropTypes.instanceOf(Array).isRequired,
    updateFormField: PropTypes.func.isRequired,
    field: PropTypes.string.isRequired,
    value: PropTypes.string,
    onCoinSelect: PropTypes.func,
    defaultSelected: PropTypes.string,
    coinCompliance: PropTypes.instanceOf(Array).isRequired, // coinComplience are coins which are eligable to show up depending on screen on which they came from are opened
    navigateTo: PropTypes.func,
    type: PropTypes.string,
    onChange: PropTypes.func,

  };

  static defaultProps = {
    onCoinSelect: () => { },
    value: '',
    defaultSelected: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      coinListFormated: []
    };

  }

  componentDidMount() {
    const { type, updateFormField, field, onCoinSelect, defaultSelected, coinCompliance, onChange } = this.props;

    let coinListFormated = coinCompliance
    if (type === 'enterAmount') {
      coinListFormated = coinCompliance.map(coin => coin.value)
    }
    this.setState({ coinListFormated })

    if (defaultSelected) {
      if (onChange) {
        onChange(field, defaultSelected)
      }
      if (onCoinSelect) {
        onCoinSelect(field, defaultSelected)
      }
      updateFormField(field, defaultSelected);
    }

  }

  renderByType = () => {
    const { type, value, onCoinSelect, navigateTo, field, coinCompliance, onChange } = this.props;
    const { coinListFormated } = this.state


    switch (type) {
      case "depositAmount":
        return (
          <>
            <CelText align='center' weight="regular" type="H4">Choose coin to deposit</CelText>
            <TouchableOpacity onPress={() => navigateTo('SelectCoin', { coinList: coinListFormated, onCoinSelect, onChange, field })}>

              <CircleButton
                iconSize={30}
                style={{ marginBottom: 5, marginTop: 20 }}
                type="coin"
                icon={`Icon${value}`}
              />

              <View style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                <CelText type="H3" style={{ paddingRight: 10, }}>
                  {value}
                </CelText>
                <Icon width="13" height="13" name="CaretDown" />
              </View>
            </TouchableOpacity>
          </>
        )


      case "enterAmount":
        return (
          <>
            <TouchableOpacity onPress={() => navigateTo('SelectCoin', { coinList: coinListFormated, onCoinSelect, onChange, field })}>
              <View style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 5 }}>
                <CelText type="H3" style={{ paddingRight: 10, }}>
                  {(coinCompliance.find(coin => coin.value === value) || { label: "" }).label}
                </CelText>
                <Icon width="13" height="13" name="CaretDown" />
              </View>
            </TouchableOpacity>
          </>
        )

      default:
        break;
    }
  }

  render() {
    const CoinPickerByType = this.renderByType
    return <CoinPickerByType />
  }
}

export default CoinPicker
