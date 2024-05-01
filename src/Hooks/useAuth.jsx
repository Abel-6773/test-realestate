import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function useAuth() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      }
      setLoading(false);
    });
  });
  return { authenticated, loading };
}

export { useAuth };
