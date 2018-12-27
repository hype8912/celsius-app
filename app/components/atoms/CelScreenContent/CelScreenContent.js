// TODO(fj): check what this does?
// TODO(fj): a wrapper to Content?
// TODO(fj): it is used in every screen

import React from 'react';
import { View } from 'react-native';
import { Content } from 'native-base';
import stylesUtil from '../../../utils/styles-util';

// import {STYLES} from "../../config/constants/style";
// import CelScreenContentStyle from "./CelScreenContent.styles";

const CelScreenContent = (props) => (
  <Content style={stylesUtil.getPadding(props.padding || '0 30 0 30')} scrollEnabled={!props.scrollDisabled} enableOnAndroid bounces={false}>
    {props.children}
    <View style={{ height: 50 }} />
  </Content>
)

export default CelScreenContent;
