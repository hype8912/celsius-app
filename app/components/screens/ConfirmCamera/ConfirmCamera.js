import React, { Component } from 'react';
import { View, SafeAreaView, Image } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";


import * as appActions from "../../../redux/actions";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import STYLES from '../../../constants/STYLES';
import Spinner from '../../atoms/Spinner/Spinner';
import CelButton from '../../atoms/CelButton/CelButton';
import apiUtil from '../../../utils/api-util';
import API from '../../../constants/API';

@connect(
  state => ({
    mask: state.camera.mask,
    photo: state.camera.photo,
    cameraHeading: state.camera.cameraHeading,
    callsInProgress: state.api.callsInProgress
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class ConfirmCamera extends Component {

  static navigationOptions = () => ({
    headerSameColor: true,
  });

  savePhoto = () => {
    const { actions, cameraField, photo, navigation } = this.props;

    const onSave = navigation.getParam('onSave');

    if (onSave) {
      onSave(photo);
    } else {
      actions.updateFormField(cameraField, photo);
      actions.navigateBack();
    }
  }


  render() {
    const { mask, cameraHeading, photo, actions, callsInProgress } = this.props;
    const loading = apiUtil.areCallsInProgress(API.TAKE_CAMERA_PHOTO, callsInProgress);
    return (
      <RegularLayout fabType='hide'>
        <View style={{ alignSelf: 'center', flex: 1, justifyContent: 'center', width: '100%' }}>
          <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, flexDirection: 'row', marginBottom: 20 }}>
              <CelText weight="700" type='H1' align='center' style={{ alignSelf: 'flex-end', flex: 1 }}>{cameraHeading}</CelText>
            </SafeAreaView>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }} />
            {photo && !loading ?
              <Image
                resizeMode="contain"
                source={photo}
                style={{
                  width: STYLES.imageSizes[mask].width,
                  height: STYLES.imageSizes[mask].height, borderWidth: 5,
                  borderColor: STYLES.COLORS.WHITE,
                  borderRadius: mask === 'circle' ? STYLES.imageSizes[mask].width / 2 : 0,
                  backgroundColor: '#F1EFEE'
                }}
              />
              : (
                <View style={{
                  width: STYLES.imageSizes[mask].width,
                  height: STYLES.imageSizes[mask].height, borderWidth: 5,
                  borderColor: STYLES.COLORS.WHITE,
                  borderRadius: mask === 'circle' ? STYLES.imageSizes[mask].width / 2 : 0,
                  backgroundColor: '#F1EFEE',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Spinner />
                </View>
              )}
            <View style={{ flex: 1 }} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ width: STYLES.imageSizes[mask].width, alignSelf: 'center', marginTop: 20 }}>
              <CelButton
                onPress={() => { actions.navigateBack(); actions.retakePhoto(); }}
                white
                inverse
                ghost
              >
                Retake Photo
  </CelButton>
              <CelButton
                onPress={this.savePhoto}
                white
                margin="20 0 20 0"
              >
                Use Photo
  </CelButton>
            </View>
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default ConfirmCamera
