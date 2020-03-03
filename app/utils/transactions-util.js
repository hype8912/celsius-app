import moment from "moment";

import { TRANSACTION_TYPES } from "../constants/DATA";
import STYLES from "../constants/STYLES";

const transactionsUtil = {
  mapTransaction,
  filterTransactions,
  getTransactionsProps,
  getTransactionSections
};


/**
 * Maps transaction props from server
 *
 * @param {Object} transaction
 * @returns {Object}
 */
function mapTransaction(transaction) {
  return {
    ...transaction,
    type: getTransactionType(transaction)
  };
}


/**
 * Gets transaction type
 *
 * @param {Object} transaction
 * @returns {string} one of TRANSACTION_TYPES
 */
function getTransactionType(transaction) {
  if (["canceled", "removed", "rejected", "rejeceted"].includes(transaction.state)){
    if (transaction.nature === "withdrawal") {
      return TRANSACTION_TYPES.WITHDRAWAL_CANCELED;
    }
    return TRANSACTION_TYPES.CANCELED;
  }

  if (transaction.nature === "deposit" && !transaction.is_confirmed) return TRANSACTION_TYPES.DEPOSIT_PENDING;
  if (transaction.nature === "deposit" && transaction.is_confirmed) return TRANSACTION_TYPES.DEPOSIT_CONFIRMED;
  if (transaction.nature === "withdrawal") {
    if (transaction.verified === false) return TRANSACTION_TYPES.WITHDRAWAL_PENDING_VERIFICATION
    if (transaction.verified && transaction.state === "pending_manual_approval") return TRANSACTION_TYPES.WITHDRAWAL_PENDING_REVIEW
    if (!transaction.is_confirmed) return TRANSACTION_TYPES.WITHDRAWAL_PENDING
    if (transaction.is_confirmed) return TRANSACTION_TYPES.WITHDRAWAL_CONFIRMED
  }
  if (transaction.nature === "interest") return TRANSACTION_TYPES.INTEREST;
  if (transaction.nature === "collateral") return TRANSACTION_TYPES.COLLATERAL;
  if (transaction.nature === "bonus_token") return TRANSACTION_TYPES.BONUS_TOKEN;

  if (transaction.nature === "referred_award" && transaction.state === "locked") return TRANSACTION_TYPES.REFERRED_HODL;
  if (transaction.nature === "referred_award" && transaction.state === "confirmed") return TRANSACTION_TYPES.REFERRED;
  if (transaction.nature === "referred_award" && transaction.state === "unconfirmed") return TRANSACTION_TYPES.REFERRED_PENDING;
  if (transaction.nature === "referrer_award" && transaction.state === "locked") return TRANSACTION_TYPES.REFERRER_HODL;
  if (transaction.nature === "referrer_award" && transaction.state === "confirmed") return TRANSACTION_TYPES.REFERRER;
  if (transaction.nature === "referrer_award" && transaction.state === "unconfirmed") return TRANSACTION_TYPES.REFERRER_PENDING;

  if (transaction.nature === "inbound_transfer" && transaction.transfer_data.claimed_at && !transaction.transfer_data.cleared_at && !transaction.transfer_data.expired_at) return TRANSACTION_TYPES.CELPAY_ONHOLD;
  if (transaction.nature === "inbound_transfer" && transaction.transfer_data.claimed_at && !transaction.transfer_data.cleared_at && transaction.transfer_data.expired_at) return TRANSACTION_TYPES.CELPAY_RETURNED;
  if (transaction.nature === "inbound_transfer" && transaction.transfer_data) return TRANSACTION_TYPES.CELPAY_RECEIVED;
  if (transaction.nature === "outbound_transfer" && transaction.transfer_data) {
    if (!transaction.transfer_data.claimed_at && !transaction.transfer_data.cleared_at && !transaction.transfer_data.expired_at) return TRANSACTION_TYPES.CELPAY_PENDING;
    if (transaction.transfer_data.claimed_at && !transaction.transfer_data.cleared_at) return TRANSACTION_TYPES.CELPAY_CLAIMED;
    if (transaction.transfer_data.claimed_at && transaction.transfer_data.cleared_at) return TRANSACTION_TYPES.CELPAY_SENT;
    if (transaction.transfer_data.expired_at) return TRANSACTION_TYPES.CELPAY_RETURNED;
  }

  if (transaction.type === "incoming") return TRANSACTION_TYPES.IN;
  if (transaction.type === "outgoing") return TRANSACTION_TYPES.OUT;
}


