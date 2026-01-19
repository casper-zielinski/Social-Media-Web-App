"use client";

import { AppDispatch } from "@/redux/store";
import React, { useMemo, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import LogInAsGuestButton from "../ui/LogInAsGuestButton";
import { closeModal, useModal } from "@/app/hooks/useModal";
import { MODAL_IDS } from "@/app/constants/modal";
import { handleSignUp } from "@/lib/auth";

const SignUpModal = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  let isEmailValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    [email],
  );
  const isPasswordValid = useMemo(
    () => /^(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(password),
    [password],
  );

  const isUsernameValid = useMemo(
    () => username.trim().length >= 5 && username.trim().length <= 25,
    [username],
  );

  const isFormValid = useMemo(
    () => isEmailValid && isPasswordValid && isUsernameValid,
    [isEmailValid, isPasswordValid, isUsernameValid],
  );
  const dispatch: AppDispatch = useDispatch();

  return (
    <dialog
      id="SignUpDialog"
      className="modal modal-middle pt-5"
      data-theme="dark"
    >
      <div className="modal-box">
        <form method="dialog" name="Close Sign Up Dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white"
            onClick={() => setShowPassword(false)}
          >
            ✕
          </button>
        </form>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            isFormValid && handleSignUp(username, email, password, dispatch);
          }}
        >
          <fieldset className="fieldset rounded-box w-xs flex flex-col items-center">
            <legend className="fieldset-legend mb-5 text-base md:text-lg">
              Sign Up
            </legend>

            <label className="label">Username</label>
            <div className="w-full">
              <input
                type="text"
                className="input validator w-full text-white"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                pattern="^(?=(?:\s*\S){5})[\s\S]{1,25}$"
                title="Must be 5-25 characters (not just spaces)"
                minLength={5}
                required
              />
              <div className="validator-hint hidden">
                Must be 5-25 characters (not just spaces)
              </div>
            </div>
            <label className="label">Email</label>
            <div className="w-full">
              {/** in a div, so a unvalid username doesn't trigger email validator */}
              <input
                className="input validator w-full text-white"
                type="email"
                required
                placeholder="mail@site.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                title="Enter a valid email address (e.g. user@example.com)"
              />
              <div className="validator-hint hidden">
                Enter valid email address (e.g. user@example.com)
              </div>
            </div>

            <label className="label">Password</label>
            <div className="join w-full flex-wrap">
              <input
                type={showPassword ? "text" : "password"}
                className="input validator join-item text-white w-10/12"
                required
                placeholder="Password"
                minLength={8}
                pattern="(?=.*\d)(?=.*[a-z]).{8,}"
                title="Must be at least 8 characters including at least one number and one lowercase letter"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                className="btn btn-info btn-outline rounded-e w-2/12 p-0"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>

              <p className="validator-hint hidden">
                Must be at least 8 characters including
                <br />
                at least one number
                <br />
                and one lowercase letter
              </p>
            </div>

            <button
              disabled={!isFormValid}
              className="btn btn-info mt-4"
              type="submit"
            >
              Sign Up
            </button>
            <div className="w-1/2">
              <div className="divider">OR</div>
            </div>
            <div className="flex flex-col space-y-4">
              <button
                className="btn btn-info btn-soft mt-4"
                onClick={() => {
                  closeModal(MODAL_IDS.SIGNUP);
                  setShowPassword(false);
                  useModal(MODAL_IDS.LOGIN);
                }}
              >
                Log in
              </button>
              <LogInAsGuestButton
                classname="btn-outline btn-info"
                closingModal="SignUpDialog"
                modalToClose={true}
              />
            </div>
          </fieldset>
        </form>
      </div>
      <form
        method="dialog"
        className="modal-backdrop cursor-none"
        name="Close Sign Up Dialog from Background"
      >
        <button>close</button>
      </form>
    </dialog>
  );
};

export default SignUpModal;
