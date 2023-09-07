import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { useContext } from "react"
import { COOL_BLUE, COOL_GREEN, COOL_PURPLE } from "../../common/colors"
import MyEvents from "../../components/Events/MyEvents"
import PrivateEvents from "../../components/Events/PrivateEvents"
import PublicEvents from "../../components/Events/PublicEvents"
import { AuthContext } from "../../context/AuthContext"

const EventsPage = () => {
  const { user } = useContext(AuthContext)

  return (
    <Tabs variant="enclosed-colored" colorScheme="blue" p={3}>
      <TabList>
        <Tab _selected={{ color: "white", fontWeight: 600, bg: COOL_BLUE }}>Public</Tab>
        <Tab _selected={{ color: "white", fontWeight: 600, bg: COOL_PURPLE }}>Private</Tab>
        <Tab _selected={{ color: "white", fontWeight: 600, bg: COOL_GREEN }}>My events</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <PublicEvents />
        </TabPanel>
        <TabPanel>
          <PrivateEvents />
        </TabPanel>
        <TabPanel>
          <MyEvents uid={user?.uid} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default EventsPage
