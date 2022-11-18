import { client } from "../supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import { SiCounterstrike } from "react-icons/si";
import { data } from "./data";

export default function Quiz(props) {
  const navigate = useNavigate();
  const [questionId, setQuestionId] = useState(1);
  const [finished, setFinished] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [correct, setCorrect] = useState(0);

  const getUser = async () => {
    const {
      data: { user },
    } = await client.auth.getUser();
    setCurrentUser(user.user_metadata.username);
  };

  getUser();

  const response = () => {
    if (questionId <= 9 && event.target.outerText === data[questionId].correctAnswer) {
      setCorrect((prevAnswer) => prevAnswer + 1);
      setQuestionId((prevId) => {
        if (prevId < 9) {
          return prevId + 1;
        } else {
          setFinished(true);
        }
      });
    } else {
      setQuestionId((prevId) => {
        if (prevId < 9) {
          return prevId + 1;
        } else {
          setFinished(true);
        }
      });
    }
  };

  const restart = () => {
    navigate("/NotFound");
    setQuestionId(1);
    setFinished(false);
    setCorrect(0);
  };

  const singOut = async () => {
    const { error } = await client.auth.signOut();
    navigate("/login");
    console.log("Desloggeado");
  };

  return (
    <div className="w-screen h-full min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900">
      {finished === false ? (
        <>
          <div className="w-screen  flex justify-end p-2">
            <button
              onClick={singOut}
              className="flex items-center gap-1 top-3 right-5 text-sm 
        text-gray-200 font-semibold bg-black py-2 px-3 rounded-full hover:bg-gray-900 transition duration-200 ease-out
       "
            >
              LOG OUT
              <CgLogOut className="text-lg ml-1 " />
            </button>
          </div>
          <div className="w-6/12 h-full flex justify-center items-center flex-col gap-5 text-gray-100 mx-auto max-[430px]:w-9/12  max-[768px]:pb-3">
            <h1 className="text-5xl text-center w-full pt-8  max-[425px]:text-2xl max-[768px]:text-3xl">
              {questionId}# {data[questionId].question}
            </h1>
            <div className="flex flex-col w-full justify-center items-center gap-4 text-xl pt-3  max-[425px]:text-sm">
              <div className="border border-white w-10/12 text-center py-3 hover:bg-white hover:text-black transition duration-100 ease-in cursor-pointer  " onClick={response} id="0">
                {data[questionId].answers[0]}
              </div>
              <div className="border border-white w-10/12 text-center py-3 hover:bg-white hover:text-black transition duration-100 ease-in cursor-pointer" onClick={response} id="1">
                {data[questionId].answers[1]}
              </div>
              <div className="border border-white w-10/12 text-center py-3 hover:bg-white hover:text-black transition duration-100 ease-in cursor-pointer" onClick={response} id="2">
                {data[questionId].answers[2]}
              </div>
              <div className="border border-white w-10/12 text-center py-3 hover:bg-white hover:text-black transition duration-100 ease-in cursor-pointer" onClick={response} id="3">
                {data[questionId].answers[3]}
              </div>
            </div>
            <p> Question {questionId} of 9</p>
          </div>
        </>
      ) : (
        <>
          <button
            onClick={singOut}
            className="flex items-center gap-1 absolute top-3 right-5 text-sm 
         text-gray-200 font-semibold bg-black py-2 px-3 rounded-full hover:bg-gray-900 transition duration-200 ease-out"
          >
            LOG OUT
            <CgLogOut className="text-lg ml-1 " />
          </button>
          <div className="w-6/12 h-full flex justify-center items-center flex-col gap-5 text-gray-100 mx-auto">
            <h1 className="text-5xl text-center w-full">End of the Quiz</h1>
            <p className="text-center text-xl ">
              {correct >= 4 ? (
                <span>
                  ¡Congratulations <span className="text-2xl italic"> {currentUser} </span> , you got {correct} of 9 right!
                </span>
              ) : (
                <span>
                  <span className="text-2xl italic"> {currentUser}... </span> ¿Did you try? You only got {correct} correct answers...
                </span>
              )}

              <br />
              {correct === 9 ? "I don't have anymore questions for today, come back later , maybe I'll have some" : "Wanna have 100% of them? ¡Try again clicking down below!"}
            </p>
            <button
              onClick={restart}
              className="text-xl flex gap-3 items-center justify-center mt-4 w-8/12 py-3 border border-gray-200 hover:bg-gray-200 hover:text-black transition duration-75 ease-in"
            >
              {correct === 9 ? "Go back to the Start" : "Try again"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
