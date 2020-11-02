import { NativeModules } from 'react-native'

// const defaultSession = {params: {}, error: null}

NativeModules.RNGoogleSignin = {
  SIGN_IN_CANCELLED: '0',
  IN_PROGRESS: '1',
  PLAY_SERVICES_NOT_AVAILABLE: '2',
  SIGN_IN_REQUIRED: '3'
}

// NativeModules.RNBranch = {
//   // Mock constants exported by native layers
//   ADD_TO_CART_EVENT: 'Add to Cart',
//   ADD_TO_WISHLIST_EVENT: 'Add to Wishlist',
//   PURCHASE_INITIATED_EVENT: 'Purchase Started',
//   PURCHASED_EVENT: 'Purchased',
//   REGISTER_VIEW_EVENT: 'View',
//   SHARE_COMPLETED_EVENT: 'Share Completed',
//   SHARE_INITIATED_EVENT: 'Share Started',
//
//   redeemInitSessionResult() {
//     return new Promise((resolve) => {
//       setTimeout(() => resolve(defaultSession), 500)
//     })
//   }
// }

export { NativeModules }
