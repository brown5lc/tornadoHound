import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div className="flex text-stone-400 bg-black p-5">
      <img
        src="../Images/logo_v2.png"
        alt="logo"
        className="h-12 w-12 mr-10 mt-0 mb-0"
      />
      <Link href={"/"} className="mt-2 mr-10 text-xl">
        Home
      </Link>
      <Link href={"/about/"} className="text-xl mt-2 mr-10">
        About
      </Link>
      <div className="ml-auto relative">
        <input
          type="text"
          placeholder="Enter Zip Code..."
          className="rounded-full pl-4 pr-10 py-2 text-black w-full"
        />
        <img
          src="../Images/search.svg"
          alt="search"
          className="absolute right-2.5 top-2.5 h-6 w-6"
        />
      </div>
    </div>
  );
};

export default NavBar;
