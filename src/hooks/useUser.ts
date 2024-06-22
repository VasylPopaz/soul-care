import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase";

export const useUser = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
      setIsLoading(true);
    };
  }, []);

  return { currentUser, isLoading };
};
