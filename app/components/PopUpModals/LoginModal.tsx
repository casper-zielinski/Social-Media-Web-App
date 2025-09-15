import { auth } from "@/firebase";
import { AppDispatch } from "@/redux/store";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import LogInAsGuestButton from "./LogInAsGuestButton";

/* Modal for Loging In with Email and Password*/

const LoginModal = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: AppDispatch = useDispatch();

  async function handleLogin() {
    await signInWithEmailAndPassword(auth, email, password);
    (document.getElementById("LoginDialog") as HTMLDialogElement).close();
  }

  return (
    <dialog id="LoginDialog" className="modal" data-theme="dark">
      <div className="modal-box w-4/5 sm:w-3/5 max-w-md">
        <form method="dialog" name="Close Login Dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setShowPassword(false)}
          >
            ✕
          </button>
        </form>
        <fieldset className="fieldset rounded-box w-xs flex flex-col items-center">
          <legend className="fieldset-legend mb-5 text-base md:text-lg">
            Login
          </legend>

          <label className="label">Email</label>
          <input
            className="input validator w-11/12 md:w-9/12"
            type="email"
            required
            placeholder="mail@site.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <div className="validator-hint hidden">Enter valid email address</div>

          <label className="label">Password</label>
          <div className="join w-11/12 md:w-9/12">
            <input
              type={showPassword ? "text" : "password"}
              className="input validator join-item"
              required
              placeholder="Password"
              minLength={8}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              className="btn btn-info btn-outline rounded-e"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />
            At least one number
            <br />
            At least one lowercase letter
            <br />
            At least one uppercase letter
          </p>

          <button className="btn btn-info mt-4" onClick={() => handleLogin()}>
            Login
          </button>
          <div className="w-1/2">
            <div className="divider">OR</div>
          </div>
          <div className="flex flex-col">
            <LogInAsGuestButton
              classname="btn-outline btn-info"
              closingModal="LoginDialog"
              modalToClose={true}
            />
            <button
              className="btn btn-info btn-soft mt-4"
              onClick={() => {
                (
                  document.getElementById("LoginDialog") as HTMLDialogElement
                ).close();
                setShowPassword(false);
                (
                  document.getElementById("SignUpDialog") as HTMLDialogElement
                ).show();
              }}
            >
              Sign Up
            </button>
          </div>
        </fieldset>
      </div>
      <form
        method="dialog"
        className="modal-backdrop cursor-none"
        name="Close Login Dialog From Background"
      >
        <button>close</button>
      </form>
    </dialog>
  );
};

export default LoginModal;
