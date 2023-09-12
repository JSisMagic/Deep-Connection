import { Box, Flex, Grid, GridItem, Heading, IconButton, Stack, Text } from "@chakra-ui/react"
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"
import Logo from "../Logo/Logo"

const socialMediaLinks = [
  { url: "", icon: <FaInstagram /> },
  { url: "", icon: <FaFacebook /> },
  { url: "", icon: <FaLinkedin /> },
]

const Footer = () => {
  const handleClickLink = url => {
    window.open(url, "_blank").focus()
  }

  return (
    <Flex
      bg="linear-gradient(135deg, #D5297E, #3490E3)"
      color="white"
      justify="space-between"
      align="center"
      py={6}
      px={{ base: 8, md: 16 }}
    >
      <Box>
        <Logo width={10} />
      </Box>
      <Flex justify="center" gap={3}>
        {socialMediaLinks.map(({ url, icon }) => (
          <IconButton
            key={url}
            icon={icon}
            bg="transparent"
            color="white"
            _hover={{ bg: "rgba(255,255,255, .2)" }}
            size="lg"
            onClick={() => handleClickLink(url)}
          />
        ))}
      </Flex>
      <Stack justify="center">
        <Heading size="sm">Telerik Academy</Heading>
        <Text> @2023</Text>
      </Stack>
    </Flex>
  )
}

export default Footer
