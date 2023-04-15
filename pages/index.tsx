import dynamic from "next/dynamic";
const SearchBoxForLocation = dynamic(
  () => import("../components/Location/SearchBoxForLocation"),
  {
    ssr: false,
  }
);
import { ToastContainer } from "react-toastify";
import Loading from "@/components/Loading";
import { useAppState } from "@/context/PreferenceContext";
import Background from "@/components/Location/Background";
export default function Home() {
  const { isLoading } = useAppState();

  return (
    <div className="h-screen m-0 p-0 font-[Work_Sans] font-sans">
      <ToastContainer />
      {isLoading && <Loading />}
      {/* <EarthAnimation></EarthAnimation> */}
      <Background></Background>

      <div className="absolute top-1/2 md:left-1/2 md:-translate-x-1/2 sm:py-4 -translate-y-1/2 z-10 overflow-hidden">
        <SearchBoxForLocation> </SearchBoxForLocation>
      </div>
    </div>
  );
}
