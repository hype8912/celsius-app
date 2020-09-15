import BigNumber from "bignumber.js";
import _ from "lodash";
import { LOAN_PAYMENT_TYPES, LOAN_STATUS, LOAN_TYPES } from "../constants/DATA";
import formatter from "./formatter";
import store from "../redux/store";
import { COLOR_KEYS } from "../constants/COLORS";

const loanUtil = {
  mapLoan,
  emitLoanParams,
};

function mapLoan(loan) {
  const newLoan = { ...loan };
  newLoan.uiProps = getLoanStatusDetails(loan);
  newLoan.uiSections = getLoanSections(loan);
  newLoan.amortization_table = flagPaidPayments(loan);

  if (newLoan.id) {
    newLoan.total_interest = Number(newLoan.total_interest).toFixed(2);
    newLoan.total_interest_paid = Number(newLoan.total_interest_paid).toFixed(
      2
    );
    newLoan.hasInterestPaymentFinished =
      isInterestPaid(newLoan) && !!Number(newLoan.total_interest_paid);
    newLoan.isPrincipalPaid = isPrincipalPaid(newLoan);

    newLoan.max_possible_prepayment_period = getMaxPossiblePrepaymentPeriod(
      newLoan
    );
    newLoan.maxPossiblePrepaymentPeriod = getMaxPossiblePrepaymentPeriod(
      newLoan
    );
    newLoan.canPrepayInterest =
      [LOAN_STATUS.ACTIVE, LOAN_STATUS.APPROVED].includes(loan.status) &&
      newLoan.can_pay_interest &&
      newLoan.maxPossiblePrepaymentPeriod >= 6;

    newLoan.margin_call = getMarginCallParams(loan);
    newLoan.margin_call_activated = !!newLoan.margin_call;
  }

  return newLoan;
}

function getLoanStatusDetails(loan) {
  const commonProps = {
    displayAmount:
      loan.type === LOAN_TYPES.USD_LOAN
        ? formatter.fiat(loan.loan_amount, "USD")
        : formatter.crypto(loan.loan_amount, loan.coin_loan_asset, {
            noPrecision: true,
          }),
  };

  switch (loan.status) {
    case LOAN_STATUS.ACTIVE:
    case LOAN_STATUS.APPROVED:
      return {
        ...commonProps,
        color: COLOR_KEYS.LINK,
        displayText: "Active Loan",
        collateral: "Collateral:",
      };

    case LOAN_STATUS.PENDING:
      return {
        ...commonProps,
        color: COLOR_KEYS.ALERT_STATE,
        displayText: "Pending Loan",
        collateral: "Estimated Collateral:",
      };

    case LOAN_STATUS.COMPLETED:
      return {
        ...commonProps,
        color: COLOR_KEYS.POSITIVE_STATE,
        displayText: "Completed Loan",
        collateral: "Unlocked Collateral:",
      };

    case LOAN_STATUS.REJECTED:
      return {
        ...commonProps,
        color: COLOR_KEYS.NEGATIVE_STATE,
        displayText: "Loan rejected",
        collateral: "Estimated Collateral:",
      };

    case LOAN_STATUS.CANCELED:
      return {
        ...commonProps,
        color: COLOR_KEYS.NEGATIVE_STATE,
        displayText: "Canceled Loan",
        collateral: "Estimated Collateral:",
      };

    case LOAN_STATUS.REFINANCED:
      return {
        ...commonProps,
        color: COLOR_KEYS.NEGATIVE_STATE,
        displayText: "Refinanced Loan",
        collateral: "Estimated Collateral:",
      };

    default:
      break;
  }
}

function getLoanSections(loan) {
  switch (loan.status) {
    case LOAN_STATUS.ACTIVE:
    case LOAN_STATUS.APPROVED:
      return [
        "initiation:date",
        "collateral",
        "term",
        "annualInterest",
        "marginCall",
        "liquidation",
        "nextInterest",
        "maturity",
      ];
    case LOAN_STATUS.PENDING:
      return [
        "initiation:date",
        "estimated:collateral",
        "term",
        "annualInterest",
        "marginCall",
        "liquidation",
        "firstInterest",
      ];
    case LOAN_STATUS.COMPLETED:
      return [
        "completion:date",
        "initiation:date",
        "unlocked:collateral",
        "term",
        "annualInterest",
      ];
    case LOAN_STATUS.CANCELED:
      return ["cancellation:date", "initiation:date", "term", "annualInterest"];
    case LOAN_STATUS.REFINANCED:
      return ["refinanced:date", "initiation:date", "term", "annualInterest"];
    case LOAN_STATUS.REJECTED:
      return ["rejection:date", "initiation:date", "term", "annualInterest"];
    default:
      break;
  }
}

function flagPaidPayments(loan) {
  if (!loan.amortization_table || !loan.amortization_table.length) return [];

  const amortizationTable = loan.amortization_table.map(p => ({
    ...p,
    amountPaid: p.status === "PAID" ? p.amountToPay : 0,
    isPaid: p.status === "PAID",
  }));

  return amortizationTable;
}

function isInterestPaid(loan) {
  let areAllPaymentsMade = !!loan.amortization_table.length;
  loan.amortization_table
    .filter(row => row.type === LOAN_PAYMENT_TYPES.MONTHLY_INTEREST)
    .forEach(row => {
      areAllPaymentsMade = areAllPaymentsMade && row.isPaid;
    });

  return areAllPaymentsMade;
}

