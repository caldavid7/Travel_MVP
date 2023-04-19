import { useAppState } from "@/context/PreferenceContext";
import { motion } from "framer-motion";
import React, { ReactElement, useEffect } from "react";

interface Props {
  value: {
    country: string;
    color: string;
  };
}

export default function BubblesForCountries({ value }: Props): ReactElement {
  const { location, setLocation } = useAppState();

  useEffect(() => {
    if (!location) localStorage.setItem("location", "");
    if (location) localStorage.setItem("location", location);
  }, [location]);

  return (
    <motion.div
      layout
      whileTap={{ scale: 0.9 }}
      key={value.country}
      className={`bubble`}
      data-id={"Countries"}
      style={{ color: value.color }}
      data-country={value.country}
      onClick={clickHandler}
    >
      #{value.country}
    </motion.div>
  );
  function clickHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if ((e.target as HTMLDivElement).style.backgroundColor === "red") {
      (e.target as HTMLDivElement).style.backgroundColor = "";
      (e.target as HTMLDivElement).style.color = value.color;
      setLocation("");
      return;
    }

    document.querySelectorAll("[data-id=Countries]").forEach((Element) => {
      (Element as HTMLDivElement).style.backgroundColor = "";
    });
    if (
      e.target &&
      (e.target as HTMLDivElement).style.backgroundColor !== "red"
    )
      (e.target as HTMLDivElement).style.backgroundColor = "red";
    (e.target as HTMLDivElement).style.color = "white";

    setLocation(
      (e.target as HTMLDivElement).getAttribute("data-country") as string
    );
  }
}
