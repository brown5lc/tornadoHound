// components/liveRadar.tsx
const LiveRadar = () => {
  return (
    <iframe
      src="https://radar.weather.gov/"
      width="100%"
      height="600" // or any other height you prefer
      style={{ border: '0' }}
      allowFullScreen
      aria-hidden="false"
      tabIndex={0} // Corrected: passing 0 as a number
    ></iframe>
  );
};

export default LiveRadar;
