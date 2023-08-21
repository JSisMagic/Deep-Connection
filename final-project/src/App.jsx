import { ChakraProvider } from "@chakra-ui/react"
import { RouterProvider } from "react-router-dom"
import theme from "./config/theme"
import { AuthContextProvider } from "./context/AuthContext"
import { router } from "./router"

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </ChakraProvider>
  )
}

export default App
