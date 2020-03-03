import React, { Component } from 'react';
import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Constants, Permissions } from 'expo';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";


import * as appActions from "../../../redux/actions";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelButton from '../../atoms/CelButton/CelButton';
import Separator from '../../atoms/Separator/Separator';
import Spinner from '../../atoms/Spinner/Spinner';
import STYLES from '../../../constants/STYLES';
import ChangeAvatarStyle from './ChangeAvatar.styles';

const { API_URL } = Constants.manifest.extra;

const images = [
  { url: `${API_URL.replace('/api/v3', '')}/profile-images/avatar/bear/profile-bear.png` },
  { url: `${API_URL.replace('/api/v3', '')}/profile-images/avatar/cat/profile-cat.png` },
  { url: `${API_URL.replace('/api/v3', '')}/profile-images/avatar/deer/profile-deer.png` },
  { url: `${API_URL.replace('/api/v3', '')}/profile-images/avatar/diane/profile-diane.png` },
  { url: `${API_URL.replace('/api/v3', '')}/profile-images/avatar/dog/profile-dog.png` },
  { url: `${API_URL.replace('/api/v3', '')}/profile-images/avatar/fox/profile-fox.png` },
  { url: `${API_URL.replace('/api/v3', '')}/profile-images/avatar/hyppo/profile-hyppo.png` },
  { url: `${API_URL.replace('/api/v3', '')}/profile-images/avatar/monkeyboy/profile-monkeyboy.png` },
  { url: `${API_URL.replace('/api/v3', '')}/profile-images/avatar/monkeygirl/profile-monkeygirl.png` },
  { url: `${API_URL.replace('/api/v3', '')}/profile-images/avatar/shark/profile-shark.png` },
  { url: `${API_URL.replace('/api/v3', '')}/profile-images/avatar/sheep/profile-sheep.png` },
  { url: `${API_URL.replace('/api/v3', '')}/profile-images/avatar/unicorn/profile-unicorn.png` },

]
@connect(
  state => ({
    profilePicture: state.user.profile.profile_picture,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)


class ChangeAvatar extends Component {

  static propTypes = {
    // text: PropTypes.string

  };

  static defaultProps = {
  }

  static navigationOptions = () => ({
    title: "Change Avatar",
    right: "settings"
  });

  constructor(props) {
    super(props);

    this.state = {
      activeImage: props.profilePicture,
    }

  }

  // lifecycle methods
  componentWillReceiveProps(nextProps) {
    const { actions, lastCompletedCall, profileImage } = this.props;

    // set image after camera
    if (nextProps.profileImage !== profileImage) {
      this.setState({ activeImage: nextProps.profileImage });
    }

    if (lastCompletedCall !== nextProps.lastCompletedCall && nextProps.lastCompletedCall === API.UPLOAD_PLOFILE_IMAGE) {
      actions.navigateTo('Profile');
    }
  }

  // event hanlders
  // setActiveImage = (imgSrc) => {
  //   this.setState({ activeImage: imgSrc.url });
  // }

  getCameraPermissions = async () => {
    let perm = await Permissions.getAsync(Permissions.CAMERA)

    if (perm.status !== 'granted') {
      perm = await Permissions.askAsync(Permissions.CAMERA)
    }
  }

  getCameraRollPermissions = async () => {
    let perm = await Permissions.getAsync(Permissions.CAMERA_ROLL)

    if (perm.status !== 'granted') {
      perm = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    }
  }

  updateProfilePicture = (imgSrc) => {
    const { actions, callsInProgress } = this.props;

    const isLoading = apiUtil.areCallsInProgress([API.UPLOAD_PLOFILE_IMAGE], callsInProgress);
    if (isLoading) return

    actions.updateProfilePicture(imgSrc.url);
    this.setState({ activeImage: imgSrc.url });
  }
  

  goToCamera = async () => {
    const { actions } = this.props;

    actions.activateCamera({
      cameraField: 'profileImage',
      cameraHeading: 'Profile photo',
      cameraCopy: 'Please center your face in the circle and take a selfie, to use as your profile photo.',
      cameraType: 'front',
      mask: 'circle'
    })
    
    await this.getCameraPermissions()
    await this.getCameraRollPermissions()
    actions.navigateTo("CameraScreen", { onSave: this.saveCameraPhoto });
  }

  saveCameraPhoto = (photo) => {
    const { actions } = this.props;

    actions.updateProfilePicture(photo);
    actions.updateFormField('profileImage', photo);
    actions.navigateTo('Profile');
  }

  renderImage = (imgSrc) => {
    const style = ChangeAvatarStyle()
    const { activeImage } = this.state;
    const imageStyle = [style.image];
    if (imgSrc.url === activeImage) imageStyle.push(style.activeImage);

    return (
      <TouchableOpacity key={images.indexOf(imgSrc)} style={style.avatar} onPress={() => this.updateProfilePicture(imgSrc)}>
        <View>
          <Image style={imageStyle} source={{ uri: imgSrc.url }} />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { profilePicture } = this.props;
    const { callsInProgress } = this.state;

    const style = ChangeAvatarStyle()
    const isLoading = apiUtil.areCallsInProgress([API.UPLOAD_PLOFILE_IMAGE], callsInProgress);

    return (
      <RegularLayout>
        <View style={{ alignItems: 'center', marginBottom: 10, height: 130 }}>
          {isLoading ? (
            <View style={{ width: 100, height: 100, paddingLeft: 20, paddingTop: 20, borderRadius: 50, borderWidth: 5, borderColor: STYLES.COLORS.WHITE }}>
              <Spinner />
            </View>
          ) : (
              <Image
                style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 5, borderColor: STYLES.COLORS.WHITE }}
                source={profilePicture ? { uri: profilePicture } : require('../../../../assets/images/empty-profile/empty-profile.png')}
                resizeMethod="resize"
              />
            )}
          <CelButton style={{ marginTop: 7 }} onPress={this.goToCamera} basic>Take a picture</CelButton>
        </View>
        <Separator color={STYLES.COLORS.DARK_GRAY} opacity={0.1} textOpacity={0.5} text="OR CHOOSE ONE BELOW" />
        <ScrollView>
          <View style={style.wrapper}>
            {images.map(this.renderImage)}
          </View>
        </ScrollView>
      </RegularLayout>
    );
  }
}

export default ChangeAvatar
