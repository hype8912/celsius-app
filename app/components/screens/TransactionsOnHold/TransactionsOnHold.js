import React, { Component } from 'react'
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import * as appActions from '../../../redux/actions'
import CelText from '../../atoms/CelText/CelText'
import RegularLayout from '../../layouts/RegularLayout/RegularLayout'
import Card from '../../atoms/Card/Card'
import TransactionsHistory from '../../molecules/TransactionsHistory/TransactionsHistory'

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TransactionsOnHold extends Component {
  static propTypes = {}
  static defaultProps = {}

  static navigationOptions = () => ({
    headerSameColor: true,
    title: 'Transactions on-hold'
  });


  render () {
    return (
      <RegularLayout>
        <Card>
          <CelText>
            You have up to 7 days to accept transactions. To do that please
            verify your profile
          </CelText>
        </Card>
        <TransactionsHistory
          hasFilter={false}
          additionalFilter={{ type: 'celpay' }}
        />
      </RegularLayout>
    )
  }
}

export default TransactionsOnHold
