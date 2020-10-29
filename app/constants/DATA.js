import Constants from "../../constants";

const { ENV } = Constants;

const KYC_STATUSES = {
  collecting: "collecting",
  pending: "pending",
  sending: "sending",
  sent: "sent",
  passed: "passed",
  rejected: "rejected",
  ico_passed: "ico_passed",
  rejeceted: "rejeceted",
  permanently_rejected: "permanently_rejected",
};

const BLOCKEXPLORERS_STAGING = {
  ltc: "https://chain.so/tx/LTCTEST/",
  zec: "https://explorer.zcha.in/transactions/",
  btc: "https://chain.so/tx/BTCTEST/",
  dash: "https://chain.so/tx/DASHTEST/",
  bch: "https://explorer.bitcoin.com/tbch/tx/",
  // xrp: 'https://xrpcharts.ripple.com/#/transactions/',
  xlm: "https://testnet.steexp.com/tx/",
  btg: "https://testnet.btgexplorer.com/tx/",
  eth: "https://rinkeby.etherscan.io/tx/",
  eos: "https://jungle.bloks.io/transaction/",
  erc20: "https://rinkeby.etherscan.io/tx/",
  bsv: "https://testnet.bitcoincloud.net/tx/",
};
const BLOCKEXPLORERS_PRODUCTION = {
  btc: "https://blockchain.com/btc/tx/",
  zec: "https://explorer.testnet.z.cash/tx/",
  bch: "https://www.blockchain.com/bch/tx/",
  ltc: "https://chainz.cryptoid.info/ltc/tx.dws?",
  xrp: "https://xrpcharts.ripple.com/#/transactions/",
  xlm: "https://steexp.com/tx/",
  dash: "https://chainz.cryptoid.info/dash/tx.dws?",
  btg: "https://btgexplorer.com/tx/",
  eth: "https://etherscan.io/tx/",
  eos: "https://bloks.io/transaction/",
  etc: "https://explorer.bitquery.io/ethclassic/tx/",
  erc20: "https://etherscan.io/tx/",
  bsv: "https://blockchair.com/bitcoin-sv/transaction/",
};

const BLOCKEXPLORERS =
  ENV === "PRODUCTION" ? BLOCKEXPLORERS_PRODUCTION : BLOCKEXPLORERS_STAGING;

const DEEP_LINKS = {
  TRANSFER: "TRANSFER",
  INDIVIDUAL_REFERRAL: "INDIVIDUAL_REFERRAL",
  COMPANY_REFERRAL: "COMPANY_REFERRAL",
  NAVIGATE_TO: "NAVIGATE_TO",
};

const TRANSFER_STATUSES = {
  expired: "expired",
  claimed: "claimed",
  cleared: "cleared",
  pending: "pending",
};

const TRANSACTION_TYPES = {
  DEPOSIT_PENDING: "DEPOSIT_PENDING",
  DEPOSIT_CONFIRMED: "DEPOSIT_CONFIRMED",
  WITHDRAWAL_PENDING: "WITHDRAWAL_PENDING",
  WITHDRAWAL_CONFIRMED: "WITHDRAWAL_CONFIRMED",
  WITHDRAWAL_CANCELED: "WITHDRAWAL_CANCELED",
  WITHDRAWAL_PENDING_VERIFICATION: "WITHDRAWAL_PENDING_VERIFICATION",
  WITHDRAWAL_PENDING_REVIEW: "WITHDRAWAL_PENDING_REVIEW",
  WITHDRAWAL_FAILED: "WITHDRAWAL_FAILED",
  WITHDRAWAL_UNCONFIRMED: "WITHDRAWAL_UNCONFIRMED",

  LOAN_INTEREST: "LOAN_INTEREST",
  LOAN_PRINCIPAL_PAYMENT: "LOAN_PRINCIPAL",
  LOAN_PRINCIPAL_RECEIVED: "LOAN_PRINCIPAL_RECEIVED",

  PENDING_INTEREST: "PENDING_INTEREST",
  INTEREST: "INTEREST",
  BONUS_TOKEN: "BONUS_TOKEN",

  MARGIN_CALL: "MARGIN_CALL",

  CELPAY_PENDING_VERIFICATION: "CELPAY_PENDING_VERIFICATION",
  CELPAY_PENDING: "CELPAY_PENDING",
  CELPAY_CLAIMED: "CELPAY_CLAIMED",
  CELPAY_SENT: "CELPAY_SENT",
  CELPAY_RECEIVED: "CELPAY_RECEIVED",
  CELPAY_RETURNED: "CELPAY_RETURNED",
  CELPAY_ONHOLD: "CELPAY_ONHOLD",
  CELPAY_CANCELED: "CELPAY_CANCELED",

  COLLATERAL_PENDING: "COLLATERAL_PENDING",
  COLLATERAL_LOCKED: "COLLATERAL_LOCKED",
  COLLATERAL_UNLOCKED: "COLLATERAL_UNLOCKED",
  COLLATERAL_LIQUIDATED: "COLLATERAL_LIQUIDATED",

  PROMO_CODE_BONUS: "PROMO_CODE_BONUS",
  REFERRED_HODL: "REFERRED_HODL",
  REFERRED: "REFERRED",
  REFERRED_PENDING: "REFERRED_PENDING",
  REFERRER_HODL: "REFERRER_HODL",
  REFERRER: "REFERRER",
  REFERRER_PENDING: "REFERRER_PENDING",

  CANCELED: "CANCELED",

  IN: "IN",
  OUT: "OUT",
};

