import { useAppState } from "@/context/PreferenceContext";
import { motion } from "framer-motion";
import React, { ReactElement, useEffect } from "react";

interface Props {
  value: string;
}

export default function BubblesForCountries({ value }: Props): ReactElement {
  const { location, setLocation } = useAppState();
  return (
    <motion.div
      layout
      whileTap={{ scale: 0.9 }}
      key={value}
      className={`bubble`}
      data-id={"Countries"}
      data-country={value}
      onClick={clickHandler}
    >
      #{value}
    </motion.div>
  );
  function clickHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    console.log(
      (e.target as HTMLDivElement).getAttribute("data-country") as string
    );

    if ((e.target as HTMLDivElement).style.backgroundColor === "red") {
      (e.target as HTMLDivElement).style.backgroundColor = "";
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
    setLocation(
      (e.target as HTMLDivElement).getAttribute("data-country") as string
    );
  }
}
