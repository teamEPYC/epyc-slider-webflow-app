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
  icon?: any;
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
