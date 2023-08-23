import React, { useState, useEffect } from 'react';
import { Box, Button, Flex } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { getUserByUid } from "../../services/users.services";
import CardWithAvatar from '../ProfileComponents/CardWithAvatar';
import { CardContent } from '../ProfileComponents/CardContent';
import { UserInfo } from '../ProfileComponents/UserInfo';
import { HiPencilAlt } from 'react-icons/hi';
import bgImage from "../../assets/images/hero.png"; // just in case

const ProfilePage = () => {
  const [user, loading] = useAuthState(auth);
  const [profileData, setProfileData] = useState({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    phone: ''
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

  const initials = (profileData.firstName.charAt(0) + profileData.lastName.charAt(0)).toUpperCase();

  return (
    <Flex
      direction="column"
      height="100%"
      width="100%"
      justify="center"
      align="center"
    >
      <Box width="30%" bgColor="rgba(255,255,255)" padding="2rem" borderRadius="lg" boxShadow="2xl">
        <CardWithAvatar
          maxW="xl"
          avatarProps={{
            name: "Taylor Swift", // You can mess around with the way the icon looks here. Dynamically updates the icon using the initials if no profile picture has been uploaded.
            src: '', // Set image URL, will need to think of some different implementation
          }}
          action={
            <Button size="sm" leftIcon={<HiPencilAlt />}>
              Edit
            </Button>
          }
        >
          <CardContent>
            <UserInfo
              location="Sofia, Bulgaria" // To be used with the Weather API thingy in the future
              website="gitlab.com"
              memberSince="23.08.2023"
            />
          </CardContent>
        </CardWithAvatar>
      </Box>
    </Flex>
  );
};

export default ProfilePage;
