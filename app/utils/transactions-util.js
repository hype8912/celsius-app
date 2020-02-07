import moment from "moment";

import { TRANSACTION_TYPES } from "../constants/DATA";
import STYLES from "../constants/STYLES";
import formatter from "./formatter";

const transactionsUtil = {
  mapTransaction,
  filterTransactions,
};

/**
 * Maps transaction props from server
 *
 * @param {Object} transaction
 * @returns {Object}
 */
function mapTransaction(transaction) {
  let newTransaction = { ...transaction };

  newTransaction.type = getTransactionType(newTransaction);
  newTransaction = maskCelPayUser(newTransaction);
  newTransaction.uiProps = getTransactionProps(newTransaction);
  newTransaction.uiSections = getTransactionSections(newTransaction);

  return newTransaction;
}

/**
 * Masks senders and receivers first name, last name and their emails
 *
 * @param {Object} transaction
 * @returns {Object}
 */
function maskCelPayUser(transaction) {
  const newTransaction = { ...transaction };

  if (newTransaction.type.includes("CELPAY")) {
    if (
      newTransaction.transfer_data &&
      newTransaction.transfer_data.claimer &&
      newTransaction.transfer_data.sender
    ) {
      if (
        newTransaction.transfer_data.claimer.first_name &&
        newTransaction.transfer_data.claimer.last_name
      ) {
        newTransaction.transfer_data.claimer.first_name = formatter.hideTextExceptFirstNLetters(
          newTransaction.transfer_data.claimer.first_name
        );
        newTransaction.transfer_data.claimer.last_name = formatter.hideTextExceptFirstNLetters(
          newTransaction.transfer_data.claimer.last_name
        );
      }
      if (
        newTransaction.transfer_data.sender.first_name &&
        newTransaction.transfer_data.sender.last_name
      ) {
        newTransaction.transfer_data.sender.first_name = formatter.hideTextExceptFirstNLetters(
          newTransaction.transfer_data.sender.first_name
        );
        newTransaction.transfer_data.sender.last_name = formatter.hideTextExceptFirstNLetters(
          newTransaction.transfer_data.sender.last_name
        );
      }

      if (newTransaction.transfer_data.claimer.email) {
        newTransaction.transfer_data.claimer.email = formatter.maskEmail(
          newTransaction.transfer_data.claimer.email
        );
      }

      if (newTransaction.transfer_data.sender.email) {
        newTransaction.transfer_data.sender.email = formatter.maskEmail(
          newTransaction.transfer_data.sender.email
        );
      }
    }
  }

  return newTransaction;
}

/**
 * Gets transaction type
 *
 * @param {Object} transaction
 * @returns {string} one of TRANSACTION_TYPES
 */