const LOAN_TRANSACTION_TYPES = {
  SENDING_LOAN_TEST: "sending_loan_test",
  SENDING_LOAN_FULL: "sending_loan_full",
  RECEIVING_COLLATERAL_TEST: "receiving_collateral_test",
  RECEIVING_COLLATERAL_FULL: "receiving_collateral_full",
  MONTHLY_INTEREST: "monthly_interest",
  PREPAYMENT: "prepayment",
  MARGIN_CALL_COLLATERAL: "margin_call_collateral",
  MARGIN_CALL_PRINCIPAL: "margin_call_principal",
  SENDING_BACK_COLLATERAL: "sending_back_collateral",
  RECEIVING_PRINCIPAL_BACK: "receiving_principal_back",
};

/*
 * Future TRANSACTION_TYPES
 * Check doc: https://docs.google.com/document/d/1Xb0sm3NsUJK-LsNa5Y0D3KlN8L6DFrSb3xeCXuVDa_0/edit
 */
// eslint-disable-next-line no-unused-vars
const STATE_MACHINE = {
  // DEPOSIT
  // Deposit pending on the blockchain
  DEPOSIT_PENDING: "DEPOSIT_PENDING",
  // Deposit confirmed on the blockchain
  DEPOSIT_CONFIRMED: "DEPOSIT_CONFIRMED",

  // WITHDRAWAL
  // Withdrawal pending email verification by the user
  WITHDRAWAL_PENDING_VERIFICATION: "WITHDRAWAL_PENDING_VERIFICATION",
  // Large withdrawal pending Celsius approval from BO
  WITHDRAWAL_PENDING_REVIEW: "WITHDRAWAL_PENDING_REVIEW",
  // Withdrawal verified by the user, approved by Celsius & pending on the blockchain
  WITHDRAWAL_PENDING: "WITHDRAWAL_PENDING",
  // Withdrawal confirmed on the blockchain
  WITHDRAWAL_CONFIRMED: "WITHDRAWAL_CONFIRMED",
  // Withdrawal canceled by the user, Celsius or on the blockchain
  // NOTE: maybe 3 separate states
  WITHDRAWAL_CANCELED: "WITHDRAWAL_CANCELED",

  // INTEREST
  // Interest pending because of no SNN or something
  INTEREST_PENDING: "INTEREST_PENDING", // NOTE: new type
  // Interest confirmed
  INTEREST_CONFIRMED: "INTEREST_CONFIRMED", // NOTE: renamed from INTEREST

  // LOANS
  // Loan pending Celsius approval from BO
  LOAN_PENDING: "LOAN_PENDING", // NOTE: new type
  // Loan approved, collateral locked
  LOAN_APPROVED: "LOAN_APPROVED", // NOTE: renamed from COLLATERAL
  // Loan paid back, collateral unlocked
  LOAN_FINISHED: "LOAN_FINISHED", // NOTE: new type
  // Loan rejected by Celsius from BO
  // NOTE: any other way to cancel a loan, for app in the future?
  LOAN_REJECTED: "LOAN_REJECTED", // NOTE: new type

  // CELPAY
  // NOTE: check who sees which transaction sender|receiver
  // Large CelPay waiting email verification by the user
  CELPAY_PENDING_VERIFICATION: "CELPAY_PENDING_VERIFICATION", // NOTE: new type
  // CelPay link created and waiting to be claimed
  CELPAY_PENDING: "CELPAY_PENDING",
  // CelPay link is claimed
  CELPAY_CLAIMED: "CELPAY_CLAIMED",
  // CelPay has cleared, visible only by the CelPay sender
  CELPAY_SENT: "CELPAY_SENT",
  // CelPay has cleared, visible only by the CelPay receiver
  CELPAY_RECEIVED: "CELPAY_RECEIVED",
  // CelPay link has been claimed, waiting for claimer to finish KYC
  CELPAY_ONHOLD: "CELPAY_ONHOLD",
  // CelPay link has been claimed, but the user didn't pass KYC in time
  CELPAY_EXPIRED: "CELPAY_EXPIRED",
  // CelPay link has been canceled by the user
  CELPAY_RETURNED: "CELPAY_RETURNED",

  // REFERRALS
  // Referred user award for the initial $1K deposit
  REFERRED_INITIAL: "REFERRED_INITIAL", // NOTE: renamed from REFERRED
  // Referred user HODL award waiting for 3 months to expire
  REFERRED_HODL_PENDING: "REFERRED_HODL_PENDING", // NOTE: new type
  // Referred user HODL award after 3 months
  REFERRED_HODL: "REFERRED_HODL",
  // Referred user HODL award failed during the 3 months
  REFERRED_HODL_REJECTED: "REFERRED_HODL_REJECTED", // NOTE: new type
  // Referrer user award for the initial $1K deposit
  REFERRER_INITIAL: "REFERRER_INITIAL", // NOTE: renamed from REFERRER
  // Referrer user HODL award waiting for 3 months to expire
  REFERRER_HODL_PENDING: "REFERRER_HODL_PENDING", // NOTE: new type
  // Referrer user HODL award after 3 months
  REFERRER_HODL: "REFERRER_HODL",
  // Referred user HODL award failed during the 3 months
  REFERRER_HODL_REJECTED: "REFERRER_HODL_REJECTED", // NOTE: new type

  // BONUS TOKENS
  // Bonus tokens awarded for some reason
  BONUS_TOKEN_CONFIRMED: "BONUS_TOKEN_CONFIRMED", // NOTE: renamed from BONUS_TOKEN
  // Bonus tokens are locked and waithing for something
  BONUS_TOKEN_LOCKED: "BONUS_TOKEN_LOCKED",
  // Bonus tokens canceled
  BONUS_TOKEN_CANCELED: "BONUS_TOKEN_CANCELED",

  // OTHER/FALLBACKS
  // Fallback incoming transaction
  IN: "IN",
  // Fallback outgoing transaction
  OUT: "OUT",
  // Fallback cancelled/rejected/failed/removed transaction
  CANCELED: "CANCELED",
  // Amount locked for some reason
  LOCKED: "LOCKED",
};