/**
 * Filters transactions by type, limit or coin
 *
 * @param {Object} transactions
 * @param {Object} filter
 * @param {number} filter.limit
 * @param {string} filter.coin
 * @param {string} filter.type
 * @returns {Array}
 */
function filterTransactions(transactions, filter = undefined) {
  if (!transactions) return [];

  const transactionIds = Object.keys(transactions);
  let transactionArray = [];
  transactionIds.forEach(tid => transactionArray.push(transactions[tid]))

  transactionArray = orderTransactionsByDate(transactionArray);

  if (filter) {
    if (filter.coin) transactionArray = transactionArray.filter(t => t.coin.toLowerCase() === filter.coin.toLowerCase() || (t.interest_coin && t.interest_coin.toLowerCase() === filter.coin.toLowerCase()));
    if (filter.type) transactionArray = filterTransactionsByType(transactionArray, filter.type);
    if (filter.limit) transactionArray = transactionArray.slice(0, filter.limit);
  }

  return transactionArray;
}


/**
 * Filters transactions by type
 *
 * @param {Array} transactions
 * @param {string} type one of interest|withdraw|received
 * @returns {Array}
 */
function filterTransactionsByType(transactions, type) {
  switch (type) {
    case 'interest':
      return transactions.filter(t => t.type === TRANSACTION_TYPES.INTEREST)
    case 'received':
      return transactions.filter(t => [TRANSACTION_TYPES.DEPOSIT_CONFIRMED, TRANSACTION_TYPES.DEPOSIT_PENDING].includes(t.type))
    case 'withdraw':
      return transactions.filter(t => [TRANSACTION_TYPES.WITHDRAWAL_CONFIRMED, TRANSACTION_TYPES.WITHDRAWAL_PENDING, TRANSACTION_TYPES.WITHDRAWAL_CANCELED].includes(t.type))
    default:
      return transactions
  }
}


/**
 * Orders transactions
 *
 * @param {Array} transactions
 * @returns {Array}
 */
function orderTransactionsByDate(transactions = []) {
  return transactions.sort((a, b) => {
    const date1 = moment(a.time)
    const date2 = moment(b.time)

    if (date1.isAfter(date2)) {
      return -1;
    }
    if (date1.isBefore(date2)) {
      return 1;
    }

    return 0;
  });
}


/**
 * Get UI props for TransactionDetails screen
 *
 * @param {Object} transaction
 * @returns {Object} screenProps
 * @returns {string} screenProps.title
 * @returns {string} screenProps.color
 * @returns {string} screenProps.iconName
 * @returns {string} screenProps.statusText
 */
