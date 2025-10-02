import React from "react";
import UserSettings from "./UserSetting";
import PrivacySettings from "./PrivacySettings";
import AppearanceSettings from "./AppearanceSettings";

function settingsPage() {
  return (
    <main className="p-2 space-y-5 col-span-9 h-[100vh] overflow-y-auto overflow-x-hidden pb-36 sm:pb-4 scrollbar-hide">
      <h1 className="font-bold text-2xl text-blue-700">Settings</h1>
      <h2 className="font-bold text-lg text-gray-400">
        Manage your account settings and preferences
      </h2>
      <section
        id="user-setting-section"
        className="m-2 p-2 flex flex-col space-y-10 bg-slate-300 border-[1px] rounded dark:bg-gray-800 dark:border-gray-600"
      >
        <UserSettings />
      </section>
      <section
        id="privacy-setting-section"
        className="m-2 p-2 flex flex-col space-y-10 bg-slate-300 border-[1px] rounded dark:bg-gray-800 dark:border-gray-600"
      >
        <PrivacySettings />
      </section>
      <section
        id="Appearance-setting-section"
        className="m-2 p-2 flex flex-col space-y-10 bg-slate-300 border-[1px] rounded dark:bg-gray-800 dark:border-gray-600"
      >
        <AppearanceSettings />
      </section>
    </main>
  );
}

export default settingsPage;
