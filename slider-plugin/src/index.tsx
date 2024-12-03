import React, { useReducer, useState } from "react";
import ReactDOM from "react-dom/client";
import { sliderTemplateList } from "./constants/SliderTemplateList";
import { Filter, Loader2, Settings, SlidersHorizontal } from "lucide-react";
import PreviewScreen from "./components/PreviewScreen";
import {
  getToken,
  insertCustomConfigSliderComponent,
} from "./lib/slider-utils";
import {
  EffectsConfig,
  initialSliderConfig,
  ModuleConfig,
  ParametersConfig,
  SliderTypesConfig,
} from "./types/sliderTypes";
import CustomizationSidebar from "./components/CustomizationSidebar";
// import { useAuth } from "./lib/useAuth";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { authReducer, initialAuthState } from "./reducers/authRecucers";

export const getOrCreateStyle = async (styleName: string) => {
  let style = await webflow.getStyleByName(styleName);
  if (!style) {
    style = await webflow.createStyle(styleName);
  }
  return style;
};
const App: React.FC = () => {
  const queryClient = useQueryClient();
  const [isCustomizeModeOn, setIsCustomizeModeOn] = useState<boolean>(false);
  const [sliderConfig, setSliderConfig] =
    useState<SliderTypesConfig>(initialSliderConfig);

  const { status, data, error } = useQuery({
    queryKey: ["jwt"],
    queryFn: getToken,
  });

  function resetAuth() {
    localStorage.removeItem("webflow-jwt");
    queryClient.invalidateQueries["jwt"];
  }
  if (status === "pending") {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="text-white animate-spin" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="w-full h-full flex items-center justify-center text-red-500">
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (status === "success") {
    localStorage.setItem("webflow-jwt", data.token);
    // dispatch({ type: "SET_TOKEN", payload: data.token });
  }

  function resetconfig() {
    setIsCustomizeModeOn(false);
    setSliderConfig(initialSliderConfig);
  }
  // new code starts

  const updateModuleValue = <K extends keyof Omit<ModuleConfig, "autoplay">>(
    key: K,
    value: ModuleConfig[K]["value"]
  ) => {
    setSliderConfig((prev) => ({
      ...prev,
      modules: {
        ...prev.modules,
        [key]: { ...prev.modules[key], value },
      },
    }));
  };

  const updateParameterValue = <K extends keyof ParametersConfig>(
    key: K,
    value: ParametersConfig[K]["value"]
  ) => {
    console.log(value, "key");
    setSliderConfig((prev) => ({
      ...prev,
      parameters: {
        ...prev.parameters,
        [key]: { ...prev.parameters[key], value },
      },
    }));
  };

  const updateEffectValue = <K extends keyof EffectsConfig>(
    key: K,
    value: EffectsConfig[K]["value"]
  ) => {
    setSliderConfig((prev) => ({
      ...prev,
      effects: {
        ...prev.effects,
        [key]: { ...prev.effects[key], value },
      },
    }));
  };

  console.log({ TestingConfig: sliderConfig });
  // new code ends

  if (isCustomizeModeOn) {
    return (
      <div className="flex h-screen bg-[#1a1a1a]">
        <CustomizationSidebar
          parametersConfig={sliderConfig.parameters}
          effectsConfig={sliderConfig.effects}
          moduleConfig={sliderConfig.modules}
          updateParameterValue={updateParameterValue}
          updateEffectValue={updateEffectValue}
          onModuleUpdate={updateModuleValue}
          config={sliderConfig}
          resetconfig={resetconfig}
          resetAuth={resetAuth}
        />

        <div className="flex justify-center items-center p-8">
          <PreviewScreen config={sliderConfig} />
        </div>
      </div>
    );
  }
  const handleCustomize = (item: SliderTypesConfig) => {
    setSliderConfig(item);
    setIsCustomizeModeOn(true);
  };
  return (
    <div className="min-h-screen bg-[#1E1F1F]">
      <main className="max-w-7xl mx-auto">
        <section className="mb-5">
          <div className="bg-[#262727] px-4 py-5">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  Customize Your Swiper
                </h2>
                <p className="text-neutral-400 text-sm">
                  Start from scratch and design your unique swiper.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCustomizeModeOn(true);
                }}
                className="bg-[#0A5BD4] text-white px-4 py-2 max-h-min rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 text-sm"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="font-normal">Start Customizing</span>
              </button>
            </div>
          </div>
        </section>

        <section className="px-4">
          <h2 className="text-2xl font-bold mb-5 text-[#7E8181]">
            Choose a Preset
          </h2>
          <div className="flex flex-col gap-6">
            {sliderTemplateList.map((preset, index) => (
              <div key={index} className="group">
                <div className="bg-[#212222] rounded-xl border border-neutral-800 p-4 hover:border-neutral-700 transition-all duration-200">
                  <div className="flex justify-between items-start gap-2 border-b-2 border-[#303030] pb-4">
                    <h3 className="text-lg font-semibold text-white ">
                      {preset.name}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() =>
                          insertCustomConfigSliderComponent({
                            config: preset,
                            resetAuth: resetAuth,
                          })
                        }
                        className=" bg-[#0A5BD4] text-white px-2 text-xs py-1 rounded-md hover:bg-blue-700 transition-colors duration-200"
                      >
                        Import
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCustomize(preset)}
                        className="border-2 border-[#414343] text-xs text-neutral-300 px-2 py-1 rounded-md hover:border-neutral-600 hover:text-white transition-colors duration-200"
                      >
                        Customize
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <PreviewScreen config={preset} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

const initializeExtension = async (): Promise<void> => {
  try {
    await webflow.setExtensionSize("large");
  } catch (error) {
    console.error("Failed to initialize extension:", error);
  }
};

await initializeExtension();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
