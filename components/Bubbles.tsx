import { Preference, usePreference } from "@/context/PreferenceContext";
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
  const { preferences, setPreferences } = usePreference();

  const selectedPreference = preferences.find(
    (selectedPreference) => selectedPreference.category === preference.category
  );

  return (
    <>
      {preference.type.map((type) => {
        return (
          <motion.div
            whileTap={{ scale: 0.9 }}
            key={type}
            data-id={type.replace(" ", "-")}
            onClick={(e) => selectingHandler(type, e)}
            style={{
              backgroundColor:
                selectedPreference?.type === type ? "black" : preference.color,
            }}
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
    const existingPreferenceIndex = preferences.findIndex((preference) => {
      return preference.category === selectedPreference?.category;
    });

    if (
      existingPreferenceIndex !== -1 &&
      preferences[existingPreferenceIndex].type !== option
    ) {
      console.log(
        existingPreferenceIndex,
        preferences[existingPreferenceIndex]
      );
      document.querySelector(
        `[data-id="${preferences[existingPreferenceIndex].type.replace(
          " ",
          "-"
        )}"]`
        //@ts-ignore
      )!.style.backgroundColor = preference.color;

      document.querySelector(
        `[data-id="${option.replace(" ", "-")}"]`
        //@ts-ignore
      )!.style.backgroundColor = "black";

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
      // @ts-ignore
      e.target.style.backgroundColor = preference.color;
      return;
    }

    //! When newly selected
    else {
      //@ts-ignore
      e.target.style.backgroundColor = "black";
      setPreferences((prev) => [
        { category: preference.category, type: option },
        ...prev,
      ]);
    }
  }
}
