import { client } from "../supabase/client";
import { useState } from "react";
import { useFormik } from "formik";
import { registerSchema } from "../schema";
import { useNavigate } from "react-router-dom";

export default function (props) {
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (values, actions) => {
    event.preventDefault();
    console.log("submitted", values, actions);
    submitData(values);
    setTimeout(() => {
      actions.resetForm();
    }, 1500);
  };

  const { values, errors, handleChange, handleSubmit, handleBlur, isSubmitting } = useFormik({
    initialValues: {
      email: "",
      user: "",
      password: "",
      confirmPassword: "",
      checked: false,
    },
    validationSchema: registerSchema,
    onSubmit,
    validateOnChange: false,
    validateOnBlur: false,
  });

  const submitData = async (formValues) => {
    try {
      const result = await client.auth.signUp({
        email: formValues.email,
        password: formValues.password,
        options: {
          data: {
            username: formValues.user,
          },
        },
      });
      console.log(result);

      setRegistered(true);
      setTimeout(() => setRegistered(false), 1500);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="w-screen h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900">
      <div className="w-full h-full grid place-items-center  max-[360px]:px-3">
        <div className={`absolute top-0 border border-green-300 p-7 py-8 bg-gradient-to-b from-green-300 to-green-200 text-md font-semibold font-mono ${registered ? "block" : "hidden"} `}>
          You have been successfully registered
        </div>
        <div className="w-full h-full max-h-[500px] flex flex-col m-auto justify-center items-center max-w-sm shadow-lg shadow-gray-200 drop-shadow-2xl bg-slate-50 border border-gray-200">
          <h1 className="text-2xl p-1 mb-5 font-bold">Registration form</h1>
          <form className="flex flex-col w-full px-10 gap-2  font-semibold" onSubmit={handleSubmit}>
            <label htmlFor="user">Username</label>
            <input
              type="text"
              id="user"
              placeholder="Sintaxis"
              className={
                errors.user
                  ? "pl-2 py-0.5 border border-red-400 focus:ring-2 outline-none focus:ring-blue-500 rounded"
                  : "pl-2 py-0.5 border border-gray-400 focus:ring-2 outline-none focus:ring-blue-500 rounded"
              }
              onChange={handleChange}
              value={values.user}
              onBlur={handleBlur}
            />
            {errors.user && <p className="text-xs text-red-400">{errors.user}</p>}
            <label htmlFor="email">Email</label>
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
              onBlur={handleBlur}
            />
            {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
            <label htmlFor="repeatPassword">Repeat Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="******"
              className={
                errors.confirmPassword
                  ? "pl-2 py-0.5 border border-red-400 focus:ring-2 outline-none focus:ring-blue-500 rounded"
                  : "pl-2 py-0.5 border border-gray-400 focus:ring-2 outline-none focus:ring-blue-500 rounded"
              }
              onChange={handleChange}
              value={values.confirmPassword}
              onBlur={handleBlur}
            />
            {errors.confirmPassword && <p className="text-xs text-red-400">{errors.confirmPassword}</p>}
            <div className="flex justify-start gap-2 mt-2 text-sm">
              <input type="checkbox" id="checked" onChange={handleChange} checked={values.checked} />
              <label htmlFor="terms">
                I accept the{" "}
                <a href="#" className={`text-blue-500  hover:text-cyan-400`}>
                  Terms and Conditions
                </a>
              </label>
            </div>
            {errors.checked && <p className="text-xs text-red-400">{errors.checked}</p>}

            <button className="bg-blue-600 text-white py-1 mt-6  rounded disabled:opacity-75 " type="submit" disabled={isSubmitting}>
              {" "}
              Register
            </button>
            <p className="text-sm text-center pt-1.5 font-normal">
              ¿Do you already have an account?{" "}
              <a href="#" className="text-blue-500 hover:text-cyan-400" onClick={() => navigate("/login")}>
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
