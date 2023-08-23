import { HamburgerIcon } from "@chakra-ui/icons"
import { Avatar, Box, Grid, GridItem, Heading, IconButton } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../../services/auth.services"
import { useContext } from "react"
import { AppContext } from "../../context/AppContext"
import { HEADER_HEIGHT } from "../../common/constrants"

const PrivateHeader = () => {
  const { showMobileSidebar, toggleSidebar } = useContext(AppContext)

  return (
    <Box px={5} pt={3} height={HEADER_HEIGHT}>
      <Grid templateColumns="repeat(3, 1fr)" justifyContent="center">
        <GridItem>
          <IconButton
            display={{ base: showMobileSidebar ? "none" : "block", lg: "block" }}
            zIndex={99}
            size="lg"
            color={{
              base: showMobileSidebar ? "white" : "black",
              lg: "black",
            }}
            _focus={{ bg: "transparent" }}
            variant="ghost"
            icon={<HamburgerIcon />}
            onClick={toggleSidebar}
          />
        </GridItem>
        {/* <GridItem textAlign="right">
          <Heading textAlign="center">Logo</Heading>
        </GridItem> */}
      </Grid>
    </Box>
  )
}

export default PrivateHeader
