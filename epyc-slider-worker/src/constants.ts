import { LoopIcon, CubeIcon } from "@radix-ui/react-icons";
import {
  ArrowRight,
  ArrowDown,
  Sliders,
  SpaceIcon,
  Grid,
  Columns,
  Expand,
  LockIcon,
  Grab,
  Navigation,
  ListFilter,
  FerrisWheel,
  KeyboardIcon,
  MouseOffIcon,
  PlayIcon,
  Star,
  StarHalf,
  FlipHorizontal,
} from "lucide-react";

import {
  DIRECTION_OPTIONS,
  EFFECT_OPTIONS,
  PAGINATION_OPTIONS,
  SliderTypesConfig,
  SLIDES_PER_VIEW_OPTIONS,
} from "./types/sliderTypes";

export const inlineScript = `const link = document.createElement("link"); link.rel = "stylesheet"; link.href = "https://cdn.jsdelivr.net/npm/@teamepyc/sliders@0.6/dist/index.css"; document.head.appendChild(link);  const script = document.createElement("script"); script.src = "https://cdn.jsdelivr.net/npm/@teamepyc/sliders@0.6/dist/index.js"; document.head.appendChild(script);`;

const createParameter = (
  value: any,
  label: string,
  icon: any,
  options?: any
) => ({
  value,
  label,
  icon,
  options,
});

const createModule = (value: any, label: string, icon: any, options?: any) => ({
  value,
  label,
  icon,
  options,
});

// Common Icons for Reusability
const icons = {
  slideDirection: ArrowRight,
  slidesPerView: Sliders,
  slidesPerGroup: Columns,
  spaceBetweenSlides: SpaceIcon,
  autoHeight: Expand,
  loopMode: LockIcon,
  grabCursor: Grab,
  navigation: Navigation,
  pagination: ListFilter,
  freeMode: FerrisWheel,
  keyboardControl: KeyboardIcon,
  mouseControl: MouseOffIcon,
  autoplay: PlayIcon,
};

