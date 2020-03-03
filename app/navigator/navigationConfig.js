// Screen Transitioning animation
import React from 'react';
import { Animated, Easing } from 'react-native'
import CelHeading from '../components/organisms/CelHeading/CelHeading'


export const transitionConfig = () => ({
  transitionSpec: {
    duration: 750,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true,
  },
  screenInterpolator: sceneProps => {
    const { scene, position, scenes, index } = sceneProps;
    const thisSceneIndex = scene.index;

    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [0, 1]
    });

    const lastSceneIndex = scenes[scenes.length - 1].index

    // Test whether we're skipping back more than one screen
    if (lastSceneIndex - index > 1) {
      // Do not transform the screen being navigated to
      if (scene.index === index) return
      // Hide all screens in between
      if (scene.index !== lastSceneIndex) return { opacity: 0 }
    }

    return { opacity }
  }
})

export const defaultNavigationOptions = {
  header: props => <CelHeading {...props} />,
  gesturesEnabled: false
}
