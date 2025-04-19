"use client";
import React from "react";
import Image from "next/image";
import Player from "../../app/assets/img/player.svg";

export default function LeaderboardCard() {
  return (
    <div
      className="px-8 py-6 rounded-2xl w-full max-w-md"
      style={{ backgroundColor: "#463226" }}
    >
      <h1 className="text-[#D8A730] text-[28px] font-bold text-center mb-4">
        TREASURE HUNT
      </h1>

      {/* 2-Column Main Layout */}
      <div className="flex gap-4 mb-4">
        {/* Left: Avatar */}
        <div className="flex-shrink-0">
          <Image
            src={Player}
            alt="Player"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        {/* Right: Stats and Actions */}
        <div className="flex flex-col justify-start text-[#D8A730] w-1/2">
          <h2 className="font-semibold text-l mb-1 font-garamond">Firstname Stats:</h2>

          {/* 60 pts | Level 5 */}
          <div className="flex justify-between mb-2 text-sm font-garamond">
            <span>60 pts</span>
            <span>Level 5</span>
          </div>

          {/* My Ranking Button */}
          <button className="bg-[#6F4100] rounded-full px-5 text-[14px] text-center font-semibold mb-1 w-fit">
            MY RANKING
          </button>

          {/* maybe we could have a cute comment for each level to motivate user? 
          or just change the number based on data in database */}
          {/* Motivation Text */}
          <p className="text-[12px] font-garamond">Keep going, almost at level 6</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-4 rounded-full bg-[#2c1e1a] mb-4">
        <div
          className="absolute top-0 left-0 h-4 rounded-full bg-[#D8A730]"
          style={{ width: "83%" }} // CHANGE THIS PROGRESS TO BEING A PERCENTAGE OF DATA IN DATABASE
        ></div>

      </div>

      {/* Buttons */}
      <div className="flex justify-between gap-4">

        <button className="flex-1 bg-[#2c1e1a] text-[#D8A730] px-10 py-1 rounded-full font-semibold">
          CONTINUE
        </button>
        <button className="flex-1 bg-[#2c1e1a] text-[#D8A730] px-10 py-1  rounded-full font-semibold">
          START
        </button>
      </div>
    </div>
  );
}
