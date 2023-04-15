import { Preference, useAppState } from "@/context/PreferenceContext";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { ReactElement } from "react";

interface Props {
  preference: Preference;
}

export default function BubbleInSearchBar({ preference }: Props): ReactElement {
  const { preferences, setPreferences } = useAppState();
  return (
    <>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "auto" }}
        whileTap={{ scale: 0.9 }}
        className="group relative flex items-center isolate whitespace-nowrap max-h-10 hover:text-white  text-red-500 bg-red-100 pl-4 py-1 rounded-md overflow-hidden min-w-max"
      >
        <span>#{preference.type}</span>
        <span
          className="text-lg h-full w-1/2 px-2 py-1 grid place-items-center"
          onClick={(e) => {
            setPreferences((prev) =>
              prev.filter(
                (statePreference) => statePreference.type !== preference.type
              )
            );
          }}
        >
          <FontAwesomeIcon icon={faMultiply}></FontAwesomeIcon>
        </span>
        <div className="absolute duration-300 -z-10 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-red-500  rounded-md"></div>
      </motion.div>
    </>
  );
}
