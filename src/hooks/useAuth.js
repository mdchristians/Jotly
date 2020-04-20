import React, { useState, useEffect, useContext } from "react";
import dayjs from 'dayjs';
import { Db, Auth } from '../config/firebase';

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = Auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser({
          userId: authUser.uid
        })
      } else {
        setUser(false)
      }
    })

    return () => unsubscribe()
  }, [])

  if (user === null) {
    return <h1>Auth Context Loading...</h1>
  }

  const login = ({ email, password }) => Auth.signInWithEmailAndPassword(email, password);
  const register = async ({ firstName, lastName, email, password }) => {
    try {
      const { user } = await Auth.createUserWithEmailAndPassword(email, password);
      await user.updateProfile({ displayName: `${firstName} ${lastName}` });
      return Db.collection("users").doc(user.uid).set({
        createdAt: dayjs().format(),
        id: user.uid,
        firstName,
        lastName,
        email
      })
    } catch(err) {
      console.error(err)
    }
  }
  const logout = () => Auth.signOut();
  
  return (
    <AuthContext.Provider value={{ user, login, register, logout }} {...props} />
  )
}

const useAuth = () => React.useContext(AuthContext)

export { AuthProvider, useAuth }
