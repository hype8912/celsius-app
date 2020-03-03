import React, { Component } from 'react'
import { View } from 'react-native'
import { Permissions } from 'expo'
// import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import * as appActions from '../../../redux/actions'
import Card from '../../atoms/Card/Card'
import CelText from '../../atoms/CelText/CelText'
import Icon from '../../atoms/Icon/Icon'
import Separator from '../../atoms/Separator/Separator'
import STYLES from '../../../constants/STYLES'
import CelButton from '../../atoms/CelButton/CelButton'
import ProgressBar from '../../atoms/ProgressBar/ProgressBar'
import API from '../../../constants/API'
import apiUtil from '../../../utils/api-util';
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

@connect(
  state => ({
    formData: state.forms.formData,
    test: state.user,
    kycDocuments: state.user.kycDocuments,
    callsInProgress: state.api.callsInProgress,
    lastCompletedCall: state.api.lastCompletedCall,
    kycDocTypes: state.generalData.kycDocTypes,
    user: state.user.profile
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class KYCVerifyID extends Component {
  static propTypes = {}
  static defaultProps = {}

  static navigationOptions = () => ({
    title: 'Verify ID',
    customCenterComponent: <ProgressBar steps={4} currentStep={4} />,
    headerSameColor: true
  });

  componentDidMount () {
    const { actions } = this.props
    actions.getKYCDocTypes()
    actions.getKYCDocuments()
    this.selectDocumentType('passport')
  }
  
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
  
  saveFrontImage = photo => {
    const { actions } = this.props

    actions.updateFormField('front', photo)
    actions.navigateTo('KYCVerifyID')
  }

  goToFrontCamera = async () => {
    const { actions } = this.props

    actions.activateCamera({
      cameraField: 'front',
      cameraHeading: 'Front side photo',
      cameraType: 'back',
      mask: 'document'
    })
    
    await this.getCameraPermissions()
    await this.getCameraRollPermissions()
    actions.navigateTo('CameraScreen', { onSave: this.saveFrontImage })
  }

  saveBackImage = photo => {
    const { actions } = this.props

    actions.updateFormField('back', photo)
    actions.navigateTo('KYCVerifyID')
  }

  goToBackCamera = async () => {
    const { actions } = this.props

    actions.activateCamera({
      cameraField: 'back',
      cameraHeading: 'Back side photo',
      cameraType: 'back',
      mask: 'document'
    })
    
    await this.getCameraPermissions()
    await this.getCameraRollPermissions()
    actions.navigateTo('CameraScreen', { onSave: this.saveBackImage })
  }

  isFormValid = () => {
    const { actions, formData } = this.props;

    let error
    if (formData.documentType !== 'passport' && !formData.back) error = 'Back image of document is required!'
    if (!formData.front) error = 'Front image of document is required!'
    if (!formData.documentType) error = 'Please select a document type!'

    if (error) {
      actions.showMessage('error', error);
      return false
    }

    return true;
  }

  submit = () => {
    const { actions } = this.props

    if (this.isFormValid()) {
      actions.verifyKYCDocs()
    }
  }

  selectDocumentType = async type => {
    const { actions } = this.props
    actions.updateFormFields({
      'documentType': type,
      'front': '',
      'back': ''
    })
  }

  renderInputState = (active, textInactive, textActive) => {
    if (active) {
      return (
        <>
          <CelText color={STYLES.COLORS.DARK_GRAY} type='H4' weight='300'>
            {textActive}
          </CelText>
          <Icon name='CheckCircle' fill={STYLES.COLORS.GREEN} height='24' />
        </>
      )
    }
    return (
      <>
        <CelText color={STYLES.COLORS.DARK_GRAY} type='H4' weight='300'>
          {textInactive}
        </CelText>
        <Icon name='KycCamera' height='24' fill={STYLES.COLORS.GRAY} />
      </>
    )
  }

  renderFrontCameraInput = () => {
    const { formData } = this.props
    return (
      <Card onPress={this.goToFrontCamera}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {this.renderInputState(
            formData.front,
            // (kycDocuments && !!kycDocuments.front) || formData.front,
            'Front side photo',
            'Front side photo taken'
          )}
        </View>
      </Card>
    )
  }

  renderBackCameraInput = () => {
    const { formData } = this.props
    return (
      <Card onPress={this.goToBackCamera}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {this.renderInputState(
            formData.back,
            // (kycDocuments && !!kycDocuments.back) || formData.back,
            'Back side photo',
            'Back side photo taken'
          )}
        </View>
      </Card>
    )
  }

  render () {
    const { kycDocTypes, user, formData, callsInProgress, actions } = this.props

    if (!kycDocTypes) return <LoadingScreen />

    const isLoading = apiUtil.areCallsInProgress(
      [API.CREATE_KYC_DOCUMENTS],
      callsInProgress
    )
    const docs = mapDocs(kycDocTypes[user.citizenship])
    const docType = formData.documentType || docs[0].value

    const FrontCamera = this.renderFrontCameraInput
    const BackCamera = this.renderBackCameraInput

    return (
      <RegularLayout>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <CelText type='H2' weight='700'>
            Verify your ID
          </CelText>
          <CelText type='H4' weight='300' margin='10 0 20 0'>
            Take a photo of one of your documents to confirm your identity.
          </CelText>
          {docs && (
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around'
              }}
            >
              {docs.map(document =>
                docType === document.value ? (
                  <Card
                    key={document.value}
                    size='third'
                    onPress={() => this.selectDocumentType(document.value)}
                    styles={{ height: 100, justifyContent: 'flex-start' }}
                  >
                    <Icon
                      height='24'
                      fill={STYLES.COLORS.CELSIUS_BLUE}
                      name={document.icon}
                    />
                    <CelText
                      color={STYLES.COLORS.CELSIUS_BLUE}
                      margin='10 0 0 0'
                      align='center'
                      type='H6'
                    >
                      {document.label}
                    </CelText>
                  </Card>
                ) : (
                  <Card
                    key={document.value}
                    size='third'
                    onPress={() => this.selectDocumentType(document.value)}
                    styles={{ height: 100, justifyContent: 'flex-start' }}
                  >
                    <Icon
                      height='24'
                      name={document.icon}
                      fill={STYLES.COLORS.GRAY}
                    />
                    <CelText
                      color={STYLES.COLORS.GRAY}
                      margin='10 0 0 0'
                      align='center'
                      type='H6'
                    >
                      {document.label}
                    </CelText>
                  </Card>
                )
              )}
            </View>
          )}
          <Separator text='Take photos' margin='20 0 20 0' />
          <FrontCamera />
          {docType !== 'passport' && <BackCamera />}
          <CelButton
            loading={isLoading}
            margin='20 0 0 0'
            onPress={this.submit}
          >
            Submit
          </CelButton>
          <CelButton
            onPress={() => actions.navigateTo("WalletFab")}
            basic
            margin={"20 0 20 0"}
          >
            Do it later
          </CelButton>
        </View>
      </RegularLayout>
    )
  }
}

function mapDocs (docs) {
  const kycDocs = []

  if (!docs) {
    return [
      {
        value: 'passport',
        label: 'Passport',
        icon: 'Passport'
      }
    ]
  }
  if (docs.identity_card) {
    kycDocs.push({
      value: 'identity_card',
      label: 'National ID card',
      icon: 'IDcard'
    })
  }
  if (docs.passport) {
    kycDocs.push({
      value: 'passport',
      label: 'Passport',
      icon: 'Passport'
    })
  }
  if (docs.driving_licence) {
    kycDocs.push({
      value: 'driving_licence',
      label: "Driver's license",
      icon: 'DrivingLicense'
    })
  }

  return kycDocs
}

export default KYCVerifyID
