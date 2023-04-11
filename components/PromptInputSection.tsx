import React, { ReactElement, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PreferenceBox, { Preference } from "./PreferenceBox";
import { usePreference } from "@/context/PreferenceContext";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {}
const bubbleSelectionVariants = {
  hidden: {
    opacity: 0,
    y: "-100%",
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function BubbleSection({}: Props): ReactElement {
  const router = useRouter();
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
  } = usePreference();

  const [prompt, setPrompt] = useState<string>("");

  const [location, setLocation] = useState<string>("");

  const { preferences, setPreferences } = usePreference();
  useEffect(() => {}, []);

  // TODO this popup is open  in the begging for getting use preferences
  return (
    <motion.div className="bg-transparent grid place-items-center overflow-hidden">
      <div>
        <motion.div
          className="text-white space-y-4 bg-gray-400/30 p-4 rounded-lg w-screen md:w-auto"
          transition={{ duration: 1 }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={bubbleSelectionVariants}
        >
          <h1 className="text-4xl font-bold tracking-wide">
            Explore the world with ease
          </h1>

          <div className=" space-y-4 text-black overflow-hidden w-full md:max-w-4xl">
            <input
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
              className="inputSection"
              type="text"
              placeholder="Find the perfect hotel"
            />

            <input
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              className="inputSection"
              type="text"
              placeholder="Select a location"
            />
          </div>
          <motion.button
            onClick={preferencesHandler}
            whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
            className="w-full bg-gradient-to-t text-center rounded-md p-2 from-primary-red to-secondary-red"
          >
            Search
          </motion.button>
        </motion.div>
        {!shouldTheSelectionBoxBeDisplayed && preferences.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="justify-self-start">
              <button
                onClick={() => setShouldTheSelectionBoxBeDisplayed(true)}
                className="bg-transparent text-primary-red"
              >
                Change Preferences
              </button>
            </div>
            <div className="flex justify-self-end text-white gap-2">
              <input
                type="checkbox"
                className="checked:bg-primary-red text-blue-500"
                checked={isUsingPreviousPreferences}
                onChange={() => {
                  setIsUsingPreviousPreferences((prev) => !prev);
                }}
                id="isUsingPreviousPreferences"
              />
              <label htmlFor="isUsingPreviousPreferences" className="text-sm">
                Use the previous preferences
              </label>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {shouldTheSelectionBoxBeDisplayed && (
          <PreferenceBox
            setShouldBeShow={setShouldTheSelectionBoxBeDisplayed}
          ></PreferenceBox>
        )}
      </AnimatePresence>
    </motion.div>
  );
  async function preferencesHandler() {
    if (!location.trim() || !prompt.trim()) {
      // location or prompt is empty, handle error
      toast.error("Please make sure that location and Search are not empty", {
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
        const res = await axios.post("/api/openai", {
          prompt,
          location,
          preferences,
        });
        router.push(
          "/answer?result=" +
            encodeURIComponent(JSON.stringify(res.data.response))
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
      }
    } else {
      setPreferences([]);
      setShouldTheSelectionBoxBeDisplayed(true);
    }
  }
}
