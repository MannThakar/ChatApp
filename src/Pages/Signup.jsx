// /* eslint-disable no-unused-vars */
// import { auth, provider } from '../Config/Firebase'
// import { signInWithPopup } from 'firebase/auth'
// import Cookies from 'universal-cookie';
// const Signup = () => {

//     async function signupWithGoogle(props) {

//         // Google Sign Up Logic
//         try {
//             const Google = await signInWithPopup(auth, provider);
//             console.log(Google);
//             const cookies = new Cookies();
//             cookies.set('token', Google.user.refreshToken);

//         }
//         catch (error) {
//             console.log(error.message);
//         }

//     }

//     return (
//         <>
//             <h1>Signup</h1>
//             <button onClick={signupWithGoogle}>SignUp With Google</button>
//         </>
//     )
// }

// export default Signup

/* eslint-disable no-unused-vars */
import { auth, provider } from "../Config/Firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import GoogleLogo from "../Components/GoogleLogo";

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
    <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center min-h-screen">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-center w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Signup</h1>
        <button
          onClick={signupWithGoogle}
          className="relative w-full px-4 py-2 bg-blue-500 h-11 text-white uppercase font-semibold shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 flex items-center justify-between gap-5"
        >
          <GoogleLogo />
          <span>Sign Up With Google</span>
        </button>
      </div>
    </div>
  );
};

export default Signup;
