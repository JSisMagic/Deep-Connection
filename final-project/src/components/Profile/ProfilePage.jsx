import { EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";
import {
  FaFacebook,
  FaGitlab,
  FaGlobe,
  FaImdb,
  FaInstagram,
  FaLinkedin,
  FaPlus,
  FaTiktok,
} from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { COOL_BLUE } from "../../common/colors";
import { auth } from "../../config/firebase";
import { getUserByUid } from "../../services/users.services";

const ProfilePage = () => {
  const { uid } = useParams();
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

  const [editState, setEditState] = useState(false);

  const fetchProfileData = async () => {
    if (uid) {
      const userData = await getUserByUid(uid);
      setProfileData(userData);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [uid]);

  const initials = (
    profileData.firstName.charAt(0) + profileData.lastName.charAt(0)
  ).toUpperCase();

  const addSocialMediaLink = (link, platform) => {
    setProfileData({
      ...profileData,
      socialMediaLinks: [...profileData.socialMediaLinks, { link, platform }],
    });
  };

  const removeSocialMediaLink = (index) => {
    const updatedLinks = [...profileData.socialMediaLinks];
    updatedLinks.splice(index, 1);
    setProfileData({
      ...profileData,
      socialMediaLinks: updatedLinks,
    });
  };

  return (
    <Flex
      direction="column"
      height="100%"
      width="100%"
      paddingTop="8rem"
      paddingBottom="2rem"
      justify="center"
      align="center"
      overflowY="auto"
    >
      <Box
        width="40%" // Increase the size of the background picture container
        bgColor="white"
        padding="0.5rem"
        borderRadius="lg"
        boxShadow="2xl"
        bg="linear-gradient(135deg, #8232B2, #3490E3)"
        backgroundSize="cover"
        backgroundPosition="center"
      >
        {editState ? (
          <EditProfileComponent
            profileData={profileData}
            setProfileData={setProfileData}
          />
        ) : (
          <ProfileComponent
            profileData={profileData}
            isMyProfile={user.uid === uid}
          />
        )}
      </Box>
    </Flex>
  );
};

const ProfileComponent = ({ profileData, isMyProfile }) => {
  return (
    <Box w="100%" m="auto" p="4" bg="white" borderRadius="lg" boxShadow="md">
      <Flex justify="space-between">
        <Flex gap={3}>
          <Avatar src={profileData.profilePhoto} size="xl" />
          <Stack gap={1}>
            <Heading size="md">
              {profileData.firstName} {profileData.lastName}
            </Heading>
            <Heading size="sm" fontWeight={500}>
              @{profileData.username}
            </Heading>
            {profileData.slogan && (
              <Flex marginTop={2}>
                <BiSolidQuoteAltLeft size={10} />
                <Heading size="sm" fontWeight={400} fontStyle="italic">
                  {profileData.slogan}
                </Heading>
                <BiSolidQuoteAltRight size={10} />
              </Flex>
            )}
          </Stack>
        </Flex>
        {isMyProfile && <IconButton icon={<EditIcon />} />}
      </Flex>
      {profileData.description && (
        <>
          <Divider my={3} w="60%" marginInline="auto" borderColor={COOL_BLUE} />
          <Text p={3} bg="gray.50" borderRadius="md">
            {profileData.description}
          </Text>
        </>
      )}
      <Divider my={3} w="40%" marginInline="auto" borderColor={COOL_BLUE} />
      <Flex justify="center" gap={2}>
        <IconButton
          icon={getSocialMediaIcon("Facebook")}
          isDisabled={!profileData.facebookUrl}
        />
        <IconButton
          icon={getSocialMediaIcon("Instagram")}
          isDisabled={!profileData.instagramUrl}
        />
        <IconButton
          icon={getSocialMediaIcon("LinkedIn")}
          isDisabled={!profileData.linkedInUrl}
        />
      </Flex>
    </Box>
  );
};

const EditProfileComponent = ({ profileData, setProfileData }) => {
  return (
    <Box w="100%" m="auto" p="4" bg="white" borderRadius="lg" boxShadow="md">
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
        <IconButton ml="2" size="sm" aria-label="Edit" icon={<HiPencilAlt />} />
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
        <Button ml="2" size="sm" onClick={() => addSocialMediaLink("", "Add")}>
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
      <Input value={profileData.phone} placeholder="Phone" size="lg" mt="2" />
      <Input value={profileData.email} placeholder="Email" size="lg" mt="2" />
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
        readOnly={true}
      />
    </Box>
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
