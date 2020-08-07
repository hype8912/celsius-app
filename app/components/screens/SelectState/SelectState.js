import React, { Component } from "react";
import { TouchableOpacity, Image, FlatList, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import SelectStateStyles from "./SelectState.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelText from "../../atoms/CelText/CelText";
import Icon from "../../atoms/Icon/Icon";
import SELECT_VALUES from "../../../constants/SELECT_VALUES";

@connect(
  state => ({
    formData: state.forms.formData,
    activeScreen: state.nav.activeScreen,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class SelectState extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Select US State",
    right: "search",
  });

  static getDerivedStateFromProps(nextProps, prevState) {
    const { allStates } = prevState;
    const { formData } = nextProps;
    const filteredStates = formData.search
      ? allStates.filter(s =>
          s.value.toLowerCase().includes(formData.search.toLowerCase())
        )
      : allStates;

    return {
      ...prevState,
      filteredStates,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      allStates: SELECT_VALUES.STATE,
      filteredStates: SELECT_VALUES.STATE,
      field: props.navigation.getParam("field") || "state",
    };
  }

  onSelectState = async (field, state) => {
    const { actions, activeScreen } = this.props;
    await actions.updateFormFields({
      [field]: state.value,
      search: "",
    });
    if (activeScreen === "SelectState") {
      actions.navigateBack();
    }
  };

  getSelectStyle = (style, isActive = false) => {
    const itemStyle = [style.item];
    if (isActive) itemStyle.push(style.activeItem);
    return itemStyle;
  };

  renderStates = ({ item: state }) => {
    const { formData } = this.props;
    const { field } = this.state;
    const style = SelectStateStyles();

    const isActive = formData[field] && formData[field] === state.value;

    const itemStyle = this.getSelectStyle(style, isActive);

    return (
      <React.Fragment>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => this.onSelectState(field, state)}
        >
          <View style={itemStyle}>
            <View style={style.left}>
              {this.renderImage(state.value)}

              <CelText
                type="H4"
                align="left"
                style={{ marginLeft: 10, maxWidth: 350 }}
              >
                {state.label}
              </CelText>
            </View>
            <View style={style.right}>
              {isActive && <Icon width="26" height="26" name="GreenCheck" />}
            </View>
          </View>
        </TouchableOpacity>
      </React.Fragment>
    );
  };

  renderImage = stateName => {
    const style = SelectStateStyles();
    const formattedName = stateName.toLowerCase().replace(" ", "_");
    const url = `https://raw.githubusercontent.com/RobertMyles/flagfillr/master/state-flags/united-states-of-america-flags/${formattedName}.png`;
    return (
      <Image source={{ uri: url }} resizeMode="cover" style={style.flagImage} />
    );
  };

  render() {
    const { filteredStates } = this.state;

    const style = SelectStateStyles();
    const itemStyle = this.getSelectStyle(style);

    return (
      <RegularLayout fabType="hide">
        <View style={{ width: "100%" }}>
          {filteredStates.length > 0 ? (
            <FlatList
              data={filteredStates}
              renderItem={this.renderStates}
              keyExtractor={state => state.value}
            />
          ) : (
            <View style={itemStyle}>
              <CelText>No US States match your search.</CelText>
            </View>
          )}
        </View>
      </RegularLayout>
    );
  }
}

export default SelectState;
