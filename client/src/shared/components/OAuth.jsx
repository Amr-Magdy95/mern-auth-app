import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice";

const OAuth = () => {
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL || "",
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
    >
      Continue with google
    </button>
  );
};

export default OAuth;
