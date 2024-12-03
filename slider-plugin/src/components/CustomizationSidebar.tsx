import { ArrowLeft } from "lucide-react";
import React from "react";
import {
  insertCustomConfigSliderComponent,
  storeConfig,
} from "../lib/slider-utils";
import {
  EffectsConfig,
  ModuleConfig,
  ParametersConfig,
  SliderTypesConfig,
} from "src/types/sliderTypes";
import { useMutation } from "@tanstack/react-query";

type Props = {
  parametersConfig: ParametersConfig;
  effectsConfig: EffectsConfig;
  moduleConfig: ModuleConfig;
  updateParameterValue: Function;
  updateEffectValue: Function;
  onModuleUpdate: Function;
  config: SliderTypesConfig;
  resetconfig: Function;
  resetAuth: Function;
};

function CustomizationSidebar({
  parametersConfig,
  effectsConfig,
  moduleConfig,
  updateParameterValue,
  updateEffectValue,
  onModuleUpdate,
  config,
  resetconfig,
  resetAuth,
}: Props) {
  console.log(effectsConfig);

  const { mutate: sendConfig } = useMutation({
    mutationFn: () => storeConfig(config),
  });
  return (
    <div className="bg-[#292929] border-r border-neutral-800 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-sm font-semibold text-neutral-400 mb-4">
            PARAMETERS
          </h2>

          <div className="space-y-6">
            {Object.entries(parametersConfig).map(([key, option]) => {
              const paramKey = key as keyof ParametersConfig;
              const Icon = option.icon;
              if (option.options) {
                return (
                  <div
                    key={key}
                    className="flex w-full flex-col justify-between"
                  >
                    <div className="flex items-center gap-3 ">
                      <Icon className="w-4 h-4 text-white" />
                      <span className="text-sm text-neutral-200">
                        {option.label}
                      </span>
                    </div>
                    <select
                      value={option.value}
                      onChange={(e) => {
                        updateParameterValue(
                          paramKey,
                          e.target.value.toString()
                        );
                      }}
                      className="mt-2 h-8 bg-[#2a2a2a] border border-neutral-700 rounded-md px-2 text-sm text-neutral-200"
                    >
                      {option.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }
              if (typeof option.value === "boolean") {
                console.log(!option.value);
                return (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-white" />
                      <span className="text-sm text-neutral-200">
                        {option.label}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        updateParameterValue(paramKey, !option.value);
                      }}
                      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border border-neutral-700 transition-colors duration-200 ease-in-out ${
                        option.value ? "bg-green-600" : "bg-neutral-700"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
                          option.value ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                );
              }
              if (typeof option.value === "number") {
                return (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-white" />
                      <span className="text-sm text-neutral-200">
                        {option.label}
                      </span>
                    </div>
                    <div className="flex w-full items-center gap-4">
                      <input
                        className="mt-2 h-8 w-full bg-[#2a2a2a] border border-neutral-700 rounded-md px-2 text-sm text-neutral-200"
                        onChange={(e) =>
                          updateParameterValue(
                            paramKey,
                            parseFloat(e.target.value)
                          )
                        }
                        type="number"
                        value={option.value}
                      ></input>
                      <p className="text-sm ml-1 text-neutral-400">px</p>
                    </div>
                  </div>
                );
              }
            })}
            <h2 className="text-sm font-semibold text-neutral-400 mt-8 mb-4">
              MODULES
            </h2>

            <div className="space-y-4">
              {(
                Object.entries(moduleConfig) as [
                  keyof ModuleConfig,
                  ModuleConfig[keyof ModuleConfig]
                ][]
              ).map(([key, option]) => {
                const Icon = option.icon;
                if (key === "pagination") {
                  return (
                    <div className="flex w-full flex-col justify-between">
                      <div className="flex items-center gap-3 ">
                        <Icon className="w-4 h-4 text-white" />
                        <span className="text-sm text-neutral-200">
                          {option.label}
                        </span>
                      </div>
                      <select
                        value={option.value.toString()}
                        onChange={(e) =>
                          onModuleUpdate(key, e.target.value.toString())
                        }
                        className="mt-2 h-8 bg-[#2a2a2a] border border-neutral-700 rounded-md px-2 text-sm text-neutral-200"
                      >
                        {option.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                }

                return (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-white" />
                      <span className="text-sm text-neutral-200">
                        {option.label}
                      </span>
                    </div>
                    <button
                      onClick={() => onModuleUpdate(key, !option.value)}
                      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border border-neutral-700 transition-colors duration-200 ease-in-out ${
                        option.value ? "bg-green-600" : "bg-neutral-700"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
                          option.value ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
            <h2 className="text-sm font-semibold text-neutral-400 mt-8 mb-4">
              EFFECT
            </h2>
            <div className="space-y-4">
              {Object.entries(effectsConfig).map(([key, option]) => {
                const paramKey = key as keyof EffectsConfig;
                if (paramKey === "effect") {
                  const Icon = option.icon;
                  return (
                    <div
                      key={key}
                      className="flex w-full flex-col justify-between"
                    >
                      <div className="flex items-center gap-3 ">
                        <Icon className="w-4 h-4 text-white" />
                        <span className="text-sm text-neutral-200">
                          {option.label}
                        </span>
                      </div>
                      <select
                        value={option.value}
                        onChange={(e) => {
                          updateEffectValue(
                            paramKey,
                            e.target.value.toString()
                          );
                        }}
                        className="mt-2 h-8 bg-[#2a2a2a] border border-neutral-700 rounded-md px-2 text-sm text-neutral-200"
                      >
                        {option.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-800 p-4 flex items-center justify-between bg-[#232323]">
        <button
          type="button"
          onClick={() => {
            resetconfig();
          }}
          className="flex items-center px-4 py-2 text-sm text-neutral-200 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          back
        </button>
        <button
          type="button"
          onClick={() => {
            sendConfig();
            insertCustomConfigSliderComponent({
              config: config,
              resetAuth: resetAuth,
            });
          }}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
        >
          Insert
        </button>
      </div>
    </div>
  );
}

export default CustomizationSidebar;
