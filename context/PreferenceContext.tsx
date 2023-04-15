import React, { useContext, useEffect } from "react";
import { createContext, ReactNode, useState } from "react";

export interface Preference {
  category: string;
  type: string;
}

type State = {
  preferences: Preference[] | [];
  setPreferences:
    | React.Dispatch<React.SetStateAction<[] | Preference[]>>
    | (() => void);
  setIsUsingPreviousPreferences:
    | React.Dispatch<React.SetStateAction<boolean>>
    | (() => void);
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>> | (() => void);
  isUsingPreviousPreferences: boolean;

  setIsLoading: React.Dispatch<React.SetStateAction<boolean>> | (() => void);
  isLoading: boolean;
};
const PreferenceContext = createContext<State>({
  preferences: [],
  setLocation: () => undefined,
  location: "",
  setPreferences: () => undefined,
  isUsingPreviousPreferences: false,
  setIsUsingPreviousPreferences: () => undefined,
  isLoading: false,
  setIsLoading: () => undefined,
});
interface Props {
  children: ReactNode;
}
const PreferenceProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState<Preference[] | []>([]);
  const [location, setLocation] = useState("");
  const [isUsingPreviousPreferences, setIsUsingPreviousPreferences] =
    useState(false);
  useEffect(() => {
    const data = localStorage.getItem("preferences");
    if (data && JSON.parse(data).length > 0) {
      setPreferences(JSON.parse(data));
      setIsUsingPreviousPreferences(true);
    }
  }, []);
  return (
    <PreferenceContext.Provider
      value={{
        location,
        setLocation,
        preferences,
        setPreferences,
        isUsingPreviousPreferences,
        setIsUsingPreviousPreferences,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </PreferenceContext.Provider>
  );
};
export const useAppState = () => {
  const {
    preferences,
    setPreferences,
    isUsingPreviousPreferences,
    setIsUsingPreviousPreferences,
    isLoading,
    setIsLoading,
    setLocation,
    location,
  } = useContext(PreferenceContext);
  return {
    preferences,
    setPreferences,
    isUsingPreviousPreferences,
    setIsUsingPreviousPreferences,
    isLoading,
    setIsLoading,
    location,
    setLocation,
  };
};
export default PreferenceProvider;
