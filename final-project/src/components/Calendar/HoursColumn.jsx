import { Grid, GridItem, Text } from "@chakra-ui/react"
import React from "react"

const HoursColumn = () => {
  const hoursWithMinutes = Array.from({ length: 24 }).reduce(
    (result, _, i) => [...result, `${i}:00`, `${i}:30`],
    []
  )

  return (
    <Grid borderRight="1px solid" borderColor="#CBD5E0" templateRows="repeat(48, 30px)">
      {hoursWithMinutes.map((hour, i) => (
        <GridItem
          key={hour}
          borderBottom={i % 2 === 0 && "1px dashed"}
          borderTop={i % 2 === 0 && "1px solid"}
          borderColor="#CBD5E0"
        >
          <Grid gap={2}>
            <GridItem>
              <Text fontSize={i % 2 === 0 ? "sm" : "xs"} px={2} pt={1} textAlign="right">
                {hour}
              </Text>
            </GridItem>
          </Grid>
        </GridItem>
      ))}
    </Grid>
  )
}

export default HoursColumn
