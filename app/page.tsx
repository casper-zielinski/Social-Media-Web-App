import Main from "./components/layout/Main";
import LeftAside from "./components/layout/LeftAside";

{
  /**
   * Home page component for the social media app.
   *
   * Layout:
   * - Left sidebar (desktop): Navigation, post button, user avatar.
   * - Main section: Displays either "For you" or "Following" feed, controlled by navigationPagerForYou state.
   * - Right sidebar (desktop): Search input and premium subscription prompt.
   * - Footer (mobile): Navigation and post button.
   *
   * @component
   */
}

export default function page() {
  return (
    <>
      {/* Main content section displaying the feed based on navigationPagerForYou state */}
      <Main />
      {/* Left Side Bar, only for bigger Phones and bigger, search bar and Subscribtion Tab*/}
      <LeftAside />
    </>
  );
}
