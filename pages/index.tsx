import BubbleSection from "@/components/PromptInputSection";
import { useState } from "react";
import EarthAnimation from "@/components/EarthAnimation";
import { ToastContainer } from "react-toastify";
import Loading from "@/components/Loading";
import { usePreference } from "@/context/PreferenceContext";
export default function Home() {
  console.log(process.env.NEXT_PUBLIC_OPENAI_KEY);
  const { isLoading } = usePreference();

  return (
    <div className="h-screen m-0 p-0">
      <ToastContainer />
      {isLoading && <Loading />}
      <EarthAnimation></EarthAnimation>

      <div className="absolute top-1/2 md:left-1/2 md:-translate-x-1/2 sm:py-4 -translate-y-1/2 z-10 overflow-hidden">
        <BubbleSection></BubbleSection>
      </div>
    </div>
  );
}
