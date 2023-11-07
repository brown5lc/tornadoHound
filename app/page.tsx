"use client";
import React, { useState } from "react";
import Searchbar from "./Components/Searchbar";
import Link from "next/link";
import { Console } from "console";
import { UserLoc } from "./UserLoc";

const App: React.FC = () => {
  const [zipInput, setZipInput] = useState<number | "">("");
  const [userLoc, setUserLoc] = useState<UserLoc[]>([]);
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (zipInput) {
      setUserLoc([...userLoc, { zip: zipInput, lat: 1, long: 1 }]);
      setZipInput(zipInput);
    }
  };

  console.log(zipInput);
  return (
    <div className="App">
      <title>Tornado Hound</title>
      <img src="/Images/tornado_hound_logo.svg" alt="Logo"></img>
      <span className="heading">Tornado Hound</span>
      <nav>
        <ul>
          <li>
            <a href="/home">Home</a>
            <Link href="../historical-data/">Historical data</Link>
            <Link href="../about/">About</Link>
          </li>
        </ul>
      </nav>
      <h2> Enter zipcode below: </h2>
      <Searchbar
        zipInput={zipInput}
        setZipInput={setZipInput}
        handleAdd={handleAdd}
      />
    </div>
  );
};

export default App;
