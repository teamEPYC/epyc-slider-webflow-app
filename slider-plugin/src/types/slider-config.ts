import {
  Code2,
  Timer,
  Keyboard,
  Mouse,
  RefreshCcw,
  MoreHorizontal,
  TimerIcon,
  Group,
  GroupIcon,
} from "lucide-react";

export type SliderConfig = {
  name: string;
  parameters: {
    slideDirection: {
      value: "horizontal" | "vertical";
      label: string;
      icon: typeof Code2;
      options: Array<"horizontal" | "vertical">;
    };
    slidesPerView: {
      value: number | "auto";
      label: string;
      icon: typeof Code2;
      options: Array<string | number>;
    };
    paginationType: {
      value: "None" | "Bullet" | "Progressbar" | "Fraction";
      label: string;
      icon: typeof MoreHorizontal;
      options: Array<"None" | "Bullet" | "Progressbar" | "Fraction">;
    };
    spaceBetweenSlides: {
      value: number;
      label: string;
      icon: typeof Code2;
      min: number;
      max: number;
      step: number;
    };
    transitionSpeed: {
      value: number;
      lable: string;
      icon: typeof TimerIcon;
      min: number;
      max: number;
      step: number;
    };
    slidesPerGroup: {
      value: number;
      label: string;
      icon: typeof Group;
      options: Array<string | number>;
    };
  };
  modules: {
    [key: string]: {
      enabled: boolean;
      label: string;
      icon: typeof Code2;
    };
  };
};

export const defaultSliderConfig: SliderConfig = {
  name: "",
  parameters: {
    slidesPerGroup: {
      value: 1,
      label: "Slides per group",
      icon: GroupIcon,
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    slideDirection: {
      value: "horizontal",
      label: "Slide direction",
      icon: Code2,
      options: ["horizontal", "vertical"],
    },
    paginationType: {
      value: "None",
      icon: MoreHorizontal,
      label: " Pagination Type",
      options: ["None", "Bullet", "Progressbar", "Fraction"],
    },
    transitionSpeed: {
      icon: TimerIcon,
      value: 300,
      max: 1000,
      min: 50,
      lable: "Slider Transition",
      step: 1,
    },

    slidesPerView: {
      value: "auto",
      label: "Slides per view",
      icon: Code2,
      options: ["auto", "1", "2", "3", "4", "5"],
    },
    spaceBetweenSlides: {
      value: 0,
      label: "Space between slides",
      icon: Code2,
      min: 0,
      max: 100,
      step: 1,
    },
  },
  modules: {
    navigation: {
      enabled: false,
      label: "Navigation",
      icon: Code2,
    },
    autoplay: {
      enabled: true,
      label: "Autoplay",
      icon: Timer,
    },
    keyboardControl: {
      enabled: false,
      label: "Keyboard control",
      icon: Keyboard,
    },
    mousewheelControl: {
      enabled: false,
      label: "Mousewheel control",
      icon: Mouse,
    },
    infiniteLoop: {
      enabled: false,
      label: "Infinite loop",
      icon: RefreshCcw,
    },
  },
};
