import { Preference, useAppState } from "@/context/PreferenceContext";
import { motion } from "framer-motion";
import React, { ReactElement, useEffect } from "react";

interface Props {
  preference: {
    category: string;
    type: string[];
    color: string;
  };
}

export default function Bubbles({ preference }: Props): ReactElement {
  const { preferences, setPreferences } = useAppState();

  const selectedPreference = preferences.find(
    (selectedPreference) => selectedPreference.category === preference.category
  );

  return (
    <>
      {preference.type.map((type) => {
        return (
          <motion.div
            layout
            whileTap={{ scale: 0.9 }}
            key={type}
            data-id={type.replace(" ", "-")}
            style={{
              backgroundColor: selectedPreference?.type === type ? "red" : "",
              color:
                selectedPreference?.type === type ? "white" : preference.color,
            }}
            onClick={(e) => selectingHandler(type, e)}
            className={`bubble ${preference.category}`}
          >
            #{type}
          </motion.div>
        );
      })}
    </>
  );

  function selectingHandler(
    option: string,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    //! Get the already selected preference of that category

    const existingPreferenceIndex = preferences.findIndex((preference) => {
      return preference.category === selectedPreference?.category;
    });

    if (
      existingPreferenceIndex !== -1 &&
      preferences[existingPreferenceIndex].type !== option
    ) {
      (
        document.querySelector(
          `[data-id="${preferences[existingPreferenceIndex].type.replace(
            " ",
            "-"
          )}"]`
        ) as HTMLDivElement
      ).style.backgroundColor = "";

      setPreferences((prev) =>
        prev.map((preference, index) => {
          if (index === existingPreferenceIndex) {
            return {
              ...preference,
              type: option,
            };
          }
          return preference;
        })
      );

      return;
    }

    //! Check if it is already selected
    else if (
      preferences.findIndex((preference) => {
        return preference.type === selectedPreference?.type;
      }) !== -1
    ) {
      setPreferences((prev) =>
        prev.filter((preference) => preference.type !== option)
      );
      (e.target as HTMLDivElement).style.backgroundColor = "";
      return;
    }

    //! When newly selected
    else {
      (e.target as HTMLDivElement).style.backgroundColor = "red";

      setPreferences((prev) => [
        { category: preference.category, type: option },
        ...prev,
      ]);
    }
  }
}
