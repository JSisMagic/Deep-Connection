//final-react-project/final-project/src/components/AboutUse/AboutUs.jsx

import React, { forwardRef } from "react";
import {
  Box,
  Heading,
  Text,
  Link,
  Flex,
  Image,
  Stack,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { SiGitlab, SiLinkedin } from "react-icons/si";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaUsers,
  FaCalendar,
  FaStar,
  FaHandsHelping,
} from "react-icons/fa";
import Gergana from "../../assets/images/Gergana.png";
import Mariela from "../../assets/images/Mariela.png";
import YogaImage from "../../assets/images/Yoga.png";

const MotionBox = motion(Box);

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

const values = [
  {
    title: "Connection",
    text: "We believe in the transformative power of human connections, and we empower you to plan and schedule these meaningful interactions to enrich your life.",
    icon: FaHeart,
  },
  {
    title: "Growth",
    text: "Personal growth is at the heart of what we do, as we help you plan activities that foster self-improvement and development.",
    icon: FaUsers,
  },
  {
    title: "Wellness",
    text: "We prioritize your mental, emotional, and physical well-being by providing tools and support for planning events that promote overall health and balance.",
    icon: FaCalendar,
  },
  {
    title: "Community",
    text: "We foster a sense of belonging and shared values within our community, emphasizing the value of planning well-structured connections that strengthen relationships and awareness.",
    icon: FaStar,
  },
];

const AboutUs = forwardRef(function AboutUs(props, ref) {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <Box ref={ref} bg="white" py={12} borderRadius="lg" boxShadow="lg">
      <Helmet title="About us" />

      {/* Our Values */}
      <Flex
        color="white"
        py={24}
        px={{ base: 6, md: 16 }}
        bg="linear-gradient(135deg, #D5297E, #3490E3)"
        justifyContent="space-evenly"
        flexWrap="wrap"
        mt={8}
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        gap={10}
      >
        {values.map((value, index) => (
          <Flex
            key={index}
            width={{ base: "100%", md: "40%" }}
            gap={5}
            align="center"
            fontSize="xl"
            mb={8}
            pr={4}
          >
            <Icon boxSize={12} as={value.icon} />
            <Box>
              <Heading as="h4" size="lg" fontWeight="bold">
                {value.title}
              </Heading>
              <Text>{value.text}</Text>
            </Box>
          </Flex>
        ))}
      </Flex>

      <Stack
        as="section"
        justify="center"
        align="center"
        py={20}
        gap={10}
        px={{ base: 6, md: 16 }}
      >
        <Stack gap={5} w={{ lg: "80%" }}>
          <Heading size="xl">Our mission</Heading>
          <Text fontSize="xl" color="gray.500">
            Deep Connection is the heartfelt creation of our passionate team, a
            dedicated group of individuals who wholeheartedly believe in the
            transformative power of profound connections. Our platform is the
            tangible realization of our shared vision, passionately designed to
            help you plan your day effectively, ensuring that you find time for
            yourself, well-being, and attending these events, all while
            fostering meaningful connections.
          </Text>
        </Stack>

        {/* Who We Are */}
        <Stack gap={5} w={{ lg: "80%" }}>
          <Heading size="xl">Who we are</Heading>
          <Text fontSize="xl" color="gray.500">
            Deep Connection is the heartfelt creation of our passionate team, a
            dedicated group of individuals who wholeheartedly believe in the
            transformative power of profound connections. Our platform is the
            tangible realization of our shared vision, passionately designed to
            help you plan your day effectively, ensuring that you find time for
            yourself, well-being, and attending these events, all while
            fostering meaningful connections.
          </Text>
        </Stack>

        {/* Gergana's and Mariela's Profiles */}
        <Flex
          direction={{ base: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
          gap={8}
          mt={16}
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          {team.map((member, index) => (
            <Box
              key={index}
              width={{ base: "100%", md: "30%" }}
              bg="white"
              py={8}
              px={4}
              textAlign="center"
              borderRadius="lg"
              boxShadow="lg"
              mb={6}
              mr={index === 0 ? 4 : 0}
            >
              <Image
                src={member.imageUrl}
                alt={member.name}
                boxSize="200px"
                borderRadius="full"
                shadow="lg"
                mb={6}
                mx="auto"
              />
              <Heading as="h3" size="lg" fontWeight="medium">
                {member.name}
              </Heading>
              <Text color="gray.400">{member.role}</Text>
              <Text>{member.bio}</Text>
              <Flex mt={4} alignItems="center" justifyContent="center">
                <IconButton
                  as={Link}
                  href={member.gitlabUrl}
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
                  href={member.linkedinUrl}
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
          ))}
        </Flex>
      </Stack>
    </Box>
  );
});

export default AboutUs;
