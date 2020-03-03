import React, { Component } from 'react'
import { Linking, TouchableOpacity, View } from "react-native";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import QRCode from 'react-qr-code'

import cryptoUtil from '../../../utils/crypto-util'
import { getTheme } from '../../../utils/styles-util'
import RegularLayout from '../../layouts/RegularLayout/RegularLayout'
import * as appActions from '../../../redux/actions'
import { getDepositEligibleCoins } from '../../../redux/custom-selectors'
import CopyButton from '../../atoms/CopyButton/CopyButton'
import ShareButton from '../../atoms/ShareButton/ShareButton'
import CelButton from '../../atoms/CelButton/CelButton'
import CelText from '../../atoms/CelText/CelText'
import Separator from '../../atoms/Separator/Separator'
import STYLES from '../../../constants/STYLES'
import DepositStyle from './Deposit.styles'
import Card from '../../atoms/Card/Card'
import Icon from '../../atoms/Icon/Icon'
import { EMPTY_STATES, MODALS, THEMES } from '../../../constants/UI'
import Spinner from '../../atoms/Spinner/Spinner'
import CoinPicker from '../../molecules/CoinPicker/CoinPicker'
import { KYC_STATUSES } from '../../../constants/DATA'
import StaticScreen from '../StaticScreen/StaticScreen'
import IconButton from '../../organisms/IconButton/IconButton'
import DestinationTagModal from '../../organisms/DestinationTagModal/DestinationTagModal'
import MemoIdModal from '../../organisms/MemoIdModal/MemoIdModal'
import DepositInfoModal from "../../organisms/DepositInfoModal/DepositInfoModal";
import { hasPassedKYC } from "../../../utils/user-util";

