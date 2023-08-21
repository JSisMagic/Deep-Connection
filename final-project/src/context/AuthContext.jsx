import { createContext, useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../config/firebase"
import { getUserByUid } from "../services/users.services"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, loading] = useAuthState(auth)

  const [authState, setAuthState] = useState({
    user: null,
    userData: null,
  })
  
  useEffect(() => {
    if (user && !loading) {
      getUserByUid(user.uid).then(userData =>
        setAuthState({
          user: {
            email: user.email,
            uid: user.uid,
          },
          userData,
        })
      )
    } else {
      setAuthState({
        user: null,
        userData: null,
      })
    }
  }, [user, loading])

  return (
    <AuthContext.Provider
      value={{ user: authState.user, userData: authState.userData, setAuthState }}
    >
      {children}
    </AuthContext.Provider>
  )
}
