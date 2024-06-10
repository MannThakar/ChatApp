/* eslint-disable no-unused-vars */
import { auth, provider } from '../Config/Firebase'
import { signInWithPopup } from 'firebase/auth'
import Cookies from 'universal-cookie';
const Signup = () => {


    async function signupWithGoogle(props) {

        
        // Google Sign Up Logic
        try {
            const Google = await signInWithPopup(auth, provider);
            console.log(Google);
            const cookies = new Cookies();
            cookies.set('token', Google.user.refreshToken);

        }
        catch (error) {
            console.log(error.message);
        }

    }

    return (
        <>
            <h1>Signup</h1>
            <button onClick={signupWithGoogle}>SignUp With Google</button>
        </>
    )
}

export default Signup