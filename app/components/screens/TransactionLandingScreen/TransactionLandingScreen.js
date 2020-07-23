import React, { Component } from "react";
import { Dimensions, FlatList, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import TransactionLandingScreenStyle from "./TransactionLandingScreen.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelSelect from "../../molecules/CelSelect/CelSelect";
import formatter from "../../../utils/formatter";
import Card from "../../atoms/Card/Card";
import STYLE from "../../../constants/STYLES";
import CelButton from "../../atoms/CelButton/CelButton";
import RBSheet from "react-native-raw-bottom-sheet";
import { widthPercentageToDP } from "../../../utils/styles-util";

@connect(
  state => ({
    formData: state.forms.formData,
    formErrors: state.forms.formErrors,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TransactionLandingScreen extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "TransactionLandingScreen Screen",
    right: "profile",
  });

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {   text: "prva strana",
          type: 'celpay',
          option: 'link',
          step: 1,
          onPressBack: ()=> console.log('onPressBack'),
          title: "Your`re about to send",
          cryptoAmount: 0.56851,
          crypto: 'BTC',
          usdAmount: 4550,
          date: '23 July 2020',
          time: '11:23 AM',
          boxMessage: 'After you confirm the transaction via email you will be able to share your CelPay link.',
          buttonText: 'Share CeplPay link'},
        {
          text: "druga strana",
          type: 'celpay',
          option: 'link',
          step: 2,
          onPressBack: ()=> console.log('onPressBack'),
          title: "Your`re about to send",
          cryptoAmount: 0.56851,
          crypto: 'BTC',
          usdAmount: 4550,
          date: '23 July 2020',
          time: '11:23 AM',
          boxMessage: 'After you confirm the transaction via email you will be able to share your CelPay link.',
          buttonText: 'Share CeplPay link'
        },
        {
          text: "treca strana",
          type: 'celpay',
          option: 'link',
          step: 3,
          onPressBack: () => console.log('onPressBack'),
          title: "Your`re about to send",
          cryptoAmount: 0.56851,
          crypto: 'BTC',
          usdAmount: 4550,
          date: '23 July 2020',
          time: '11:23 AM',
          boxMessage: 'After you confirm the transaction via email you will be able to share your CelPay link.',
          buttonText: 'Share CeplPay link'
        }
      ]
    }
  }

  componentDidMount() {
    const timeout = setTimeout(()=>{
      this.refRBSheet.open()
    },2000)
  }


  chooseTypeOfTransaction = data => {
    switch (data) {
      case "buy":
        return {
          type: "buy",
          label: "Buy Coins",
        };
      case "swap":
        return {
          type: "celpay",
          label: "Swap Coins",
        };
      case "withdraw":
        return {
          type: "celpay",
          label: "Withdraw",
        };
      case "celpay":
        return {
          type: "celpay",
          label: "CelPay",
        };
      default:
        return;
    }
  };


  renderCelPayFlow = (item, index) => {
    if (item.option === 'link') {
      if (index === 0) {
        return (
          <View style={{width: widthPercentageToDP('100%'), backgroundColor: 'yellow'}}>
            <View style={{flex:1, margin: 25}}>
              <CelText type="H2" weight="600" margin={'0 100 0 0'}>You’re about to send</CelText>
              <CelText type="H1" weight="200">
                {formatter.crypto(
                  0.56851,
                  'btc'.toUpperCase(),
                  { precision: 5 }
                )}
              </CelText>
              <CelText
                type="H4" weight="400" margin={"0 0 40 0"}
              > $ 4.550,00
              </CelText>
              <CelText type="H4" weight="200"> Date: 23. July 2020</CelText>
              <CelText type="H4" weight="200" margin={"0 0 40 0"}> Time: 11:23 AM</CelText>
              <Card size={"full"} color={STYLE.COLORS.CELSIUS_BLUE} margin={"0 0 100 0"}>
                <CelText color={STYLE.COLORS.WHITE}>
                  After you confirm the transaction via email you will be able to share your CelPay link.
                </CelText>
              </Card>
              <View style={{alignSelf: 'flex-end'}}>
                <CelButton onPress={()=>{console.log('ShareCel pay pressed')}}>Share CelPay link</CelButton>
              </View>
            </View>
          </View>
        )
      }
      if (index === 1) {
        return (
          <View style={{width: widthPercentageToDP('100%'), backgroundColor: 'orange'}}>
            <View style={{flex:1, margin: 25}}>
              <CelText type="H2" weight="600" margin={'0 100 0 0'}>You’re about to send</CelText>
              <CelText type="H1" weight="200">
                {formatter.crypto(
                  0.56851,
                  'btc'.toUpperCase(),
                  { precision: 5 }
                )}
              </CelText>
              <CelText
                type="H4" weight="400" margin={"0 0 40 0"}
              > $ 4.550,00
              </CelText>
              <CelText type="H4" weight="200"> Date: 23. July 2020</CelText>
              <CelText type="H4" weight="200" margin={"0 0 40 0"}> Time: 11:23 AM</CelText>
              <Card size={"full"} color={STYLE.COLORS.CELSIUS_BLUE} margin={"0 0 100 0"}>
                <CelText color={STYLE.COLORS.WHITE}>
                  After you confirm the transaction via email you will be able to share your CelPay link.
                </CelText>
              </Card>
              <View style={{alignSelf: 'flex-end'}}>
                <CelButton onPress={()=>{console.log('ShareCel pay pressed')}}>Share CelPay link</CelButton>
              </View>
            </View>
          </View>
        )
      }
      if (index === 2) {
        return (
          <View style={{width: widthPercentageToDP('100%'), backgroundColor: 'green'}}>
            <View style={{flex:1, margin: 25}}>
              <CelText type="H2" weight="600" margin={'0 100 0 0'}>You’re about to send</CelText>
              <CelText type="H1" weight="200">
                {formatter.crypto(
                  0.56851,
                  'btc'.toUpperCase(),
                  { precision: 5 }
                )}
              </CelText>
              <CelText
                type="H4" weight="400" margin={"0 0 40 0"}
              > $ 4.550,00
              </CelText>
              <CelText type="H4" weight="200"> Date: 23. July 2020</CelText>
              <CelText type="H4" weight="200" margin={"0 0 40 0"}> Time: 11:23 AM</CelText>
              <Card size={"full"} color={STYLE.COLORS.CELSIUS_BLUE} margin={"0 0 100 0"}>
                <CelText color={STYLE.COLORS.WHITE}>
                  After you confirm the transaction via email you will be able to share your CelPay link.
                </CelText>
              </Card>
              <View style={{alignSelf: 'flex-end'}}>
                <CelButton onPress={()=>{console.log('ShareCel pay pressed')}}>Share CelPay link</CelButton>
              </View>
            </View>
          </View>
        )
      }
    }
  }

  onPressNext = (index) => {
    const { data } = this.state
    console.log('index je: ', index)
    if (index === data.length -1) {
      this.refRBSheet.close()
    } else {
      this.list.scrollToIndex({ index: index + 1 });
    }
  }

  renderItem = ({ item, index }) => {
    console.log('item: ', item)
    if (item.type === 'celpay') {
      return (
        <TouchableWithoutFeedback
          onPress={()=> {this.onPressNext(index)}}
        >
          { this.renderCelPayFlow(item, index) }
        </TouchableWithoutFeedback>
      )
    }
  }


  render() {
    // const style = TransactionLandingScreenStyle();
    const { formData, formErrors } = this.props;
    const { data } = this.state
    let type;

    // return (
    //
    //   <View style={{flex: 1}}>
    //
    //     <View style={{flex:1, margin: 25}}>
    //       <CelText type="H2" weight="600" margin={'0 100 0 0'}>You’re about to send</CelText>
    //       <CelText type="H1" weight="200">
    //         {formatter.crypto(
    //           0.56851,
    //           'btc'.toUpperCase(),
    //           { precision: 5 }
    //         )}
    //       </CelText>
    //       <CelText
    //         type="H4" weight="400" margin={"0 0 40 0"}
    //       > $ 4.550,00
    //       </CelText>
    //       <CelText type="H4" weight="200"> Date: 23. July 2020</CelText>
    //       <CelText type="H4" weight="200" margin={"0 0 40 0"}> Time: 11:23 AM</CelText>
    //       <Card size={"full"} color={STYLE.COLORS.CELSIUS_BLUE} margin={"0 0 140 0"}>
    //         <CelText color={STYLE.COLORS.WHITE}>
    //           After you confirm the transaction via email you will be able to share your CelPay link.
    //         </CelText>
    //       </Card>
    //       <View style={{alignSelf: 'flex-end'}}>
    //         <CelButton onPress={()=>{console.log('ShareCel pay pressed')}}>Share CelPay link</CelButton>
    //       </View>
    //     </View>
    //   </View>
    // )
    //

    if (formData.transactions)
      type = this.chooseTypeOfTransaction(formData.transactions);

    return (
      <RegularLayout>
        <CelText>I want to</CelText>
        <CelSelect
          type="transactions"
          field="transactions"
          labelText=". . ."
          hideCallingCodes
          value={formData.transactions}
          error={formErrors.transactions}
        />

        {!formData.transactions && (
          <View>
            <CelText margin={"40 0 0 0"} type={"H3"} weight={"500"}>
              Buy, Earn & Borrow on the Blockchain
            </CelText>
            <CelText margin={"20 0 0 0"} type={"H5"}>
              Celsius Network lets you buy coins, earn interest on your crypto
              and instantly borrow dollars at 1% APR against it. No fees ever.
            </CelText>
          </View>
        )}

        {formData.transactions && (
          <CelSelect
            type={type.type}
            field={formData[type.type]}
            labelText={type.label}
            hideCallingCodes
            value={formData[type.type]}
            error={formErrors[type.type]}
          />
        )}
        <RBSheet
          ref={r=>this.refRBSheet=r}
          closeOnDragDown={true}
          closeOnPressMask={true}
          openDuration={200}
          height={600}
          customStyles={{
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
            wrapper: {
              borderRadius: 20,
              backgroundColor: "transparent"
            },
            draggableIcon: {
              backgroundColor: "orange"
            }
          }}
        >
          <FlatList
            ref={fl=>this.list=fl}
            data={data}
            pagingEnabled
            horizontal
            renderItem={this.renderItem}
            // renderItem={({ item,index }  )=>{
            //   return (
            //     <TouchableOpacity
            //       style={{backgroundColor: 'green', height: 450, width: 400}}
            //       onPress={()=>this.list.scrollToIndex({ index: index+1})}
            //     >
            //       {this.renderItem(item)}
            //       {/*<Text>{item.text}</Text>*/}
            //     </TouchableOpacity>
            //   )}
            // }
          />
        </RBSheet>
      </RegularLayout>
    );
  }
}

export default TransactionLandingScreen;
