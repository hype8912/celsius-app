import { Animated, Easing } from "react-native";
import store from "../redux/store";
import * as actions from "../redux/actions";
import { heightPercentageToDP } from "./styles-util";
import { isLoanBannerVisible } from "./ui-util";
import { hasPassedKYC } from "./user-util/user-util";
import { SCREENS } from "../constants/SCREENS";

const animationsUtil = {
  applyOffset,
  scrollListener,
  buttonsDown,
  buttonsUp,
  animateOpeningFabMenu,
  animateClosure,
  animateAttention,
  animateArrayOfObjects,
  openMessage,
  closeMessage,
};

// GRID / LIST OFFSET CALCULATION

const OFFSET = 50;
const BASE_OFFSET = 300;

/**
 * Get offset value for further animation
 *
 * @param {array} items preferably array of objects
 * @param numCols - number of columns we plan on rendering
 * @returns { number } offset values
 */

function applyOffset(items, numCols) {
  const diagonals = findDiagonals(items, numCols);

  diagonals.forEach((diag, i) => {
    diag.forEach(elm => {
      // eslint-disable-next-line no-param-reassign
      items[elm].offset = i * OFFSET + BASE_OFFSET;
    });
  });

  return items;
}

/**
 * First nested function part of getting offset value
 */

function findDiagonals(items, numCols) {
  const offsets = [];
  let i = 0;
  const numRows = Math.ceil(items.length / numCols);

  while (i < numRows) {
    offsets.push(getAscDiagonal(i, 0, numCols, items.length));
    i++;
  }
  i--;
  for (let j = 1; j < numCols; j++) {
    offsets.push(getAscDiagonal(i, j, numCols, items.length));
  }

  return offsets;
}

/**
 * Second nested function part of getting offset value
 */

function getAscDiagonal(i, j, numCols, maxLength) {
  const diagonal = [];
  while (i >= 0 && j < numCols) {
    const mappedIndex = i * numCols + j;
    if (mappedIndex < maxLength) diagonal.push(mappedIndex);
    // eslint-disable-next-line no-param-reassign
    i--;
    // eslint-disable-next-line no-param-reassign
    j++;
  }
  return diagonal;
}

// GRID / LIST ANIMATION

/**
 * After receiving offset value from applyOffset function we use it as a delay value
 *
 * @param {Object} animatedValue
 * @param { number }offset
 * @param {number} duration
 */

function animateArrayOfObjects(animatedValue, offset, duration) {
  Animated.timing(animatedValue, {
    toValue: 1,
    duration,
    delay: offset,
    easing: Easing.bezier(0.5, 0, 0.5, 1),
  }).start();
}

// LISTENER FOR HEADER TITLE CHANGES

/**
 * Scroll y axis listener inside Regular Layout for rendering header title
 * @param y
 */
let threshold = heightPercentageToDP("18%");
function scrollListener(y) {
  const { activeScreen } = store.getState().nav;
  const { isBannerVisible } = store.getState().ui;
  if ((isBannerVisible && isLoanBannerVisible()) || !hasPassedKYC())
    threshold = heightPercentageToDP("40%");
  const {
    changeWalletHeader,
    changeCoinDetailsHeader,
    changeInterestHeader,
  } = store.getState().animations;
  if (y > threshold) {
    if (
      !changeWalletHeader &&
      (activeScreen === SCREENS.WALLET_LANDING ||
        activeScreen === SCREENS.BALANCE_HISTORY)
    )
      store.dispatch(actions.changeWalletHeaderContent(true));
    if (!changeCoinDetailsHeader && activeScreen === SCREENS.COIN_DETAILS)
      store.dispatch(actions.changeCoinDetailsHeaderContent(true));
    if (!changeInterestHeader && activeScreen === SCREENS.WALLET_INTEREST)
      store.dispatch(actions.changeInterestHeaderContent(true));
  }
  if (y < threshold && changeCoinDetailsHeader) {
    if (activeScreen === SCREENS.COIN_DETAILS)
      store.dispatch(actions.changeCoinDetailsHeaderContent());
  }
  if (y < threshold && changeWalletHeader) {
    if (
      activeScreen === SCREENS.WALLET_LANDING ||
      activeScreen === SCREENS.BALANCE_HISTORY
    )
      store.dispatch(actions.changeWalletHeaderContent());
  }
  if (y < threshold && changeInterestHeader) {
    if (activeScreen === SCREENS.WALLET_INTEREST)
      store.dispatch(actions.changeInterestHeaderContent());
  }
}

// FAB ANIMATIONS

/**
 * Spring Animation created from two standard React Native Animated spring functions
 */

