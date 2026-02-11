import { HiDotsHorizontal } from "react-icons/hi";
import FollowSection from "../LeftAsideComponents/FollowSection";
import { Suspense } from "react";
import FollowSectionFallback from "../LeftAsideComponents/FollowSectionFallback";

/* Left Side Bar, only for bigger Phones and bigger, search bar and Subscribtion Tab*/

const LeftAside = () => {
  return (
    <aside className="hidden bg-slate-100 dark:bg-gray-950 lg:flex lg:flex-col lg:col-span-3 border-l-2 border-blue-400 dark:border-blue-950 space-y-3.5 p-3 h-[100vh] overflow-y-auto scrollbar-hide">
      <input
        type="text"
        placeholder="Search..."
        className="rounded-3xl p-4 w-95/100 bg-slate-300 dark:bg-gray-800 text-black dark:text-white border border-gray-600"
        name="Search"
      />
      {/* Premium subscription section */}
      <section className="bg-blue-100 dark:bg-gray-800 rounded-3xl p-3 border border-gray-600 w-95/100">
        <h3 className="text-lg font-bold text-black dark:text-white">
          Subscribe to Premium
        </h3>
        <p className="text-sm text-gray-400">
          Subscribe to unlock new features and if eligible, receive a share of
          revenue.
        </p>
        <button className="btn btn-outline btn-info mt-3">Subscribe</button>
      </section>

      {/*What's happening Section */}
      <section className="bg-blue-100 dark:bg-gray-800 rounded-3xl p-3 border border-gray-600 w-95/100">
        <h3 className="text-lg font-bold mb-4 text-black dark:text-white">
          What's happening
        </h3>
        <div className="mb-3">
          <div className="flex items-center">
            <p className="text-sm text-gray-500">Trending in Austria</p>
            <p className="ms-auto">
              <HiDotsHorizontal className="hover:font-bold text-black dark:text-white" />
            </p>
          </div>
          <p className="text-sm font-bold text-black dark:text-white">#React</p>
          <p className="text-sm text-gray-500">220k Clicks</p>
        </div>
        <div className="mb-3">
          <div className="flex items-center">
            <p className="text-sm text-gray-500">Trending in Austria</p>
            <p className="ms-auto">
              <HiDotsHorizontal className="hover:font-bold text-black dark:text-white" />
            </p>
          </div>
          <p className="text-sm font-bold text-black dark:text-white">#React</p>
          <p className="text-sm text-gray-500">220k Clicks</p>
        </div>
        <div className="mb-3">
          <div className="flex items-center">
            <p className="text-sm text-gray-500">Trending in Austria</p>
            <p className="ms-auto">
              <HiDotsHorizontal className="hover:font-bold text-black dark:text-white" />
            </p>
          </div>
          <p className="text-sm font-bold text-black dark:text-white">#React</p>
          <p className="text-sm text-gray-500">220k Clicks</p>
        </div>
      </section>

      {/* Who to follow Section*/}
      <section className="bg-blue-100 dark:bg-gray-800 p-3.5 rounded-3xl border border-gray-600 space-y-3">
        <Suspense fallback={<FollowSectionFallback />}>
          <FollowSection />
        </Suspense>
      </section>
    </aside>
  );
};

export default LeftAside;