const CONTACT_NETWORK = {
  PHONE: "Phone",
  FACEBOOK: "Facebook",
  TWITTER: "Twitter",
};

const PREDIFINED_AMOUNTS = [
  { label: "$20", value: "20" },
  { label: "$50", value: "50" },
  { label: "$100", value: "100" },
  { label: "ALL", value: "" },
];

const BANK_ACCOUNT_TYPE = [
  { label: "Checking", value: "Checking" },
  { label: "Savings", value: "Savings" },
];

const LOAN_STATUS = {
  APPROVED: "approved",
  PENDING: "pending",
  REJECTED: "rejected",
  ACTIVE: "active",
  COMPLETED: "completed",
  CANCELED: "canceled",
  REFINANCED: "refinanced",
};

const LOAN_TYPES = {
  USD_LOAN: "USD_LOAN",
  STABLE_COIN_LOAN: "STABLE_COIN_LOAN",
};

const LOAN_PAYMENT_TYPES = {
  MONTHLY_INTEREST: "monthly_interest",
  RECEIVING_PRINCIPAL_BACK: "receiving_principal_back",
};

const PRIMETRUST_KYC_STATES = ["New York", "Washington"];

const LOAN_INTEREST_COINS = [
  "BTC",
  "ETH",
  "USDC",
  "GUSD",
  "TUSD",
  "USDT ERC20",
  "PAX",
];

