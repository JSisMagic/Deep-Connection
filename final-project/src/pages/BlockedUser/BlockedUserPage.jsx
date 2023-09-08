import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import bgImage from "../../assets/images/hero.png"

const BlockedUserPage = () => {
  return (
    <Flex
      direction="column"
      height="100%"
      width="100%"
      justify="center"
      align="center"
      bgImage={bgImage}
    >
      <Box
        width={["90%", "80%", "60%", "30%"]} // responsive width
        maxWidth="500px" // example max width to set
        bgColor="rgba(255,255,255)"
        backdropFilter="blur(16px)"
        padding={["1rem", "2rem"]} // smaller padding for mobile and larger for other devices
        borderRadius="lg"
        boxShadow="2xl"
        textAlign="center"
      >
        <Heading>Account Suspended</Heading>
        <Text mt={5}>
          Oops! It seems your account has been temporarily blocked due to a violation of our
          community guidelines.
          <br />
          <br />
          If you believe this is a mistake, or if you need help resolving the issue, contact our support
          team. 
          <br />
          <br />
          We value your presence and want to help you get back on track. Thank you for your
          understanding.
        </Text>
      </Box>
    </Flex>
  )
}

export default BlockedUserPage
