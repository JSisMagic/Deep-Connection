import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import PublicEvents from "../../components/Events/PublicEvents"
import PrivateEvents from "../../components/Events/PrivateEvents"
import MyEvents from "../../components/Events/MyEvents"
import { COOL_BLUE, COOL_GREEN, COOL_PURPLE } from "../../common/colors"

const EventsPage = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {}, [])

  return (
    <Tabs variant="enclosed-colored" colorScheme="blue" p={5} height="100%">
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
          <MyEvents />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default EventsPage