const BUY_COINS_PAYMENT_STATUSES = {
  PENDING: "pending",

  APPROVED: "approved",
  COMPLETED: "completed",

  CANCELLED: "cancelled",
  EXPIRED: "expired",
  DECLINED: "declined",
  REFUNDED: "refunded",
  FAILED: "failed",
};

const SIMPLEX_FIAT_CURRENCIES = [
  {
    label: "US Dollar (USD)",
    value: "USD",
  },
  {
    label: "Euro (EUR)",
    value: "EUR",
  },
  {
    label: "Japanese Yen (YEN)",
    value: "JPY",
  },
  {
    label: "Canadian Dollar (CAD)",
    value: "CAD",
  },
  {
    label: "British Pound (GBP)",
    value: "GBP",
  },
  {
    label: "Russian Ruble (RUB)",
    value: "RUB",
  },
  {
    label: "Australian Dollar (AUD)",
    value: "AUD",
  },
  {
    label: "South Korean Won (KRW)",
    value: "KRW",
  },
  {
    label: "Swiss Franc (CHF)",
    value: "CHF",
  },
  {
    label: "Czech Koruna (CZK)",
    value: "CZK",
  },
  {
    label: "Danish Krone (DKK)",
    value: "DKK",
  },
  {
    label: "Norwegian Krone (NOK)",
    value: "NOK",
  },
  {
    label: "New Zealand Dollar (NZD)",
    value: "NZD",
  },
  {
    label: "Polish Zloty (PLN)",
    value: "PLN",
  },
  {
    label: "Turkish Lira (TRY)",
    value: "TRY",
  },
  {
    label: "Swedish Krona (SEK)",
    value: "SEK",
  },
  {
    label: "South African Rand (ZAR)",
    value: "ZAR",
  },
  {
    label: "Hungarian Forint (HUF)",
    value: "HUF",
  },
  {
    label: "Israeli Sheqel (ILS)",
    value: "ILS",
  },
];

const PIN_STRENGTH_ITEMS = [
  { copy: "Don't use your birthday" },
  { copy: "No 6 digits in ascending/descending order" },
  { copy: "Minimum 4 unique digits" },
];

const PASSWORD_STRENGTH_ITEMS = [
  { copy: "Minimum of 8 characters." },
  { copy: "One capital letter." },
  { copy: "One number." },
  { copy: "One special character." },
  {
    copy: "Cannot include your name, part of your name, username or spaces",
  },
];

const SECURITY_STRENGTH_LEVEL = {
  WEAK: "Weak",
  FAIR: "Fair",
  GOOD: "Good",
  STRONG: "Strong",
};

const COMING_SOON_COINS = [
  {
    name: "Algorand",
    short: "ALGO",
    image_url: require("../../assets/images/coins/algorand.png"),
    learn_more_link: "https://www.algorand.com/",
  },
  {
    name: "Tron",
    short: "TRX",
    image_url: require("../../assets/images/coins/tron3x.png"),
    learn_more_link: "https://tron.network/",
  },
  {
    name: "Binance Coin",
    short: "BNB",
    image_url: require("../../assets/images/coins/binance.png"),
    learn_more_link: "https://www.binance.com/en",
  },
  {
    name: "IOTA",
    short: "IOTA",
    image_url: require("../../assets/images/coins/iota.png"),
    learn_more_link: "https://www.iota.org/",
  },
  {
    name: "Kava.io",
    short: "KAVA",
    image_url: require("../../assets/images/coins/kava.png"),
    learn_more_link: "https://www.kava.io/",
  },
  {
    name: "Band Protocol",
    short: "BAND",
    image_url: require("../../assets/images/coins/band.png"),
    learn_more_link: "https://bandprotocol.com/",
  },
  {
    name: "Horizen",
    short: "ZEN",
    image_url: require("../../assets/images/coins/horizen.png"),
    learn_more_link: "https://www.horizen.global/",
  },
];

const ERC_20_COINS = {
  ETH: "eth",
  DAI: "dai",
  PAX: "pax",
  CEL: "cel",
  OMG: "omg",
  ZRX: "zrx",
  TUSD: "tusd",
  GUSD: "gusd",
  USDC: "usdc",
  USDT_ERC20: "usdt erc20",
  TCAD: "tcad",
  TGBP: "tgbp",
  THKD: "thkd",
  TAUD: "taud",
  BUSD: "busd",
  LINK: "link",
  LPT: "lpt",
  SNX: "snx",
  KNC: "knc",
  MATIC: "matic",
  BAT: "bat",
  SGR: "sgr",
  XAUT: "xaut",
  PAXG: "paxg",
  MANA: "mana",
  UNI: "uni",
  UMA: "uma",
};

