import React, { Component } from "react";
import {
  Clipboard,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Animated,
} from "react-native";
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
import HiddenField from "../../atoms/HiddenField/HiddenField";
import VerifyProfileStyle from "../VerifyProfile/VerifyProfile.styles";
import ContactSupport from "../../atoms/ContactSupport/ContactSupport";
import Spinner from "../../atoms/Spinner/Spinner";
import CelNumpad from "../../molecules/CelNumpad/CelNumpad";
import { KEYPAD_PURPOSES } from "../../../constants/UI";
import _ from "lodash";
import { DEEP_LINKS } from "../../../constants/DATA";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import VerifyProfile from "../VerifyProfile/VerifyProfile";
import EnterAmount from "../../organisms/EnterAmount/EnterAmount";

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
    title: "TransactionLandingScreen",
    right: "profile",
  });

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.formData.transactions !== prevState.transactions) {
      return {
        transactions: nextProps.formData.transactions,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      yOffset: new Animated.Value(0),
      opacity: new Animated.Value(0),
      values: {},
      value: "",
      data: [
        {
          text: "prva strana",
          type: "celpay",
          option: "link",
          step: 1,
          onPressBack: () => console.log("onPressBack"),
          title: "Your`re about to send",
          cryptoAmount: 0.56851,
          crypto: "BTC",
          usdAmount: 4550,
          date: "23 July 2020",
          time: "11:23 AM",
          boxMessage:
            "After you confirm the transaction via email you will be able to share your CelPay link.",
          buttonText: "Share CeplPay link",
        },
        {
          text: "druga strana",
          type: "celpay",
          option: "link",
          step: 2,
          onPressBack: () => console.log("onPressBack"),
          title: "Your`re about to send",
          cryptoAmount: 0.56851,
          crypto: "BTC",
          usdAmount: 4550,
          date: "23 July 2020",
          time: "11:23 AM",
          boxMessage:
            "After you confirm the transaction via email you will be able to share your CelPay link.",
          buttonText: "Share CeplPay link",
        },
        {
          text: "treca strana",
          type: "celpay",
          option: "link",
          step: 3,
          onPressBack: () => console.log("onPressBack"),
          title: "Your`re about to send",
          cryptoAmount: 0.56851,
          crypto: "BTC",
          usdAmount: 4550,
          date: "23 July 2020",
          time: "11:23 AM",
          boxMessage:
            "After you confirm the transaction via email you will be able to share your CelPay link.",
          buttonText: "Share CeplPay link",
        },
      ],
    };
  }

 componentDidMount() {
    setTimeout(()=>{
      this.refRBSheet.open()
    }, 2000)
 }

  chooseTypeOfTransaction = data => {
    let values;
    switch (data) {
      case "buy":
        values = {
          type: "buy",
          label: "Buy Coins",
          text: "via",
          method: "method",
        };
        break;
      case "swap":
        values = {
          type: "swap",
          label: "Swap Coins",
          text: "via",
          method: "method",
        };
        break;
      case "withdraw":
        values = {
          type: "withdraw",
          label: "Withdraw",
          text: "to",
          method: "address",
        };
        break;
      case "celpay":
        values = {
          type: "celpay",
          label: "CelPay",
          text: "via",
          method: "method",
        };
        break;
    }

    this.state = {
      values,
    };
    return values;
  };

  renderCelPayFlow = (item, index) => {
    if (item.option === "link") {
      if (index === 0) {
        return (
          <View
            style={{
              width: widthPercentageToDP("100%"),
            }}
          >
            <View style={{ flex: 1}}>
              <EnterAmount/>
            </View>
          </View>
        );
      }
      if (index === 1) {
        return (
          <View
            style={{
              width: widthPercentageToDP("100%"),
              backgroundColor: "orange",
            }}
          >
            <View style={{ flex: 1, margin: 25 }}>
              <CelText type="H2" weight="600" margin={"0 100 0 0"}>
                You’re about to send
              </CelText>
              <CelText type="H1" weight="200">
                {formatter.crypto(0.56851, "btc".toUpperCase(), {
                  precision: 5,
                })}
              </CelText>
              <CelText type="H4" weight="400" margin={"0 0 40 0"}>
                {" "}
                $ 4.550,00
              </CelText>
              <CelText type="H4" weight="200">
                {" "}
                Date: 23. July 2020
              </CelText>
              <CelText type="H4" weight="200" margin={"0 0 40 0"}>
                {" "}
                Time: 11:23 AM
              </CelText>
              <Card
                size={"full"}
                color={STYLE.COLORS.CELSIUS_BLUE}
                margin={"0 0 100 0"}
              >
                <CelText color={STYLE.COLORS.WHITE}>
                  After you confirm the transaction via email you will be able
                  to share your CelPay link.
                </CelText>
              </Card>
              <View style={{ alignSelf: "flex-end" }}>
                <CelButton
                  onPress={() => {
                    console.log("ShareCel pay pressed");
                  }}
                >
                  Share CelPay link
                </CelButton>
              </View>
            </View>
          </View>
        );
      }
      if (index === 2) {
        return <VerifyProfile modalOption navigation={this.props.navigation} />;
      }
    }
  };

  onPressNext = index => {
    const { data } = this.state;
    console.log("index je: ", index);
    if (index === data.length - 1) {
      this.refRBSheet.close();
    } else {
      this.list.scrollToIndex({ index: index + 1 });
    }
  };

  renderItem = ({ item, index }) => {
    if (item.type === "celpay") {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            this.onPressNext(index);
          }}
        >
          {this.renderCelPayFlow(item, index)}
        </TouchableWithoutFeedback>
      );
    }
  };

  render() {
    // const style = TransactionLandingScreenStyle();
    const { formData, formErrors } = this.props;
    const { data, opacity } = this.state;
    let type;
    console.log("value u renderu: ", this.state.value);
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
        <CelText margin={"15 0 10 0"} type={"H3"} weight={"500"}>
          I want to
        </CelText>
        <CelSelect
          type="transactions"
          field="transactions"
          labelText=". . ."
          hideCallingCodes
          value={formData.transactions}
          error={formErrors.transactions}
        />

        {!formData.transactions && (
          <View style={{ opacity }}>
            <CelText margin={"40 0 0 0"} type={"H3"} weight={"500"}>
              Buy, Earn & Borrow on the Blockchain
            </CelText>
            <CelText margin={"20 0 0 0"} type={"H5"}>
              Celsius Network lets you buy coins, earn interest on your crypto
              and instantly borrow dollars at 1% APR against it. No fees ever.
            </CelText>
          </View>
        )}

        {formData.transactions && type.type === "withdraw" && (
          <View>
            <CelText margin={"15 0 10 0"} type={"H3"} weight={"500"}>
              {type.text}
            </CelText>
            <CelSelect
              type={type.type}
              field={type.type}
              labelText={type.method}
              hideCallingCodes
              value={formData[type.type]}
              error={formErrors[type.type]}
            />
          </View>
        )}
        {formData.transactions && type.type === "celpay" && (
          <View>
            <CelText margin={"15 0 10 0"} type={"H3"} weight={"500"}>
              {type.text}
            </CelText>
            <CelSelect
              type={type.type}
              field={type.type}
              labelText={type.method}
              hideCallingCodes
              value={formData[type.type]}
              error={formErrors[type.type]}
            />
          </View>
        )}
        {formData.transactions && type.type === "buy" && (
          <View>
            <CelText margin={"15 0 10 0"} type={"H3"} weight={"500"}>
              {type.text}
            </CelText>
            <CelSelect
              type={type.type}
              field={type.type}
              labelText={type.method}
              hideCallingCodes
              value={formData[type.type]}
              error={formErrors[type.type]}
            />
          </View>
        )}
        <RBSheet
          ref={r => (this.refRBSheet = r)}
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
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: "orange",
            },
          }}
        >
          <View style={{ flex: 1 }}>
            <Text>Ugurati</Text>
            <FlatList
              ref={fl => (this.list = fl)}
              data={data}
              pagingEnabled
              horizontal
              renderItem={this.renderItem}
            />
          </View>
        </RBSheet>
      </RegularLayout>
    );
  }
}

export default TransactionLandingScreen;
