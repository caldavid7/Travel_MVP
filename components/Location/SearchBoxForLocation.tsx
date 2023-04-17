import { motion } from "framer-motion";
import React, { ReactElement } from "react";
import PreferenceBox from "../PreferenceBox";
import SearchBar from "../SearchBar";
import Countries from "../../data/counties.json";
import { useAppState } from "@/context/PreferenceContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Logo from "../Logo";

interface Props {}

export default function SearchBoxForLocation({}: Props): ReactElement {
  const router = useRouter();
  const { location, setLocation } = useAppState();
  return (
    <div className="text-center relative z-50">
      <h1 className="text-3xl text-white font-bold tracking-wide mb-4 ">
        Find the perfect accommodation for you
      </h1>
      <div className=" bg-transparent-black filter backdrop-blur-lg rounded-2xl  space-y-4   p-4 w-[45rem]">
        <motion.div className="text-white">
          <SearchBar
            text="Next"
            disabled={!location.trim()}
            value={location}
            setInputField={setLocation}
            handleClick={preferencesHandler}
          ></SearchBar>
        </motion.div>

        <PreferenceBox
          List={Countries}
          initialNoOfBubbles={22}
          type="Country"
        ></PreferenceBox>
      </div>
    </div>
  );
  function preferencesHandler() {
    if (location.trim()) {
      router.push("/preference");
    }
  }
}
