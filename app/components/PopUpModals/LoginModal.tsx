"use client";

import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LogInAsGuestButton from "../LogInAsGuestButton";
import { closeModal, useModal } from "@/app/hooks/useModal";
import { MODAL_IDS } from "@/app/constants/modal";
import { handleLogin } from "@/lib/auth";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

/* Modal for Loging In with Email and Password*/

const LoginModal = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const isValidPassword = /^(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(password);
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = isValidEmail && isValidPassword;

  return (
    <dialog id="LoginDialog" className="modal" data-theme="dark">
      <div className="modal-box w-4/5 sm:w-3/5 max-w-md">
        <form method="dialog" name="Close Login Dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white"
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
            className="input validator w-11/12 md:w-9/12 text-white"
            type="email"
            required
            placeholder="mail@site.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <div className="validator-hint hidden">Enter valid email address</div>

          <label className="label">Password</label>
          <div className="join w-full md:w-9/12 flex-wrap">
            <input
              type={showPassword ? "text" : "password"}
              className="input validator join-item text-white w-9/12"
              required
              placeholder="Password"
              minLength={8}
              pattern="(?=.*\d)(?=.*[a-z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              className="btn btn-info btn-outline rounded-e"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />
              At least one number
              <br />
              At least one lowercase letter
            </p>
          </div>

          <button
            className="btn btn-info mt-4"
            onClick={() => handleLogin(email, password, dispatch)}
            disabled={!isFormValid}
          >
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
                closeModal(MODAL_IDS.LOGIN);
                setShowPassword(false);
                useModal(MODAL_IDS.SIGNUP);
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
