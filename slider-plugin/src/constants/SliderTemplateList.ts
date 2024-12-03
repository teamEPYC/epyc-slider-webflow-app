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
} from "../types/sliderTypes";

// Helper functions for reusable configurations
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
