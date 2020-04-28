import { EMPTY_STATES } from "../constants/UI";
import { KYC_STATUSES } from "../constants/DATA";

export default {
  getProps, // TODO add JSDoc
};

function getProps(purpose, componentProps) {
  if (!purpose) return {};
  const { actions } = componentProps;
  let props = {
    aboveHeadingSection: null,
    modal: null,
    modalProps: null,
    button: null,
  };
  if (
    purpose.includes("NON_VERIFIED") ||
    purpose.includes("VERIFICATION_IN_PROCESS")
  ) {
    props = getNonVerifiedProps(componentProps);
  }

  switch (purpose) {
    case EMPTY_STATES.NO_LOANS:
      return {
        ...props,
        image: require("../../assets/images/monkey-on-a-laptop-illustration.png"),
        heading: "Borrow Cash Instantly",
        paragraphs: [
          "Get a USD or stablecoin loan at the best interest rates on the block!",
        ],
        onPress: () => actions.navigateTo("BorrowChooseLoan"),
        button: "Get Cash",
        secondaryOnPress: () => actions.navigateTo("BorrowCalculatorScreen"),
        secondaryButton: "Calculate Loan Interest",
      };

    // Not KYC Verified Empty States
    case EMPTY_STATES.NON_VERIFIED_WITHDRAW:
      return {
        ...props,
        image: require("../../assets/images/diane-sad3x.png"),
        heading: "Withdraw",
        paragraphs: [
          "Withdraw pain (and fee!) free with Celsius Network. Complete your KYC verification to take full advantage.",
        ],
        onPress: () => actions.navigateTo("KYCProfileDetails"),
      };

    case EMPTY_STATES.VERIFICATION_IN_PROCESS_WITHDRAW:
      return {
        ...props,
        paragraphs: ["Withdraw will be available upon identity verification."],
        button: "Back to wallet",
        onPress: () => actions.navigateTo("WalletLanding"),
      };

    case EMPTY_STATES.MAINTENANCE:
      return {
        ...props,
        image: require("../../assets/images/maintenance/hippo-maintenance.png"),
        heading: "Be back soon!",
        paragraphs: [
          "Celsius is currently down for maintenance. We expect to be back in a couple of hours. Thanks for your patience.",
        ],
      };

    case EMPTY_STATES.NON_VERIFIED_CELPAY:
      return {
        ...props,
        heading: "Send crypto to your friends",
        paragraphs: [
          "Quickly, easily and with no fees or keys required. All you have to do is become a Celsius member by verifying your profile.",
        ],
        onPress: () => actions.navigateTo("KYCProfileDetails"),
      };

    case EMPTY_STATES.VERIFICATION_IN_PROCESS_CELPAY:
      return {
        ...props,
        image: require("../../assets/images/diane-sad3x.png"),
        paragraphs: ["CelPay will be available upon identity verification."],
        button: "Back to wallet",
        onPress: () => actions.navigateTo("WalletLanding"),
      };

    case EMPTY_STATES.NON_VERIFIED_DEPOSIT:
      return {
        ...props,
        heading: "Start earning interest",
        paragraphs: [
          "Start earning 7% a year on your coin. All you have to do is become a Celsius member by verifying your profile.",
        ],
        onPress: () => actions.navigateTo("KYCProfileDetails"),
      };

    case EMPTY_STATES.VERIFICATION_IN_PROCESS_DEPOSIT:
      return {
        ...props,
        paragraphs: ["Deposits will be available upon identity verification."],
        button: "Back to wallet",
        onPress: () => actions.navigateTo("WalletLanding"),
      };

    case EMPTY_STATES.NON_MEMBER_CELPAY:
      return {
        ...props,
        heading: "Send crypto to your friends",
        paragraphs: [
          "Quickly, easily and with no fees or keys required. All you have to do is become a Celsius member by adding some CEL to your wallet",
        ],
        button: "Deposit CEL",
        onPress: () => actions.navigateTo("Deposit", { coin: "CEL" }),
      };

    case EMPTY_STATES.NO_WITHDRAWAL_ADDRESSES:
      return {
        ...props,
        image: require("../../assets/images/diane-sad3x.png"),
        heading: "You have no withdrawal addresses set yet!",
        paragraphs: [],
        button: "Back to settings",
        onPress: () => actions.navigateTo("WalletSettings"),
      };

    case EMPTY_STATES.COMPLIANCE:
      return {
        ...props,
        image: require("../../assets/images/diane-sad3x.png"),
        heading: "Sorry!",
        paragraphs: [
          "We apologize for any inconvenience, but due to local laws and regulations, we are unable to work with users from your region.",
        ],
      };

    case EMPTY_STATES.INSUFFICIENT_FUNDS:
      return {
        ...props,
        image: require("../../assets/images/diane-sad3x.png"),
        heading: "Insufficient funds!",
        paragraphs: [
          "Please deposit more funds in order to gain eligibility to use this feature.",
        ],
      };

    case EMPTY_STATES.SIMPLEX_COMPLIANCE:
      return {
        ...props,
        heading: "We are sorry!",
        paragraphs: [
          "We apologize for any inconvenience, but due to local laws and regulations, our Buy Coins service is not available to users in your region.",
        ],
      };

    case EMPTY_STATES.NO_CONTACTS:
      return {
        ...props,
        image: require("../../assets/images/diane-sad3x.png"),
        heading: "No friends",
        paragraphs: [
          "None of your friends has installed Celsius app. You can still CelPay them with a link",
        ],
        button: "Send link",
        onPress: () => actions.navigateTo("CelPayEnterAmount"),
      };

    case EMPTY_STATES.NO_TRANSACTIONS:
      return {
        ...props,
        heading: "Sorry",
        paragraphs: ["No transactions in your wallet"],
      };

    case EMPTY_STATES.NON_VERIFIED_GET_COINS:
      return {
        ...props,
        heading: "Buy Crypto with Credit Card",
        paragraphs: [
          "You can directly purchase cryptocurrency with credit card on Celsius. We offer the best route to buy crypto using credit card.",
          "All you have to do is become a Celsius member by verifying your profile.",
        ],
        button: "Verify profile",
        onPress: () => actions.navigateTo("KYCProfileDetails"),
      };

    case EMPTY_STATES.VERIFICATION_IN_PROCESS_GET_COINS:
      return {
        ...props,
        heading: "Buy Crypto with Credit Card",
        paragraphs: [
          "You can directly purchase cryptocurrency with credit card on Celsius. This option will be available upon identity verification.",
        ],
        button: "Back to wallet",
        onPress: () => actions.navigateTo("WalletLanding"),
      };

    // TODO: remove, used only on Support screen
    case EMPTY_STATES.USER_CLEARED:
      return {
        ...props,
        image: require("../../assets/images/bear-happyKYC3x.png"),
        heading: "Great job!",
        paragraphs: ["Ready to start exploring Celsius"],
        button: "Go Home",
        onPress: () => actions.navigateTo("Home"),
      };

    default:
      return {
        ...props,
        image: require("../../assets/images/diane-sad3x.png"),
        heading: "Sorry",
        paragraphs: ["No data"],
      };
  }
}

function getNonVerifiedProps(componentProps) {
  const { user } = componentProps;

  if (!user.kyc) return {};

  const kycRejectionReasons = user.kyc.rejectionReasons;
  if (kycRejectionReasons && !kycRejectionReasons.length) {
    kycRejectionReasons.push(
      "Please go through the verification process again or contact our support for help."
    );
  }

  const kycStatus = user.kyc.status;
  const isRejected = [KYC_STATUSES.rejeceted, KYC_STATUSES.rejected].includes(
    kycStatus
  );
  const isPending = [KYC_STATUSES.pending].includes(kycStatus);

  let aboveHeadingSection = isRejected ? "kyc-rejected" : null;
  aboveHeadingSection = isPending ? "kyc-pending" : aboveHeadingSection;

  const button = !isPending ? "Verify profile" : null;

  return {
    aboveHeadingSection,
    button,
  };
}
