"use client";
import React from "react";
import "./styles.css";

interface props {
  zipInput: number | "";
  setZipInput: React.Dispatch<React.SetStateAction<number | "">>;
  handleAdd: (e: React.FormEvent) => void;
}

const Searchbar = ({ zipInput, setZipInput, handleAdd }: props) => {
  return (
    <form className="input" onSubmit={handleAdd}>
      <input
        type="input"
        value={zipInput}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          if (isNaN(value)) {
            setZipInput("");
          } else {
            setZipInput(value);
          }
        }}
        placeholder="Enter Zip Code"
        className="input__box"
      />
      <button className="input_submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default Searchbar;
