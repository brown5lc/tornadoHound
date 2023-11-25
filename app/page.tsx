"use client";
import React, { useEffect, useState } from "react";
import { UserLoc } from "./UserLoc";

const App: React.FC = () => {
  return (
    <div className="App">
      <title>Tornado Hound</title>
      <div className="container mx-auto px-4 ml-28 mt-48">
        <div className="text-7xl text-white mb-2">
          <span className="sm:border-b border-stone-500 relative pb-4">
            <span className="font-extrabold text-green-700">LOW</span> Risk
            Detected
          </span>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-64 ml-28 font-bold">
        <div className="text-3xl text-white mb-2">
          <span className="sm:border-b border-stone-500 relative pb-4">
            Tornado Safety Tips
            <ul className="list-disc text-lg font-thin mt-10 ml-5">
              <li>
                <span className="font-bold">Stay Informed:</span> Keep a
                battery-powered weather radio ready to receive warnings.
              </li>
              <li>
                <span className="font-bold">Identify Shelter:</span> Find a safe
                room or an interior space on the lowest level without windows.
              </li>
              <li>
                <span className="font-bold">Avoid Windows:</span> Stay away from
                windows to prevent injurty from broken glass.
              </li>
              <li>
                <span className="font-bold">Protect Your Head:</span> Use
                helmets or heavy cushions to guard your head and neck.
              </li>
              <li>
                <span className="font-bold">Stay Low:</span> If caught outside,
                lie flat in a depression and cover your head.
              </li>
              <li>
                <span className="font-bold">Abandon Vehicles:</span> Do not try
                to outrun a tornado in a car; find a building for shelter or a
                ditch if no buildings are available.
              </li>
              <li>
                <span className="font-bold">Plan Ahead:</span> Establish and
                practice a family emergency plan.
              </li>
              <li>
                <span className="font-bold">Secure Loose Items:</span> Anchor
                items that could become projectiles in strong winds.
              </li>
              <li>
                <span className="font-bold">Stay Put:</span> Remain in your
                shelter place until you're certain the tornado has passed.
              </li>
              <li>
                <span className="font-bold">Be Ready to Act:</span> Tornadoes
                can form quickly, so be prepared to take shelter at once.
              </li>
            </ul>
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;
