import React, { ReactElement, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
interface Props {
  text: string;
  handleClick: () => void;
  setInputField: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  disabled: boolean;
  placeHolder: string;
  bubble?: string;
}

export default function SearchBar({
  handleClick,
  text,
  setInputField,
  value,
  disabled,
  placeHolder,
  bubble,
}: Props): ReactElement {
  const searchBarRef = useRef<HTMLInputElement>(null);

  return (
    <div className="text-black overflow-hidden flex items-center h-12 p-1 bg-white rounded-md">
      <span
        onClick={() => {
          searchBarRef.current?.focus();
        }}
        className="text-lg h-full p-2 grid place-items-center"
      >
        <svg
          width="24"
          height="24"
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

      {bubble && (
        <div className="py-2 px-2 rounded-lg bg-gray-100 mr-1 text-gray-500 ">
          #{bubble}
        </div>
      )}
      <input
        value={value}
        ref={searchBarRef}
        onChange={(e) => {
          setInputField(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !disabled) {
            handleClick();
          }
        }}
        type="text"
        className="w-full h-full focus:outline-transparent "
        placeholder={placeHolder}
      />
      <button
        disabled={disabled}
        className="bg-light-gray h-full rounded-lg px-4 font-semibold text-base text-red-500 disabled:text-gray-400"
        onClick={handleClick}
      >
        {text}
      </button>
    </div>
  );
}
