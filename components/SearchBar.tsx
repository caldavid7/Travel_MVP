import { useAppState } from "@/context/PreferenceContext";
import React, { ReactElement, useEffect, useRef } from "react";
interface Props {
  text: string;
  handleClick: () => void;
  setInputField: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  disabled: boolean;
  placeHolder: string;
  handleEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function SearchBar({
  handleClick,
  handleEnter,
  text,
  setInputField,
  value,
  disabled,
  placeHolder,
}: Props): ReactElement {
  const searchBarRef = useRef<HTMLInputElement>(null);
  const { isLoading } = useAppState();

  useEffect(() => {
    if (isLoading) searchBarRef.current?.blur();
  }, [isLoading]);

  return (
    <div className="text-black overflow-hidden flex items-center h-12 p-1 bg-white rounded-md">
      <span
        onClick={() => {
          searchBarRef.current?.focus();
        }}
        className="text-lg h-full p-2 grid place-items-center"
      >
        <svg
          className="lg:h-6 lg:w-6 w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="11.7666"
            cy="11.7666"
            r="8.98856"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.0183 18.4851L21.5423 22"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <input
        autoFocus
        value={value}
        ref={searchBarRef}
        onChange={(e) => {
          setInputField(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleEnter(e);
          }
        }}
        type="text"
        className="w-full h-full focus:outline-transparent placeholder:text-sm lg:placeholder:text-base "
        placeholder={placeHolder}
      />
      <button
        disabled={disabled}
        className="bg-light-gray h-full rounded-lg px-2 lg:px-4 font-semibold text-sm  lg:text-base text-red-500 disabled:text-gray-400"
        onClick={handleClick}
      >
        {text}
      </button>
    </div>
  );
}
