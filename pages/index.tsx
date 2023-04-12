import dynamic from "next/dynamic";
const InputSection = dynamic(() => import("../components/PromptInputSection"), {
  ssr: false,
});
import { ToastContainer } from "react-toastify";
import Loading from "@/components/Loading";
import { usePreference } from "@/context/PreferenceContext";
import Background from "@/components/Background";
export default function Home() {
  const { isLoading } = usePreference();

  return (
    <div className="h-screen m-0 p-0">
      <ToastContainer />
      {isLoading && <Loading />}
      {/* <EarthAnimation></EarthAnimation> */}
      <Background></Background>

      <div className="absolute top-1/2 md:left-1/2 md:-translate-x-1/2 sm:py-4 -translate-y-1/2 z-10 overflow-hidden">
        <InputSection></InputSection>
      </div>
    </div>
  );
}
