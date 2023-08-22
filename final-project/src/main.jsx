import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./main.css"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import theme from "./config/theme.js"
import { BrowserRouter } from "react-router-dom"
import { AuthContextProvider } from "./context/AuthContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </ChakraProvider>
  </React.StrictMode>
)
