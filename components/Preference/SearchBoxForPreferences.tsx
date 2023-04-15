import { Configuration, OpenAIApi } from "openai";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Countries from "../../data/counties.json";
import TypesOfHotels from "../../data/category.json";
import PreferenceBox, { Preference } from "../PreferenceBox";
import { useAppState } from "@/context/PreferenceContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "../SearchBar";
import BubbleInSearchBar from "./BubbleInSearchBar";

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
    location,
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

  //! Set to the localstorage
  useEffect(() => {
    if (preferences.length > 0) {
      setIsUsingPreviousPreferences(true);
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
            disabled={false}
            value={prompt}
            setInputField={setPrompt}
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

        <PreferenceBox
          List={TypesOfHotels}
          initialNoOfBubbles={11}
          type="Preference"
        ></PreferenceBox>
      </div>
    </motion.div>
  );

  async function preferencesHandler() {
    if (isUsingPreviousPreferences) {
      // TODO search
      setIsLoading(true);
      try {
        const response = await getOpenAIResponse();
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

  async function getOpenAIResponse() {
    const configuration = new Configuration({
      organization: "org-7Gd4Qa9tLzqLrAZ7AVZvhy2H",
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    let processedPreference: string = "";
    preferences.map((preference) => {
      processedPreference = processedPreference
        ? processedPreference + `${preference.category} : ${preference.type} \n`
        : `\n${preference.category} : ${preference.type} \n`;
    });

    const actualPrompt = `What the best hotels in ${location} with the following feature ${processedPreference} With a little description of each one.`;

    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a expert about hotels in the world who only gives correct and genuine answer in a human like tone",
          },
          {
            role: "user",
            content: actualPrompt,
          },
        ],
      });
      // Return a response indicating success
      return {
        response: {
          question: "What are the best hotels" + " in " + location,
          answer:
            response.data.choices[0].message?.content ||
            "There was an error please try again",
        },
      };
    } catch (error) {
      //! Throw the error
      throw error;
    }
  }
}
