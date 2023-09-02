//final-react-project/final-project/src/components/AboutUse/AboutUs.jsx

import {
  Box,
  Heading,
  Text,
  Link,
  Flex,
  Image,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { SiGitlab, SiLinkedin } from "react-icons/si";
import { Helmet } from "react-helmet";
import Gergana from "../assets/images/Gergana.png";
import Mariela from "../assets/images/Mariela.png";

const team = [
  {
    name: "Gergana Dragoeva Quievy",
    role: "Web Developer",
    imageUrl: Gergana,
    gitlabUrl: "https://gitlab.com/gerganadq",
    linkedinUrl:
      "https://www.linkedin.com/in/gergana-dragoeva-quievy-20b25b97/",
    bio: "Bio for Gergana goes here.",
  },
  {
    name: "Mariela Ivanova",
    role: "Web Developer",
    imageUrl: Mariela,
    gitlabUrl: "https://gitlab.com/mariela.ivanova",
    linkedinUrl: "https://www.linkedin.com/in/mariela-ivanova-1270771a8/",
    bio: "Bio for Mariela goes here.",
  },
];

export default function AboutUs() {
  return (
    <Box>
      <Helmet title="About us" />
      <Box bg="white" py={12} px={4} maxW="7xl" mx="auto" textAlign="center">
        <Heading as="h2" size="2xl" fontWeight="extrabold" mb={5}>
          About Us
        </Heading>
        <Text fontSize="xl" color="gray.500" mb={12}>
          Our mission is to help people organize their day-to-day life and help
          them keep track of their upcoming events.
        </Text>
        <Flex
          direction={{ base: "column", md: "row" }}
          alignItems="center"
          justify="center"
        >
          <Image
            src={Gergana}
            alt="Gergana"
            boxSize="200px"
            borderRadius="full"
            shadow="lg"
            mb={{ base: 6, md: 0 }}
          />
          <Stack ml={{ md: 10 }} mt={{ base: 6, md: 0 }} spacing={4}>
            <Heading as="h3" size="lg" fontWeight="medium">
              Gergana Dragoeva Quievy
            </Heading>
            <Text color="gray.400">Web Developer</Text>
            <Text>{team[0].bio}</Text>
            <Flex mt={4} alignItems="center">
              <IconButton
                as={Link}
                href={team[0].gitlabUrl}
                target="_blank"
                rel="noopener noreferrer"
                color="orange.500"
                _hover={{ color: "orange.700" }}
                aria-label="Gitlab"
                icon={<SiGitlab />}
                fontSize="20px"
              />
              <IconButton
                as={Link}
                href={team[0].linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                color="blue.500"
                _hover={{ color: "blue.400" }}
                aria-label="LinkedIn"
                icon={<SiLinkedin />}
                fontSize="20px"
                ml={2}
              />
            </Flex>
          </Stack>
        </Flex>
        <Flex
          direction={{ base: "column-reverse", md: "row" }}
          alignItems="center"
          justify="center"
          mt={12}
        >
          <Image
            src={Mariela}
            alt="Mariela"
            boxSize="200px"
            borderRadius="full"
            shadow="lg"
            mb={{ base: 6, md: 0 }}
          />
          <Stack
            mr={{ md: 10 }}
            mt={{ base: 6, md: 0 }}
            spacing={4}
            textAlign={{ base: "center", md: "left" }}
          >
            <Heading as="h3" size="lg" fontWeight="medium">
              Mariela Ivanova
            </Heading>
            <Text color="gray.400">Web Developer</Text>
            <Text>{team[1].bio}</Text>
            <Flex mt={4} alignItems="center">
              <IconButton
                as={Link}
                href={team[1].gitlabUrl}
                target="_blank"
                rel="noopener noreferrer"
                color="orange.500"
                _hover={{ color: "orange.700" }}
                aria-label="Gitlab"
                icon={<SiGitlab />}
                fontSize="20px"
              />
              <IconButton
                as={Link}
                href={team[1].linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                color="blue.500"
                _hover={{ color: "blue.400" }}
                aria-label="LinkedIn"
                icon={<SiLinkedin />}
                fontSize="20px"
                ml={2}
              />
            </Flex>
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
}