// Slider Template List
export const sliderTemplateList: SliderTypesConfig[] = [
  {
    name: "Basic Slider",
    parameters: {
      slideDirection: createParameter(
        "horizontal",
        "Slide Direction",
        icons.slideDirection,
        DIRECTION_OPTIONS
      ),
      slidesPerView: createParameter(
        1,
        "Slides Per View",
        icons.slidesPerView,
        SLIDES_PER_VIEW_OPTIONS
      ),
      slidesPerGroup: createParameter(
        1,
        "Slides Per Group",
        icons.slidesPerGroup,
        SLIDES_PER_VIEW_OPTIONS
      ),
      spaceBetweenSlides: createParameter(
        0,
        "Space Between Slides",
        icons.spaceBetweenSlides
      ),
      autoHeight: createParameter(false, "Auto Height", icons.autoHeight),
      loopMode: createParameter(false, "Loop Mode", icons.loopMode),
    },
    effects: {
      effect: createParameter("slide", "Effect", Star, EFFECT_OPTIONS),
      transitionDuration: { value: 300, label: "Transition Duration (ms)" },
    },
    modules: {
      grabCusor: createModule(false, "Grab Cursor", icons.grabCursor),
      navigation: createModule(false, "Navigation", icons.navigation),
      pagination: createModule(
        "none",
        "Pagination Type",
        icons.pagination,
        PAGINATION_OPTIONS
      ),
      freeMode: createModule(false, "Free Mode", icons.freeMode),
      keyboardControl: createModule(
        false,
        "Keyboard Control",
        icons.keyboardControl
      ),
      mousewheelControl: createModule(
        false,
        "Mouse Control",
        icons.mouseControl
      ),
      autoplay: createModule(false, "Autoplay", icons.autoplay),
    },
  },
  {
    name: "Advanced Slider",
    parameters: {
      slideDirection: createParameter(
        "vertical",
        "Slide Direction",
        ArrowDown,
        DIRECTION_OPTIONS
      ),
      slidesPerView: createParameter(
        3,
        "Slides Per View",
        Grid,
        SLIDES_PER_VIEW_OPTIONS
      ),
      slidesPerGroup: createParameter(
        2,
        "Slides Per Group",
        icons.slidesPerGroup,
        SLIDES_PER_VIEW_OPTIONS
      ),
      spaceBetweenSlides: createParameter(
        10,
        "Space Between Slides (px)",
        icons.spaceBetweenSlides
      ),
      autoHeight: createParameter(true, "Auto Height", icons.autoHeight),
      loopMode: createParameter(true, "Infinite Loop", icons.loopMode),
    },
    effects: {
      effect: createParameter("fade", "Effect", StarHalf, EFFECT_OPTIONS),
      transitionDuration: { value: 500, label: "Transition Duration (ms)" },
    },
    modules: {
      grabCusor: createModule(true, "Grab Cursor", icons.grabCursor),
      navigation: createModule(true, "Navigation", icons.navigation),
      pagination: createModule(
        "bullet",
        "Pagination Type",
        icons.pagination,
        PAGINATION_OPTIONS
      ),
      freeMode: createModule(false, "Free Mode", icons.freeMode),
      keyboardControl: createModule(
        false,
        "Keyboard Control",
        icons.keyboardControl
      ),
      mousewheelControl: createModule(
        false,
        "Mouse Control",
        icons.mouseControl
      ),
      autoplay: createModule(false, "Autoplay", icons.autoplay),
    },
  },
  {
    name: "Minimal Slider",
    parameters: {
      slideDirection: createParameter(
        "horizontal",
        "Slide Direction",
        icons.slideDirection,
        DIRECTION_OPTIONS
      ),
      slidesPerView: createParameter(
        1,
        "Slides Per View",
        icons.slidesPerView,
        SLIDES_PER_VIEW_OPTIONS
      ),
      slidesPerGroup: createParameter(
        1,
        "Slides Per Group",
        icons.slidesPerGroup,
        SLIDES_PER_VIEW_OPTIONS
      ),
      spaceBetweenSlides: createParameter(
        5,
        "Space Between Slides",
        icons.spaceBetweenSlides
      ),
      autoHeight: createParameter(true, "Auto Height", icons.autoHeight),
      loopMode: createParameter(false, "Loop Mode", icons.loopMode),
    },
    effects: {
      effect: createParameter("slide", "Effect", Star, EFFECT_OPTIONS),
      transitionDuration: { value: 200, label: "Transition Duration (ms)" },
    },
    modules: {
      grabCusor: createModule(false, "Grab Cursor", icons.grabCursor),
      navigation: createModule(false, "Navigation", icons.navigation),
      pagination: createModule(
        "none",
        "Pagination Type",
        icons.pagination,
        PAGINATION_OPTIONS
      ),
      freeMode: createModule(false, "Free Mode", icons.freeMode),
      keyboardControl: createModule(
        false,
        "Keyboard Control",
        icons.keyboardControl
      ),
      mousewheelControl: createModule(
        false,
        "Mouse Control",
        icons.mouseControl
      ),
      autoplay: createModule(false, "Autoplay", icons.autoplay),
    },
  },
  {
    name: "Dynamic Slider",
    parameters: {
      slideDirection: createParameter(
        "horizontal",
        "Slide Direction",
        icons.slideDirection,
        DIRECTION_OPTIONS
      ),
      slidesPerView: createParameter(
        4,
        "Slides Per View",
        Grid,
        SLIDES_PER_VIEW_OPTIONS
      ),
      slidesPerGroup: createParameter(
        2,
        "Slides Per Group",
        icons.slidesPerGroup,
        SLIDES_PER_VIEW_OPTIONS
      ),
      spaceBetweenSlides: createParameter(
        15,
        "Space Between Slides",
        icons.spaceBetweenSlides
      ),
      autoHeight: createParameter(false, "Auto Height", icons.autoHeight),
      loopMode: createParameter(true, "Loop Mode", icons.loopMode),
    },
    effects: {
      effect: createParameter("cube", "Effect", CubeIcon, EFFECT_OPTIONS),
      transitionDuration: { value: 400, label: "Transition Duration (ms)" },
    },
    modules: {
      grabCusor: createModule(false, "Grab Cursor", icons.grabCursor),
      navigation: createModule(false, "Navigation", icons.navigation),
      pagination: createModule(
        "none",
        "Pagination Type",
        icons.pagination,
        PAGINATION_OPTIONS
      ),
      freeMode: createModule(false, "Free Mode", icons.freeMode),
      keyboardControl: createModule(
        false,
        "Keyboard Control",
        icons.keyboardControl
      ),
      mousewheelControl: createModule(
        false,
        "Mouse Control",
        icons.mouseControl
      ),
      autoplay: createModule(false, "Autoplay", icons.autoplay),
    },
  },
  {
    name: "Interactive Slider",
    parameters: {
      slideDirection: createParameter(
        "horizontal",
        "Slide Direction",
        icons.slideDirection,
        DIRECTION_OPTIONS
      ),
      slidesPerView: createParameter(
        2,
        "Slides Per View",
        Grid,
        SLIDES_PER_VIEW_OPTIONS
      ),
      slidesPerGroup: createParameter(
        1,
        "Slides Per Group",
        icons.slidesPerGroup,
        SLIDES_PER_VIEW_OPTIONS
      ),
      spaceBetweenSlides: createParameter(
        20,
        "Space Between Slides",
        icons.spaceBetweenSlides
      ),
      autoHeight: createParameter(true, "Auto Height", icons.autoHeight),
      loopMode: createParameter(false, "Loop Mode", icons.loopMode),
    },
    effects: {
      effect: createParameter("flip", "Effect", FlipHorizontal, EFFECT_OPTIONS),
      transitionDuration: { value: 350, label: "Transition Duration (ms)" },
    },
    modules: {
      grabCusor: createModule(true, "Grab Cursor", icons.grabCursor),
      navigation: createModule(false, "Navigation", icons.navigation),
      pagination: createModule(
        "none",
        "Pagination Type",
        icons.pagination,
        PAGINATION_OPTIONS
      ),
      freeMode: createModule(false, "Free Mode", icons.freeMode),
      keyboardControl: createModule(
        false,
        "Keyboard Control",
        icons.keyboardControl
      ),
      mousewheelControl: createModule(
        false,
        "Mouse Control",
        icons.mouseControl
      ),
      autoplay: createModule(false, "Autoplay", icons.autoplay),
    },
  },
];
