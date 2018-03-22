import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Form, View} from 'native-base';
import {bindActionCreators} from 'redux';

import {MainHeader} from '../../components/Headers/MainHeader/MainHeader';
import {AnimatedHeading} from '../../components/Headings/AnimatedHeading/AnimatedHeading';
import {Message} from '../../components/Message/Message';
import Styles from "./styles";
import * as actions from "../../redux/actions";
import {STYLES} from "../../config/constants/style";
import PrimaryInput from "../../components/Inputs/PrimaryInput/PrimaryInput";
import {KEYBOARD_TYPE} from "../../config/constants/common";
import {PrimaryButton} from "../../components/Buttons/Button/Button";

@connect(
  state => ({
    nav: state.nav,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class BankAccountInfoScreen extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      routingNumber: '',
      accountNumber: '',
      isLoading: false
    };
  }

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  onSubmit = () => {
    console.log(this.state)
  };

  render() {
    const {
      name,
      routingNumber,
      accountNumber,
      isLoading
    } = this.state;

    return (
      <Container>
        <StatusBar barStyle="dark-content"/>
        <MainHeader {...this.props} backButton customStyle={{backgroundColor: STYLES.PRIMARY_BLUE}}/>
        <AnimatedHeading
          containerCustomStyles={{backgroundColor: STYLES.PRIMARY_BLUE}}
          ref={(heading) => {
            this.heading = heading;
          }}
          text={'Bank Info'}/>

        <Message/>

        <Content
          bounces={false}
          style={Styles.content}
          onScroll={this.onScroll}>
          <View>
            <Form>
              <PrimaryInput
                labelText={'Bank Name'}
                keyboardType={KEYBOARD_TYPE.NUMERIC}
                value={name}
                onChange={(text) => this.setState({name: text})}/>

              <PrimaryInput
                labelText={'Routing number'}
                keyboardType={KEYBOARD_TYPE.DEFAULT}
                value={routingNumber}
                autoCapitalize={'words'}
                onChange={(text) => this.setState({routingNumber: text})}/>

              <PrimaryInput
                labelText={'Account number'}
                keyboardType={KEYBOARD_TYPE.EMAIL}
                value={accountNumber}
                autoCapitalize={'words'}
                onChange={(text) => this.setState({accountNumber: text})}/>

              <View style={Styles.buttonWrapper}>
                <PrimaryButton
                  loading={isLoading}
                  onPress={() => this.onSubmit()}
                  title={'Next'}/>
              </View>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}

export default BankAccountInfoScreen;