const LINKS_TO_BUY = {
  MOONPAY: "https://buy.moonpay.io/celsius",
  TRUSTTOKEN_TUSD: "https://www.trusttoken.com/trueusd",
  USDC_CIRCLE: "https://usdc.circle.com/start",
  PAXOS: "https://account.paxos.com/signup",
  TRUSTTOKEN_THKD: "https://www.trusttoken.com/truehkd",
  TRUSTTOKEN_TCAD: "https://www.trusttoken.com/truecad",
  TRUSTTOKEN_TAUD: "https://www.trusttoken.com/trueaud",
  TRUSTTOKEN_GBP: "https://www.trusttoken.com/truegbp",
  DASH: "https://www.dash.org/where-to-buy",
};

const LINKS_FOR_COINS = {
  BTC: LINKS_TO_BUY.MOONPAY,
  BCH: LINKS_TO_BUY.MOONPAY,
  ETH: LINKS_TO_BUY.MOONPAY,
  LTC: LINKS_TO_BUY.MOONPAY,
  XRP: LINKS_TO_BUY.MOONPAY,
  XLM: LINKS_TO_BUY.MOONPAY,
  OMG: LINKS_TO_BUY.MOONPAY,
  DAI: LINKS_TO_BUY.MOONPAY,
  TUSD: LINKS_TO_BUY.TRUSTTOKEN_TUSD,
  USDC: LINKS_TO_BUY.USDC_CIRCLE,
  PAX: LINKS_TO_BUY.PAXOS,
  THKD: LINKS_TO_BUY.TRUSTTOKEN_THKD,
  TCAD: LINKS_TO_BUY.TRUSTTOKEN_TCAD,
  TAUD: LINKS_TO_BUY.TRUSTTOKEN_TAUD,
  TGBP: LINKS_TO_BUY.TRUSTTOKEN_GBP,
  DASH: LINKS_TO_BUY.DASH,
};

const BLOCKEXPLORER_NAME = {
  BTC: "blockchain",
  BCH: "blockdozer",
  LTC: "chainz",
  XRP: "xrpcharts",
  XLM: "stellarchain",
  EOS: "bloks.io",
  DASH: "chainz",
  ZEC: "chain.so",
  BTG: "btgexplorer",
  ETC: "bitquery.i",
  ERC20: "etherscan",
};

const PAYMENT_TYPE = {
  CRYPTO: "CRYPTO",
  FIAT: "FIAT",
};

const STORAGE_KEYS = {
  DONT_SHOW_INTRODUCE_NEW_THEME: "DONT_SHOW_INTRODUCE_NEW_THEME",
  BANNER_PROPS: "BANNER_PROPS",
  BIOMETRIC_BANNER: "BIOMETRIC_BANNER",
  SECURITY_STORAGE_AUTH_KEY: "SECURITY_STORAGE_AUTH_KEY",
  BASE_URL: "BASE_URL",
  NOTIFICATION_TOKEN: "NOTIFICATION_TOKEN",
  DEEPLINK_DATA: "DEEPLINK_DATA",
};

export {
  BLOCKEXPLORERS,
  KYC_STATUSES,
  DEEP_LINKS,
  TRANSFER_STATUSES,
  TRANSACTION_TYPES,
  CONTACT_NETWORK,
  PREDIFINED_AMOUNTS,
  BANK_ACCOUNT_TYPE,
  LOAN_STATUS,
  LOAN_TYPES,
  LOAN_PAYMENT_TYPES,
  LOAN_TRANSACTION_TYPES,
  PRIMETRUST_KYC_STATES,
  LOAN_INTEREST_COINS,
  BUY_COINS_PAYMENT_STATUSES,
  SIMPLEX_FIAT_CURRENCIES,
  PASSWORD_STRENGTH_ITEMS,
  PIN_STRENGTH_ITEMS,
  SECURITY_STRENGTH_LEVEL,
  COMING_SOON_COINS,
  ERC_20_COINS,
  LINKS_FOR_COINS,
  BLOCKEXPLORER_NAME,
  PAYMENT_TYPE,
  STORAGE_KEYS,
};
