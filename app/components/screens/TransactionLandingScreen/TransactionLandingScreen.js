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
import ViewPager from '@react-native-community/viewpager';
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
    title: "Transaction",
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

  renderEnterAmount = () => {
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
      </View>
    );
  }

  renderInfo = () => {
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

  renderVerifyProfile = () => {
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
          </View>

        </View>
      </View>
    );
  }

  celPayFlow = [
    this.renderEnterAmount, this.renderInfo, this.renderVerifyProfile
  ]

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
          closeOnDragDown={false}
          closeOnPressMask={false}
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


            <ViewPager style={{flex: 1}} initialPage={0} orientation={'horizontal'}>
              {this.celPayFlow.map((item) => {
                return item()
              })}
            </ViewPager>
          </View>
        </RBSheet>
      </RegularLayout>
    );
  }
}

export default TransactionLandingScreen;
