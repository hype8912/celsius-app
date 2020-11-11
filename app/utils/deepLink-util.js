import { DEEP_LINKS, STORAGE_KEYS } from "../constants/DATA";
import { getSecureStoreKey, setSecureStoreKey, deleteSecureStoreKey } from "./storage-util";
import * as actions from "../redux/actions";
import store from "../redux/store";

export { addDeepLinkData, handleDeepLink, getDeepLinkData, checkReferralDeeplink };

async function addDeepLinkData(deepLinkData) {
  const deepLink = JSON.stringify(deepLinkData)
  await setSecureStoreKey(STORAGE_KEYS.DEEPLINK_DATA, deepLink)
}

async function getDeepLinkData() {
  const deepLink = await getSecureStoreKey(STORAGE_KEYS.DEEPLINK_DATA)
  const deepLinkData = JSON.parse(deepLink)

  return deepLinkData
}

async function handleDeepLink() {
  const deepLinkData = await getDeepLinkData()
    if (deepLinkData) {
      if (!deepLinkData.type) return;
      const user = store.getState().user.profile;

      switch (deepLinkData.type) {
        case DEEP_LINKS.NAVIGATE_TO:
          if (!user.id) return;
          store.dispatch(actions.resetToScreen(deepLinkData.screen));
          await clearDeepLinkData();
          return;

        case DEEP_LINKS.TRANSFER:
        case DEEP_LINKS.INDIVIDUAL_REFERRAL:
        case DEEP_LINKS.COMPANY_REFERRAL:
          store.dispatch(actions.registerBranchLink(deepLinkData));
          await clearDeepLinkData()
          return;

        default:
          return;
      }
    }
}

async function clearDeepLinkData() {
  await deleteSecureStoreKey(STORAGE_KEYS.DEEPLINK_DATA)
}

function checkReferralDeeplink () {
  let counter = 10
  const interval = setInterval(async ()=> {
    if (counter > 0) {
      const deepLink = await getDeepLinkData()
      if (deepLink) {
        counter = 0
        await handleDeepLink();
      } else {
        counter--
      }
    } else {
      clearInterval(interval)
    }
  },1000)
}
