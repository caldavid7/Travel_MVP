import { motion } from "framer-motion";
import React, { ReactElement, useEffect } from "react";
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
  useEffect(() => {
    if (!location) localStorage.setItem("location", "");
    if (location) localStorage.setItem("location", location);
  }, [location]);
  return (
    <div className="text-center relative z-50 w-full px-2 lg:px-0 lg:w-[45rem]">
      <h1 className="sm:text-xl md:text-3xl text-white font-bold tracking-wide mb-4 ">
        Find the perfect accommodation for you
      </h1>
      <div className=" bg-transparent-black filter backdrop-blur-lg rounded-2xl  space-y-4  p-4">
        <motion.div className="text-white">
          <SearchBar
            text="Next"
            disabled={!location.trim()}
            value={location}
            handleEnter={preferencesHandler}
            setInputField={setLocation}
            placeHolder="Type in the city or country you want to go"
            handleClick={preferencesHandler}
          ></SearchBar>
        </motion.div>
        {/* 
        <PreferenceBox
          List={Countries}
          initialNoOfBubbles={22}
          type="Country"
          placeHolder={"Select Country"}
        ></PreferenceBox> */}
      </div>
    </div>
  );
  function preferencesHandler() {
    if (location.trim()) {
      router.push("/preference");
    }
  }
}
