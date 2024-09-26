"use client";
import React, { useState } from "react";
import CONFIG_DATA from "../../public/config.json";

type SuggestModalProps = {
  handleClose: () => void;
  isOpen: boolean;
};

const SuggestModal = ({ handleClose, isOpen }: SuggestModalProps) => {
  const { constants } = CONFIG_DATA;
  const [configData, setConfigData] = useState({ key: "", value: "" });
  const [adminOptions, setAdminOptions] = useState("");
  const mappedConstants: { [key: string]: number } = constants;

  const splitConstants = (arg: string) => arg.split("_").join(" ");

  const resetAndCloseForm = () => {
    handleClose();
  };

  const handleSaveConfig = async () => {
    try {
      const response = await fetch("/api/save-config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [configData.key]: Number(configData.value) }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("updated config result");
        handleClose();
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Failed to save config:", error);
    }
  };

  return (
    <div className={`flex z-10 items-center justify-center h-screen top-0 bottom-0 right-0 left-0 ${isOpen ? "fixed" : "hidden"}`}>
      <div
        onClick={resetAndCloseForm}
        className={`z-10 max-h-screen fixed bg-[#0000007f] top-0 bottom-0 right-0 left-0 ${isOpen ? "flex" : "hidden"}`}
      ></div>
      {isOpen ? (
        <div className='max-w-[500px] z-50 max-h-[80vh] overflow-y-auto rounded-[20px] w-full bg-white p-6 shadow-md max-md:max-w-[400px] flex flex-col gap-10 border border-gray-custom-600 max-md:p-4 max-md:gap-6 max-md:mx-3'>
          <section className='flex flex-col gap-5'>
            <p className='text-3xl font-medium max-md:text-xl text-center'>Change App Configs</p>
          </section>

          <div className='flex flex-col gap-3 rounded-lg w-full max-w-2xl text-black dark:text-white'>
            <select
              name='team'
              id='team'
              className=' text-black p-3 rounded-lg lowercase border border-gray-500'
              onChange={(e) => {
                setConfigData({ ...configData, key: e.target.value });
                setAdminOptions(e.target.value);
              }}
            >
              <option value='' className='uppercase placeholder:text-gray-200 text-red-600'>
                change config
              </option>
              {Object.keys(constants).map((constant, index) => (
                <option key={constant} defaultValue={constant} value={constant} className='lowercase'>
                  {splitConstants(constant)}
                </option>
              ))}
            </select>

            <input
              className='p-3 rounded-lg text-black border border-gray-500 w-full'
              placeholder={mappedConstants[adminOptions] === undefined ? "Value" : String(mappedConstants[adminOptions])}
              value={configData.value}
              onChange={(e) => setConfigData({ ...configData, value: e.target.value })}
            />

            <button onClick={handleSaveConfig} className='text-white bg-brand-purple rounded-lg px-4 py-3 text-sm'>
              Update
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestModal;
