import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const AppContext = React.createContext();

export function useAuth() {
  return useContext(AppContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [movies, setMovies] = useState();
  const [genres, setGenres] = useState();
  const [loading, setLoading] = useState(true);

  async function signup(email, password) {
    let result = await auth.createUserWithEmailAndPassword(email, password);
    await setDoc(doc(db, "users", email), {
      email: email,
      likes: [],
      friends: [],
    });
    return result;
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      fetch("https://api.tvmaze.com/schedule/full")
        .then((response) => response.json())
        .then((result) => {
          let movies = [];
          result.forEach((item) => {
            let findItem = movies.find((x) => x.id === item._embedded.show.id);
            if (!findItem)
              movies.push({
                id: item._embedded.show.id,
                title: item._embedded.show.name,
                img: item._embedded.show.image?.medium,
                genres: item._embedded.show.genres,
              });
          });

          setMovies(movies);
          setGenres([
            ...new Set(
              movies
                .map((movie) => {
                  return movie.genres;
                })
                .flat()
            ),
          ]);
          setLoading(false);
        });
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    movies,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    genres,
  };

  return (
    <AppContext.Provider value={value}>
      {!loading && children}
    </AppContext.Provider>
  );
}
