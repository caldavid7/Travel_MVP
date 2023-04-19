import React, { ReactElement, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TypesOfHotels from "../../data/category.json";
import PreferenceBox, { Preference } from "../PreferenceBox";
import { useAppState } from "@/context/PreferenceContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "../SearchBar";
import BubbleInSearchBar from "./BubbleInSearchBar";
import { getOpenAIResponse } from "@/utils/getOpenaiResponse";

interface Props {}

export default function BubbleSection({}: Props): ReactElement {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();
  const inputSectionRef = useRef<HTMLDivElement>(null);
  //! State for preference box
  const [
    shouldTheSelectionBoxBeDisplayed,
    setShouldTheSelectionBoxBeDisplayed,
  ] = useState(false);

  //! State to check if the user is using the previous preferences
  const {
    isUsingPreviousPreferences,
    setIsUsingPreviousPreferences,
    setIsLoading,
    preferences,
    setPreferences,
  } = useAppState();

  //! Add the click listener to close the box when clicking outside the box
  useEffect(() => {
    document.addEventListener("click", handler);
    function handler(e: MouseEvent) {
      if (!inputSectionRef.current?.contains(e.target as Element)) {
        setShouldTheSelectionBoxBeDisplayed(false);
      }
    }
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  //! Set preferences to the localstorage
  useEffect(() => {
    if (preferences.length > 0) {
      localStorage.setItem("preferences", JSON.stringify(preferences));
    }

    if (preferences.length < 1) {
      localStorage.setItem("preferences", "[]");
      setIsUsingPreviousPreferences(false);
    }
  }, [
    preferences,
    setIsUsingPreviousPreferences,
    shouldTheSelectionBoxBeDisplayed,
  ]);

  //! Set prompt to localStorage
  useEffect(() => {
    if (prompt) localStorage.setItem("prompt", prompt);
    if (!prompt) localStorage.setItem("prompt", "");
  }, [prompt]);

  //! Set the state from the localStorage
  useEffect(() => {
    if (
      isUsingPreviousPreferences &&
      JSON.parse(localStorage.getItem("preferences") || "[]").length > 0
    ) {
      setPreferences(JSON.parse(localStorage.getItem("preferences") || "[]"));
    }
  }, [isUsingPreviousPreferences, setPreferences]);

  return (
    <motion.div
      ref={inputSectionRef}
      className="bg-transparent grid place-items-center overflow-hidden "
    >
      <div className=" bg-transparent-black filter backdrop-blur-lg rounded-2xl  space-y-4   p-4 w-[45rem]">
        <motion.div className="text-white bg-white rounded-md">
          <SearchBar
            text="Generate"
            disabled={preferences.length < 1}
            value={prompt}
            setInputField={setPrompt}
            placeHolder="Enter preferences"
            bubble={localStorage.getItem("location") ?? undefined}
            handleClick={preferencesHandler}
          ></SearchBar>

          {preferences.length > 0 && (
            <AnimatePresence initial={false}>
              <motion.div className="flex gap-2 py-1 px-2 overflow-hidden overflow-x-auto scrollbar-track-transparent ">
                {preferences.map((preference, index) => {
                  return (
                    <BubbleInSearchBar
                      key={index}
                      preference={preference}
                    ></BubbleInSearchBar>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>

        <div className="flex items-center justify-between">
          <PreferenceBox
            List={TypesOfHotels}
            initialNoOfBubbles={11}
            type="Preference"
            placeHolder="Select preferences"
          ></PreferenceBox>
          <div>i</div>
        </div>
      </div>
    </motion.div>
  );

  async function preferencesHandler() {
    if (!localStorage.getItem("location")) {
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (isUsingPreviousPreferences) {
      // TODO search
      setIsLoading(true);
      try {
        const response = await getOpenAIResponse({
          preferences,
          prompt,
          location: localStorage.getItem("location")!,
        });
        router.push(
          "/answer?result=" +
            encodeURIComponent(JSON.stringify(response?.response))
        );
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } finally {
        setIsLoading(false);
        localStorage.setItem("preferences", JSON.stringify(preferences));
      }
    } else {
      setPreferences([]);
      setShouldTheSelectionBoxBeDisplayed(true);
      if (preferences.length < 1)
        toast.error("Make sure preferences are selected for better result", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
    }
  }
}
