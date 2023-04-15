import React, { ReactElement, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
interface Props {
  text: string;
  handleClick: () => void;
  setInputField: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

export default function SearchBar({
  handleClick,
  text,
  setInputField,
  value,
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
        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
      </span>
      <input
        value={value}
        ref={searchBarRef}
        onChange={(e) => {
          setInputField(e.target.value);
        }}
        type="text"
        className="w-full h-full focus:outline-transparent "
        placeholder="Select place here"
      />
      <button
        className="bg-light-gray h-full rounded-lg px-4 font-semibold text-base text-red-500"
        onClick={handleClick}
      >
        {text}
      </button>
    </div>
  );
}
