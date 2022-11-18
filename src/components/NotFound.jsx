import { client } from "../supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import { SiCounterstrike } from "react-icons/si";
import { data } from "./data";

export default function NotFound() {
  const navigate = useNavigate();

  const start = () => {
    navigate("/quiz");
  };

  const singOut = async () => {
    const { error } = await client.auth.signOut();
    navigate("/login");
    console.log("Desloggeado", error);
  };

  return (
    <div className="w-screen h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900">
      <button
        onClick={singOut}
        className="flex items-center gap-1 absolute top-3 right-5 text-sm 
         text-gray-200 font-semibold bg-black py-2 px-3 rounded-full hover:bg-gray-900 transition duration-200 ease-out"
      >
        LOG OUT
        <CgLogOut className="text-lg ml-1 " />
      </button>
      <div className="w-6/12 h-full flex justify-center items-center flex-col gap-5 text-gray-100 mx-auto">
        <h1 className="text-5xl text-center">Welcome to the CS and Anime Quiz</h1>
        <p className="text-center text-lg pt-3">
          In this quiz, you have to answer some questions about Counter Strike: Global Offensive game, and esports. Also mid quiz, it will change to questions about Anime. Approaching the End there
          may be some mixed questions, ¿Who knows?
          <br /> At the end you'll have the number of right guesses that you made.
          <br />I wish you luck, may the power of friendship be by your side.
        </p>
        <button
          onClick={() => start()}
          className=" text-xl flex gap-3 items-center justify-center mt-4 w-8/12 py-3 border border-gray-200 hover:bg-gray-200 hover:text-black transition duration-75 ease-in"
        >
          READY <SiCounterstrike className="text-2xl" />
        </button>
      </div>
    </div>
  );
}
