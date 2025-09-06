import Main from "./components/Main";
import PopUpModals from "./components/PopUpModals";
import RightAside from "./components/RightAside";
import LeftAside from "./components/LeftAside";
import Footer from "./components/Footer";

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
    <div className="grid grid-cols-12 w-full">
      {/* Modals for Login & Posting */}
      <PopUpModals />

      {/* 
      Right Side Bar with Buttons for Navigation like Home, Search, AI-Tools etc. 
      both visible on Mobile and on Desktop, but without Text on Mobile (only Button Icons)
      */}
      <RightAside />

      {/* Main content section displaying the feed based on navigationPagerForYou state */}
      <Main />

      {/* Left Side Bar, only for bigger Phones and bigger, search bar and Subscribtion Tab*/}
      <LeftAside />

      {/* The Footer Interface for Smart Phones or, if User not Logged In, Shows Login or Sign Up Prop*/}
      <Footer />
    </div>
  );
}
