import { Constants } from "expo";


const { ENV } = Constants.manifest.extra

const FORBIDEN_COUNTRIES = ['Cuba', 'North Korea', 'Iran', 'Sudan', 'Syria', 'Lebanon', 'Japan', 'New York'];

const COINS = [
  { coin: 'CEL', interest: false, loan: false },
  { coin: 'BTC', interest: true, loan: true },
  { coin: 'ETH', interest: true, loan: true },
  { coin: 'LTC', interest: true, loan: true },
  { coin: 'XRP', interest: true, loan: true },
  { coin: 'OMG', interest: true, loan: false },
  { coin: 'BCH', interest: true, loan: false },
  { coin: 'ZRX', interest: true, loan: false },
  { coin: 'ZEC', interest: false, loan: false },
  { coin: 'BTG', interest: false, loan: false },
  { coin: 'XLM', interest: false, loan: false },
]
const ELIGIBLE_COINS = COINS.map(c => c.coin);
const INTEREST_ELIGIBLE_COINS = COINS.filter(c => c.interest).map(c => c.coin);
const LOAN_ELIGIBLE_COINS = COINS.filter(c => c.loan).map(c => c.coin);

const KYC_STATUSES = {
  collecting: 'collecting',
  pending: 'pending',
  sending: 'sending',
  sent: 'sent',
  passed: 'passed',
  rejected: 'rejected',
  ico_passed: 'ico_passed',
  rejeceted: 'rejeceted'
};

const BLOCKEXPLORERS = {
  STAGING: {
    ltc: 'https://chain.so/tx/LTCTEST/',
    zec: 'https://chain.so/tx/ZECTEST/',
    btc: 'https://chain.so/tx/BTCTEST/',
    dash: 'https://chain.so/tx/DASHTEST/',
    bch: 'https://explorer.bitcoin.com/tbch/tx/',
    // xrp: 'https://xrpcharts.ripple.com/#/transactions/',
    xlm: 'https://testnet.steexp.com/tx/',
    btg: 'https://testnet.btgexplorer.com/tx/',
    eth: 'https://rinkeby.etherscan.io/tx/',
    erc20: 'https://rinkeby.etherscan.io/tx/',
  },
  PRODUCTION: {
    btc: 'https://blockchain.info/btc/tx/',
    bch: 'https://bchsvexplorer.com/tx/',
    ltc: 'https://chainz.cryptoid.info/ltc/tx.dws?',
    xrp: 'https://xrpcharts.ripple.com/#/transactions/',
    xlm: 'https://steexp.com/tx/',
    dash: 'https://chainz.cryptoid.info/dash/tx.dws?',
    zec: 'https://chain.so/tx/ZEC/`, ',
    btg: 'https://btgexplorer.com/tx/',
    eth: 'https://etherscan.io/tx/',
    erc20: 'https://etherscan.io/tx/',
  },
};

const BRANCH_LINKS = {
  TRANSFER: 'TRANSFER',
  INDIVIDUAL_REFERRAL: 'INDIVIDUAL_REFERRAL',
  COMPANY_REFERRAL: 'COMPANY_REFERRAL',
};

const TRANSFER_STATUSES = {
  expired: 'expired',
  claimed: 'claimed',
  cleared: 'cleared',
  pending: 'pending',
};

const TRANSACTION_TYPES = {
  DEPOSIT_PENDING: 'DEPOSIT_PENDING',
  DEPOSIT_CONFIRMED: 'DEPOSIT_CONFIRMED',
  WITHDRAWAL_PENDING: 'WITHDRAWAL_PENDING',
  WITHDRAWAL_CONFIRMED: 'WITHDRAWAL_CONFIRMED',
  WITHDRAWAL_CANCELED: 'WITHDRAWAL_CANCELED',
  WITHDRAWAL_PENDING_VERIFICATION: 'WITHDRAWAL_PENDING_VERIFICATION',
  WITHDRAWAL_PENDING_REVIEW: 'WITHDRAWAL_PENDING_REVIEW',

  INTEREST: 'INTEREST',
  COLLATERAL: 'COLLATERAL',
  BONUS_TOKEN: 'BONUS_TOKEN',

  CELPAY_PENDING: 'CELPAY_PENDING',
  CELPAY_CLAIMED: 'CELPAY_CLAIMED',
  CELPAY_SENT: 'CELPAY_SENT',
  CELPAY_RECEIVED: 'CELPAY_RECEIVED',
  CELPAY_RETURNED: 'CELPAY_RETURNED',
  CELPAY_EXPIRED: 'CELPAY_EXPIRED',
  CELPAY_ONHOLD: 'CELPAY_ONHOLD',

  REFERRED_HODL: 'REFERRED_HODL',
  REFERRED: 'REFERRED',
  REFERRED_PENDING: 'REFERRED_PENDING',
  REFERRER_HODL: 'REFERRER_HODL',
  REFERRER: 'REFERRER',
  REFERRER_PENDING: 'REFERRER_PENDING',

  CANCELED: "CANCELED",

  IN: 'IN',
  OUT: 'OUT',
};


