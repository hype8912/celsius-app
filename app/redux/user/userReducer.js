import ACTIONS from "../../constants/ACTIONS";

/**
 * TODO make it a function add JSDoc & desc for return
 */
const initialState = {
  profile: {
    profile_picture: null,
  },
  expiredSession: false,
  appSettings: {
    theme: "light",
  },

  bankAccountInfo: null, // TODO move to profile
  screen: undefined, // TODO move to ui or navReducer. check what does it do
  loyaltyInfo: null, // TODO move to profile
  securityOverview: {}, // TODO move to security
  kycDocuments: undefined, // TODO move to kycReducer
  utilityBill: undefined, // TODO move to kycReducer
  contacts: {
    // TODO move to profileReducer
    friendsWithApp: [],
    friendsWithoutApp: [],
  },
};

export default (state = initialState, action) => {
  let profile;
  switch (action.type) {
    case ACTIONS.EXPIRE_SESSION:
      return {
        ...state,
        expiredSession: true,
      };
    case ACTIONS.LOGIN_USER_SUCCESS:
      profile = mapProfile(action.user);
      return {
        ...state,
        tokens: action.tokens,
        profile,
      };

    case ACTIONS.REGISTER_USER_SUCCESS:
    case ACTIONS.REGISTER_USER_FACEBOOK_SUCCESS:
    case ACTIONS.REGISTER_USER_GOOGLE_SUCCESS:
    case ACTIONS.REGISTER_USER_TWITTER_SUCCESS:
    case ACTIONS.LOGIN_USER_GOOGLE_SUCCESS:
    case ACTIONS.LOGIN_USER_FACEBOOK_SUCCESS:
    case ACTIONS.LOGIN_USER_TWITTER_SUCCESS:
      profile = mapProfile(action.user);
      return {
        ...state,
        profile,
      };

    case ACTIONS.TWITTER_GET_ACCESS_TOKEN:
      return {
        ...state,
        profile: {
          ...state.profile,
          twitter_oauth_token: action.twitter_tokens.oauth_token,
          twitter_oauth_secret: action.twitter_tokens.oauth_token_secret,
        },
      };

    case ACTIONS.GET_USER_PERSONAL_INFO_SUCCESS:
    case ACTIONS.UPDATE_USER_PERSONAL_INFO_SUCCESS:
    case ACTIONS.GET_USER_TAXPAYER_INFO_SUCCESS:
      profile = mapProfile(action.personalInfo);
      return {
        ...state,
        profile: {
          ...state.profile,
          ...profile,
          ...action.taxPayerInfo,
        },
      };

    case ACTIONS.UPDATE_USER_ADDRESS_INFO_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          country: action.addressInfo.address.country,
          ...action.addressInfo,
        },
      };
    case ACTIONS.UPDATE_USER_TAXPAYER_INFO_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.taxpayerInfo,
        },
      };
    case ACTIONS.SET_PIN_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          has_pin: true,
        },
      };

    case ACTIONS.UPLOAD_PLOFILE_IMAGE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          profile_picture: action.image,
        },
      };

    case ACTIONS.START_KYC_SUCCESS:
    case ACTIONS.GET_KYC_STATUS_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          kyc: action.kyc,
        },
      };

    case ACTIONS.GET_KYC_DOCUMENTS_SUCCESS:
    case ACTIONS.CREATE_KYC_DOCUMENTS_SUCCESS:
      return {
        ...state,
        kycDocuments: action.documents,
      };

    case ACTIONS.GET_INDIVIDUAL_LINK_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          individual_referral_link: action.link,
        },
      };

    case ACTIONS.GET_CONNECTED_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: {
          friendsWithApp: [...action.contacts.friendsWithApp],
          friendsWithoutApp: [...action.contacts.friendsWithoutApp],
        },
      };

    case ACTIONS.GET_LINKED_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        bankAccountInfo: {
          ...action.bankAccountInfo,
        },
      };

    case ACTIONS.GET_PREVIOUS_SCREEN_SUCCESS:
      return {
        ...state,
        screen: action.screen,
      };

    case ACTIONS.GET_LOYALTY_INFO_SUCCESS:
      return {
        ...state,
        loyaltyInfo: {
          ...action.loyaltyInfo,
        },
      };

    case ACTIONS.SET_APP_SETTINGS_SUCCESS:
    case ACTIONS.GET_APP_SETTINGS_SUCCESS:
      return {
        ...state,
        appSettings: {
          ...state.appSettings,
          ...action.userAppData,
        },
      };

    case ACTIONS.GET_MEMBER_STATUS_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          celsius_member: action.isNewMember || state.profile.celsius_member,
        },
      };

    case ACTIONS.GET_USER_SECURITY_OVERVIEW_SUCCESS:
      return {
        ...state,
        securityOverview: {
          ...action.overview,
        },
      };

    case ACTIONS.GET_UTILITY_BILL_SUCCESS:
      return {
        ...state,
        utilityBill: action.utilityBill,
      };

    default:
      return state;
  }
};

// TODO: should be moved to user model or util, thisi s a quickfix for CN-4320
function mapProfile(userProfile) {
  const profile = { ...userProfile };

  if (profile.profile_picture && profile.profile_picture.includes("http:/")) {
    profile.profile_picture = profile.profile_picture.replace(
      "http:",
      "https:"
    );
  }

  return profile;
}
