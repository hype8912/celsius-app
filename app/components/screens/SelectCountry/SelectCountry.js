import React, { Component } from 'react';
import PropTypes from "prop-types";
import { TouchableOpacity, Image, FlatList, View } from "react-native";
import { countries } from "country-data";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import * as appActions from "../../../redux/actions";
import SelectCountryStyles from "./SelectCountry.styles";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelText from '../../atoms/CelText/CelText';
import Icon from '../../atoms/Icon/Icon';
import { HIGHLIGHTED_COUNTRIES } from '../../../constants/UI';
import Separator from '../../atoms/Separator/Separator';

@connect(
  state => ({
    formData: state.forms.formData
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class SelectCountry extends Component {

  static propTypes = {
    withPhones: PropTypes.bool,
  };
  static defaultProps = {
    withPhones: false,
  };

  static navigationOptions = () => (
    {
      title: "Select Country",
      right: 'search'
    }
  )

  static getDerivedStateFromProps(nextProps, prevState) {

    const newState = {};
    let allCountries = [];
    const field = nextProps.navigation && nextProps.navigation.getParam('field_name', false);
    const activeField = nextProps.formData && nextProps.formData[field];

    if (!prevState.allCountries || prevState.allCountries.length === 0) {
      const countryList = countries.all.filter(c => c.status === 'assigned' && c.countryCallingCodes.length)
      countryList.sort((a, b) => {

        if (activeField && activeField.name === a.name) return -1;
        if (activeField && activeField.name === b.name) return 1;

        if (HIGHLIGHTED_COUNTRIES.includes(a.name)) return -1;
        if (HIGHLIGHTED_COUNTRIES.includes(b.name)) return 1;

        if (HIGHLIGHTED_COUNTRIES.includes(a.name)) return -1;
        if (HIGHLIGHTED_COUNTRIES.includes(b.name)) return 1;

        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;

        return 0;
      });

      newState.allCountries = countryList;
      allCountries = countryList;
    } else {
      allCountries = prevState.allCountries;
    }

    const text = nextProps.formData && nextProps.formData.search || "";
    if (text) {
      newState.filteredCountries = allCountries.filter(c => c.name.toLowerCase().includes(text.toLowerCase()))
    } else {
      newState.filteredCountries = allCountries
    }

    return newState;
  }

  constructor(props) {
    super(props);

    this.state = {
      allCountries: [],
      filteredCountries: [],
    };

    this.hideCallingCodes = props.navigation.getParam('hideCallingCodes', false);
  }

  onCountrySelect = async (field, country) => {
    const { actions } = this.props
    await actions.updateFormField(field, country);
    await actions.updateFormField('search', "");
    await actions.updateFormField('activeSearch', false);
    actions.navigateBack()
  }

  getSelectStyle = (style, isActive = false) => {
    const itemStyle = [style.item];
    if (isActive) itemStyle.push(style.activeItem);
    return itemStyle;
  }

  isLastHighligtedCountry = (country) => {
    const { filteredCountries: arr } = this.state;
    const hCArr = HIGHLIGHTED_COUNTRIES;
    if (country.name && hCArr.includes(country.name)) {
      const tempArr = arr.length > hCArr.length + 1 ? arr.slice(0, hCArr.length + 1) : arr;
      const arrLength = arr.length > hCArr.length + 1 ? hCArr.length + 1 : arr.length;
      for (let i = arrLength - 1; i >= 0; i--) {
        if (hCArr.includes(tempArr[i].name)) return country.name === tempArr[i].name;
      }
    }
    return false;
  }

  renderCountries = ({ item: country }) => {
    const { navigation, formData } = this.props;
    const style = SelectCountryStyles();
    const field = navigation.getParam('field_name', 'NO-FIELD');
    const isActive = formData[field] && formData[field].name && formData[field].name.toLowerCase() === country.name.toLowerCase();
    const itemStyle = this.getSelectStyle(style, isActive);
    const renderSeparator = this.isLastHighligtedCountry(country);
    return (
      <React.Fragment>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.onCountrySelect(field, country)}>
          <View style={itemStyle}>
            <View style={style.left}>
              {this.renderImage(country.alpha2)}
              {!this.hideCallingCodes && <CelText type="H4" align="left" style={{ marginLeft: 5, width: 50 }}>{country.countryCallingCodes ? country.countryCallingCodes[0] : ''}</CelText>}
              <CelText type="H4" align="left" style={{ marginLeft: 10, maxWidth: 150 }}>
                {country.name}
              </CelText>
            </View>
            <View style={style.right}>
              {isActive && <Icon width="26" height="26" name="GreenCheck" />}
            </View>
          </View>
        </TouchableOpacity>
        {renderSeparator && <Separator />}
      </React.Fragment>
    );
  }

  renderImage = (iso = "") => {
    const style = SelectCountryStyles();
    return <Image source={{ uri: `https://raw.githubusercontent.com/hjnilsson/country-flags/master/png250px/${iso.toLowerCase()}.png` }} resizeMode="cover" style={style.flagImage} /> // Todo(sb): change hardcoded link with our images folder link
  }

  render() {
    const { filteredCountries } = this.state;
    const style = SelectCountryStyles();
    const itemStyle = this.getSelectStyle(style);

    return (
      <RegularLayout fabType="hide">
        <View style={{ width: '100%' }}>
          {filteredCountries.length > 0 ?
            <FlatList
              data={filteredCountries}
              renderItem={this.renderCountries}
              keyExtractor={(country) => country.alpha2}
            />
            : (
              <View style={itemStyle}>
                <CelText>No countries match your search.</CelText>
              </View>
            )}
        </View>
      </RegularLayout>
    );
  }
}

export default SelectCountry