/*
 * Future TRANSACTION_TYPES
 * Check doc: https://docs.google.com/document/d/1Xb0sm3NsUJK-LsNa5Y0D3KlN8L6DFrSb3xeCXuVDa_0/edit
 */
// eslint-disable-next-line no-unused-vars
const STATE_MACHINE = {
  // DEPOSIT
  // Deposit pending on the blockchain
  DEPOSIT_PENDING: 'DEPOSIT_PENDING',
  // Deposit confirmed on the blockchain
  DEPOSIT_CONFIRMED: 'DEPOSIT_CONFIRMED',

  // WITHDRAWAL
  // Withdrawal pending email verification by the user
  WITHDRAWAL_PENDING_VERIFICATION: 'WITHDRAWAL_PENDING_VERIFICATION',
  // Large withdrawal pending Celsius approval from BO
  WITHDRAWAL_PENDING_REVIEW: 'WITHDRAWAL_PENDING_REVIEW',
  // Withdrawal verified by the user, approved by Celsius & pending on the blockchain
  WITHDRAWAL_PENDING: 'WITHDRAWAL_PENDING',
  // Withdrawal confirmed on the blockchain
  WITHDRAWAL_CONFIRMED: 'WITHDRAWAL_CONFIRMED',
  // Withdrawal canceled by the user, Celsius or on the blockchain
  // NOTE: maybe 3 separate states
  WITHDRAWAL_CANCELED: 'WITHDRAWAL_CANCELED',

  // INTEREST
  // Interest pending because of no SNN or something
  INTEREST_PENDING: 'INTEREST_PENDING', // NOTE: new type
  // Interest confirmed
  INTEREST_CONFIRMED: 'INTEREST_CONFIRMED', // NOTE: renamed from INTEREST

  // LOANS
  // Loan pending Celsius approval from BO
  LOAN_PENDING: 'LOAN_PENDING', // NOTE: new type
  // Loan approved, collateral locked
  LOAN_APPROVED: 'LOAN_APPROVED', // NOTE: renamed from COLLATERAL
  // Loan paid back, collateral unlocked
  LOAN_FINISHED: 'LOAN_FINISHED', // NOTE: new type
  // Loan rejected by Celsius from BO
  // NOTE: any other way to cancel a loan, for app in the future?
  LOAN_REJECTED: 'LOAN_REJECTED', // NOTE: new type

  // CELPAY
  // NOTE: check who sees which transaction sender|receiver
  // Large CelPay waiting email verification by the user
  CELPAY_PENDING_VERIFICATION: 'CELPAY_PENDING_VERIFICATION', // NOTE: new type
  // CelPay link created and waiting to be claimed
  CELPAY_PENDING: 'CELPAY_PENDING',
  // CelPay link is claimed
  CELPAY_CLAIMED: 'CELPAY_CLAIMED',
  // CelPay has cleared, visible only by the CelPay sender
  CELPAY_SENT: 'CELPAY_SENT',
  // CelPay has cleared, visible only by the CelPay receiver
  CELPAY_RECEIVED: 'CELPAY_RECEIVED',
  // CelPay link has been claimed, waiting for claimer to finish KYC
  CELPAY_ONHOLD: 'CELPAY_ONHOLD',
  // CelPay link has been claimed, but the user didn't pass KYC in time
  CELPAY_EXPIRED: 'CELPAY_EXPIRED',
  // CelPay link has been canceled by the user
  CELPAY_RETURNED: 'CELPAY_RETURNED',

  // REFERRALS
  // Referred user award for the initial $1K deposit
  REFERRED_INITIAL: 'REFERRED_INITIAL', // NOTE: renamed from REFERRED
  // Referred user HODL award waiting for 3 months to expire
  REFERRED_HODL_PENDING: 'REFERRED_HODL_PENDING', // NOTE: new type
  // Referred user HODL award after 3 months
  REFERRED_HODL: 'REFERRED_HODL',
  // Referred user HODL award failed during the 3 months
  REFERRED_HODL_REJECTED: 'REFERRED_HODL_REJECTED', // NOTE: new type
  // Referrer user award for the initial $1K deposit
  REFERRER_INITIAL: 'REFERRER_INITIAL', // NOTE: renamed from REFERRER
  // Referrer user HODL award waiting for 3 months to expire
  REFERRER_HODL_PENDING: 'REFERRER_HODL_PENDING', // NOTE: new type
  // Referrer user HODL award after 3 months
  REFERRER_HODL: 'REFERRER_HODL',
  // Referred user HODL award failed during the 3 months
  REFERRER_HODL_REJECTED: 'REFERRER_HODL_REJECTED', // NOTE: new type

  // BONUS TOKENS
  // Bonus tokens awarded for some reason
  BONUS_TOKEN_CONFIRMED: 'BONUS_TOKEN_CONFIRMED', // NOTE: renamed from BONUS_TOKEN
  // Bonus tokens are locked and waithing for something
  BONUS_TOKEN_LOCKED: 'BONUS_TOKEN_LOCKED',
  // Bonus tokens canceled
  BONUS_TOKEN_CANCELED: 'BONUS_TOKEN_CANCELED',

  // OTHER/FALLBACKS
  // Fallback incoming transaction
  IN: 'IN',
  // Fallback outgoing transaction
  OUT: 'OUT',
  // Fallback cancelled/rejected/failed/removed transaction
  CANCELED: "CANCELED",
  // Amount locked for some reason
  LOCKED: "LOCKED",
};

