import { Preference, usePreference } from "@/context/PreferenceContext";
import React, { ReactElement } from "react";

interface Props {
  preference: {
    category: string;
    type: string[];
  };
}

export default function Bubbles({ preference }: Props): ReactElement {
  const { preferences, setPreferences } = usePreference();

  const selectedPreference = preferences.find(
    (selectedPreference) => selectedPreference.category === preference.category
  );

  return (
    <select
      onChange={(e) => {
        setPreferences((prev) => [
          ...prev,
          { category: preference.category, type: e.target.value },
        ]);
        e.target.classList.add("bg-green-400");
      }}
      defaultValue={selectedPreference?.type || preference.category}
      placeholder={preference.category}
      className={`px-2 py-1 grid rounded-full  place-items-center ${
        selectedPreference ? "bg-green-400" : ""
      }`}
    >
      <option disabled hidden>
        {preference.category}
      </option>
      {preference.type.map((data) => (
        <option key={data}>{data}</option>
      ))}
    </select>
  );
}
