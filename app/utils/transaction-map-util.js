import formatter from "./formatter";
import { TRANSACTION_TYPES } from "../constants/DATA";
import { COLOR_KEYS } from "../constants/COLORS";

const transactionMapUtil = {
  mapTransaction,
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
    if (transaction.state === "unconfirmed")
      return TRANSACTION_TYPES.WITHDRAWAL_UNCONFIRMED;
    if (transaction.state === "failed")
      return TRANSACTION_TYPES.WITHDRAWAL_FAILED;
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
    if (transaction.state === "confirmed" && Number(transaction.amount) > 0)
      return TRANSACTION_TYPES.COLLATERAL_UNLOCKED;
    if (transaction.state === "confirmed" && Number(transaction.amount) < 0)
      return TRANSACTION_TYPES.MARGIN_CALL;
  }

  // if (transaction.nature === "margin_call") return TRANSACTION_TYPES.MARGIN_CALL;
  if (transaction.nature === "pending_interest")
    return TRANSACTION_TYPES.PENDING_INTEREST;

  if (transaction.nature === "referred_award") {
    if (transaction.state === "locked") return TRANSACTION_TYPES.REFERRED_HODL;
    if (transaction.state === "confirmed") return TRANSACTION_TYPES.REFERRED;
    if (transaction.state === "unconfirmed")
      return TRANSACTION_TYPES.REFERRED_PENDING;
  }

  if (transaction.nature === "referrer_award") {
    if (transaction.state === "locked") return TRANSACTION_TYPES.REFERRER_HODL;
    if (transaction.state === "confirmed") return TRANSACTION_TYPES.REFERRER;
    if (transaction.state === "unconfirmed")
      return TRANSACTION_TYPES.REFERRER_PENDING;
  }

  if (transaction.nature === "loan_principal_payment") {
    if (transaction.type === "outgoing")
      return TRANSACTION_TYPES.LOAN_PRINCIPAL_PAYMENT;
    if (transaction.type === "incoming")
      return TRANSACTION_TYPES.LOAN_PRINCIPAL_RECEIVED;
  }
  if (transaction.nature === "loan_interest_payment")
    return TRANSACTION_TYPES.LOAN_INTEREST;
  if (transaction.nature === "loan_prepayment")
    // TODO: remove?
    return TRANSACTION_TYPES.LOAN_INTEREST;

  // Incoming CelPay
  if (transaction.nature === "inbound_transfer") {
    if (
      !transaction.transfer_data.cleared_at &&
      !transaction.transfer_data.expired_at
    )
      return TRANSACTION_TYPES.CELPAY_ONHOLD;
    if (
      transaction.transfer_data.claimed_at &&
      !transaction.transfer_data.cleared_at &&
      transaction.transfer_data.expired_at
    )
      return TRANSACTION_TYPES.CELPAY_RETURNED; // TODO: inbound celpay cant return? It expires before kyc complete?
    if (transaction.transfer_data) return TRANSACTION_TYPES.CELPAY_RECEIVED;
  }

  // Outgoing CelPay
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
    case TRANSACTION_TYPES.MARGIN_CALL:
      return {
        title: () => "Collateral Added",
        color: COLOR_KEYS.NEGATIVE_STATE,
        shortName: "CA",
        statusText: "Collateral Added",
      };
    case TRANSACTION_TYPES.LOAN_PRINCIPAL_RECEIVED:
      return {
        title: () => "Loan Received",
        color: COLOR_KEYS.POSITIVE_STATE,
        shortName: "LP",
        statusText: "Credited",
      };
    case TRANSACTION_TYPES.LOAN_PRINCIPAL_PAYMENT:
      return {
        title: () => "Principal Payment",
        color: COLOR_KEYS.NEGATIVE_STATE,
        shortName: "LP",
        statusText: "Debited",
      };
    case TRANSACTION_TYPES.LOAN_INTEREST:
      return {
        title: () => "Loan Interest Payment",
        color: COLOR_KEYS.POSITIVE_STATE,
        shortName: "LI",
        statusText: "Debited",
      };
    case TRANSACTION_TYPES.DEPOSIT_PENDING:
      return {
        title: coin => `${coin} Deposit`,
        color: COLOR_KEYS.ALERT_STATE,
        shortName: "D",
        statusText: "Pending",
      };
    case TRANSACTION_TYPES.DEPOSIT_CONFIRMED:
      return {
        title: coin => `${coin} Deposit`,
        color: COLOR_KEYS.POSITIVE_STATE,
        shortName: "D",
        statusText: "Confirmed",
      };
    case TRANSACTION_TYPES.WITHDRAWAL_PENDING:
      return {
        title: coin => `${coin} Withdrawal`,
        color: COLOR_KEYS.ALERT_STATE,
        shortName: "W",
        statusText: "Pending",
      };
    case TRANSACTION_TYPES.WITHDRAWAL_CANCELED:
      return {
        // Withdrawn canceled
        title: coin => `${coin} Withdrawal`,
        color: COLOR_KEYS.NEGATIVE_STATE,
        shortName: "W",
        statusText: "Canceled",
      };
    case TRANSACTION_TYPES.WITHDRAWAL_CONFIRMED:
      return {
        title: coin => `${coin} Withdrawal`,
        color: COLOR_KEYS.POSITIVE_STATE,
        shortName: "W",
        statusText: "Confirmed",
      };
    case TRANSACTION_TYPES.WITHDRAWAL_PENDING_VERIFICATION:
      return {
        title: coin => `${coin} Withdrawal`,
        color: COLOR_KEYS.ALERT_STATE,
        shortName: "W",
        statusText: "Pending",
      };
    case TRANSACTION_TYPES.WITHDRAWAL_PENDING_REVIEW:
      return {
        title: coin => `${coin} Withdrawal`,
        color: COLOR_KEYS.ALERT_STATE,
        shortName: "W",
        statusText: "Pending",
      };
    case TRANSACTION_TYPES.WITHDRAWAL_FAILED:
      return {
        title: coin => `${coin} Withdrawal`,
        color: COLOR_KEYS.NEGATIVE_STATE,
        shortName: "W",
        statusText: "Failed",
      };
    case TRANSACTION_TYPES.WITHDRAWAL_UNCONFIRMED:
      return {
        title: coin => `${coin} Withdrawal`,
        color: COLOR_KEYS.ALERT_STATE,
        shortName: "W",
        statusText: "Unconfirmed",
      };
    case TRANSACTION_TYPES.INTEREST:
      return {
        title: coin => `${coin} Reward`,
        color: COLOR_KEYS.POSITIVE_STATE,
        shortName: "R",
        statusText: `${transaction.interest_coin.toUpperCase()} Reward`,
      };
    case TRANSACTION_TYPES.PENDING_INTEREST:
      return {
        title: coin => `${coin} Reward`,
        color: COLOR_KEYS.ALERT_STATE,
        shortName: "R",
        statusText: "Pending Reward",
      };
    case TRANSACTION_TYPES.BONUS_TOKEN:
      return {
        title: () => `Bonus CEL`,
        color: COLOR_KEYS.POSITIVE_STATE,
        shortName: "BT",
        statusText: "Bonus",
      };

    case TRANSACTION_TYPES.CELPAY_PENDING:
      return {
        title: () => "CelPay Pending",
        color: COLOR_KEYS.POSITIVE_STATE,
        shortName: "CP",
        statusText: "Confirmed",
      };
    case TRANSACTION_TYPES.CELPAY_PENDING_VERIFICATION:
      return {
        title: () => "CelPay Pending",
        color: COLOR_KEYS.ALERT_STATE,
        shortName: "CP",
        statusText: "Pending",
      };
    case TRANSACTION_TYPES.CELPAY_CLAIMED:
      return {
        title: coin => `${coin} Sent`,
        color: COLOR_KEYS.ALERT_STATE,
        shortName: "CP",
        statusText: "Pending",
      };
    case TRANSACTION_TYPES.CELPAY_SENT:
      return {
        title: coin => `${coin} Sent`,
        color: COLOR_KEYS.POSITIVE_STATE,
        shortName: "CP",
        statusText: "Confirmed",
      };
    case TRANSACTION_TYPES.CELPAY_RECEIVED:
      return {
        title: () => `CelPay Received`,
        color: COLOR_KEYS.POSITIVE_STATE,
        shortName: "CP",
        statusText: "Confirmed",
      };
    case TRANSACTION_TYPES.CELPAY_RETURNED:
      return {
        title: () => `Canceled Transaction`,
        color: COLOR_KEYS.NEGATIVE_STATE,
        shortName: "CP",
        statusText: "Canceled",
      };

    case TRANSACTION_TYPES.CELPAY_ONHOLD:
      return {
        title: coin => `Received ${coin}`,
        color: COLOR_KEYS.ALERT_STATE,
        shortName: "CP",
        statusText: "Pending",
      };

    case TRANSACTION_TYPES.CELPAY_CANCELED:
      return {
        title: () => "CelPay Canceled",
        color: COLOR_KEYS.NEGATIVE_STATE,
        shortName: "CP",
        statusText: "Canceled",
      };

    case TRANSACTION_TYPES.COLLATERAL_PENDING:
      return {
        title: () => `Pending Collateral`,
        color: COLOR_KEYS.ALERT_STATE,
        shortName: "LC",
        statusText: "Pending",
      };
    case TRANSACTION_TYPES.COLLATERAL_LOCKED:
      return {
        title: () => `Locked Collateral`,
        color: COLOR_KEYS.LINK,
        shortName: "LC",
        statusText: "Locked",
      };
    case TRANSACTION_TYPES.COLLATERAL_UNLOCKED:
      return {
        title: () => `Unlocked Collateral`,
        color: COLOR_KEYS.LINK,
        shortName: "LC",
        statusText: "Unlocked",
      };
    case TRANSACTION_TYPES.COLLATERAL_LIQUIDATED:
      return {
        title: () => `Liquidated Collateral`,
        color: COLOR_KEYS.NEGATIVE_STATE,
        shortName: "LC",
        statusText: "Liquidated",
      };
    case TRANSACTION_TYPES.PROMO_CODE_BONUS:
      return {
        title: () => "Promo Code Bonus",
        color: COLOR_KEYS.POSITIVE_STATE,
        shortName: "P",
        statusText: "Promo Code Bonus",
      };
    case TRANSACTION_TYPES.REFERRED_HODL:
      return {
        title: () => `HODL Award`,
        color: COLOR_KEYS.LINK,
        shortName: "R",
        statusText: "Locked",
      };
    case TRANSACTION_TYPES.REFERRED:
      return {
        title: () => `Referral Award`,
        color: COLOR_KEYS.POSITIVE_STATE,
        shortName: "R",
        statusText: "Confirm",
      };
    case TRANSACTION_TYPES.REFERRED_PENDING:
      return {
        title: () => `Referral Award`,
        color: COLOR_KEYS.ALERT_STATE,
        shortName: "R",
        statusText: "Pending",
      };
    case TRANSACTION_TYPES.REFERRER_HODL:
      return {
        title: () => `Referral Award`,
        color: COLOR_KEYS.LINK,
        shortName: "R",
        statusText: "Locked",
      };
    case TRANSACTION_TYPES.REFERRER:
      return {
        title: () => `Referral Award`,
        color: COLOR_KEYS.POSITIVE_STATE,
        shortName: "R",
        statusText: "Confirmed",
      };
    case TRANSACTION_TYPES.REFERRER_PENDING:
      return {
        title: () => `Referral Award`,
        color: COLOR_KEYS.ALERT_STATE,
        shortName: "R",
        statusText: "Pending",
      };

    case TRANSACTION_TYPES.CANCELED:
      return {
        title: () => `Canceled Transaction`,
        color: COLOR_KEYS.NEGATIVE_STATE,
        shortName: "C",
        statusText: "Canceled",
      };

    case TRANSACTION_TYPES.IN:
      return {
        title: coin => `Received ${coin}`,
        color: COLOR_KEYS.POSITIVE_STATE,
        shortName: "I",
        statusText: "Received",
      };
    case TRANSACTION_TYPES.OUT:
      return {
        title: coin => `Sent ${coin}`,
        color: COLOR_KEYS.NEGATIVE_STATE,
        shortName: "O",
        statusText: "Sent",
      };
    default:
      break;
  }
}

export default transactionMapUtil;
