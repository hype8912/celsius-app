import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as appActions from "../../../redux/actions";
import CelTabsStyle from "./CelTabs.styles";
import CelText from "../../atoms/CelText/CelText";
import STYLES from "../../../constants/STYLES";


@connect(
  state => ({
   activeTab: state.ui.activeTab
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CelTabs extends Component {

  static propTypes = {
    tabs: PropTypes.instanceOf(Array)
  };

  constructor(props) {
    super(props);
    const { activeTab, tabs, actions} = props
    const labels = tabs.map (tab => tab.label)
    if (!labels.includes(activeTab)) actions.setActiveTab(labels[0])
  }


  setActiveTab = (activeTab) => {
    const { actions } = this.props;
    actions.setActiveTab(activeTab)
  }


  renderActiveTabComponent(style) {
    const {tabs, activeTab} = this.props
    let showTabComponent = tabs.find(tab => tab.label === activeTab)
    if (!showTabComponent) showTabComponent = tabs[0]

    return (
      <View style={style.activeTabContent}>
        {showTabComponent.component}
      </View>
    )
  }

  render() {
    const { tabs, width, activeTab } = this.props;
    const style = CelTabsStyle();

    return (
      <View style={style.container}>
        <View style={[style.tabs, { width, marginBottom: 10 }]}>
          {tabs.map((tab) => (
            <View
              key={tab.label}
            >
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => this.setActiveTab(tab.label)}
              >
                <CelText
                  type='H6'
                  weight={activeTab === tab.label ? "medium" : "regular"}
                  color={activeTab === tab.label ? STYLES.COLORS.CELSIUS_BLUE : null}
                >
                  {tab.label}
                </CelText>
                {activeTab === tab.label &&
                <View
                  style={style.underlineActive}/>
                }
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {this.renderActiveTabComponent(style)}
     </View>
    );
  }
}

export default CelTabs
