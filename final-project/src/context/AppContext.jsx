import { createContext, useState } from "react"

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
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