function getTransactionType(transaction) {
  if (
    ["canceled", "removed", "rejected", "rejeceted"].includes(transaction.state)
  ) {
    if (transaction.nature === "withdrawal") {
      return TRANSACTION_TYPES.WITHDRAWAL_CANCELED;
    }
    if (transaction.nature === "outbound_transfer") {
      return TRANSACTION_TYPES.CELPAY_CANCELED;
    }
    return TRANSACTION_TYPES.CANCELED;
  }

  if (
    transaction.nature === "referred_award" &&
    !transaction.referral_data.referrer &&
    !transaction.referral_data.referred
  ) {
    return TRANSACTION_TYPES.PROMO_CODE_BONUS;
  }
  if (transaction.nature === "deposit" && !transaction.is_confirmed)
    return TRANSACTION_TYPES.DEPOSIT_PENDING;
  if (transaction.nature === "deposit" && transaction.is_confirmed)
    return TRANSACTION_TYPES.DEPOSIT_CONFIRMED;
  if (transaction.nature === "withdrawal") {
    if (transaction.verified === false)
      return TRANSACTION_TYPES.WITHDRAWAL_PENDING_VERIFICATION;
    if (transaction.verified && transaction.state === "pending_manual_approval")
      return TRANSACTION_TYPES.WITHDRAWAL_PENDING_REVIEW;
    if (!transaction.is_confirmed) return TRANSACTION_TYPES.WITHDRAWAL_PENDING;
    if (transaction.is_confirmed) return TRANSACTION_TYPES.WITHDRAWAL_CONFIRMED;
  }
  if (transaction.nature === "interest") return TRANSACTION_TYPES.INTEREST;
  if (transaction.nature === "bonus_token")
    return TRANSACTION_TYPES.BONUS_TOKEN;

  if (transaction.nature === "collateral") {
    if (transaction.state === "pending")
      return TRANSACTION_TYPES.COLLATERAL_PENDING;
    if (transaction.state === "locked")
      return TRANSACTION_TYPES.COLLATERAL_LOCKED;
    if (transaction.state === "unlocked")
      return TRANSACTION_TYPES.COLLATERAL_UNLOCKED;
    if (transaction.state === "liquidated")
      return TRANSACTION_TYPES.COLLATERAL_LIQUIDATED;
    if (transaction.state === "confirmed") return TRANSACTION_TYPES.MARGIN_CALL;
  }

  // if (transaction.nature === "margin_call") return TRANSACTION_TYPES.MARGIN_CALL;
  if (transaction.nature === "pending_interest")
    return TRANSACTION_TYPES.PENDING_INTEREST;

  if (transaction.nature === "referred_award" && transaction.state === "locked")
    return TRANSACTION_TYPES.REFERRED_HODL;
  if (
    transaction.nature === "referred_award" &&
    transaction.state === "confirmed"
  )
    return TRANSACTION_TYPES.REFERRED;
  if (
    transaction.nature === "referred_award" &&
    transaction.state === "unconfirmed"
  )
    return TRANSACTION_TYPES.REFERRED_PENDING;
  if (transaction.nature === "referrer_award" && transaction.state === "locked")
    return TRANSACTION_TYPES.REFERRER_HODL;
  if (
    transaction.nature === "referrer_award" &&
    transaction.state === "confirmed"
  )
    return TRANSACTION_TYPES.REFERRER;
  if (
    transaction.nature === "referrer_award" &&
    transaction.state === "unconfirmed"
  )
    return TRANSACTION_TYPES.REFERRER_PENDING;

  if (transaction.nature === "loan_principal_payment") {
    if (transaction.type === "outgoing")
      return TRANSACTION_TYPES.LOAN_PRINCIPAL_PAYMENT;
    if (transaction.type === "incoming")
      return TRANSACTION_TYPES.LOAN_PRINCIPAL_RECEIVED;
  }
  if (transaction.nature === "loan_interest_payment")
    return TRANSACTION_TYPES.LOAN_INTEREST;
  if (transaction.nature === "loan_prepayment")
    return TRANSACTION_TYPES.LOAN_INTEREST;

  if (
    transaction.nature === "inbound_transfer" &&
    transaction.transfer_data.claimed_at &&
    !transaction.transfer_data.cleared_at &&
    !transaction.transfer_data.expired_at
  )
    return TRANSACTION_TYPES.CELPAY_ONHOLD;
  if (
    transaction.nature === "inbound_transfer" &&
    transaction.transfer_data.claimed_at &&
    !transaction.transfer_data.cleared_at &&
    transaction.transfer_data.expired_at
  )
    return TRANSACTION_TYPES.CELPAY_RETURNED;
  if (transaction.nature === "inbound_transfer" && transaction.transfer_data)
    return TRANSACTION_TYPES.CELPAY_RECEIVED;
  if (transaction.nature === "outbound_transfer" && transaction.transfer_data) {
    if (
      !transaction.transfer_data.claimed_at &&
      !transaction.transfer_data.cleared_at &&
      !transaction.transfer_data.expired_at &&
      !transaction.transfer_data.is_confirmed
    )
      return TRANSACTION_TYPES.CELPAY_PENDING_VERIFICATION;
    if (
      !transaction.transfer_data.claimed_at &&
      !transaction.transfer_data.cleared_at &&
      !transaction.transfer_data.expired_at &&
      transaction.transfer_data.is_confirmed
    )
      return TRANSACTION_TYPES.CELPAY_PENDING;
    if (
      transaction.transfer_data.claimed_at &&
      !transaction.transfer_data.cleared_at
    )
      return TRANSACTION_TYPES.CELPAY_CLAIMED;
    if (
      transaction.transfer_data.claimed_at &&
      transaction.transfer_data.cleared_at
    )
      return TRANSACTION_TYPES.CELPAY_SENT;
    if (transaction.transfer_data.expired_at)
      return TRANSACTION_TYPES.CELPAY_RETURNED;
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
          TRANSACTION_TYPES.CELPAY_EXPIRED,
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
function getTransactionProps(transaction) {
  switch (transaction.type) {
    case TRANSACTION_TYPES.PENDING_INTEREST:
      return {
        title: coin => `${coin} Interest`,
        color: STYLES.COLORS.ORANGE,
        iconName: "TransactionInterest",
        statusText: "Interest pending",
      };
    case TRANSACTION_TYPES.MARGIN_CALL:
      return {
        title: () => "Margin Call Collateral",
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: "TransactionSent",
        statusText: "Margin Call Collateral",
      };
    case TRANSACTION_TYPES.LOAN_PRINCIPAL_RECEIVED:
      return {
        title: () => "Loan Received",
        color: STYLES.COLORS.GREEN,
        iconName: "TransactionReceived",
        statusText: "Loan Received",
      };
    case TRANSACTION_TYPES.LOAN_PRINCIPAL_PAYMENT:
      return {
        title: () => "Principal Payment",
        color: STYLES.COLORS.GREEN,
        iconName: "TransactionSent",
        statusText: "Loan Principal Payment",
      };
    case TRANSACTION_TYPES.LOAN_INTEREST:
      return {
        title: () => "Loan Interest Payment",
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: "TransactionSent",
        statusText: "Loan Interest Payment",
      };
    case TRANSACTION_TYPES.DEPOSIT_PENDING:
      return {
        title: coin => `${coin} Deposit`,
        color: STYLES.COLORS.ORANGE,
        iconName: "TransactionReceived",
        statusText: "Pending",
      };
    case TRANSACTION_TYPES.DEPOSIT_CONFIRMED:
      return {
        title: coin => `${coin} Deposit`,
        color: STYLES.COLORS.GREEN,
        iconName: "TransactionReceived",
        statusText: "Received",
      };
    case TRANSACTION_TYPES.WITHDRAWAL_PENDING:
      return {
        title: coin => `${coin} Withdrawal`,
        color: STYLES.COLORS.ORANGE,
        iconName: "TransactionSent",
        statusText: "Pending",
      };
    case TRANSACTION_TYPES.WITHDRAWAL_CANCELED:
      return {
        // Withdrawn canceled
        title: coin => `${coin} Withdrawal`,
        color: STYLES.COLORS.RED,
        iconName: "TransactionCanceled",
        statusText: "Canceled",
      };
    case TRANSACTION_TYPES.WITHDRAWAL_CONFIRMED:
      return {
        title: coin => `${coin} Withdrawal`,
        color: STYLES.COLORS.RED,
        iconName: "TransactionSent",
        statusText: "Withdrawn",
      };
    case TRANSACTION_TYPES.WITHDRAWAL_PENDING_VERIFICATION:
      return {
        title: coin => `${coin} Withdrawal`,
        color: STYLES.COLORS.ORANGE,
        iconName: "TransactionSent",
        statusText: "Pending verification",
      };
    case TRANSACTION_TYPES.WITHDRAWAL_PENDING_REVIEW:
      return {
        title: coin => `${coin} Withdrawal`,
        color: STYLES.COLORS.ORANGE,
        iconName: "TransactionSent",
        statusText: "Pending review",
      };

    case TRANSACTION_TYPES.INTEREST:
      return {
        title: coin => `${coin} Interest`,
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: "TransactionInterest",
        statusText: `${transaction.interest_coin &&
          transaction.interest_coin.toUpperCase()} interest`,
      };

    case TRANSACTION_TYPES.BONUS_TOKEN:
      return {
        title: () => `Bonus CEL`,
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: "ReceiveArrowTransactions",
        statusText: "Bonus",
      };

    case TRANSACTION_TYPES.CELPAY_PENDING_VERIFICATION:
    case TRANSACTION_TYPES.CELPAY_PENDING:
      return {
        title: () => "CelPay Pending",
        color: STYLES.COLORS.ORANGE,
        iconName: "TransactionSent",
        statusText: "CelPay Pending",
      };
    case TRANSACTION_TYPES.CELPAY_CLAIMED:
    case TRANSACTION_TYPES.CELPAY_SENT:
      return {
        title: coin => `${coin} Sent`,
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: "TransactionSent",
        statusText: "CelPay Sent",
      };
    case TRANSACTION_TYPES.CELPAY_RECEIVED:
      return {
        title: () => `CelPay Received`,
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: "TransactionReceived",
        statusText: "CelPay Received",
      };
    case TRANSACTION_TYPES.CELPAY_RETURNED:
      return {
        title: () => `Canceled Transaction`,
        color: STYLES.COLORS.RED,
        iconName: "TransactionCanceled",
        statusText: "CelPay Returned",
      };

    case TRANSACTION_TYPES.CELPAY_ONHOLD:
      return {
        title: coin => `Received ${coin}`,
        color: STYLES.COLORS.ORANGE,
        iconName: "ReceiveArrowTransactions",
        statusText: "CelPay On Hold",
      };

    case TRANSACTION_TYPES.CELPAY_CANCELED:
      return {
        title: () => "CelPay Canceled",
        color: STYLES.COLORS.RED,
        iconName: "TransactionCanceled",
        statusText: "CelPay Canceled",
      };


    case TRANSACTION_TYPES.COLLATERAL_PENDING:
      return {
        title: () => `Pending Collateral`,
        color: STYLES.COLORS.ORANGE,
        iconName: "TransactionLocked",
        statusText: "Pending Collateral",
      };
    case TRANSACTION_TYPES.COLLATERAL_LOCKED:
      return {
        title: () => `Locked Collateral`,
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: "TransactionLocked",
        statusText: "Locked Collateral",
      };
    case TRANSACTION_TYPES.COLLATERAL_UNLOCKED:
      return {
        title: () => `Unlocked Collateral`,
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: "TransactionUnlocked",
        statusText: "Unlocked Collateral",
      };
    case TRANSACTION_TYPES.COLLATERAL_LIQUIDATED:
      return {
        title: () => `Liquidated Collateral`,
        color: STYLES.COLORS.RED,
        iconName: "TransactionLocked",
        statusText: "Liquidated Collateral",
      };
    case TRANSACTION_TYPES.PROMO_CODE_BONUS:
      return {
        title: () => "Promo Code Bonus",
        color: STYLES.COLORS.GREEN,
        iconName: "Present",
        statusText: "Promo Code Bonus",
      };
    case TRANSACTION_TYPES.REFERRED_HODL:
      return {
        title: () => `HODL Award`,
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: "TransactionLocked",
        statusText: "Locked reward",
      };
    case TRANSACTION_TYPES.REFERRED:
      return {
        title: () => `Referral Award`,
        color: STYLES.COLORS.GREEN,
        iconName: "TransactionReceived",
        statusText: "Referral reward",
      };
    case TRANSACTION_TYPES.REFERRED_PENDING:
      return {
        title: () => `Referral Award`,
        color: STYLES.COLORS.ORANGE,
        iconName: "TransactionReceived",
        statusText: "Pending",
      };
    case TRANSACTION_TYPES.REFERRER_HODL:
      return {
        title: () => `Referral Award`,
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: "TransactionLocked",
        statusText: "Locked",
      };
    case TRANSACTION_TYPES.REFERRER:
      return {
        title: () => `Referral Award`,
        color: STYLES.COLORS.GREEN,
        iconName: "TransactionReceived",
        statusText: "Referral reward",
      };
    case TRANSACTION_TYPES.REFERRER_PENDING:
      return {
        title: () => `Referral Award`,
        color: STYLES.COLORS.ORANGE,
        iconName: "TransactionReceived",
        statusText: "Pending",
      };

    case TRANSACTION_TYPES.CANCELED:
      return {
        title: () => `Canceled Transaction`,
        color: STYLES.COLORS.RED,
        iconName: "TransactionCanceled",
        statusText: "Canceled",
      };

    case TRANSACTION_TYPES.IN:
      return {
        title: coin => `Received ${coin}`,
        color: STYLES.COLORS.GREEN,
        iconName: "TransactionReceived",
        statusText: "Received",
      };
    case TRANSACTION_TYPES.OUT:
      return {
        title: coin => `Sent ${coin}`,
        color: STYLES.COLORS.RED,
        iconName: "TransactionSent",
        statusText: "Sent",
      };
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
  switch (transaction.type) {
    case TRANSACTION_TYPES.PROMO_CODE_BONUS:
      return ["info", "date", "time", "status:noSeparator", "button:back"];
    case TRANSACTION_TYPES.PENDING_INTEREST:
      return [
        "info",
        "date",
        "time",
        "status:noSeparator",
        "info:box",
        "button:deposit",
        "button:back",
      ];
    case TRANSACTION_TYPES.DEPOSIT_PENDING:
      return [
        "info",
        "address:from",
        "date",
        "time",
        "status:noSeparator",
        "transactionId",
        "button:deposit",
        "button:back",
      ];
    case TRANSACTION_TYPES.DEPOSIT_CONFIRMED:
      return [
        "info",
        "address:from",
        "date",
        "time",
        "status:noSeparator",
        "transactionId",
        "button:deposit",
        "button:back",
      ];
    case TRANSACTION_TYPES.WITHDRAWAL_PENDING_VERIFICATION:
      return [
        "info",
        "address:to",
        "date",
        "time",
        "status:noSeparator",
        "button:back:main",
        "button:cancel:withdrawal",
      ];
    case TRANSACTION_TYPES.WITHDRAWAL_PENDING_REVIEW:
      return [
        "info",
        "address:to",
        "date",
        "time",
        "status:noSeparator",
        "button:back",
      ];
    case TRANSACTION_TYPES.WITHDRAWAL_PENDING:
      return [
        "info",
        "address:to",
        "date",
        "time",
        "status:noSeparator",
        "transactionId",
        "button:back",
      ];
    case TRANSACTION_TYPES.WITHDRAWAL_CANCELED:
      return [
        "info",
        "date",
        "time",
        "status:noSeparator",
        "transactionId",
        "button:deposit",
        "button:back",
      ];
    case TRANSACTION_TYPES.WITHDRAWAL_CONFIRMED:
      return [
        "info",
        "address:to",
        "date",
        "time",
        "status:noSeparator",
        "transactionId",
        "button:deposit",
        "button:back",
      ];

    case TRANSACTION_TYPES.INTEREST:
      return [
        "info",
        "date",
        "time",
        "status:noSeparator",
        "interest",
        "button:deposit",
        "button:back",
      ];
    case TRANSACTION_TYPES.BONUS_TOKEN:
      return ["info", "date", "time", "status"];

    case TRANSACTION_TYPES.CELPAY_PENDING:
    case TRANSACTION_TYPES.CELPAY_PENDING_VERIFICATION:
      return [
        "info",
        "sentTo",
        "date",
        "time",
        "status",
        "note",
        "card:share:link",
        "button:back",
        "button:cancel:celpay",
      ];
    case TRANSACTION_TYPES.CELPAY_CANCELED:
      return [
        "info",
        "sentTo",
        "date",
        "time",
        "status",
        "note",
        "button:celpay:another",
      ];
    case TRANSACTION_TYPES.CELPAY_CLAIMED:
      return [
        "info",
        "sentTo",
        "date",
        "time",
        "status",
        "note",
        "button:celpay:another",
        "button:back",
      ];
    case TRANSACTION_TYPES.CELPAY_SENT:
      return [
        "info",
        "sentTo",
        "date",
        "time",
        "status",
        "note",
        "button:celpay:another",
        "button:back",
      ];
    case TRANSACTION_TYPES.CELPAY_RECEIVED:
      return [
        "info",
        "sentFrom",
        "date",
        "time",
        "status",
        "note",
        "button:celpay:friend",
        "button:back",
      ];
    case TRANSACTION_TYPES.CELPAY_RETURNED:
      return [
        "info",
        "sentTo",
        "date",
        "time",
        "status",
        "note",
        "button:celpay:another",
        "button:back",
      ];
    case TRANSACTION_TYPES.CELPAY_EXPIRED:
      return [
        "info",
        "date",
        "time",
        "status",
        "note",
        "button:celpay:another",
        "button:back",
      ];
    case TRANSACTION_TYPES.CELPAY_ONHOLD:
      return [
        "info",
        "date",
        "time",
        "status",
        "note",
        "button:celpay:friend",
        "button:back",
      ];

    case TRANSACTION_TYPES.COLLATERAL_PENDING:
      return ["info", "disclaimer", "collateral:loan:card", "button:back"];
    case TRANSACTION_TYPES.COLLATERAL_LOCKED:
      return ["info", "collateral:loan:card", "button:back"];
    case TRANSACTION_TYPES.COLLATERAL_UNLOCKED:
      return [
        "info",
        "collateral:loan:card",
        "collateral:date:unlocked",
        "collateral:time:unlocked",
        "collateral:unlock:reason",
        "button:back",
      ];
    case TRANSACTION_TYPES.COLLATERAL_LIQUIDATED:
      return [
        "info",
        "collateral:loan:card",
        "collateral:date:liquidated",
        "collateral:time:liquidated",
        "collateral:liquidation:reason",
        "button:back",
      ];
    case TRANSACTION_TYPES.MARGIN_CALL:
      return [
        "info",
        "collateral:loan:card",
        "date",
        "time",
        "margin:call:card",
        "button:back",
      ];
    case TRANSACTION_TYPES.LOAN_PRINCIPAL_RECEIVED:
      return ["info", "collateral:loan:card", "date", "time", "button:back"];
    case TRANSACTION_TYPES.LOAN_PRINCIPAL_PAYMENT:
      return ["info", "collateral:loan:card", "date", "time", "button:back"];
    case TRANSACTION_TYPES.LOAN_INTEREST:
      return [
        "info",
        "collateral:loan:card",
        "date",
        "time",
        "change:payment:card",
        "button:back",
      ];

    case TRANSACTION_TYPES.REFERRED_HODL:
      // return ["info", "hodl:info", "date:deposited", "time", "status:noSeparator"];
      return ["info", "date:deposited", "time", "status:noSeparator"]; // "hodl:info" removed until the backend return us needed data
    case TRANSACTION_TYPES.REFERRED:
      return [
        "info",
        "referred",
        "date",
        "time",
        "status:noSeparator",
        "button:refer",
        "button:back",
      ];
    case TRANSACTION_TYPES.REFERRED_PENDING:
      return [
        "info",
        "referred:pending",
        "date",
        "time",
        "status:noSeparator",
        "button:refer",
        "button:back",
      ];
    case TRANSACTION_TYPES.REFERRER_HODL:
      return [
        "info",
        "referrerHODL",
        "date",
        "time",
        "status:noSeparator",
        "button:refer",
        "button:back",
      ];
    case TRANSACTION_TYPES.REFERRER:
      return [
        "info",
        "referrer",
        "date",
        "time",
        "status:noSeparator",
        "button:refer",
        "button:back",
      ];
    case TRANSACTION_TYPES.REFERRER_PENDING:
      return [
        "info",
        "referrer:pending",
        "date",
        "time",
        "status:noSeparator",
        "button:refer",
        "button:back",
      ];

    case TRANSACTION_TYPES.CANCELED:
      return ["info", "date", "time", "status"];

    case TRANSACTION_TYPES.IN:
      return ["info", "date", "time", "status"];
    case TRANSACTION_TYPES.OUT:
      return ["info", "date", "time", "status"];

    default:
      break;
  }
}

export default transactionsUtil;
