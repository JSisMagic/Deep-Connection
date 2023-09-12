//final-react-project/final-project/src/pages/Landing/LandingPage.jsx
import { Box } from "@chakra-ui/react"
import AboutUs from "../../components/AboutUs/AboutUs"
import Hero from "../../components/Hero/Hero"
import Weather from "../../components/Weather/Weather"
import { useContext, useEffect, useRef } from "react"
import { AppContext } from "../../context/AppContext"
import { publicNavLinks } from "../../common/constrants"
import TrendingEvents from "../../components/TrendingEvents/TrendingEvents"
import Footer from "../../components/Footer/Footer"

const LandingPage = () => {
  const { selectedNavSection } = useContext(AppContext)

  const eventsRef = useRef(null)
  const aboutUsRef = useRef(null)

  useEffect(() => {
    if (selectedNavSection === publicNavLinks.events) {
      eventsRef.current?.scrollIntoView({ behavior: "smooth" })
    } else if (selectedNavSection === publicNavLinks.aboutUs) {
      aboutUsRef.current?.scrollIntoView({ behavior: "smooth" })
    } else if (selectedNavSection === publicNavLinks.home) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [selectedNavSection])

  return (
    <Box>
      <Hero />
      <Box textAlign="center" mt={4}>
        <TrendingEvents ref={eventsRef} />
        <AboutUs ref={aboutUsRef} />
        <Footer />
      </Box>
    </Box>
  )
}

export default LandingPage
