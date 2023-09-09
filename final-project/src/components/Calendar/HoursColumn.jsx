import { Grid, GridItem, Text } from "@chakra-ui/react"
import React from "react"

const HoursColumn = () => {
  const hoursWithMinutes = Array.from({ length: 24 }).reduce(
    (result, _, i) => [...result, `${i}:00`, `${i}:30`],
    []
  )

  return (
    <Grid templateRows={{ base: "repeat(48, 20px)", md: "repeat(48, 30px)" }}>
      {hoursWithMinutes.map((hour, i) => (
        <GridItem
          key={hour}
          borderBottom={i % 2 === 0 ? "1px dashed" : "none"}
          borderTop={i % 2 === 0 ? "1px solid" : "none"}
          borderColor="#CBD5E0"
        >
          <Text 
            fontSize={{ base: i % 2 === 0 ? "xs" : "2xs", md: i % 2 === 0 ? "sm" : "xs" }}
            px={{ base: 1, md: 2 }}
            pt={1}
            textAlign="right"
          >
            {hour}
          </Text>
        </GridItem>
      ))}
    </Grid>
  )
}

export default HoursColumn
