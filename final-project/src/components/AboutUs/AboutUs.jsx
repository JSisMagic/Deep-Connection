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
import Gergana from "../../assets/images/Gergana.png";
import Mariela from "../../assets/images/Mariela.png";
import { forwardRef } from "react";

const team = [
  {
    name: "Gergana Dragoeva Quievy",
    role: "Web Developer",
    imageUrl: Gergana,
    gitlabUrl: "https://gitlab.com/gerganadq",
    linkedinUrl:
      "https://www.linkedin.com/in/gergana-dragoeva-quievy-20b25b97/",
    bio: "Creative, ambitious and motivated frontend developer with a visionary mindset and a flair for groundbreaking solutions.",
  },
  {
    name: "Mariela Ivanova",
    role: "Web Developer",
    imageUrl: Mariela,
    gitlabUrl: "https://gitlab.com/mariela.ivanova",
    linkedinUrl: "https://www.linkedin.com/in/mariela-ivanova-1270771a8/",
    bio: "Goal-oriented frontend developer with an organized, pragmatic mindset, consistently fostering a dynamic work atmosphere",
  },
];

const AboutUs = forwardRef(function AboutUs(props, ref) {
  return (
    <Box ref={ref}>
      <Helmet title="About us" />
      <Box
        bg="white"
        py={12}
        px={4}
        maxW="7xl"
        mx="auto"
        textAlign="center"
        borderRadius="lg"
        boxShadow="lg"
      >
        <Heading as="h2" size="2xl" fontWeight="extrabold" mb={5}>
          About Us
        </Heading>
        <Text fontSize="xl" color="gray.500" mb={12}>
          Deep Connection is more than just an event planning platform; it's a
          gateway to a world of deep connections and meaningful experiences. We
          believe that connecting with like-minded individuals can lead to
          personal growth, and our platform is designed to make that journey
          effortless.
        </Text>
        <Heading as="h3" size="xl" fontWeight="bold" mt={8} mb={4}>
          Who We Are:
        </Heading>
        <Text fontSize="xl" color="gray.500" mb={4}>
          Deep Connection is a passionate team of individuals who believe in the
          power of profound connections. Our platform is the culmination of our
          shared vision to make meaningful connections more accessible.
        </Text>
        <Flex
          direction={{ base: "column", md: "row" }}
          alignItems={{ base: "center", md: "flex-start" }}
          justifyContent="space-between"
          mb={8}
          flexWrap="wrap"
        >
          <Box
            bg="white"
            py={8}
            px={4}
            textAlign="center"
            borderRadius="lg"
            boxShadow="lg"
            width={{ base: "100%", md: "45%" }}
            mb={6}
            mr={4}
          >
            <Image
              src={Gergana}
              alt="Gergana"
              boxSize="200px"
              borderRadius="full"
              shadow="lg"
              mb={6}
              mx="auto"
            />
            <Heading as="h3" size="lg" fontWeight="medium">
              Gergana Dragoeva Quievy
            </Heading>
            <Text color="gray.400">Web Developer</Text>
            <Text>{team[0].bio}</Text>
            <Flex mt={4} alignItems="center" justifyContent="center">
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
          </Box>
          <Box
            bg="white"
            py={8}
            px={4}
            textAlign="center"
            borderRadius="lg"
            boxShadow="lg"
            width={{ base: "100%", md: "45%" }}
            mb={6}
          >
            <Image
              src={Mariela}
              alt="Mariela"
              boxSize="200px"
              borderRadius="full"
              shadow="lg"
              mb={6}
              mx="auto"
            />
            <Heading as="h3" size="lg" fontWeight="medium">
              Mariela Ivanova
            </Heading>
            <Text color="gray.400">Web Developer</Text>
            <Text>{team[1].bio}</Text>
            <Flex mt={4} alignItems="center" justifyContent="center">
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
          </Box>
        </Flex>
        <Heading as="h3" size="xl" fontWeight="bold" mt={8} mb={4}>
          Our Mission:
        </Heading>
        <Text fontSize="xl" color="gray.500" mb={12}>
          Our mission is to empower individuals to create profound connections,
          personal growth, and enriching experiences through seamless event
          planning and scheduling. We are dedicated to promoting well-being,
          mindfulness, and community awareness.
        </Text>
        <Heading as="h3" size="xl" fontWeight="bold" mt={8} mb={4}>
          Our Values:
        </Heading>
        <Flex
          direction={{ base: "column", md: "row" }}
          alignItems="flex-start"
          justifyContent="space-between"
          mb={8}
          flexWrap="wrap"
        >
          <Box
            width={{ base: "100%", md: "45%" }}
            fontSize="xl"
            color="gray.500"
            mb={4}
            pr={4}
          >
            <Heading as="h4" size="lg" fontWeight="bold">
              Connection
            </Heading>
            <Text>
              We believe in the transformative power of human connections, and
              we empower you to plan and schedule these meaningful interactions
              to enrich your life.
            </Text>
          </Box>
          <Box
            width={{ base: "100%", md: "45%" }}
            fontSize="xl"
            color="gray.500"
            mb={4}
            pr={4}
          >
            <Heading as="h4" size="lg" fontWeight="bold">
              Growth
            </Heading>
            <Text>
              Personal growth is at the heart of what we do, as we help you plan
              activities that foster self-improvement and development.
            </Text>
          </Box>
          <Box
            width={{ base: "100%", md: "45%" }}
            fontSize="xl"
            color="gray.500"
            mb={4}
            pr={4}
          >
            <Heading as="h4" size="lg" fontWeight="bold">
              Wellness
            </Heading>
            <Text>
              We prioritize your mental, emotional, and physical well-being by
              providing tools and support for planning events that promote
              overall health and balance.
            </Text>
          </Box>
          <Box
            width={{ base: "100%", md: "45%" }}
            fontSize="xl"
            color="gray.500"
          >
            <Heading as="h4" size="lg" fontWeight="bold">
              Community
            </Heading>
            <Text>
              We foster a sense of belonging and shared values within our
              community, emphasizing the value of planning well-structured
              connections that strengthen relationships and awareness.
            </Text>
          </Box>
        </Flex>
        <Heading as="h3" size="xl" fontWeight="bold" mt={8} mb={4}>
          Why Deep Connection:
        </Heading>
        <Text fontSize="xl" color="gray.500" mb={12}>
          <ul>
            <li>
              Seamless Event Planning: Our platform makes event planning
              effortless, whether it's private or public.
            </li>
            <li>
              Diverse Experiences: Explore a wide range of events tailored to
              your interests.
            </li>
            <li>
              Meaningful Connections: Connect with like-minded individuals and
              form lasting relationships.
            </li>
            <li>
              Personalized Scheduling: Align your daily activities with your
              goals.
            </li>
            <li>
              Wellness Focus: Prioritize your well-being with events that
              promote health.
            </li>
          </ul>
        </Text>
      </Box>
    </Box>
  );
});

export default AboutUs;
