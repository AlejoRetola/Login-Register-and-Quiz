import { useState } from "react";
import { client } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NotFound from "./NotFound";
import { useFormik } from "formik";
import { loginSchema } from "../schema";

export default function () {
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const getUserSession = async () => {
    const { data, error } = await client.auth.getSession();
    console.log(data, error);
  };

  const onSubmit = async (values, actions) => {
    event.preventDefault();
    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (data.session) {
        setTimeout(() => {
          navigate("/NotFound");
        }, 200);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 1500);
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  const { handleChange, values, errors, handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    // Form container
    <div
      className="w-screen h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900
 "
    >
      <div className="w-full h-full grid place-items-center  max-[360px]:px-3">
        <div className={`absolute top-0 border border-red-300 p-7 py-8 bg-gradient-to-b from-red-300 to-red-200 text-md font-semibold font-mono ${error ? "block" : "hidden"} `}>
          Email/Password do not match
        </div>
        <div className="w-full h-full max-h-[460px] flex flex-col m-auto justify-center items-center max-w-sm shadow-lg shadow-gray-200 drop-shadow-2xl bg-slate-50 border border-gray-200">
          <h1 className="text-2xl p-1 mb-6 font-bold">Welcome! Please Log in</h1>
          <form className="flex flex-col w-full px-10 gap-2  font-semibold" onSubmit={handleSubmit}>
            <label htmlFor="email">Username</label>
            <input
              type="email"
              id="email"
              placeholder="example@email.com"
              className={
                errors.email
                  ? "pl-2 py-0.5 border border-red-400 focus:ring-2 outline-none focus:ring-blue-500 rounded"
                  : "pl-2 py-0.5 border border-gray-400 focus:ring-2 outline-none focus:ring-blue-500 rounded"
              }
              onChange={handleChange}
              value={values.email}
            />
            {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="******"
              className={
                errors.password
                  ? "pl-2 py-0.5 border border-red-400 focus:ring-2 outline-none focus:ring-blue-500 rounded"
                  : "pl-2 py-0.5 border border-gray-400 focus:ring-2 outline-none focus:ring-blue-500 rounded"
              }
              onChange={handleChange}
              value={values.password}
            />
            {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}

            <button className="bg-blue-600 text-white py-1 mt-4 rounded hover:ring-1 hover:ring-blue-500 disabled:opacity-75" disabled={isSubmitting} type="submit">
              {" "}
              Log In
            </button>
          </form>
          <div className="flex items-center justify-center h-1/6 w-full">
            <p className="text-sm">
              ¿You don't have an account?{" "}
              <a href="#" className="text-blue-500 hover:text-cyan-400" onClick={() => navigate("/register")}>
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
