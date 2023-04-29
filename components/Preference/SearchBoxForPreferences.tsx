import React, { ReactElement, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TypesOfHotels from "../../data/category.json";
import PreferenceBox from "../PreferenceBox";
import { useAppState } from "@/context/PreferenceContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "../SearchBar";
import BubbleInSearchBar from "./BubbleInSearchBar";
import { getOpenAIResponse } from "@/utils/getOpenaiResponse";
import Loading from "../Loading";

interface Props {}

export default function BubbleSection({}: Props): ReactElement {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();
  const inputSectionRef = useRef<HTMLDivElement>(null);

  //! State to check if the user is using the previous preferences
  const {
    isUsingPreviousPreferences,
    setIsUsingPreviousPreferences,
    setIsLoading,
    isLoading,
    preferences,
    setPreferences,
  } = useAppState();

  // ! Set the loading state to false during initial enter
  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  //! Set preferences to the localstorage
  useEffect(() => {
    if (preferences.length > 0) {
      localStorage.setItem("preferences", JSON.stringify(preferences));
    }

    if (preferences.length < 1 && isUsingPreviousPreferences) {
      localStorage.setItem("preferences", "[]");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferences, setIsUsingPreviousPreferences]);

  useEffect(() => {
    if (!isUsingPreviousPreferences) setPreferences([]);
  }, [isUsingPreviousPreferences, setPreferences]);

  //! Set prompt to localStorage
  useEffect(() => {
    if (prompt) localStorage.setItem("prompt", prompt);
    if (!prompt) localStorage.setItem("prompt", "");
  }, [prompt]);

  return (
    <motion.div
      ref={inputSectionRef}
      className="w-full lg:max-w-[45rem] lg:min-w-[45rem] md:max-w-[40rem] md:min-w-[40rem] overflow-hidden px-2 lg:p-0"
    >
      <div
        className={` bg-transparent-black filter backdrop-blur-lg rounded-2xl  space-y-4 p-3 md:p-4`}
      >
        {!isLoading && (
          <>
            <div className="text-white text-center md:text-xl font-semibold tracking-widest text-bold w-full">
              Find your perfect accommodation in{" "}
              {localStorage.getItem("location")}
            </div>

            <motion.div className="text-white bg-white rounded-md overflow-hidden">
              <SearchBar
                text="Generate"
                disabled={preferences.length < 1 && isLoading}
                value={prompt}
                handleEnter={handlerEnter}
                setInputField={setPrompt}
                placeHolder="Type or select your preferences"
                handleClick={preferencesHandler}
              ></SearchBar>

              {preferences.length > 0 && (
                <AnimatePresence initial={false}>
                  <motion.div
                    className={`rounded-lg flex flex-nowrap gap-2 py-1 px-2 overflow-hidden max-w-full overflow-x-auto scrollbar-thumb-black scrollbar-rounded scrollbar-track-transparent`}
                  >
                    {preferences.map((preference, index) => {
                      return (
                        <BubbleInSearchBar
                          key={preference.type}
                          preference={preference}
                        ></BubbleInSearchBar>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>

            <PreferenceBox
              List={TypesOfHotels}
              initialNoOfBubbles={11}
              type="Preference"
              placeHolder="Select preferences"
            ></PreferenceBox>
          </>
        )}
        {isLoading && <Loading></Loading>}
      </div>
    </motion.div>
  );

  function handlerEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    const preference = (e.target as HTMLInputElement).value;
    if (preferences.length > 10) {
      toast.warn("Cannot select more than 10 preferences", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (preference) {
      setPreferences((prev) => {
        const newPreferenceArray = [
          { category: preference, type: preference },
          ...prev,
        ];
        return newPreferenceArray;
      });
      setPrompt("");
    }
  }

  async function preferencesHandler() {
    if (!localStorage.getItem("location")) {
      toast.error("Please make sure location is selected", {
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

    if (preferences.length > 0) {
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
        localStorage.setItem("preferences", JSON.stringify(preferences));
      }
    } else {
      setPreferences([]);
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
