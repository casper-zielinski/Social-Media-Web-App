import React from "react";

interface LeftAsideProps {
  loggedIn: boolean;
}

/* Left Side Bar, only for bigger Phones and bigger, search bar and Subscribtion Tab*/

const LeftAside = ({ loggedIn }: LeftAsideProps) => {
  return (
    <aside className="hidden sm:flex sm:flex-col sm:col-span-3 lg:col-span-2 bg-gray-950 border-l-2 border-blue-950 space-y-3.5 p-3">
      <input
        type="text"
        placeholder="Search..."
        className="input input-md rounded-3xl w-95/100"
        name="Search"
      />
      {/* Premium subscription section */}
      <section className="bg-gray-800 rounded-3xl p-3 border border-gray-600 w-95/100">
        <h3 className="text-lg font-bold">Subscribe to Premium</h3>
        <p className="text-sm">
          Subscribe to unlock new features and if eligible, receive a share of
          revenue.
        </p>
        <button className="btn btn-outline btn-info mt-3">Subscribe</button>
      </section>
    </aside>
  );
};

export default LeftAside;