function springAnimation(
  spring = undefined,
  value = undefined,
  friction = undefined,
  tension = undefined,
  velocity = undefined
) {
  Animated.spring(spring, {
    toValue: value || 1.1,
    friction: friction || 0.5,
    tension: tension || 0,
    velocity: velocity || 3,
    overshootClamping: true,
    useNativeDriver: true,
  }).start(({ finished }) => {
    if (finished)
      Animated.spring(spring, {
        toValue: 1,
        friction: 1.5,
        tension: 3,
        useNativeDriver: true,
      }).start();
  });
}

/**
 * Pulse Animation created from two standard React Native Animated timing functions
 */

function pulseAnimation(fabPulse, fabOpacity, pulse, opacity) {
  fabPulse.setValue(pulse);
  fabOpacity.setValue(opacity);
  Animated.parallel([
    Animated.timing(fabPulse, {
      toValue: 1.7,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(),
    Animated.timing(fabOpacity, {
      toValue: 0,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(),
  ]);
}

/**
 * Custom Variations of pulseAnimation and springAnimation
 */

function animateOpeningFabMenu(fabSpring) {
  springAnimation(fabSpring, 1.2, 1, 1, 5);
}

function animateClosure(fabSpring) {
  springAnimation(fabSpring, 1.3, 1, 1, 3);
}

function animateAttention(fabSpring, fabPulse, fabOpacity) {
  springAnimation(fabSpring, 1.3);
  pulseAnimation(fabPulse, fabOpacity, 1.8, 0.8);
  setTimeout(() => {
    springAnimation(fabSpring);
    pulseAnimation(fabPulse, fabOpacity, 1.5, 0.6);
  }, 2500);
}

/**
 * Several standard react native Animations mixed to animate opening of FABMenu
 *
 * @param {Object} buttonMoveAnimationX
 * @param {Object} buttonMoveAnimationY
 * @param {Object} blurOpacity
 * @param {Object} helpButtonOffset
 * @param {Object} textScale
 * @param callback onFinish
 */

function buttonsDown(
  buttonMoveAnimationX,
  buttonMoveAnimationY,
  blurOpacity,
  helpButtonOffset,
  textScale,
  onFinish
) {
  Animated.sequence([
    Animated.timing(textScale, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
      extrapolate: "clamp",
    }).start(),
    Animated.parallel([
      Animated.timing(buttonMoveAnimationX, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
        extrapolate: "clamp",
      }).start(),
      Animated.timing(buttonMoveAnimationY, {
        toValue: 0,
        duration: 450,
        velocity: 5,
        useNativeDriver: true,
        extrapolate: "clamp",
      }).start(),
      Animated.timing(blurOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        extrapolate: "clamp",
      }).start(),
      Animated.timing(helpButtonOffset, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
        extrapolate: "clamp",
      }).start(({ finished }) => {
        if (finished) {
          onFinish();
        }
      }),
    ]),
  ]);
}

/**
 * Several standard react native Animations mixed to animate closing of FABMenu
 *
 * @param {Object} buttonMoveAnimationX
 * @param {Object} buttonMoveAnimationY
 * @param {Object} blurOpacity
 * @param {Object} helpButtonOffset
 * @param {Object} textScale
 */

function buttonsUp(
  buttonMoveAnimationX,
  buttonMoveAnimationY,
  blurOpacity,
  helpButtonOffset,
  textScale
) {
  Animated.sequence([
    Animated.parallel([
      Animated.timing(buttonMoveAnimationX, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
        extrapolate: "clamp",
      }).start(),
      Animated.timing(buttonMoveAnimationY, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
        extrapolate: "clamp",
      }).start(),
      Animated.timing(blurOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        extrapolate: "clamp",
      }).start(),
    ]),
    Animated.timing(helpButtonOffset, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
      extrapolate: "clamp",
    }).start(({ finished }) => {
      if (finished)
        Animated.parallel([
          Animated.timing(textScale, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
            extrapolate: "clamp",
          }).start(),
        ]);
    }),
  ]);
}

// MESSAGE ANIMATION

/**
 * Standard React native animation for opening message
 * @param yOffset
 */

function openMessage(yOffset) {
  Animated.timing(yOffset, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }).start(({ finished }) => {
    if (finished)
      Animated.timing(yOffset, {
        delay: 4000,
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
  });
}

/**
 * Standard React native animation for closing message
 * @param yOffset
 * @param {function} onFinish
 */

function closeMessage(yOffset, onFinish) {
  Animated.timing(yOffset, {
    toValue: 0,
    duration: 500,
    useNativeDriver: true,
  }).start(({ finished }) => {
    if (finished) onFinish();
  });
}

export default animationsUtil;
