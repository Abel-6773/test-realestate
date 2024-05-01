import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";
import GoogleIcon from "../../assets/svg/googleIcon.svg?react";

export default function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const onClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timeStamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("could not use Google Authentication");
      console.log(error);
    }
  };
  return (
    <div className="socialLogin">
      <p>{location.pathname == "/sign-up" ? "sign-up" : "sign-in"} with</p>
      <button className="socialIconDiv" onClick={onClick}>
        <GoogleIcon />
      </button>
    </div>
  );
}
