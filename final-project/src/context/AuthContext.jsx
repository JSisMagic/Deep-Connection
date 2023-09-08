import { createContext, useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../config/firebase"
import { getUserByUid } from "../services/users.services"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../services/auth.services"
import { Spinner, Center, Flex  } from "@chakra-ui/react"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, loading] = useAuthState(auth)

  const [authState, setAuthState] = useState({
    user: null,
    userData: null,
  })

  useEffect(() => {
    if (user && !loading) {
      getUserByUid(user.uid).then(userData => {
        if (userData.isBlocked) {
          navigate("/blocked")
          logoutUser()
        }

        setAuthState({
          user: {
            email: user.email,
            uid: user.uid,
          },
          userData,
        })
      })
    } else {
      setAuthState({
        user: null,
        userData: null,
      })
    }
  }, [user, loading])

  if (loading) {
    return <Center h="100vh"><Spinner /></Center>
  }

  return (
    <AuthContext.Provider
      value={{ user: authState.user, userData: authState.userData, setAuthState }}
    >
      {children}
    </AuthContext.Provider>
  )
}
