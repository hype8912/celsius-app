import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';


import * as appActions from "../../../redux/actions";
import FabStyle from "./Fab.styles";
import CircleButton from '../../atoms/CircleButton/CircleButton';
import { FAB_TYPE } from '../../../constants/UI';

@connect(
  state => ({
    fabMenuOpen: state.ui.fabMenuOpen
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Fab extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    type: PropTypes.oneOf(FAB_TYPE)
  };
  static defaultProps = {
  }

  getIconName = () => {
    const { fabMenuOpen, type } = this.props;
    if (fabMenuOpen) return 'Close';
    return {
      'main': 'Celsius',
      'support': 'Support'
    }[type]
  }

  render() {
    const { onPress } = this.props
    const iconName = this.getIconName();
    const style = FabStyle();

    return (
      <CircleButton style={style.fabButtonStyle} type="menu" theme={'celsius'} onPress={onPress} icon={iconName} />
    );
  }
}

export default Fab
