const MainHeader = ({
  navigationPagerForYou,
  setNavigationPagerForYou,
}: {
  navigationPagerForYou: boolean;
  setNavigationPagerForYou: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

  return (
    <>
      <div
        className={`dark:hover:bg-gray-800 hover:bg-gray-400 p-3 cursor-pointer ${
          navigationPagerForYou ? "font-bold" : "text-gray-500"
        }`}
        onClick={() => {
          setNavigationPagerForYou(true);
        }}
      >
        <p className="text-black dark:text-white">For you</p>
      </div>
      <div
        className={`dark:hover:bg-gray-800 hover:bg-gray-400 p-3 cursor-pointer ${
          navigationPagerForYou ? "text-gray-500" : "font-bold"
        }`}
        onClick={() => {
          setNavigationPagerForYou(false);
        }}
      >
        <p className="text-black dark:text-white">Following</p>
      </div>
      <div
        className={`items-end w-1/2 h-1 translate-x-1/2 rounded ${
          navigationPagerForYou ? "bg-sky-600" : "bg-white dark:bg-gray-950"
        }`}
      ></div>
      <div
        className={`items-end w-1/2 h-1 translate-x-1/2 rounded ${
          navigationPagerForYou ? "bg-white dark:bg-gray-950" : "bg-sky-600"
        }`}
      ></div>
    </>
  );
};

export default MainHeader;