const GENDER = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' }
];

const PERSON_TITLE = [
  { label: 'Mr.', value: 'mr' },
  { label: 'Ms.', value: 'ms' },
  { label: 'Mrs.', value: 'mrs' }
];

const DAYS = [
  { label: '01', value: '01' },
  { label: '02', value: '02' },
  { label: '03', value: '03' },
  { label: '04', value: '04' },
  { label: '05', value: '05' },
  { label: '06', value: '06' },
  { label: '07', value: '07' },
  { label: '08', value: '08' },
  { label: '09', value: '09' },
  { label: '10', value: '10' },
  { label: '11', value: '11' },
  { label: '12', value: '12' },
  { label: '13', value: '13' },
  { label: '14', value: '14' },
  { label: '15', value: '15' },
  { label: '16', value: '16' },
  { label: '17', value: '17' },
  { label: '18', value: '18' },
  { label: '19', value: '19' },
  { label: '20', value: '20' },
  { label: '21', value: '21' },
  { label: '22', value: '22' },
  { label: '23', value: '23' },
  { label: '24', value: '24' },
  { label: '25', value: '25' },
  { label: '26', value: '26' },
  { label: '27', value: '27' },
  { label: '28', value: '28' },
  { label: '29', value: '29' },
  { label: '30', value: '30' },
  { label: '31', value: '31' }
];

const MONTHS = [
  { label: 'Jan', value: '01' },
  { label: 'Feb', value: '02' },
  { label: 'Mar', value: '03' },
  { label: 'April', value: '04' },
  { label: 'May', value: '05' },
  { label: 'June', value: '06' },
  { label: 'July', value: '07' },
  { label: 'Aug', value: '08' },
  { label: 'Sept', value: '09' },
  { label: 'Oct', value: '10' },
  { label: 'Nov', value: '11' },
  { label: 'Dec', value: '12' }
];

const RANDOM_MESSAGES = [
  {
    title: "Interest Income",
    text: "Make your Mondays a whole lot more interesting. Deposit coins and receive weekly interest payments directly to your Celsius wallet."
  },
  {
    title: "Crypto is the New Collateral",
    text: "Crypto-backed loans give you access to the cash you need at rates you deserve without selling your coins! "
  },
  {
    title: "No Fees, No Worries",
    text: "CelPay is the easiest way to send and receive crypto instantly - without the fees."
  },
  {
    title: "Unity in Community",
    text: "Celsius Network’s promise is to only act in the best interest of our community by offering unmatched financial services that are safe, secure, and rewarding."
  },
  {
    title: "Join the CEL-ebration!",
    text: "Get the most out of your Celsius app by earning in CEL! Earning interest in the CEL token gets you up to 25% more interest."
  },
  {
    title: "Security is our Top Priority",
    text: "Did you know Celsius uses BitGo as its custodian? This way we can give top security to all our customers. Be sure to turn on two-factor authentication in your profile settings to make the app as secure as possible!"
  }
];

const years = [];
const currentYear = (new Date()).getFullYear();
for (let i = currentYear; i >= currentYear - 120; i--) {
  years.push({ label: i.toString(), value: i.toString() });
}
const YEARS = years;

