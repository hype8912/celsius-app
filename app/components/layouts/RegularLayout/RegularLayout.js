import React, { Component } from "react";
import {
  ScrollView,
  SafeAreaView,
  RefreshControl,
  View,
  Platform,
} from "react-native";
import PropTypes from "prop-types";
import { withNavigationFocus } from "react-navigation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";

import RegularLayoutStyle from "./RegularLayout.styles";
import { getColor, getPadding } from "../../../utils/styles-util";
import { FAB_TYPE } from "../../../constants/UI";
import KeyboardShift from "../../atoms/KeyboardShift/KeyboardShift";
import OfflineMode from "../../atoms/OfflineMode/OfflineMode";
import Spinner from "../../atoms/Spinner/Spinner";
import animationsUtil from "../../../utils/animations-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import Constants from "../../../../constants";

const { STORYBOOK } = Constants;

@connect(
  state => ({
    internetConnected: state.app.internetConnected,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class RegularLayout extends Component {
  static propTypes = {
    padding: PropTypes.string,
    enableParentScroll: PropTypes.bool,
    fabType: PropTypes.oneOf(FAB_TYPE),
    pullToRefresh: PropTypes.func,
  };

  static defaultProps = {
    padding: "20 20 100 20",
    enableParentScroll: true,
    fabType: "main",
  };

  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    };
  }

  componentDidMount = () => this.setFabType();
  componentDidUpdate = () => this.setFabType();

  refresh = async () => {
    const { pullToRefresh } = this.props;
    this.setState({
      refreshing: true,
    });
    await pullToRefresh();
    this.setState({
      refreshing: false,
    });
  };

  setFabType = () => {
    if (STORYBOOK) return;
    const { isFocused, fabType, actions } = this.props;
    if (isFocused === true) {
      actions.setFabType(fabType);
    }
  };

  render() {
    const {
      theme,
      children,
      padding,
      enableParentScroll,
      internetConnected,
      pullToRefresh,
    } = this.props;
    const { refreshing } = this.state;
    const style = RegularLayoutStyle(theme);
    const paddings = getPadding(padding);

    if (!internetConnected) {
      return (
        <SafeAreaView style={[style.container, style.noInternet]}>
          <OfflineMode />
        </SafeAreaView>
      );
    }

    return (
      <React.Fragment>
        {refreshing && (
          <View style={style.loaderView}>
            {Platform.OS === "ios" && <Spinner />}
          </View>
        )}
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          scrollEnabled={enableParentScroll}
          style={style.container}
          contentContainerStyle={[{ flexGrow: 1 }, paddings]}
          scrollEventThrottle={1}
          onScroll={event =>
            animationsUtil.scrollListener(event.nativeEvent.contentOffset.y)
          }
          refreshControl={
            pullToRefresh && (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.refresh}
                tintColor="transparent"
                colors={["transparent"]}
                style={{ backgroundColor: getColor(COLOR_KEYS.TRANSPARENT) }}
              />
            )
          }
        >
          <SafeAreaView style={{ flex: 1 }}>
            <KeyboardShift>
              <>{children}</>
            </KeyboardShift>
          </SafeAreaView>
        </ScrollView>
      </React.Fragment>
    );
  }
}

export default withNavigationFocus(RegularLayout);
