import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Link,
  Avatar,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { getUserByUid } from "../../services/users.services";
import { HiPencilAlt } from "react-icons/hi";
import bgImage from "../../assets/images/hero.png";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaGitlab,
  FaImdb,
  FaTiktok,
  FaGlobe,
  FaPlus,
} from "react-icons/fa";

const ProfilePage = () => {
  const [user, loading] = useAuthState(auth);
  const [profileData, setProfileData] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
    socialMediaLinks: [],
    description: "",
  });

  const fetchProfileData = async () => {
    if (user) {
      const userData = await getUserByUid(user.uid);
      setProfileData(userData);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [user]);

  const initials = (
    profileData.firstName.charAt(0) + profileData.lastName.charAt(0)
  ).toUpperCase();

  const addSocialMediaLink = (link, platform) => {
    // Update profileData with the new link
    setProfileData({
      ...profileData,
      socialMediaLinks: [...profileData.socialMediaLinks, { link, platform }],
    });
  };

  const removeSocialMediaLink = (index) => {
    // Remove the social media link at the specified index
    const updatedLinks = [...profileData.socialMediaLinks];
    updatedLinks.splice(index, 1);
    setProfileData({
      ...profileData,
      socialMediaLinks: updatedLinks,
    });
  };

  return (
    <div style={{ height: "100vh", overflowY: "scroll" }}>
      <Flex
        direction="column"
        height="100%"
        width="100%"
        justify="center"
        align="center"
      >
        <Box
          width="40%" // Increase the size of the background picture container
          bgColor="white"
          padding="2rem"
          borderRadius="lg"
          boxShadow="2xl"
          backgroundImage={`url(${bgImage})`}
          backgroundSize="cover"
          backgroundPosition="center"
        >
          <Box
            maxW="xl"
            m="auto"
            p="4"
            bg="white"
            borderRadius="lg"
            boxShadow="md"
          >
            <Flex alignItems="center">
              <Avatar
                size="xl"
                name={initials}
                src={profileData.avatarUrl || ""}
                mr="4"
              />
              <Text fontSize="lg" fontWeight="bold">
                {profileData.username}
              </Text>
              <IconButton
                ml="2"
                size="sm"
                aria-label="Edit"
                icon={<HiPencilAlt />}
              />
            </Flex>
            <Text fontSize="sm" color="gray.500" mt="2">
              Member Since: {profileData.memberSince}
            </Text>
            <Text fontSize="md" mt="4">
              {profileData.description || "No description available."}
            </Text>
            <Text fontSize="md" mt="4">
              Social Media Links:
            </Text>
            {profileData.socialMediaLinks &&
              profileData.socialMediaLinks.map((link, index) => (
                <Flex key={index} alignItems="center" mt="2">
                  <Link href={link.link} isExternal>
                    {getSocialMediaIcon(link.platform)}
                  </Link>
                  <Text ml="2">{link.platform}</Text>
                  <Button
                    ml="2"
                    size="sm"
                    colorScheme="red"
                    onClick={() => removeSocialMediaLink(index)}
                  >
                    Remove
                  </Button>
                </Flex>
              ))}
            <Flex alignItems="center" mt="2">
              {getSocialMediaIcon("Add")}
              <Button
                ml="2"
                size="sm"
                onClick={() => addSocialMediaLink("", "Add")}
              >
                Add Social Media Link
              </Button>
            </Flex>
            {/* Add input fields for username, name, surname, phone, email, and personal slogan/quote */}
            <Input
              value={profileData.username}
              placeholder="Username"
              size="lg"
              mt="4"
            />
            <Input
              value={profileData.firstName}
              placeholder="First Name"
              size="lg"
              mt="2"
            />
            <Input
              value={profileData.lastName}
              placeholder="Last Name"
              size="lg"
              mt="2"
            />
            <Input
              value={profileData.phone}
              placeholder="Phone"
              size="lg"
              mt="2"
            />
            <Input
              value={profileData.email}
              placeholder="Email"
              size="lg"
              mt="2"
            />
            <Input
              value={profileData.slogan}
              placeholder="Personal Slogan/Quote"
              size="lg"
              mt="2"
            />
            {/* Use ReactQuill for the description */}
            <ReactQuill
              style={{
                minHeight: "180px",
                borderColor: "gray",
                borderRadius: "10px",
                marginTop: "2rem",
              }}
              theme="snow"
              value={profileData.description || ""}
              readOnly={true} // You can change this to false to make it editable
            />
          </Box>
        </Box>
      </Flex>
    </div>
  );
};

const getSocialMediaIcon = (platform) => {
  switch (platform) {
    case "Instagram":
      return <FaInstagram />;
    case "Facebook":
      return <FaFacebook />;
    case "LinkedIn":
      return <FaLinkedin />;
    case "Gitlab":
      return <FaGitlab />;
    case "IMDb":
      return <FaImdb />;
    case "TikTok":
      return <FaTiktok />;
    case "Personal Site":
      return <FaGlobe />;
    case "Add":
      return <FaPlus />;
    default:
      return null;
  }
};

export default ProfilePage;