function getTransactionsProps(transaction) {
  switch (transaction.type) {
    case TRANSACTION_TYPES.DEPOSIT_PENDING:
      return {
        title: (coin) => `${coin} Deposit`,
        color: STYLES.COLORS.ORANGE,
        iconName: 'TransactionReceived',
        statusText: 'Pending'
      }
    case TRANSACTION_TYPES.DEPOSIT_CONFIRMED:
      return { // Deposit
        title: (coin) => `${coin} Deposit`,
        color: STYLES.COLORS.GREEN,
        iconName: 'TransactionReceived',
        statusText: 'Received'
      }
    case TRANSACTION_TYPES.WITHDRAWAL_PENDING:
      return { // Withdrawn pending
        title: (coin) => `${coin} Withdrawal`,
        color: STYLES.COLORS.ORANGE,
        iconName: 'TransactionSent',
        statusText: 'Pending'
      }
      case TRANSACTION_TYPES.WITHDRAWAL_CANCELED:
      return { // Withdrawn canceled
        title: (coin) => `${coin} Withdrawal`,
        color: STYLES.COLORS.RED,
        iconName: 'TransactionCanceled',
        statusText: 'Canceled'
      }
    case TRANSACTION_TYPES.WITHDRAWAL_CONFIRMED:
      return {
        title: (coin) => `${coin} Withdrawal`,
        color: STYLES.COLORS.RED,
        iconName: 'TransactionSent',
        statusText: 'Withdrawn'
      }
    case TRANSACTION_TYPES.WITHDRAWAL_PENDING_VERIFICATION:
      return {
        title: (coin) => `${coin} Withdrawal`,
        color: STYLES.COLORS.ORANGE,
        iconName: 'TransactionSent',
        statusText: 'Pending verification'
      }
    case TRANSACTION_TYPES.WITHDRAWAL_PENDING_REVIEW:
      return {
        title: (coin) => `${coin} Withdrawal`,
        color: STYLES.COLORS.ORANGE,
        iconName: 'TransactionSent',
        statusText: 'Pending review'
      }

    case TRANSACTION_TYPES.INTEREST:
      return { // Interest
        title: (coin) => `${coin} Interest`,
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: 'TransactionInterest',
        statusText: `${transaction.interest_coin && transaction.interest_coin.toUpperCase()} interest`
      }
    case TRANSACTION_TYPES.COLLATERAL:
      return { // Loan Active ? locked ?
        title: () => `Dollar loan`,
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: 'TransactionLocked',
        statusText: 'Loan Collateral'
      }
    // TITLE pise CEL ?
    case TRANSACTION_TYPES.BONUS_TOKEN:
      return { // free cels NEMA
        title: () => `Bonus CEL`,
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: 'ReceiveArrowTransactions',
        statusText: 'Bonus'
      }
    case TRANSACTION_TYPES.CELPAY_PENDING:
      return { // T
        title: () => `Waiting to be accepted`,
        color: STYLES.COLORS.ORANGE,
        iconName: 'TransactionSent',
        statusText: 'Pending'
      }
    case TRANSACTION_TYPES.CELPAY_CLAIMED:
      return {
        title: (coin) => `${coin} Claimed`,
        color: STYLES.COLORS.GREEN,
        iconName: 'TransactionSent',
        statusText: 'Claimed'
      }
    case TRANSACTION_TYPES.CELPAY_SENT:
      return {
        title: (coin) => `${coin} Sent`,
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: 'TransactionSent',
        statusText: 'Sent'
      }
    case TRANSACTION_TYPES.CELPAY_RECEIVED:
      return { // T
        title: () => `CelPay Received`,
        color: STYLES.COLORS.GREEN,
        iconName: 'TransactionReceived',
        statusText: 'Received'
      }
    case TRANSACTION_TYPES.CELPAY_RETURNED:
      return { // RETURNED
        title: () => `Canceled Transaction`,
        color: STYLES.COLORS.RED,
        iconName: 'TransactionCanceled',
        statusText: 'Returned'
      }
    // case TRANSACTION_TYPES.CELPAY_EXPIRED:  // RETURNED
    //   return {
    //   title: (coin) => `${coin} Deposit`,
    //   color: STYLES.COLORS.RED,
    //   iconName: 'TransactionLocked',
    //   statusText: 'Expired'
    // }
    case TRANSACTION_TYPES.CELPAY_ONHOLD:
      return {
        title: (coin) => `Received ${coin}`,
        color: STYLES.COLORS.ORANGE,
        iconName: 'ReceiveArrowTransactions',
        statusText: 'On Hold'
      }

    case TRANSACTION_TYPES.REFERRED_HODL:
      return { // drugi locked
        title: () => `HODL Award`,
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: 'TransactionLocked',
        statusText: 'Locked reward'
      }
    case TRANSACTION_TYPES.REFERRED:
      return { // T
        title: () => `Referral Award`,
        color: STYLES.COLORS.GREEN,
        iconName: 'TransactionReceived',
        statusText: 'Referral reward'
      }
      case TRANSACTION_TYPES.REFERRED_PENDING:
      return {
        title: () => `Referral Award`,
        color: STYLES.COLORS.ORANGE,
        iconName: 'TransactionReceived',
        statusText: 'Pending'
      }
    case TRANSACTION_TYPES.REFERRER_HODL:
      return { // prvi locked
        title: () => `Referral Award`,
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: 'TransactionLocked',
        statusText: 'Locked'
      }
    case TRANSACTION_TYPES.REFERRER:
      return { // T
        title: () => `Referral Award`,
        color: STYLES.COLORS.GREEN,
        iconName: 'TransactionReceived',
        statusText: 'Referral reward'
      }
      case TRANSACTION_TYPES.REFERRER_PENDING:
      return {
        title: () => `Referral Award`,
        color: STYLES.COLORS.ORANGE,
        iconName: 'TransactionReceived',
        statusText: 'Pending'
      }

    case TRANSACTION_TYPES.CANCELED:
      return { // Gledam kao returned
        title: () => `Canceled Transaction`,
        color: STYLES.COLORS.RED,
        iconName: 'TransactionCanceled',
        statusText: 'Canceled'
      }

    case TRANSACTION_TYPES.IN:
      return { // default in
        title: (coin) => `Received ${coin}`,
        color: STYLES.COLORS.GREEN,
        iconName: 'TransactionReceived',
        statusText: 'Received'
      }
    case TRANSACTION_TYPES.OUT:
      return { // default in
        title: (coin) => `Sent ${coin}`,
        color: STYLES.COLORS.RED,
        iconName: 'TransactionSent',
        statusText: 'Sent'
      }
    default:
      break;
  }
}