@connect(
  state => ({
    eligibleCoins: getDepositEligibleCoins(state),
    formData: state.forms.formData,
    walletAddresses: state.wallet.addresses,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
    depositCompliance: state.compliance.deposit
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Deposit extends Component {
  static navigationOptions = () => ({
    title: 'Deposit coins',
    right: 'profile'
  })

  constructor (props) {
    super(props)
    this.state = {
      isFetchingAddress: false,
      useAlternateAddress: false
    }
  }

  componentDidMount() {
    const {actions} = this.props;
      actions.openModal(MODALS.DEPOSIT_INFO_MODAL)
  }

  getAddress = currency => {
    const { walletAddresses } = this.props

    let address = ''
    let alternateAddress = ''
    let destinationTag = ''
    let memoId = ''
    let fullAddress = ''

    if (!currency) {
      return {
        address,
        alternateAddress,
        destinationTag,
        memoId
      }
    }

    // If currency is ERC20 get ETH address because it's the same for all ERC20, else
    // find the address in wallet for specific currency
    if (cryptoUtil.isERC20(currency)) {
      fullAddress = walletAddresses.ETHAddress
      alternateAddress = walletAddresses.ETHAlternateAddress
    } else {
      fullAddress = walletAddresses[`${currency}Address`]
      alternateAddress = walletAddresses[`${currency}AlternateAddress`]
    }

    // Because getAddress is called in render method, it might happen that currency is defined and
    // walletAddresses is still not defined because those 2 are fetched from different APIs
    if (!fullAddress) {
      return {
        address,
        alternateAddress,
        destinationTag,
        memoId
      }
    }

    // If address has dt(destinationTag) or memoId, split it and return it separately
    if (fullAddress.includes('?dt=')) {
      const splitAddress = fullAddress.split('?dt=')
      address = splitAddress[0]
      destinationTag = splitAddress[1]
    } else if (fullAddress.includes('?memoId=')) {
      const splitAddress = fullAddress.split('?memoId=')
      address = splitAddress[0]
      memoId = splitAddress[1]
    } else {
      address = fullAddress
    }

    return {
      address,
      alternateAddress,
      destinationTag,
      memoId
    }
  }

  getDefaultSelectedCoin = () => {
    const { formData, navigation } = this.props
    const currencyFromNav = navigation.getParam('coin')

    // If nothing comes through navigation and nothing stored in the redux state,
    // use ETH as default selected coin
    let defaultSelectedCoin = 'ETH'

    if (currencyFromNav) {
      defaultSelectedCoin = currencyFromNav
    } else if (formData.selectedCoin) {
      defaultSelectedCoin = formData.selectedCoin
    }
    return defaultSelectedCoin
  }

  handleCoinSelect = async (field, item) => {
    const { actions } = this.props
    await actions.updateFormField(field, item)
    await this.fetchAddress(item)
  }

  fetchAddress = async currency => {
    const { actions, walletAddresses } = this.props
    this.setState({ isFetchingAddress: true })
    // Every ERC20 has the same address, so we use ETH address
    // Also check if it's already fetched and stored in redux state to avoid additional http requests
    if (cryptoUtil.isERC20(currency) && !walletAddresses.ETHAddress) {
      await actions.getCoinAddress('ETH')
    } else if (
      !cryptoUtil.isERC20(currency) &&
      !walletAddresses[`${currency}Address`]
    ) {
      // If it's not ERC20 and not already fetched and stored in redux state, get the address
      await actions.getCoinAddress(currency)
    }

    this.setState({ isFetchingAddress: false, useAlternateAddress: false })
  }

  openModal = (destinationTag, memoId) => {
    const { actions } = this.props

    if (destinationTag) {
      actions.openModal(MODALS.DESTINATION_TAG_MODAL)
    }

    if (memoId) {
      actions.openModal(MODALS.MEMO_ID_MODAL)
    }
  };

  renderSwitchAddressBlock = (alternativeAddress, currency) => {
    const { useAlternateAddress } = this.state
    const style = DepositStyle()
    let alternateText1 = ''
    let alternateText2 = ''
    let buttonText = ''

    // Switching wording, depending on currency and if using alternative address
    if (currency === 'LTC') {
      alternateText1 = `${useAlternateAddress ? '3' : 'M'}`
      alternateText2 = `${useAlternateAddress ? 'M' : '3'}`

      buttonText = `Use ${useAlternateAddress ? 'M' : '3'}-format address`
    } else if (currency === 'BCH') {
      alternateText1 = `${useAlternateAddress ? 'Cash Address' : 'Bitcoin'}`
      alternateText2 = `${useAlternateAddress ? 'Bitcoin' : 'Cash Address'}`

      buttonText = `Use ${
        useAlternateAddress ? 'Bitcoin' : 'Cash Address'
      }-format`
    }

    return (
      <Card color={STYLES.COLORS.CELSIUS_BLUE}>
        <CelText
          style={style.infoBubble}
          weight='300'
          alignItems='center'
          color='#FFFFFF'
        >
          {' '}
          If your wallet doesn't support{' '}
          <CelText weight='bold' color='#FFFFFF'>
            {alternateText1}-format
          </CelText>{' '}
          addresses you can use a{' '}
          <CelText weight='bold' color='#FFFFFF'>
            {alternateText2}-format
          </CelText>{' '}
          {currency} address.
        </CelText>

        <CelButton
          size={'medium'}
          white
          onPress={() => {
            this.setState({
              useAlternateAddress: !this.state.useAlternateAddress
            })
          }}
          style={{
            borderWidth: 0.5,
            borderColor: '#FFFFFF',
            marginTop: 10,
            marginBottom: 10
          }}
        >
          {buttonText}
        </CelButton>
      </Card>
    )
  }

  renderLoader = () => (
    <View
      style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center' }}
    >
      <Spinner />
    </View>
  )

  render () {
    const {
      actions,
      formData,
      eligibleCoins,
      depositCompliance,
      navigation
    } = this.props
    const {
      address,
      alternateAddress,
      destinationTag,
      memoId
    } = this.getAddress(formData.selectedCoin)
    const coin = navigation.getParam('coin')
    const { useAlternateAddress, isFetchingAddress } = this.state
    const styles = DepositStyle()
    const theme = getTheme()
    let infoColor;
    let link;

    switch (theme) {
      case THEMES.LIGHT:
        infoColor = STYLES.COLORS.DARK_GRAY
        break
      default:
      case THEMES.DARK:
        infoColor= STYLES.COLORS.WHITE
    }

    if (!hasPassedKYC()) {
      return (
        <StaticScreen
          emptyState={{ purpose: EMPTY_STATES.NON_VERIFIED_DEPOSIT }}
        />
      )
    }
    if (!depositCompliance.allowed) {
      return <StaticScreen emptyState={{ purpose: EMPTY_STATES.COMPLIANCE }} />
    }

    // TODO: place into some util

    switch (formData.selectedCoin) {
      case "BCH":
        link = "https://buy.bitcoin.com/bch/?ref_id=celsius&utm_source=celsius&utm_medium=app-link&utm_content=buy-bch";
        break;
      case "BTC":
        link = "https://buy.bitcoin.com/btc/?ref_id=celsius&utm_source=celsius&utm_medium=app-link&utm_content=buy-btc";
        break;
      case "ETH":
        link = "https://buy.bitcoin.com/eth/?ref_id=celsius&utm_source=celsius&utm_medium=app-link&utm_content=buy-eth";
        break;
      case "LTC":
        link = "https://buy.bitcoin.com/ltc/?ref_id=celsius&utm_source=celsius&utm_medium=app-link&utm_content=buy-ltc";
        break;
      case "XRP":
        link = "https://buy.bitcoin.com/xrp/?ref_id=celsius&utm_source=celsius&utm_medium=app-link&utm_content=buy-xrp";
        break;
      default:
        link = null
    }

    return (
      <RegularLayout padding={'20 0 100 0'}>
        <CoinPicker
          coinList={eligibleCoins}
          updateFormField={actions.updateFormField}
          onCoinSelect={this.handleCoinSelect}
          value={formData.selectedCoin}
          field='selectedCoin'
          defaultSelected={this.getDefaultSelectedCoin()}
        />

        {address && !isFetchingAddress ? (
          <View style={styles.container}>
            {destinationTag || memoId ? (
              <Card>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <CelText style={{ opacity: 0.7 }}>
                    {destinationTag ? 'Destination Tag:' : 'Memo Id'}
                  </CelText>
                  <View
                    style={{
                      paddingBottom: 10,
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <CelText style={ styles.importantInfo } weight={'500'}>{destinationTag || memoId}</CelText>
                    <TouchableOpacity
                      onPress={() => this.openModal(destinationTag, memoId)}
                    >
                      <Icon
                        name='Info'
                        height='19'
                        width='19'
                        fill= { infoColor }
                        stroke='rgba(61,72,83, 1)'
                        style={{ marginLeft: 10, marginTop: 2 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.copyShareWrapper}>
                  <Separator />
                  <View style={styles.copyShareButtonsWrapper}>
                    <CopyButton
                      copyText={destinationTag || memoId}
                      onCopy={() =>
                        actions.showMessage(
                          'success',
                          'Destination tag copied to clipboard!'
                        )
                      }
                    />
                    <Separator vertical />
                    <ShareButton shareText={destinationTag || memoId} />
                  </View>
                </View>
              </Card>
            ) : null}

            <Card>
              <View style={styles.qrCode}>
                <View style={styles.qrCodeWrapper}>
                  <QRCode
                    value={useAlternateAddress ? alternateAddress : address}
                    size={100}
                    bgColor='#FFF'
                    fgColor='#000'
                  />
                </View>
                <CelText
                  type='H4'
                  align={'center'}
                  margin='10 0 10 0'
                  style={ styles.importantInfo }
                >
                  {useAlternateAddress ? alternateAddress : address}
                </CelText>

                <View style={styles.copyShareWrapper}>
                  <Separator />
                  <View style={styles.copyShareButtonsWrapper}>
                    <CopyButton
                      onCopy={() =>
                        actions.showMessage(
                          'success',
                          'Address copied to clipboard!'
                        )
                      }
                      copyText={
                        useAlternateAddress ? alternateAddress : address
                      }
                    />
                    <Separator vertical />
                    <ShareButton
                      shareText={
                        useAlternateAddress ? alternateAddress : address
                      }
                    />
                  </View>
                </View>
              </View>
            </Card>

            { ["BCH", "BTC", "ETH", "XRP", "LTC"].includes(formData.selectedCoin) &&
              <CelText margin={"20 0 20 0"} align={"center"} color={STYLES.COLORS.CELSIUS_BLUE} type={"H4"} weight={"300"} onPress={() => Linking.openURL(link)}>{`Buy ${formData.selectedCoin} from Bitcoin.com`}</CelText>
            }

            {alternateAddress &&
              this.renderSwitchAddressBlock(
                alternateAddress,
                formData.selectedCoin
              )}
          </View>
        ) : null}

        {isFetchingAddress && this.renderLoader()}

        {formData.selectedCoin === 'CEL' ? (
          <View style={{ marginLeft: 20, marginRight: 20 }}>
            <IconButton
              margin='20 0 0 0'
              padding='15 18 15 18'
              onPress={() => actions.navigateTo('LoyaltyProgram')}
            >
              Learn about the CEL Loyalty Program
            </IconButton>
          </View>
        ) : null}

        <DestinationTagModal closeModal={actions.closeModal} />
        <MemoIdModal closeModal={actions.closeModal} />
        <DepositInfoModal type={coin} closeModal={actions.closeModal}/>
      </RegularLayout>
    )
  }
}

export default Deposit
