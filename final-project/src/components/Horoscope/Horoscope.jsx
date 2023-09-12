import { useEffect, useState } from "react"
import { getHoroscope } from "../../services/horoscope.services"
import { Box, Flex, FormControl, FormLabel, Select, Stack, Text } from "@chakra-ui/react"
import bgImage from "../../assets/images/hero.png"

const sunsigns = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
]

const Horoscope = () => {
  const [horoscope, setHoroscope] = useState("")
  const [selectedSunsign, setSelectedSunsign] = useState("aries") // Set an initial value

  const handleSunsignChange = event => {
    setSelectedSunsign(event.target.value)
  }

  useEffect(() => {
    getHoroscope(selectedSunsign)
      .then(response => response.json())
      .then(body => setHoroscope(body.Horoscope))
      .catch(console.error)
  }, [selectedSunsign])
  return (
    <Box bg="linear-gradient(135deg, #8232B2, #3490E3)" borderRadius="lg" overflow="auto">
      <Stack gap={5} bg="white" m={2} p={3}>
        <FormControl>
          <FormLabel>Select a sun sign</FormLabel>
          <Select onChange={handleSunsignChange}>
            {sunsigns.map(sunsign => (
              <option key={sunsign} value={sunsign}>
                {sunsign}
              </option>
            ))}
          </Select>
        </FormControl>

        <Text>{horoscope}</Text>
      </Stack>
    </Box>
  )
}

export default Horoscope
