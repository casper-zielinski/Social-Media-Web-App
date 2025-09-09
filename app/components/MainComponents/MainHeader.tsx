"use client";

import React, { useState } from "react";

const MainHeader = () => {
  const [navigationPagerForYou, setNavigationPagerForYou] = useState(true);

  return (
    <>
      {" "}
      <div
        className={`hover:bg-gray-800 p-3 cursor-pointer ${
          navigationPagerForYou ? "font-bold" : "text-gray-500"
        }`}
        onClick={() => setNavigationPagerForYou(true)}
      >
        <p>For you</p>
      </div>
      <div
        className={`hover:bg-gray-800 p-3 cursor-pointer ${
          navigationPagerForYou ? "text-gray-500" : "font-bold"
        }`}
        onClick={() => setNavigationPagerForYou(false)}
      >
        <p>Following</p>
      </div>
      <div
        className={`items-end w-1/2 h-1 translate-x-1/2 rounded ${
          navigationPagerForYou ? "bg-sky-600" : "bg-gray-950"
        }`}
      ></div>
      <div
        className={`items-end w-1/2 h-1 translate-x-1/2 rounded ${
          navigationPagerForYou ? "bg-gray-950" : "bg-sky-600"
        }`}
      ></div>
    </>
  );
};

export default MainHeader;
