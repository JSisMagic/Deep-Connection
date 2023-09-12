import { createContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [appState, setAppState] = useState({
    showSidebar: true,
    showMobileSidebar: false,
    selectedNavSection: null,
  })

  const toggleSidebar = () => {
    setAppState(prev => ({
      showSidebar: !prev.showSidebar,
      showMobileSidebar: !prev.showMobileSidebar,
    }))
  }

  const hideMobileSidebar = () => {
    setAppState(prev => ({
      ...prev,
      showMobileSidebar: false,
    }))
  }

  const handleClickNavLink = link => {
    if (pathname !== "/") {
      navigate("/")
    }
    setAppState(prev => ({ ...prev, selectedNavSection: link }))
  }

  return (
    <AppContext.Provider
      value={{
        showSidebar: appState.showSidebar,
        showMobileSidebar: appState.showMobileSidebar,
        toggleSidebar,
        hideMobileSidebar,
        selectedNavSection: appState.selectedNavSection,
        handleClickNavLink,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
