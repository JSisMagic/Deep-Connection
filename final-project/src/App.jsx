import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import theme from "./config/theme"

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  )
}

export default App
