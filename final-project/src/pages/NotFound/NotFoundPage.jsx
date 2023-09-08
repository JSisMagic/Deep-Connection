import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import bgImage from "../../assets/images/hero.png"

const NotFoundPage = () => {
  return (
    <Flex direction="column" height="100%" width="100%" justify="center" align="center">
      <Heading>Resource not found</Heading>
      <Text mt={5}>Please make sure you have entered a valid path</Text>
    </Flex>
  )
}

export default NotFoundPage