// function getTotalInterest(loan) {
//   let totalInterest = 0
//   loan.amortization_table
//     .filter(row => row.type === LOAN_PAYMENT_TYPES.MONTHLY_INTEREST)
//     .forEach(row => {
//       totalInterest += Number(row.amountToPay)
//     })
//
//   return totalInterest.toFixed(2)
// }
//
//
// function getInterestPaid(loan) {
//   let interestPaid = 0
//   loan.amortization_table
//     .filter(row => row.type === LOAN_PAYMENT_TYPES.MONTHLY_INTEREST)
//     .forEach(row => {
//       interestPaid += Number(row.amountPaid)
//     })
//
//   return interestPaid.toFixed(2)
// }

function getMaxPossiblePrepaymentPeriod(loan) {
  const numOfInterestPayments = loan.amortization_table.filter(
    row => row.type === LOAN_PAYMENT_TYPES.MONTHLY_INTEREST
  ).length;

  const numOfPaidInterestPayments = loan.amortization_table.filter(
    row => row.type === LOAN_PAYMENT_TYPES.MONTHLY_INTEREST && row.isPaid
  ).length;

  const paymentsLeft = numOfInterestPayments - numOfPaidInterestPayments;

  return paymentsLeft > 12 ? 12 : paymentsLeft;
}

function isPrincipalPaid(loan) {
  const principalPayment = loan.amortization_table.find(
    row => row.type === LOAN_PAYMENT_TYPES.RECEIVING_PRINCIPAL_BACK
  );

  return principalPayment.isPaid;
}

function getMarginCallParams(loan) {
  if (!loan.margin_call_activated) return;

  // Fix for loans before margin call
  if (
    loan.margin_call.margin_call_amount === "NaN" ||
    loan.margin_call.margin_call_usd_amount === "NaN"
  )
    return;

  const walletSummary = store.getState().wallet.summary;
  const hasEnoughOriginalCoin = !!walletSummary.coins.find(
    coin =>
      coin.short === loan.margin_call.collateral_coin &&
      coin.amount.isGreaterThanOrEqualTo(loan.margin_call.margin_call_amount)
  );
  const hasEnoughOtherCoins = !!walletSummary.coins.find(coin =>
    coin.amount.isGreaterThanOrEqualTo(loan.margin_call.margin_call_amount)
  );

  return {
    ...loan.margin_call,
    hasEnoughOriginalCoin,
    hasEnoughOtherCoins,
  };
}

function emitLoanParams(
  formData,
  currencies,
  ltv,
  minimumLoanAmount,
  eligibleCoins,
  loyaltyInfo
) {
  const loanParams = {};

  const enteredAmount = new BigNumber(formData.amount);

  if (formData && formData.coin !== "USD" && formData.ltv) {
    loanParams.annualInterestPct = new BigNumber(formData.ltv.interest);

    loanParams.totalInterestPct = loanParams.annualInterestPct.multipliedBy(
      formData.termOfLoan / 12
    );
    loanParams.monthlyInterestPct = loanParams.totalInterestPct.dividedBy(
      formData.termOfLoan
    );

    loanParams.totalInterest = loanParams.totalInterestPct.multipliedBy(
      enteredAmount
    );

    loanParams.monthlyInterest = loanParams.totalInterestPct
      .multipliedBy(enteredAmount)
      .dividedBy(formData.termOfLoan);

    loanParams.monthlyInCEL =
      loyaltyInfo &&
      loanParams.monthlyInterest.minus(
        loanParams.monthlyInterest.multipliedBy(
          loyaltyInfo && loyaltyInfo.tier.loanInterestBonus
        )
      );
    loanParams.totalInCEL =
      loyaltyInfo &&
      loanParams.totalInterest.minus(
        loanParams.totalInterest.multipliedBy(
          loyaltyInfo && loyaltyInfo.tier.loanInterestBonus
        )
      );

    loanParams.loyaltyApr = loanParams.annualInterestPct.minus(
      loanParams.annualInterestPct.multipliedBy(
        loyaltyInfo && loyaltyInfo.tier.loanInterestBonus
      )
    );

    loanParams.collateralNeeded = enteredAmount.dividedBy(
      new BigNumber(
        currencies.find(c => c.short === formData.coin).market_quotes_usd.price
      ).multipliedBy(formData.ltv.percent)
    );

    loanParams.bestLtv = BigNumber.max(...ltv.map(x => x.percent));

    const arrayOfAmountUsd = eligibleCoins.map(c => c.amount_usd);

    const indexOfLargestAmount = _.findIndex(
      arrayOfAmountUsd,
      BigNumber.max(...arrayOfAmountUsd)
    );

    loanParams.largestAmountCrypto = eligibleCoins[indexOfLargestAmount].amount;
    loanParams.largestShortCrypto = eligibleCoins[indexOfLargestAmount].short;
    loanParams.minimumLoanAmountCrypto = new BigNumber(
      minimumLoanAmount
    ).dividedBy(
      currencies.find(
        c => c.short === eligibleCoins[indexOfLargestAmount].short
      ).market_quotes_usd.price
    );

    loanParams.missingCollateral = loanParams.largestAmountCrypto
      .minus(loanParams.minimumLoanAmountCrypto)
      .abs()
      .dividedBy(loanParams.bestLtv);
  }
  return loanParams;
}

export default loanUtil;
