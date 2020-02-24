// Screen Transitioning animation
import { Platform } from "react-native";
import { StackViewTransitionConfigs } from "react-navigation-stack";

export const transitionConfig = sceneProps => {
  const { scene, scenes } = sceneProps;
  const thisSceneIndex = scene.index;
  const lastSceneIndex = scenes[scenes.length - 1].index;

  if (Platform.OS !== "ios") {
    if (lastSceneIndex && thisSceneIndex < lastSceneIndex) {
      return StackViewTransitionConfigs.FadeOutToBottomAndroid;
    }
    return StackViewTransitionConfigs.FadeInFromBottomAndroid;
  }
  return StackViewTransitionConfigs.SlideFromRightIOS;
};
