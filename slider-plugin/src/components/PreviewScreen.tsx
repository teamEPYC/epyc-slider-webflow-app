import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  Keyboard,
  Mousewheel,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { SliderTypesConfig } from "../types/sliderTypes";

interface PreviewProps {
  config: SliderTypesConfig;
}

function PreviewScreen({ config }: PreviewProps) {
  const swiperKey = `swiper-${config.modules.pagination.value}-${config.modules.autoplay.value}`;

  const getPaginationConfig = () => {
    switch (config.modules.pagination.value) {
      case "bullet":
        const abc = config.parameters.slideDirection.value;
        return {
          clickable: true,
          el: ".swiper-pagination",
        };
      case "fraction":
        return {
          type: "fraction" as const,
          el: ".swiper-fraction",
        };
      case "progressbar":
        return {
          type: "progressbar" as const,
          el: ".swiper-progress-pagination",
        };
      default:
        return false;
    }
  };

  return (
    <div className="h-[400px]  flex items-center justify-center p-8 overflow-hidden rounded-lg">
      <div className="epyc-slider-attributes relative h-full w-[360px] overflow-hidden bg-white rounded-lg shadow-lg">
        <Swiper
          key={swiperKey}
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            Autoplay,
            Keyboard,
            Mousewheel,
          ]}
          {...(config.modules.autoplay.value
            ? {
                autoplay: {
                  delay: 2500,
                },
              }
            : {})}
          loop={config.parameters.loopMode.value}
          direction={config.parameters.slideDirection.value}
          slidesPerView={config.parameters.slidesPerView.value}
          spaceBetween={config.parameters.spaceBetweenSlides.value}
          keyboard={{ enabled: config.modules.keyboardControl.value }}
          mousewheel={{ enabled: config.modules.mousewheelControl.value }}
          navigation={
            config.modules.navigation.value
              ? {
                  nextEl: ".swiper-next",
                  prevEl: ".swiper-prev",
                }
              : false
          }
          pagination={getPaginationConfig()}
          effect={config.effects.effect.value}
          slidesPerGroup={config.parameters.slidesPerGroup.value}
          grabCursor={config.modules.grabCusor.value}
          freeMode={true}
          className="h-full "
        >
          <div className="flex h-full w-full items-center justify-center">
            {[1, 2, 3, 4, 5, 6].map((slideNum) => (
              <SwiperSlide
                className="h-[400px] w-full bg-gray-200 flex items-center justify-center"
                key={slideNum}
              >
                <span className="font-bold text-xs">Slide {slideNum}</span>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>

        {/* Navigation */}
        {config.modules.navigation.value && (
          <div className="absolute bottom-0 flex justify-between z-10 w-full px-4 py-2">
            <button className="swiper-prev bg-white rounded-full p-2 shadow-lg hover:bg-neutral-50 pointer-events-auto transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="swiper-next bg-white rounded-full p-2 shadow-lg hover:bg-neutral-50 pointer-events-auto transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
        {/* pagination */}

        {config.modules.pagination.value === "bullet" && (
          <div className="swiper-pagination absolute  w-full px-4 mt-4 pointer-events-auto"></div>
        )}

        {config.modules.pagination.value === "fraction" && (
          <span className="swiper-fraction z-10 flex justify-center mx-auto font-semibold text-xs absolute text-black px-3 py-1"></span>
        )}

        {config.modules.pagination.value === "progressbar" && (
          <div className="swiper-progress-pagination absolute w-full bottom-0 z-10"></div>
        )}
      </div>
    </div>
  );
}

export default PreviewScreen;
