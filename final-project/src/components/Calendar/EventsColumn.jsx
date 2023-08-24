import { Grid } from "@chakra-ui/react"

const EventsColumn = ({ events, isUsedInWeek }) => {
  return (
    <Grid
      backgroundImage={`repeating-linear-gradient(180deg, #CBD5E0, #CBD5E0 1px, #FFF 1px, #FFFDFA 30px)`}
      templateRows="repeat(48, 30px)"
      flexGrow={1}
      templateColumns={`repeat(auto-fit, minmax(${isUsedInWeek ? "30px" : "50px"}, 1fr))`}
    ></Grid>
  )
}

export default EventsColumn
