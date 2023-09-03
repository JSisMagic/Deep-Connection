import { useState, useEffect } from "react";
import {
  Box,
  StackDivider,
  CardBody,
  Heading,
  Stack,
  CardHeader,
  Text,
  Card,
} from "@chakra-ui/react";

const Notifications = () => {
  
  return (
    <Card>
      <CardHeader>
        <Heading size='md'>Notifications</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Summary
            </Heading>
            <Text pt='2' fontSize='sm'>
              View a summary of all your clients over the last month.
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Overview
            </Heading>
            <Text pt='2' fontSize='sm'>
              Check out the overview of your clients.
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Analysis
            </Heading>
            <Text pt='2' fontSize='sm'>
              See a detailed analysis of all your business clients.
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default Notifications;