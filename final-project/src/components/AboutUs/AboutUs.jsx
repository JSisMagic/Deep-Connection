//final-react-project/final-project/src/components/AboutUse/AboutUs.jsx

import React from "react";
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
    bio:
      "Creative, ambitious and motivated frontend developer with a visionary mindset and a flair for groundbreaking solutions.",
  },
  {
    name: "Mariela Ivanova",
    role: "Web Developer",
    imageUrl: Mariela,
    gitlabUrl: "https://gitlab.com/mariela.ivanova",
    linkedinUrl: "https://www.linkedin.com/in/mariela-ivanova-1270771a8/",
    bio:
      "Goal-oriented frontend developer with an organized, pragmatic mindset, consistently fostering a dynamic work atmosphere",
  },
];

const AboutUs = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <Box bg="white" py={12} px={4} textAlign="center" borderRadius="lg" boxShadow="lg">
      <Helmet title="About us" />

{/* Our Values */}
<Flex
        justifyContent="space-between"
        flexWrap="wrap"
        mt={8}
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        {[
          {
            title: "Connection",
            text:
              "We believe in the transformative power of human connections, and we empower you to plan and schedule these meaningful interactions to enrich your life.",
            icon: <FaHeart size={30} />,
          },
          {
            title: "Growth",
            text:
              "Personal growth is at the heart of what we do, as we help you plan activities that foster self-improvement and development.",
            icon: <FaUsers size={30} />,
          },
          {
            title: "Wellness",
            text:
              "We prioritize your mental, emotional, and physical well-being by providing tools and support for planning events that promote overall health and balance.",
            icon: <FaCalendar size={30} />,
          },
          {
            title: "Community",
            text:
              "We foster a sense of belonging and shared values within our community, emphasizing the value of planning well-structured connections that strengthen relationships and awareness.",
            icon: <FaStar size={30} />,
          },
        ].map((value, index) => (
          <Box
            key={index}
            width={{ base: "100%", md: "45%" }}
            fontSize="xl"
            color="gray.500"
            mb={8}
            pr={4}
          >
            {value.icon}
            <Heading as="h4" size="lg" fontWeight="bold">
              {value.title}
            </Heading>
            <Text>{value.text}</Text>
          </Box>
        ))}
      </Flex>


{/* Why Deep Connection */}
<MotionBox
        as="section"
        mt={8}
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <Heading as="h3" size="xl" fontWeight="bold" my={8}>
          Why Deep Connection:
        </Heading>
        <Text fontSize="xl" color="gray.500" mb={8}>
          <ul>
            <li>
              <FaHandsHelping size={30} /> Seamless Event Planning: Our platform
              makes event planning effortless, whether it's private or public.
            </li>
            <li>
              <FaStar size={30} /> Diverse Experiences: Explore a wide range of
              events tailored to your interests.
            </li>
            <li>
              <FaUsers size={30} /> Meaningful Connections: Connect with
              like-minded individuals and form lasting relationships.
            </li>
            <li>
              <FaCalendar size={30} /> Personalized Scheduling: Align your daily
              activities with your goals.
            </li>
            <li>
              <FaHeart size={30} /> Wellness Focus: Prioritize your well-being
              with events that promote health.
            </li>
          </ul>
        </Text>
      </MotionBox>

{/* Yoga Picture */}
<Image src={YogaImage} alt="Yoga" maxH="500px" objectFit="cover" />


      {/* About Us */}
      <MotionBox
        as="section"
        mt={8}
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <Heading as="h2" size="2xl" fontWeight="extrabold" my={5}>
          About Us
        </Heading>
        <Text fontSize="xl" color="gray.500" mb={8}>
          Deep Connection is more than just an event planning platform; it's a
          gateway to a world of deep connections and meaningful experiences. We
          believe that connecting with like-minded individuals can lead to
          personal growth, and our platform is designed to make that journey
          effortless. By prioritizing effective planning, you'll discover the time 
          and space to nurture your wellness and overall wellbeing, ensuring that your
          Deep Connection experiences are not just memorable but also deeply enriching.
        </Text>
      </MotionBox>

      {/* Who We Are */}
      <MotionBox
        as="section"
        mt={8}
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <Heading as="h3" size="xl" fontWeight="bold" my={8}>
          Who We Are:
        </Heading>
        <Text fontSize="xl" color="gray.500" mb={8}>
        Deep Connection is the heartfelt creation of our passionate team, a dedicated group
        of individuals who wholeheartedly believe in the transformative power of profound connections.
        Our platform is the tangible realization of our shared vision, passionately designed to help you
        plan your day effectively, ensuring that you find time for yourself, well-being, and attending 
        these events, all while fostering meaningful connections.
        </Text>
      </MotionBox>

      {/* Gergana's and Mariela's Profiles */}
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        mt={8}
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        {team.map((member, index) => (
          <Box
            key={index}
            width={{ base: "100%", md: "45%" }}
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

    
    </Box>
  );
};

export default AboutUs;
