// pages/historical_radar.tsx
"use client";
import Head from "next/head";
import React from "react";
import Link from "next/link";
import { useState, ChangeEvent } from "react";
import "../globals.css";

const HistoricalRadarPage = () => {
  const [selectedEvent, setSelectedEvent] = useState("");

  const handleSelectEvent = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedEvent(event.target.value);
    // Additional logic to update radar based on event will be needed here
  };

  return (
    <div className="App">
      <Head>
        <title>Historical Radar Data</title>
        <meta
          name="description"
          content="View historical radar data for selected tornado events."
        />
      </Head>

      <title>Tornado Hound</title>
      <div className="flex w-full h-screen">
        <div className="flex w-1/2 h-1/2 justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="w-96 h-48 bg-green-500 rounded-lg"></div>
            <div className="my-4">
              <select
                onChange={handleSelectEvent}
                value={selectedEvent}
                className="p-2 rounded border"
              >
                <option value="">Select a notable tornado event</option>
                <option value="event1">Tornado Event 1 - 2012</option>
                <option value="event2">Tornado Event 2 - 2013</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex w-1/2 h-1/2 justify-center items-center">
          <div className="flex flex-col items-center">
            <img
              src="/Images/weather-example.png"
              alt="Radar"
              className="rounded-lg"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalRadarPage;
