import { EditIcon, Icon } from "@chakra-ui/icons"
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
  FormControl,
  FormLabel,
  FormErrorMessage,
  ButtonGroup,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight, BiUpload } from "react-icons/bi"
import {
  FaFacebook,
  FaGitlab,
  FaGlobe,
  FaImdb,
  FaInstagram,
  FaLinkedin,
  FaPlus,
  FaTiktok,
} from "react-icons/fa"
import { HiPencilAlt } from "react-icons/hi"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Form, useParams } from "react-router-dom"
import { COOL_BLUE, COOL_GREEN, COOL_PURPLE, categoryColors } from "../../common/colors"
import { auth } from "../../config/firebase"
import { getUserByUid, updateUser, uploadImage } from "../../services/users.services"
import MyEvents from "../Events/MyEvents"
import { useForm } from "react-hook-form"
import validation from "../../common/validation-enums"
import { SUPPORTED_FORMATS } from "../../common/constrants"
import { validateDescription } from "../../common/helpers"

const ProfilePage = () => {
  const { uid } = useParams()
  const [user, loading] = useAuthState(auth)
  const [profileData, setProfileData] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
    socialMediaLinks: [],
    description: "",
  })
  const [editState, setEditState] = useState(false)

  const fetchProfileData = async () => {
    if (uid) {
      const userData = await getUserByUid(uid)
      setProfileData(userData)
    }
  }

  useEffect(() => {
    fetchProfileData()
  }, [uid])

  const initials = (profileData.firstName.charAt(0) + profileData.lastName.charAt(0)).toUpperCase()

  const addSocialMediaLink = (link, platform) => {
    setProfileData({
      ...profileData,
      socialMediaLinks: [...profileData.socialMediaLinks, { link, platform }],
    })
  }

  const removeSocialMediaLink = index => {
    const updatedLinks = [...profileData.socialMediaLinks]
    updatedLinks.splice(index, 1)
    setProfileData({
      ...profileData,
      socialMediaLinks: updatedLinks,
    })
  }

  return (
    <Box h="100%" p={5} overflowY="auto">
      <Flex direction="column" width="100%" justify="center" align="center" overflowY="auto">
        <Box
          width={{ base: "90%", lg: "60%" }} // Increase the size of the background picture container
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
              initials={initials}
              setEditState={setEditState}
            />
          ) : (
            <ProfileComponent
              profileData={profileData}
              isMyProfile={user.uid === uid}
              setEditState={setEditState}
              initials={initials}
            />
          )}
        </Box>
      </Flex>
      {!editState && (
        <Box w={{ lg: "60%" }} marginInline="auto" marginTop={8}>
          <Heading size="md" mb={3}>
            {profileData.firstName}'s events
          </Heading>
          <MyEvents inUserProfile={true} />
        </Box>
      )}
    </Box>
  )
}

const ProfileComponent = ({ profileData, isMyProfile, setEditState, initials }) => {
  return (
    <Box w="100%" m="auto" p="4" bg="white" borderRadius="lg" boxShadow="md">
      <Flex justify="space-between">
        <Flex gap={3}>
          <Avatar
            borderRadius="10px"
            src={profileData.profilePicture || ""}
            bg={COOL_BLUE}
            name={initials}
            size="xl"
          />
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
        {isMyProfile && <IconButton icon={<EditIcon />} onClick={() => setEditState(true)} />}
      </Flex>
      {profileData.description && (
        <>
          <Divider my={3} w="60%" marginInline="auto" borderColor={COOL_BLUE} />
          <Text
            p={3}
            bg="gray.50"
            borderRadius="md"
            dangerouslySetInnerHTML={{ __html: profileData.description }}
          />
        </>
      )}
      <Divider my={3} w="40%" marginInline="auto" borderColor={COOL_BLUE} />
      <Flex justify="center" gap={2}>
        <IconButton icon={getSocialMediaIcon("Facebook")} isDisabled={!profileData.facebookUrl} />
        <IconButton icon={getSocialMediaIcon("Instagram")} isDisabled={!profileData.instagramUrl} />
        <IconButton icon={getSocialMediaIcon("LinkedIn")} isDisabled={!profileData.linkedInUrl} />
      </Flex>
    </Box>
  )
}