const STATE = [
  { label: "Alabama", value: "Alabama" },
  { label: "Alaska", value: "Alaska" },
  { label: "American Samoa", value: "American Samoa" },
  { label: "Arizona", value: "Arizona" },
  { label: "Arkansas", value: "Arkansas" },
  { label: "California", value: "California" },
  { label: "Colorado", value: "Colorado" },
  { label: "Connecticut", value: "Connecticut" },
  { label: "Delaware", value: "Delaware" },
  { label: "District Of Columbia", value: "District Of Columbia" },
  { label: "Federated States Of Micronesia", value: "Federated States Of Micronesia" },
  { label: "Florida", value: "Florida" },
  { label: "Georgia", value: "Georgia" },
  { label: "Guam", value: "Guam" },
  { label: "Hawaii", value: "Hawaii" },
  { label: "Idaho", value: "Idaho" },
  { label: "Illinois", value: "Illinois" },
  { label: "Indiana", value: "Indiana" },
  { label: "Iowa", value: "Iowa" },
  { label: "Kansas", value: "Kansas" },
  { label: "Kentucky", value: "Kentucky" },
  { label: "Louisiana", value: "Louisiana" },
  { label: "Maine", value: "Maine" },
  { label: "Marshall Islands", value: "Marshall Islands" },
  { label: "Maryland", value: "Maryland" },
  { label: "Massachusetts", value: "Massachusetts" },
  { label: "Michigan", value: "Michigan" },
  { label: "Minnesota", value: "Minnesota" },
  { label: "Mississippi", value: "Mississippi" },
  { label: "Missouri", value: "Missouri" },
  { label: "Montana", value: "Montana" },
  { label: "Nebraska", value: "Nebraska" },
  { label: "Nevada", value: "Nevada" },
  { label: "New Hampshire", value: "New Hampshire" },
  { label: "New Jersey", value: "New Jersey" },
  { label: "New Mexico", value: "New Mexico" },
  { label: "New York", value: "New York" },
  { label: "North Carolina", value: "North Carolina" },
  { label: "North Dakota", value: "North Dakota" },
  { label: "Northern Mariana Islands", value: "Northern Mariana Islands" },
  { label: "Ohio", value: "Ohio" },
  { label: "Oklahoma", value: "Oklahoma" },
  { label: "Oregon", value: "Oregon" },
  { label: "Palau", value: "Palau" },
  { label: "Pennsylvania", value: "Pennsylvania" },
  { label: "Puerto Rico", value: "Puerto Rico" },
  { label: "Rhode Island", value: "Rhode Island" },
  { label: "South Carolina", value: "South Carolina" },
  { label: "South Dakota", value: "South Dakota" },
  { label: "Tennessee", value: "Tennessee" },
  { label: "Texas", value: "Texas" },
  { label: "Utah", value: "Utah" },
  { label: "Vermont", value: "Vermont" },
  { label: "Virgin Islands", value: "Virgin Islands" },
  { label: "Virginia", value: "Virginia" },
  { label: "Washington", value: "Washington" },
  { label: "West Virginia", value: "West Virginia" },
  { label: "Wisconsin", value: "Wisconsin" },
  { label: "Wyoming", value: "Wyoming" }
]

const CONTACT_NETWORK = {
  PHONE: 'Phone',
  FACEBOOK: 'Facebook',
  TWITTER: 'Twitter'
};

const PREDIFINED_AMOUNTS = [
  { label: "$20", value: "20" },
  { label: "$50", value: "50" },
  { label: "$100", value: "100" },
  { label: "ALL", value: "" }
];

const BANK_ACCOUNT_TYPE = [
  { label: 'Checking', value: 'Checking' },
  { label: 'Savings', value: 'Savings' }
]


const LOAN_STATUS = {
  APPROVED: 'APPROVED',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED'
}

export default {
  FORBIDEN_COUNTRIES,
  ELIGIBLE_COINS,
  INTEREST_ELIGIBLE_COINS,
  LOAN_ELIGIBLE_COINS,
  KYC_STATUSES,
  BRANCH_LINKS,
  TRANSFER_STATUSES,
  TRANSACTION_TYPES,
  GENDER,
  PERSON_TITLE,
  DAYS,
  MONTHS,
  YEARS,
  STATE,
  CONTACT_NETWORK,
  PREDIFINED_AMOUNTS,
  BANK_ACCOUNT_TYPE,
  LOAN_STATUS,
  BLOCKEXPLORERS: BLOCKEXPLORERS[ENV] || BLOCKEXPLORERS.STAGING,
}

export {
  FORBIDEN_COUNTRIES,
  ELIGIBLE_COINS,
  INTEREST_ELIGIBLE_COINS,
  LOAN_ELIGIBLE_COINS,
  KYC_STATUSES,
  BRANCH_LINKS,
  TRANSFER_STATUSES,
  TRANSACTION_TYPES,
  GENDER,
  PERSON_TITLE,
  DAYS,
  MONTHS,
  YEARS,
  STATE,
  CONTACT_NETWORK,
  PREDIFINED_AMOUNTS,
  BANK_ACCOUNT_TYPE,
  LOAN_STATUS,
  RANDOM_MESSAGES,
}
