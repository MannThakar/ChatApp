/* eslint-disable no-unused-vars */
import { auth, provider } from "../Config/Firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import GoogleLogo from "../Components/GoogleLogo";
// import GoogleLogo from "../assets/GoogleLogo";

const Signup = () => {
  async function signupWithGoogle(props) {
    // Google Sign Up Logic
    try {
      const Google = await signInWithPopup(auth, provider);
      console.log(Google);
      const cookies = new Cookies();
      cookies.set("token", Google.user.refreshToken);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-green-100">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-center w-full max-w-sm">
        <h1 className="text-5xl font-bold mb-4 text-gray-800">Vibe Talk</h1>
        <img src="public/message.svg" alt="Message Logo" className="h-40 mx-auto mb-4" />
        <h2 className="text-3xl font-semibold mb-8 text-gray-700">Signup</h2>
        <button
          onClick={signupWithGoogle}
          className="relative w-full px-4 py-2 bg-blue-500 h-11 text-white uppercase font-semibold hover:bg-blue-600 flex items-center justify-between rounded-sm"
        >
          <GoogleLogo />
          <span>Sign Up With Google</span>
          <div>{" "}</div>
          <div>{" "}</div>
          <div>{" "}</div>
        </button>
      </div>
    </div>
  );
};

export default Signup;
