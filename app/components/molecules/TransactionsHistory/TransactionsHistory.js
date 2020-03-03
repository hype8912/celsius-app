import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, FlatList } from 'react-native'
import moment from 'moment'
import RNPickerSelect from 'react-native-picker-select'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'



import TransactionsHistoryStyle from './TransactionsHistory.styles'
import TransactionRow from '../../atoms/TransactionRow/TransactionRow'
import CelText from '../../atoms/CelText/CelText'
import Icon from '../../atoms/Icon/Icon'
import { getMargins } from '../../../utils/styles-util'
import apiUtil from '../../../utils/api-util'
import API from '../../../constants/API'
import LoadingState from '../../atoms/LoadingState/LoadingState'
import EmptyState from '../../atoms/EmptyState/EmptyState'
import * as appActions from '../../../redux/actions'
import transactionsUtil from '../../../utils/transactions-util'
import STYLES from '../../../constants/STYLES'

@connect(
  state => ({
    transactions: state.transactions.transactionList,
    currencyRatesShort: state.currencies.currencyRatesShort,
    currencies: state.currencies.rates,
    callsInProgress: state.api.callsInProgress
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TransactionsHistory extends Component {
  static propTypes = {
    margin: PropTypes.string,
    filterOptions: PropTypes.instanceOf(Array),
    additionalFilter: PropTypes.instanceOf(Object),
    hasFilter: PropTypes.bool
  }
  static defaultProps = {
    margin: '20 0 0 0',
    filterOptions: [
      { label: 'Withdrawn', value: 'withdraw' },
      { label: 'Received', value: 'received' },
      { label: 'Interest', value: 'interest' },
      { label: 'Celpay', value: 'celpay' }
    ],
    hasFilter: true
  }

  constructor (props) {
    super(props)

    this.state = {}
  }

  componentDidMount () {
    const { actions, additionalFilter } = this.props
    actions.getAllTransactions(additionalFilter)
  }

  handleFilterChange = filter => {
    const { actions, additionalFilter } = this.props

    actions.getAllTransactions({
      type: filter,
      ...additionalFilter
    })
    this.setState({ filter })
  }

  prepTransactions () {
    const { filter } = this.state
    const { transactions, additionalFilter, currencyRatesShort } = this.props

    const transactionsArray = transactionsUtil.filterTransactions(
      transactions,
      {
        type: filter,
        ...additionalFilter
      }
    )

    const transactionsDisplay = transactionsArray.map(t => ({
      id: t.id,
      amount: t.amount,
      amount_usd: t.amount_usd
        ? t.amount_usd
        : t.amount * currencyRatesShort[t.coin],
      nature: t.nature,
      interest_coin: t.interest_coin,
      coin: t.coin,
      time: moment(t.time).isSame(moment(), 'day')
        ? moment(t.time).format('HH:mm')
        : moment(t.time).format('DD MMM YYYY'),
      status: t.is_confirmed ? t.type : 'pending',
      type: t.type,
      transfer_data: t.transfer_data
    }))

    return transactionsDisplay
  }

  render () {
    const { filter } = this.state
    const {
      actions,
      margin,
      filterOptions,
      callsInProgress,
      hasFilter
    } = this.props
    const style = TransactionsHistoryStyle()
    const margins = getMargins(margin)

    if (
      apiUtil.areCallsInProgress([API.GET_ALL_TRANSACTIONS], callsInProgress)
    ) {
      return <LoadingState />
    }

    const transactionsDisplay = this.prepTransactions()
    if (!transactionsDisplay || !transactionsDisplay.length) {
      return (
        <EmptyState
          heading='Sorry'
          paragraphs={['No transactions in your wallet']}
        />
      )
    }

    return (
      <View style={[style.container, margins]}>
        <View style={style.filterContainer}>
          <View>
            <CelText weight='medium' type='H6' margin='15 0 0 0'>
              Transaction history
            </CelText>
          </View>
          {hasFilter && (
            <RNPickerSelect
              placeholder={{ label: 'Show only:', color: 'rgba(0,0,0,0.5)' }}
              items={filterOptions}
              onValueChange={this.handleFilterChange}
              value={filter || null}
              style={{ height: 32, width: 32  }}
            >
              <View
                style={{
                  height: 50,
                  width: 50,
                  paddingTop: 20,
                  marginBottom: 20,
                  alignItems: "flex-end",
                  }}
                >
                <Icon
                  name='Filter'
                  width='16'
                  height='16'
                  fill={STYLES.COLORS.DARK_GRAY}
                />
              </View>
            </RNPickerSelect>
          )}
        </View>

        <FlatList
          data={transactionsDisplay}
          renderItem={({ item, index }) => (
            <TransactionRow
              transaction={item}
              index={index}
              count={transactionsDisplay.length}
              onPress={() =>
                actions.navigateTo('TransactionDetails', { id: item.id })
              }
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }
}

export default TransactionsHistory
