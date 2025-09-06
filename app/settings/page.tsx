import React from "react";
import Button from "../components/Button";

function settingsPage() {
  return (
    <main className="p-2 space-y-3">
      <h1 className="font-bold text-2xl">Settings</h1>
      <h2 className="font-bold text-xl ms-1.5">User Settings</h2>
      <Button text="Log Out" classname="btn btn-info" />
    </main>
  );
}

export default settingsPage;
