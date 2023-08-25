import { Box, Flex } from "@chakra-ui/react"
import PrivateHeader from "../components/PrivateHeader/PrivateHeader"
import Sidebar from "../components/Sidebar/Sidebar"
import { HEADER_HEIGHT } from "../common/constrants"

const ApplicationLayout = ({ children }) => {
  return (
    <Flex height="100vh" w={{ base: "fit-content", sm: "full" }}>
      <Sidebar />
      <Box position="relative" flexGrow={1} height="100vh">
        <PrivateHeader />
        <Box overflowY="hidden" height={`calc(100vh - ${HEADER_HEIGHT})`} position="relative">
          {children}
        </Box>
      </Box>
    </Flex>
  )
}

export default ApplicationLayout
