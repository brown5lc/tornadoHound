import React from "react";
import Link from "next/link";

const About: React.FC = () => {
  return (
    <div className="App">
      <title>Tornado Hound</title>
      <img src="/Images/tornado_hound_logo.svg" alt="Logo"></img>
      <span className="heading">Tornado Hound</span>
      <nav>
        <ul>
          <li>
            <Link href="../">Home</Link>
            <Link href="../historical-data/">Historical data</Link>
            <Link href="/about/">About</Link>
          </li>
        </ul>
      </nav>
      <p>
        Welcome to our About Us page! Here, we provide information about our
        organization, its history, and our mission.
      </p>

      <h2> Mission</h2>
      <p></p>
      <h2>Our Team</h2>
      <p>Liam</p>
    </div>
  );
};

export default About;
