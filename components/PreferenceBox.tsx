import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import React, { ReactElement, useEffect, useState } from "react";
import BubblesForPreference from "./Location/BubbleForPreference";
import BubblesForCountries from "./Preference/BubblesForCountries";

export interface Preference {
  category: string;
  type: string;
}

interface Props {
  List: any[];
  initialNoOfBubbles: number;
  type: "Preference" | "Country";
}

export default function PreferenceBox({
  List,
  initialNoOfBubbles,
  type,
}: Props): ReactElement {
  const [shouldTheListBeDisplayed, setShouldTheListBeDisplayed] =
    useState(false);
  const [shouldMoreListBeDisplayed, setShouldMoreListBeDisplayed] =
    useState(false);

  useEffect(() => {
    if (!shouldTheListBeDisplayed) {
      setShouldMoreListBeDisplayed(false);
    }
  }, [shouldTheListBeDisplayed]);

  const controls = useAnimation();
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
      className=" w-full grid gap-4 mt-4 max-h-96 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400"
    >
      <div className=" text-lg text-white ">
        <div
          className="flex items-center gap-2"
          onClick={() => {
            setShouldTheListBeDisplayed((prev) => {
              if (prev)
                controls.start({ rotate: "0deg", transition: { duration: 1 } });
              else
                controls.start({
                  rotate: "180deg",
                  transition: { duration: 1 },
                });

              return !prev;
            });
          }}
        >
          <motion.span animate={controls}>
            <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
          </motion.span>
          <span className="text-base font-semibold">Select preferences</span>
        </div>
      </div>
      <AnimatePresence>
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
            flex gap-2 flex-wrap
            
            "
            >
              {type === "Preference" &&
                List.slice(0, initialNoOfBubbles).map((preference, index) => {
                  return (
                    <BubblesForPreference
                      key={index}
                      preference={preference}
                    ></BubblesForPreference>
                  );
                })}

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

            <AnimatePresence>
              {shouldMoreListBeDisplayed && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  transition={{ duration: 1 }}
                  exit={{ height: 0 }}
                  className="flex gap-2 mt-2 flex-wrap overflow-hidden"
                >
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
