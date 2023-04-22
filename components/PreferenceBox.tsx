import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import React, { ReactElement, useEffect, useState } from "react";
import BubblesForPreference from "./Preference/BubbleForPreference";
import BubblesForCountries from "./Location/BubblesForCountries";
import { useAppState } from "@/context/PreferenceContext";

export interface Preference {
  category: string;
  type: string;
}

interface Props {
  List: any[];
  initialNoOfBubbles: number;
  type: "Preference" | "Country";
  placeHolder: string;
}

export default function PreferenceBox({
  List,
  initialNoOfBubbles,
  type,
  placeHolder,
}: Props): ReactElement {
  const [shouldTheListBeDisplayed, setShouldTheListBeDisplayed] =
    useState(true);
  const [shouldMoreListBeDisplayed, setShouldMoreListBeDisplayed] =
    useState(false);
  const {
    isUsingPreviousPreferences,
    setIsUsingPreviousPreferences,
    isLoading,
  } = useAppState();

  //! Close the list of preferences when loading
  useEffect(() => {
    if (isLoading) setShouldTheListBeDisplayed(false);
  }, [isLoading]);

  useEffect(() => {
    if (!shouldTheListBeDisplayed) {
      setShouldMoreListBeDisplayed(false);
    }
  }, [shouldTheListBeDisplayed]);

  const controls = useAnimation();

  useEffect(() => {
    // TODO rotate the caret upward and downward according to the state activeness
    if (shouldTheListBeDisplayed)
      controls.start({ rotate: "0deg", transition: { duration: 1 } });
    else
      controls.start({
        rotate: "180deg",
        transition: { duration: 1 },
      });
  }, [shouldTheListBeDisplayed]);

  return (
    <motion.div
      className={`w-full grid gap-4 mt-4 max-h-[20rem] overflow-hidden overflow-y-scroll scrollbar-thin ${
        shouldMoreListBeDisplayed
          ? "scrollbar-thumb-gray-400"
          : "scrollbar-thumb-transparent"
      } scrollbar-track-transparent `}
    >
      <div className="flex justify-between items-center text-lg text-white ">
        <div
          className="flex items-center gap-2 w-max"
          onClick={() => {
            setShouldTheListBeDisplayed((prev) => {
              return !prev;
            });
          }}
        >
          <motion.span animate={controls}>
            <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>
          </motion.span>
          <span className="text-base font-semibold">{placeHolder}</span>
        </div>
        {type === "Preference" &&
          JSON.parse(localStorage.getItem("preferences") ?? "[]").length > 0 &&
          !shouldTheListBeDisplayed && (
            <div className="flex items-center gap-2 ">
              <input
                type="checkbox"
                className=" text-blue-500 checked:bg-red-500"
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
          )}
      </div>

      <AnimatePresence initial={false}>
        {shouldTheListBeDisplayed && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ duration: 1 }}
            exit={{ height: 0 }}
            className=" "
          >
            <motion.div
              className="
            flex gap-2 flex-wrap"
            >
              {/* //TODO display the bubbles according to the category.json data format with view more option */}
              {type === "Preference" &&
                List.slice(0, initialNoOfBubbles).map((preference, index) => {
                  return (
                    <BubblesForPreference
                      key={index}
                      preference={preference}
                    ></BubblesForPreference>
                  );
                })}

              {/* //TODO display the bubbles according to the countries.json data format with view more option */}
              {type === "Country" &&
                List.slice(0, initialNoOfBubbles).map((country, index) => {
                  return (
                    <BubblesForCountries
                      value={country}
                      key={index}
                    ></BubblesForCountries>
                  );
                })}
            </motion.div>

            <AnimatePresence initial={false}>
              {shouldMoreListBeDisplayed && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  transition={{ duration: 0.5 }}
                  exit={{ height: 0 }}
                  className="flex gap-2 mt-2 flex-wrap overflow-hidden"
                >
                  {/* //TODO display the bubbles according to the category.json data format with view less option */}

                  {type === "Preference" &&
                    List.slice(initialNoOfBubbles, List.length).map(
                      (preference, index) => {
                        return (
                          <BubblesForPreference
                            key={index}
                            preference={preference}
                          ></BubblesForPreference>
                        );
                      }
                    )}
                  {/* //TODO display the bubbles according to the category.json data format with view less option */}
                  {type === "Country" &&
                    List.slice(initialNoOfBubbles, List.length).map(
                      (country, index) => {
                        return (
                          <BubblesForCountries
                            value={country}
                            key={index}
                          ></BubblesForCountries>
                        );
                      }
                    )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-2 flex items-center justify-center text-lg text-white ">
              <div
                className="flex items-center gap-2"
                onClick={() => {
                  // TODO rotate the caret upward and downward according to the state activeness
                  setShouldMoreListBeDisplayed((prev) => {
                    if (prev) {
                      controls.start((item) => {
                        return item === 2
                          ? {
                              rotate: "0deg",
                              transition: { duration: 1 },
                            }
                          : {};
                      });
                    } else {
                      controls.start((item) => {
                        return item === 2
                          ? {
                              rotate: "180deg",
                              transition: { duration: 1 },
                            }
                          : {};
                      });
                    }
                    return !prev;
                  });
                }}
              >
                <motion.span animate={controls} custom={2}>
                  <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                </motion.span>
                <span className="text-base font-semibold">
                  {shouldMoreListBeDisplayed ? "View Less" : "View More"}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