/**
 * Gets sections for TransactionDetails screen
 *
 * @param {Object} transaction
 * @returns {Array}
 */
function getTransactionSections(transaction) {

  // return ['info', 'address:from', 'address:to', 'hodl:info', 'loan:rejected', 'date', 'date:deposited', 'time', 'status', 'loan:date', 'loan:amount', 'loan:collateral', 'loan:deadline', 'loan:annualInterestRate', 'loan:monthlyInterest', 'loan:totalInterest', 'interest', 'button:back', 'button:deposit', 'button:celpay:another', 'button:celpay:friend', 'button:applyForLoan', 'button:refer', 'button:cancel', 'note']
  switch (transaction.type) {
    case TRANSACTION_TYPES.DEPOSIT_PENDING: return ['info', 'address:from', 'date', 'time', 'status:noSeparator', 'transactionId', 'button:deposit', 'button:back']
    case TRANSACTION_TYPES.DEPOSIT_CONFIRMED: return ['info', 'address:from', 'date', 'time', 'status:noSeparator', 'transactionId', 'button:deposit', 'button:back']
    case TRANSACTION_TYPES.WITHDRAWAL_PENDING_VERIFICATION: return ['info', 'address:to', 'date', 'time', 'status:noSeparator', 'button:deposit', 'button:cancel:withdrawal', 'button:back']
    case TRANSACTION_TYPES.WITHDRAWAL_PENDING_REVIEW: return ['info', 'address:to', 'date', 'time', 'status:noSeparator', 'button:deposit', 'button:back']
    case TRANSACTION_TYPES.WITHDRAWAL_PENDING: return ['info', 'address:to', 'date', 'time', 'status:noSeparator', 'transactionId', 'button:deposit', 'button:back']
    case TRANSACTION_TYPES.WITHDRAWAL_CANCELED: return ['info', 'date', 'time', 'status:noSeparator', 'transactionId', 'button:deposit', 'button:back']
    case TRANSACTION_TYPES.WITHDRAWAL_CONFIRMED: return ['info', 'address:to', 'date', 'time', 'status:noSeparator', 'transactionId', 'button:deposit', 'button:back']

    case TRANSACTION_TYPES.INTEREST: return ['info', 'date', 'time', 'status:noSeparator', 'interest', 'button:deposit', 'button:back']
    case TRANSACTION_TYPES.COLLATERAL: return ['info', 'loan:date', 'time', 'status', 'loan:amount', 'loan:collateral', 'loan:deadline', 'loan:annualInterestRate', 'loan:monthlyInterest', 'loan:totalInterest', 'button:applyForLoan', 'button:back']
    case TRANSACTION_TYPES.BONUS_TOKEN: return ['info', 'date', 'time', 'status'] // TODO

    case TRANSACTION_TYPES.CELPAY_PENDING: return ['info', 'sentTo', 'date', 'time', 'status', 'type', 'note', 'button:celpay:another', 'button:cancel:celpay', 'button:back'] // add sent to
    case TRANSACTION_TYPES.CELPAY_CLAIMED: return ['info', 'sentTo', 'date', 'time', 'status', 'type', 'note', 'button:celpay:another', 'button:back'] // add sent to
    case TRANSACTION_TYPES.CELPAY_SENT: return ['info', 'sentTo', 'date', 'time', 'status', 'type', 'note', 'button:celpay:another', 'button:back'] // add sent to
    case TRANSACTION_TYPES.CELPAY_RECEIVED: return ['info', 'sentFrom', 'date', 'time', 'status', 'type', 'note', 'button:celpay:friend', 'button:back'] // add sent to
    case TRANSACTION_TYPES.CELPAY_RETURNED: return ['info', 'sentTo', 'date', 'time', 'status', 'type', 'note', 'button:celpay:another', 'button:back'] // add sent to
    case TRANSACTION_TYPES.CELPAY_EXPIRED: return ['info', 'date', 'time', 'status', 'type', 'note', 'button:celpay:another', 'button:back'] // add sent to
    case TRANSACTION_TYPES.CELPAY_ONHOLD: return ['info', 'date', 'time', 'status', 'type', 'note', 'button:celpay:friend', 'button:back'] // add sent to

    case TRANSACTION_TYPES.REFERRED_HODL: return ['info', 'hodl:info', 'date:deposited', 'time', 'status:noSeparator']

    case TRANSACTION_TYPES.REFERRED: return ['info', 'referred', 'date', 'time', 'status:noSeparator', 'button:refer', 'button:back'] // add friend referred info
    case TRANSACTION_TYPES.REFERRED_PENDING: return ['info', 'referred:pending', 'date', 'time', 'status:noSeparator', 'button:refer', 'button:back'] // unconfirmed

    case TRANSACTION_TYPES.REFERRER_HODL: return ['info', 'referrerHODL', 'date', 'time', 'status:noSeparator', 'button:refer', 'button:back']  // add friend referred info with hodl:info

    case TRANSACTION_TYPES.REFERRER: return ['info', 'referrer', 'date', 'time', 'status:noSeparator', 'button:refer', 'button:back'] // add friend referred info
    case TRANSACTION_TYPES.REFERRER_PENDING: return ['info', 'referrer:pending', 'date', 'time', 'status:noSeparator', 'button:refer', 'button:back'] // unconfirmed


    case TRANSACTION_TYPES.CANCELED: return ['info', 'date', 'time', 'status'] // this is random!,

    case TRANSACTION_TYPES.IN: return ['info', 'date', 'time', 'status']
    case TRANSACTION_TYPES.OUT: return ['info', 'date', 'time', 'status']

    default:
      break;
  }
}



export default transactionsUtil;