const EditProfileComponent = ({ profileData, setProfileData, initials, setEditState }) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      phone: profileData.phone,
      profilePicture: profileData.profilePicture,
      slogan: profileData.slogan,
    },
  })
  const [description, setDescription] = useState(profileData.description)
  console.log(errors)
  const handleChangeDescription = value => {
    if (validateDescription(value)) {
      clearErrors("description")
    }

    setDescription(value)
  }
  console.log(profileData)
  const onSaveChanges = async values => {
    if (!validateDescription(description)) {
      return setError("description", {
        message: `Length should be between ${validation.MIN_ADDITIONAL_INFO_LENGTH} and ${validation.MAX_ADDITIONAL_INFO_LENGTH} characters.`,
      })
    }

    try {
      const newUserData = { ...values, description }
      if (values.profilePicture !== profileData.profilePicture) {
        const image = values.profilePicture.item(0)
        const fileType = image.type
        if (!SUPPORTED_FORMATS.includes(fileType)) {
          return setError("profilePicture", { message: "Invalid format!" })
        }

        const url = await uploadImage(image)
        newUserData.profilePicture = url
      }

      await updateUser(profileData.uid, newUserData)
      setEditState(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box w="100%" m="auto" p="4" bg="white" borderRadius="lg" boxShadow="md">
      <form onSubmit={handleSubmit(onSaveChanges)}>
        <Flex justify="space-between">
          <FormControl isInvalid={errors?.profilePicture}>
            <FormLabel htmlFor="avatar" cursor="pointer" w="max-content">
              <Avatar
                borderRadius="10px"
                src={profileData.profilePicture}
                bg="gray.400"
                name={initials}
                size="xl"
              />
            </FormLabel>
            <Input type="file" id="avatar" display="none" {...register("profilePicture")} />
            <FormErrorMessage>{errors?.profilePicture?.message}</FormErrorMessage>
          </FormControl>
          <ButtonGroup>
            <Button onClick={() => setEditState(false)}>Cancel</Button>
            <Button colorScheme="green" type="submit">
              Save changes
            </Button>
          </ButtonGroup>
        </Flex>
        <Stack>
          <FormControl isRequired isInvalid={errors?.firstName}>
            <FormLabel>First name</FormLabel>
            <Input
              type="text"
              id="firstName"
              {...register("firstName", {
                required: "This is required!",
                minLength: {
                  value: validation.MIN_FIRSTNAME_LENGTH,
                  message: `Minimum length should be ${validation.MIN_FIRSTNAME_LENGTH}`,
                },
                maxLength: {
                  value: validation.MAX_FIRSTNAME_LENGTH,
                  message: `Maximum length should be ${validation.MAX_FIRSTNAME_LENGTH}`,
                },
                validate: {
                  containsOnlyLetters: value =>
                    /^[a-zA-Z]+$/.test(value) ||
                    "First name must contain only uppercase and lowercase letters!",
                },
              })}
            />
            <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={errors?.lastName}>
            <FormLabel>Last name</FormLabel>
            <Input
              type="text"
              id="lastName"
              {...register("lastName", {
                required: "This is required!",
                minLength: {
                  value: validation.MIN_LASTNAME_LENGTH,
                  message: `Minimum length should be ${validation.MIN_LASTNAME_LENGTH}`,
                },
                maxLength: {
                  value: validation.MAX_LASTNAME_LENGTH,
                  message: `Maximum length should be ${validation.MAX_LASTNAME_LENGTH}`,
                },
                validate: {
                  containsOnlyLetters: value =>
                    /^[a-zA-Z]+$/.test(value) ||
                    "Last name must contain only uppercase and lowercase letters!",
                },
              })}
            />
            <FormErrorMessage>{errors?.lastName?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={errors?.phone}>
            <FormLabel>Phone number</FormLabel>
            <Input
              type="number"
              id="phone"
              {...register("phone", {
                required: "This is required!",
                validate: {
                  haveFixedLength: value =>
                    value.length === validation.PHONE_NUM_LENGTH ||
                    "Phone number must have 10 digit!",
                  containsOnlyDigits: value =>
                    /^[0-9]+$/.test(value) || "Phone number must have only digits!",
                },
              })}
            />
            <FormErrorMessage>{errors?.phone?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors?.description}>
            <FormLabel>Profile Description</FormLabel>
            <ReactQuill
              placeholder="Add profile description"
              style={{
                borderColor: "gray",
                borderRadius: "10px",
              }}
              className="w-full mb-10 md:m"
              theme="snow"
              value={description}
              onChange={handleChangeDescription}
            />
            <FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors?.slogan}>
            <FormLabel>Personal Slogan</FormLabel>
            <Input
              type="text"
              id="slogan"
              {...register("slogan", {
                maxLength: {
                  value: validation.MAX_SLOGAN_LENGTH,
                  message: `Maximum length is ${validation.MAX_SLOGAN_LENGTH} characters`,
                },
              })}
            />
            <FormErrorMessage>{errors?.slogan?.message}</FormErrorMessage>
          </FormControl>
        </Stack>
      </form>
    </Box>
  )
}

const getSocialMediaIcon = platform => {
  switch (platform) {
    case "Instagram":
      return <FaInstagram />
    case "Facebook":
      return <FaFacebook />
    case "LinkedIn":
      return <FaLinkedin />
    case "Gitlab":
      return <FaGitlab />
    case "IMDb":
      return <FaImdb />
    case "TikTok":
      return <FaTiktok />
    case "Personal Site":
      return <FaGlobe />
    case "Add":
      return <FaPlus />
    default:
      return null
  }
}

export default ProfilePage
