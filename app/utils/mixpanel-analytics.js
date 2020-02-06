import celPayAnalytics from "./mixpanel-analytics/cel-pay-analytics";
import loansAnalytics from "./mixpanel-analytics/loans-analytics";
import securityAnalytics from "./mixpanel-analytics/security-analytics";
import kycAnalytics from "./mixpanel-analytics/kyc-analytics";
import authAnalytics from "./mixpanel-analytics/auth-analytics";
import walletAnalytics from "./mixpanel-analytics/wallet-analytics";
import marketingAnalytics from "./mixpanel-analytics/marketing-analytics";
import generalAnalytics from "./mixpanel-analytics/general-analytics";
import buyCoinsAnalytics from "./mixpanel-analytics/buy-coins-analytics";

export default {
  ...celPayAnalytics,
  ...loansAnalytics,
  ...securityAnalytics,
  ...kycAnalytics,
  ...authAnalytics,
  ...walletAnalytics,
  ...marketingAnalytics,
  ...generalAnalytics,
  ...buyCoinsAnalytics,
}
