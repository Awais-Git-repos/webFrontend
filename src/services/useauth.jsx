import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Firebase Client Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCE1j9CLOvGLRcbUiqStCQF26tX4zWvkeI",
  authDomain: "attendance-tracker-f7098.firebaseapp.com",
  projectId: "attendance-tracker-f7098",
  storageBucket: "attendance-tracker-f7098.appspot.com",
  messagingSenderId: "986664752642",
  appId: "1:986664752642:web:dbdb004496b4307d9eb91b",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Custom Hook
const useLoginUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const loginUser = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();

      setUser({
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        idToken,
      });

      console.log("User logged in successfully:", userCredential.user);
      console.log("ID Token:", idToken);
    } catch (err) {
      setError(err.message);
      console.error("Login Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error, user };
};

export default useLoginUser;
