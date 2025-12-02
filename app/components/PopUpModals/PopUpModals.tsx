import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import LogInOrSignUpModal from "./LogInOrSignUpModal";
import PostModal from "./PostModal";

/* All the Pop Up Modules,
  Login, Sign Up, Login Or Sign Up (Choose Modal) and Post Modal, 
  to send a Post */

const PopUpModals = () => {
  return (
    <>
      {/* Login Dialog */}
      <LoginModal />

      {/* Sign Up Dialog*/}
      <SignUpModal />

      {/* Login or Sign Up Dialog */}
      <LogInOrSignUpModal />

      {/* Post Modal for creating and sending Posts*/}
      <PostModal />
    </>
  );
};

export default PopUpModals;
