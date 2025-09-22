import { auth } from "@/firebase";
import { logIn } from "@/redux/slices/loginSlice";
import { signInUser } from "@/redux/slices/userSlice";
import { AppDispatch } from "@/redux/store";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import LogInAsGuestButton from "./LogInAsGuestButton";

const SignUpModal = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch: AppDispatch = useDispatch();

  async function handleSignUp() {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredentials.user, {
      displayName: username,
    });

    dispatch(
      signInUser({
        name: userCredentials.user.displayName,
        username: userCredentials.user.email?.split(".")[0],
        email: userCredentials.user.email,
        uid: userCredentials.user.uid,
      })
    );

    (document.getElementById("SignUpDialog") as HTMLDialogElement).close();
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;

      dispatch(
        signInUser({
          name: currentUser.displayName,
          username: currentUser.email?.split("@")[0].split(".")[0],
          email: currentUser.email,
          uid: currentUser.uid,
        })
      );
      dispatch(logIn());
    });

    return unsubscribe;
  }, []);

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
        <fieldset className="fieldset rounded-box w-xs flex flex-col items-center">
          <legend className="fieldset-legend mb-5 text-base md:text-lg">
            Sign Up
          </legend>

          <label className="label">Username</label>
          <input
            type="text"
            className="input w-11/12 md:w-9/12 text-white"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

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
          <div className="join w-11/12 md:w-9/12">
            <input
              type={showPassword ? "text" : "password"}
              className="input validator join-item text-white"
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

          {/* <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />
            At least one number
            <br />
            At least one lowercase letter
            <br />
            At least one uppercase letter
          </p> */}

          <button className="btn btn-info mt-4" onClick={() => handleSignUp()}>
            Sign Up
          </button>
          <div className="w-1/2">
            <div className="divider">OR</div>
          </div>
          <div className="flex flex-col space-y-4">
            <button
              className="btn btn-info btn-soft mt-4"
              onClick={() => {
                (
                  document.getElementById("SignUpDialog") as HTMLDialogElement
                ).close();
                setShowPassword(false);
                (
                  document.getElementById("LoginDialog") as HTMLDialogElement
                ).show();
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
