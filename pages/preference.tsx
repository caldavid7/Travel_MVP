import dynamic from "next/dynamic";
const SearchBoxForLocation = dynamic(
  () => import("../components/Preference/SearchBoxForPreferences"),
  {
    ssr: false,
  }
);
import { ToastContainer } from "react-toastify";
import Loading, { ProgressBar } from "@/components/Loading";
import { useAppState } from "@/context/PreferenceContext";
import Background from "@/components/Preference/Background";
import Logo from "@/components/Logo";
import BackButton from "@/components/Preference/BackButton";
export default function Home() {
  const { isLoading } = useAppState();

  return (
    <div className="h-screen m-0 p-0   relative z-50 isolate bg-black">
      <ToastContainer />
      {isLoading && <ProgressBar></ProgressBar>}
      <div className="absolute z-50 top-8 lg:top-16 left-1/2 -translate-x-1/2">
        <Logo></Logo>
      </div>
      <Background></Background>

      <BackButton></BackButton>
      <div className="h-full w-full grid place-items-center">
        <SearchBoxForLocation> </SearchBoxForLocation>
      </div>
    </div>
  );
}
export function getStaticProps() {
  return {
    props: {
      variants: {
        animateState: {
          opacity: 1,
        },
        exitState: {
          opacity: 0,
        },
      },
    },
  };
}
