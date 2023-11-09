import React, { useState } from "react";
import { UserLoc } from "./UserLoc";

const App: React.FC = () => {
  return (
    <div className="App">
      <title>Tornado Hound</title>
      <div className="container mx-auto px-4 ml-28 mt-48">
        <div className="text-7xl text-white mb-2">
          <span className="sm:border-b border-stone-500 relative pb-4">
            <span className="font-extrabold text-green-400">LOW</span> Risk
            Detected
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;
