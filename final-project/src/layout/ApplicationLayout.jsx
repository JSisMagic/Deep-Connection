import { Box, Flex } from "@chakra-ui/react"
import PrivateHeader from "../components/PrivateHeader/PrivateHeader"
import Sidebar from "../components/Sidebar/Sidebar"
import { HEADER_HEIGHT } from "../common/constrants"

const ApplicationLayout = ({ children, notificationCount }) => {
  return (
    <Flex height="100vh" overflowY="hidden" w={{ base: "fit-content", sm: "full" }}>
      <Sidebar notificationCount={notificationCount}/>
      <Box position="relative" width="100%" height="100vh">
        <PrivateHeader />
        <Box overflowY="auto" height={`calc(100vh - ${HEADER_HEIGHT})`} position="relative">
          {children}
        </Box>
      </Box>
    </Flex>
  )
}

export default ApplicationLayout
