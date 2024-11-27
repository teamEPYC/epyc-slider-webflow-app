import {
  ArrowRight,
  MousePointer,
  Sliders,
  Clock,
  Settings,
  LockIcon,
  SpaceIcon,
  BookOpenIcon,
  SlidersHorizontal,
  Download,
  Layers,
  Mouse,
  Navigation,
  ListFilter,
  ScrollText,
  Shuffle,
  Keyboard,
  Play,
  PlayIcon,
  Star,
  Grab,
  Image,
} from "lucide-react";

import React, { type ElementType } from "react";

export type SlideDirection = "horizontal" | "vertical";
export type LoopMode = boolean;
export type EffectType =
  | "slide"
  | "fade"
  | "cube"
  | "coverflow"
  | "flip"
  | "cards";
export type PaginationType = "progressbar" | "bullet" | "fraction" | "none";

export interface SliderConfigOption<T> {
  value: T;
  label: string;
  icon?: ElementType;
  options?: readonly T[];
}

export interface ModuleConfig {
  navigation: SliderConfigOption<boolean>;
  pagination: SliderConfigOption<PaginationType>;
  freeMode: SliderConfigOption<boolean>;
  keyboardControl: SliderConfigOption<boolean>;
  mousewheelControl: SliderConfigOption<boolean>;
  autoplay: SliderConfigOption<boolean>;
  grabCusor: SliderConfigOption<boolean>;
}

export interface ParametersConfig {
  slideDirection: SliderConfigOption<SlideDirection>;
  slidesPerView: SliderConfigOption<number>;
  slidesPerGroup: SliderConfigOption<number>;
  spaceBetweenSlides: SliderConfigOption<number>;
  autoHeight: SliderConfigOption<boolean>;
  loopMode: SliderConfigOption<LoopMode>;
}

export interface EffectsConfig {
  effect: SliderConfigOption<EffectType>;
  transitionDuration: SliderConfigOption<number>;
}

export interface SliderTypesConfig {
  name?: string;
  parameters: ParametersConfig;
  effects: EffectsConfig;
  modules: ModuleConfig;
}

export const SLIDES_PER_VIEW_OPTIONS = [1, 2, 3, 4, 5];
export const PAGINATION_OPTIONS: PaginationType[] = [
  "progressbar",
  "bullet",
  "fraction",
  "none",
];
export const DIRECTION_OPTIONS: SlideDirection[] = ["horizontal", "vertical"];
export const EFFECT_OPTIONS: EffectType[] = [
  "slide",
  "fade",
  "cube",
  "coverflow",
  "flip",
  "cards",
];

export const initialSliderConfig: SliderTypesConfig = {
  parameters: {
    slideDirection: {
      value: "horizontal",
      label: "Slide Direction",
      options: DIRECTION_OPTIONS,
      icon: ArrowRight,
    },
    slidesPerView: {
      value: 1,
      label: "Slides Per View",
      icon: Sliders,
      options: SLIDES_PER_VIEW_OPTIONS,
    },
    slidesPerGroup: {
      value: 1,
      label: "Slides Per Group",
      icon: Sliders,
      options: SLIDES_PER_VIEW_OPTIONS,
    },
    spaceBetweenSlides: {
      value: 0,
      label: "Space Between Slides",
      icon: SpaceIcon,
    },
    autoHeight: { value: false, label: "Auto Height", icon: MousePointer },
    loopMode: { value: false, label: "Loop Mode", icon: LockIcon },
  },
  effects: {
    effect: {
      value: "slide",
      label: "Effect",
      icon: Star,
      options: EFFECT_OPTIONS,
    },
    transitionDuration: { value: 300, label: "Transition Duration" },
  },
  modules: {
    grabCusor: {
      label: "Grab cursor",
      value: false,
      icon: Grab,
    },
    navigation: {
      value: false,
      label: "Navigation",
      icon: Navigation,
    },
    pagination: {
      value: "none",
      label: "Pagination Type",
      icon: ListFilter,
      options: PAGINATION_OPTIONS,
    },
    freeMode: {
      value: false,
      label: "Free Mode",
      icon: Shuffle,
    },
    keyboardControl: {
      value: false,
      label: "Keyboard Control",
      icon: Keyboard,
    },
    mousewheelControl: {
      value: false,
      label: "Mousewheel Control",
      icon: Mouse,
    },
    autoplay: {
      value: false,
      label: "Autoplay",
      icon: PlayIcon,
    },
  },
};
