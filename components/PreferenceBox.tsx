import { usePreference } from "@/context/PreferenceContext";
import { AnimatePresence, motion } from "framer-motion";
import React, { ReactElement, useState } from "react";
import Categories from "../data/category.json";
import Bubbles from "./Bubbles";

export interface Preference {
  category: string;
  type: string;
}

interface Props {
  setShouldBeShow: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function PreferenceBox({
  setShouldBeShow,
}: Props): ReactElement {
  const { preferences, setPreferences, setIsUsingPreviousPreferences } =
    usePreference();
  return (
    <motion.div
      initial={{
        opacity: 0,
        height: 0,
      }}
      exit={{
        height: 0,
        opacity: 0,
        transition: { duration: 1 },
      }}
      animate={{ opacity: 1, height: "auto", transition: { duration: 1 } }}
      className=" w-screen md:max-w-xl grid gap-4 mt-4 max-h-96 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400"
    >
      <h1 className="my-4 text-center text-white font-bold text-2xl ">
        Select your preference
      </h1>
      <div className="flex gap-4 flex-wrap pl-4">
        {Categories.map((preference, index) => {
          return <Bubbles key={index} preference={preference}></Bubbles>;
        })}
      </div>
      <div className="flex items-center justify-between gap-8 px-4">
        <button
          onClick={() => {
            setShouldBeShow(false);
            if (preferences.length > 0) setIsUsingPreviousPreferences(true);
            localStorage.setItem("preferences", JSON.stringify(preferences));
          }}
          className="bg-green-500 hover:bg-green-600 rounded-full justify-self-center px-4 py-2 "
        >
          Close
        </button>
        <button
          onClick={() => setPreferences([])}
          className="bg-white/50 text-black hover:bg-white/30 rounded-full justify-self-center px-4 py-2 "
        >
          Reset
        </button>
      </div>
    </motion.div>
  );
}
