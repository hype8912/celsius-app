import React, { Component } from "react";
import {
  FlatList,
  Text,
  TouchableWithoutFeedback,
  View,
  Animated, TouchableOpacity
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
import EnterAmount from "../../organisms/EnterAmount/EnterAmount";
import VerifyProfile from "../VerifyProfile/VerifyProfile";
import STYLES from "../../../constants/STYLES";
import Icon from "../../atoms/Icon/Icon";
import VerifyProfileComponent from "../../organisms/VerifyProfileComponent/VerifyProfileComponent";
import HiddenField from "../../atoms/HiddenField/HiddenField";
import VerifyProfileStyle from "../../organisms/VerifyProfileComponent/VerifyProfile.styles";
import ContactSupport from "../../atoms/ContactSupport/ContactSupport";
import Spinner from "../../atoms/Spinner/Spinner";
import CelNumpad from "../../molecules/CelNumpad/CelNumpad";
import { KEYPAD_PURPOSES } from "../../../constants/UI";

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
      index: 0,
      showDots: false,
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
    const { actions } = this.props
    this.setState({index: 0})
    setTimeout(()=>{
      this.refRBSheet.open()
    }, 2000)
 }

 componentDidUpdate(prevProps, prevState) {
    if (prevState.index !== this.state.index) {
      if (this.state.index === 2) {
        this.setState({showDots: true})
      } else {
        this.setState({showDots: false})
      }

      console.log('novi state je: ', this.state)
    }
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

    return values;
  };

  renderCelPayFlow = (item, index) => {
    console.log(this.state.showDots)
    if (item.option === "link") {
      if (index === 0) {
        return (
          <View
            style={{
              width: widthPercentageToDP("100%"),
              backgroundColor: "yellow",
            }}
          >
            <View style={{ flex: 1}}>
              <EnterAmount/>
            </View>

            {/*<View style={{ flex: 1, margin: 25 }}>*/}
            {/*  <CelText type="H2" weight="600" margin={"0 100 0 0"}>*/}
            {/*    You’re about to send*/}
            {/*  </CelText>*/}
            {/*  <CelText type="H1" weight="200">*/}
            {/*    {formatter.crypto(0.56851, "btc".toUpperCase(), {*/}
            {/*      precision: 5,*/}
            {/*    })}*/}
            {/*  </CelText>*/}
            {/*  <CelText type="H4" weight="400" margin={"0 0 40 0"}>*/}
            {/*    $ 4.550,00*/}
            {/*  </CelText>*/}
            {/*  <CelText type="H4" weight="200">*/}
            {/*    Date: 23. July 2020*/}
            {/*  </CelText>*/}
            {/*  <CelText type="H4" weight="200" margin={"0 0 40 0"}>*/}
            {/*    Time: 11:23 AM*/}
            {/*  </CelText>*/}
            {/*  <Card*/}
            {/*    size={"full"}*/}
            {/*    color={STYLE.COLORS.CELSIUS_BLUE}*/}
            {/*    margin={"0 0 100 0"}*/}
            {/*  >*/}
            {/*    <CelText color={STYLE.COLORS.WHITE}>*/}
            {/*      After you confirm the transaction via email you will be able*/}
            {/*      to share your CelPay link.*/}
            {/*    </CelText>*/}
            {/*  </Card>*/}
            {/*  <View style={{ alignSelf: "flex-end" }}>*/}
            {/*    <CelButton*/}
            {/*      iconRight={"IconArrowRight"}*/}
            {/*      onPress={() => {*/}
            {/*        console.log("ShareCel pay pressed");*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      Share CelPay link*/}
            {/*    </CelButton>*/}
            {/*  </View>*/}
            {/*</View>*/}

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
                $ 4.550,00
              </CelText>
              <CelText type="H4" weight="200">
                Date: 23. July 2020
              </CelText>
              <CelText type="H4" weight="200" margin={"0 0 40 0"}>
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
                  iconRight={"IconArrowRight"}
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
        const { formData, actions } = this.props
        // return <VerifyProfileComponent modalOption navigation={this.props.navigation} />;
        return (
          <View
            style={{
              width: widthPercentageToDP("100%"),
              backgroundColor: "orange",
            }}
          >
            <View style={{ flex: 1, margin: 25 }}>
              <View
                style={[{ paddingTop: 50, backgroundColor: "red" }]}
              >
                { this.state.showDots && <VerifyProfileComponent modalOption navigation={this.props.navigation} />}
                {/*{this.renderPIN()}*/}
                {/*<CelNumpad*/}
                {/*  field={'pin'}*/}
                {/*  value={this.state.value}*/}
                {/*  updateFormField={actions.updateFormField}*/}
                {/*  setKeypadInput={actions.setKeypadInput}*/}
                {/*  toggleKeypad={actions.toggleKeypad}*/}
                {/*  onPress={this.handlePINChange}*/}
                {/*  purpose={KEYPAD_PURPOSES.VERIFICATION}*/}
                {/*/>*/}
              </View>

            </View>
          </View>
        );
      }
    }
  };

  handlePINChange = newValue => {
    const { actions } = this.props;
    const { hasSixDigitPin } = this.state;
    const pinLength = hasSixDigitPin ? 6 : 4;

    if (newValue.length > pinLength) return;

    actions.updateFormField("pin", newValue);
    this.setState({ value: newValue });

    if (newValue.length === pinLength) {
      this.setState({ loading: true });
      actions.checkPIN(this.onCheckSuccess, this.onCheckError);
    }
  };

  renderDots = length => {
    const { actions } = this.props;
    const { verificationError, value } = this.state;

    const pinLength = length || 6;
    return (
      <TouchableOpacity onPress={actions.toggleKeypad}>
        <HiddenField
          value={value}
          error={verificationError}
          length={pinLength}
        />
      </TouchableOpacity>
    );
  };

  renderPIN() {
    const { loading } = this.state;
    const style = VerifyProfileStyle();

    return (
      <View style={style.wrapper}>
        <CelText type="H1" align="center">
          Verification required
        </CelText>
        <CelText align="center" margin="10 0 10 0">
          Please enter your PIN to proceed
        </CelText>

        {this.renderDots(6)}
        <View>
          <ContactSupport copy="Forgot PIN? Contact our support at app@celsius.network." />
        </View>

        {loading && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 15,
            }}
          >
            <Spinner />
          </View>
        )}
      </View>
    );
  }



  onPressNext = index => {
    const { data } = this.state;
    if (index === data.length - 1) {
      this.setState({index: 0})
      this.refRBSheet.close();
    } else {
      this.setState({index: this.state.index + 1}, ()=>{
        console.log('index nakon podizanja: ', this.state.index)
      })
      this.list.scrollToIndex({ index: index + 1 });
    }
  };

  onPressBack = () => {
    if (this.state.index === 0) {
      this.refRBSheet.close();
    } else {
      this.setState({index: this.state.index -1}, ()=>{
        this.list.scrollToIndex({ index: this.state.index });
      })

    }
  }

  renderItem = ({ item, index }) => {
    if (item.type === "celpay") {
      console.log('index je: ', this.state.index)
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
    const { formData, formErrors } = this.props;
    const { data, opacity } = this.state;
    let type;

    const rItem = this.renderItem

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
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <TouchableOpacity
                style={{flex:0.5, alignItems: 'flex-start'}}
                onPress={()=>this.onPressBack()}
              >
                <Icon
                  name="IconChevronLeft"
                  width="23"
                  height="23"
                  fill={STYLES.COLORS.GRAY}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{flex:0.5, alignItems: 'flex-end'}}
                onPress={()=> this.refRBSheet.close()}
              >
                <Icon
                  name="Close"
                  width="25"
                  height="25"
                  fill={STYLES.COLORS.GRAY}

                />
              </TouchableOpacity>
            </View>


            <FlatList
              ref={fl => (this.list = fl)}
              initialScrollIndex={0}
              data={data}
              pagingEnabled
              horizontal
              renderItem={rItem}
            />
          </View>
        </RBSheet>
      </RegularLayout>
    );
  }
}

export default TransactionLandingScreen;
