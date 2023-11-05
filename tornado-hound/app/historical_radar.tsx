// pages/historical_radar.tsx
import Head from 'next/head';
import { useState, ChangeEvent } from 'react';
import LiveRadar from './liveRadar'; // Adjust the path as necessary

const HistoricalRadarPage = () => {
  const [selectedEvent, setSelectedEvent] = useState('');

  const handleSelectEvent = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedEvent(event.target.value);
    // Additional logic to update radar based on event will be needed here
  };

  return (
    <>
      <Head>
        <title>Historical Radar Data</title>
        <meta name="description" content="View historical radar data for selected tornado events." />
      </Head>

      {/* Live Radar Component */}
      <LiveRadar />

      {/* Dropdown Menu */}
      <div className="my-4">
        <select
          onChange={handleSelectEvent}
          value={selectedEvent}
          className="p-2 rounded border"
        >
          {/* These value attributes would need to correspond to the radar data you want to display */}
          <option value="">Select a notable tornado event</option>
          <option value="event1">Tornado Event 1 - 2012</option>
          <option value="event2">Tornado Event 2 - 2013</option>
          {/* ...more options */}
        </select>
      </div>

      {/* Tornado Indicator */}
      <div className="my-4">
        <p>The selected event contains a tornado: {/* True or False based on model's prediction */}</p>
      </div>
    </>
  );
};

export default HistoricalRadarPage;
