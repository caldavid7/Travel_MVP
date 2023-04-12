import React, {
  ReactElement,
  useEffect,
  useRef,
  useState,
  MutableRefObject,
} from "react";
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
  } = usePreference();

  const [location, setLocation] = useState<string>("");
  const timeOutRef: MutableRefObject<NodeJS.Timeout | undefined> = useRef();

  const { preferences, setPreferences } = usePreference();
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
    console.log(preferences);
    if (preferences.length < 1) {
      setIsUsingPreviousPreferences(false);
    }
  }, [
    preferences,
    setIsUsingPreviousPreferences,
    shouldTheSelectionBoxBeDisplayed,
  ]);

  //! Handle the opening and closing of the preferences box
  useEffect(() => {
    if (!location) {
      timeOutRef.current = setTimeout(() => {
        setShouldTheSelectionBoxBeDisplayed(false);
      }, 1000);
    }
    if (location)
      timeOutRef.current = setTimeout(() => {
        setShouldTheSelectionBoxBeDisplayed(true);
      }, 500);
    return () => {
      clearTimeout(timeOutRef.current);
    };
  }, [location]);

  // TODO this popup is open  in the begging for getting use preferences
  return (
    <motion.div
      ref={inputSectionRef}
      className="bg-transparent grid place-items-center overflow-hidden"
    >
      <div>
        <motion.div
          className="text-white space-y-4 bg-black/50 p-4 filter backdrop-blur-lg rounded-lg w-screen md:w-auto"
          transition={{ duration: 1 }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={bubbleSelectionVariants}
        >
          <h1 className="text-3xl font-bold tracking-wide">
            Find the perfect accommodation for you
          </h1>

          <div className=" space-y-4 text-black overflow-hidden w-full md:max-w-4xl">
            <input
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              className="inputSection"
              type="text"
              placeholder="Select a location"
            />

            <AnimatePresence>
              {shouldTheSelectionBoxBeDisplayed && (
                <PreferenceBox
                  setShouldBeShow={setShouldTheSelectionBoxBeDisplayed}
                ></PreferenceBox>
              )}
            </AnimatePresence>
          </div>
          <motion.button
            onClick={preferencesHandler}
            whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
            className="w-full bg-ocean  bg-[length:150%] font-bold text-lg bg-[0%] tracking-widest text-center rounded-md p-2 hover:bg-right transition-all  duration-150"
          >
            Search
          </motion.button>
          {typeof window !== undefined &&
            !shouldTheSelectionBoxBeDisplayed &&
            JSON.parse(localStorage?.getItem("preferences") || "[]").length >
              0 && (
              <div className="flex items-center justify-between text-white">
                <div className="justify-self-start">
                  <button
                    onClick={(e) => {
                      setShouldTheSelectionBoxBeDisplayed(true);
                      e.stopPropagation();
                    }}
                    className="bg-transparent  font-bold tracking-wide"
                  >
                    Change Preferences
                  </button>
                </div>
                <div className="flex justify-self-end  gap-2">
                  <input
                    type="checkbox"
                    className=" text-blue-500 checked:bg-red-500"
                    checked={isUsingPreviousPreferences}
                    onChange={() => {
                      setIsUsingPreviousPreferences((prev) => !prev);
                    }}
                    id="isUsingPreviousPreferences"
                  />
                  <label
                    htmlFor="isUsingPreviousPreferences"
                    className="text-sm"
                  >
                    Use the previous preferences
                  </label>
                </div>
              </div>
            )}
        </motion.div>
      </div>
    </motion.div>
  );
  async function preferencesHandler() {
    if (!location.trim()) {
      // location is empty, handle error
      toast.error("Please make sure that location is not empty", {
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
        localStorage.setItem("preferences", JSON.stringify(preferences));
      }
    } else {
      setPreferences([]);
      setShouldTheSelectionBoxBeDisplayed(true);
      if (preferences.length > 0)
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
