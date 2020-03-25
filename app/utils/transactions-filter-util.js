import moment from "moment";

import { TRANSACTION_TYPES } from "../constants/DATA";

const transactionsFilterUtil = {
  filterTransactions,
};

/**
 * Filters transactions by type, limit or coin
 *
 * @param {Object} transactions
 * @param {Object} filter
 * @param {number} filter.limit
 * @param {Array} filter.coin
 * @param {Array} filter.type
 * @param {string} filter.period
 * @returns {Array}
 */
function filterTransactions(transactions, filter = undefined) {
  if (!transactions) return [];

  const transactionIds = Object.keys(transactions);
  let transactionArray = [];
  transactionIds.forEach(tid => transactionArray.push(transactions[tid]));

  transactionArray = orderTransactionsByDate(transactionArray);

  if (filter) {
    if (filter.coin && filter.coin.length > 0)
      transactionArray = transactionArray.filter(
        t =>
          filter.coin
            .map(f => f.toLowerCase())
            .indexOf(t.coin.toLowerCase()) !== -1 ||
          (t.interest_coin &&
            filter.coin
              .map(f => f.toLowerCase())
              .indexOf(t.interest_coin.toLowerCase()) !== -1)
      );

    if (filter.type && filter.type.length > 0) {
      transactionArray = filterTransactionsByType(
        transactionArray,
        filter.type
      );
    }
    if (filter.limit) {
      transactionArray = transactionArray.slice(0, filter.limit);
    }
    if (filter.period) {
      transactionArray = filterTransactionsByPeriod(
        transactionArray,
        filter.period
      );
    }
  }

  return transactionArray;
}

/**
 * Filters transactions by type
 *
 * @param {Array} transactions
 * @param {Array} types one of interest|withdraw|received/celpay/loan
 * @returns {Array}
 */
function filterTransactionsByType(transactions, types) {
  if (!types) return transactions;
  if (!transactions) return [];

  const transactionTypes = [];
  types.forEach(t => {
    switch (t) {
      case "interest":
        return transactionTypes.push(TRANSACTION_TYPES.INTEREST);
      case "received":
        return transactionTypes.push(
          TRANSACTION_TYPES.DEPOSIT_CONFIRMED,
          TRANSACTION_TYPES.DEPOSIT_PENDING
        );
      case "loan":
        return transactionTypes.push(
          TRANSACTION_TYPES.LOAN_INTEREST,
          TRANSACTION_TYPES.LOAN_PRINCIPAL_PAYMENT,
          TRANSACTION_TYPES.LOAN_PRINCIPAL_RECEIVED,
          TRANSACTION_TYPES.COLLATERAL_LIQUIDATED,
          TRANSACTION_TYPES.COLLATERAL_LOCKED,
          TRANSACTION_TYPES.COLLATERAL_PENDING,
          TRANSACTION_TYPES.COLLATERAL_UNLOCKED
        );
      case "celpay":
        return transactionTypes.push(
          TRANSACTION_TYPES.CELPAY_PENDING_VERIFICATION,
          TRANSACTION_TYPES.CELPAY_PENDING,
          TRANSACTION_TYPES.CELPAY_CANCELED,
          TRANSACTION_TYPES.CELPAY_CLAIMED,
          TRANSACTION_TYPES.CELPAY_ONHOLD,
          TRANSACTION_TYPES.CELPAY_RECEIVED,
          TRANSACTION_TYPES.CELPAY_RETURNED,
          TRANSACTION_TYPES.CELPAY_SENT
        );
      case "withdraw":
        return transactionTypes.push(
          TRANSACTION_TYPES.WITHDRAWAL_CONFIRMED,
          TRANSACTION_TYPES.WITHDRAWAL_PENDING,
          TRANSACTION_TYPES.WITHDRAWAL_CANCELED,
          TRANSACTION_TYPES.WITHDRAWAL_PENDING_VERIFICATION,
          TRANSACTION_TYPES.WITHDRAWAL_PENDING_REVIEW
        );
      default:
        return transactionTypes;
    }
  });

  return transactions.filter(t => transactionTypes.includes(t.type));
}

/**
 * Filters transactions by period
 *
 * @param {Array} transactions
 * @param {string} period
 * @returns {Array}
 */
function filterTransactionsByPeriod(transactions, period) {
  switch (period) {
    case "day":
      return transactions.filter(t =>
        moment(t.time).isAfter(
          moment
            .utc()
            .subtract(24, "hours")
            .format()
        )
      );
    case "week":
      return transactions.filter(t =>
        moment(t.time).isAfter(
          moment
            .utc()
            .subtract(7, "days")
            .format()
        )
      );
    case "month":
      return transactions.filter(t =>
        moment(t.time).isAfter(
          moment
            .utc()
            .subtract(1, "months")
            .format()
        )
      );
    case "threeMonths":
      return transactions.filter(t =>
        moment(t.time).isAfter(
          moment
            .utc()
            .subtract(3, "months")
            .format()
        )
      );
    case "sixMonths":
      return transactions.filter(t =>
        moment(t.time).isAfter(
          moment
            .utc()
            .subtract(6, "months")
            .format()
        )
      );
    case "year":
      return transactions.filter(t =>
        moment(t.time).isAfter(
          moment
            .utc()
            .subtract(1, "years")
            .format()
        )
      );
    case "yearToDate":
      return transactions.filter(t =>
        moment(t.time).isBetween(
          moment
            .utc()
            .startOf("year")
            .format(),
          moment.utc().format()
        )
      );
    case "prevYear":
      return transactions.filter(t =>
        moment(t.time).isBetween(
          moment
            .utc()
            .subtract(1, "years")
            .startOf("year")
            .format(),
          moment
            .utc()
            .subtract(1, "years")
            .endOf("year")
            .format()
        )
      );
    default:
      return transactions;
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
    const date1 = moment(a.time);
    const date2 = moment(b.time);

    if (date1.isAfter(date2)) {
      return -1;
    }
    if (date1.isBefore(date2)) {
      return 1;
    }

    return 0;
  });
}

export default transactionsFilterUtil;
