import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { LIGHT_PURPLE } from "../../common/colors"
import { useForm } from "react-hook-form"
import { registerUser } from "../../services/auth.services"
import { createUser, getUser } from "../../services/users.services"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import bgImage from "../../assets/images/hero.png"
import { errorMessages } from "../../common/error-messages"

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm()
  const { setAuthState } = useContext(AuthContext)
  const navigate = useNavigate()

  const onSubmit = async values => {
    const { email, username, firstName, lastName, phone, password } = values

    const user = await getUser(username)
    if (user !== null) {
      return setError("username", { message: errorMessages.USER_EXISTS })
    }

    try {
      const credentials = await registerUser(email, password)

      const userData = await createUser({
        uid: credentials.user.uid,
        email,
        username,
        firstName,
        phone,
        lastName,
        password,
      })
      
      setAuthState(prev => ({ ...prev, userData: userData }))
      console.log("successful registration")
      navigate("/")
    } catch (e) {
      setError("email", { message: errorMessages.EMAIL_EXISTS })
    }
  }

  return (
    <Flex
      direction="column"
      height="100%"
      width="100%"
      justify="center"
      align="center"
      bgImage={bgImage}
    >
      <Box width="30%" bgColor="rgba(255,255,255)" padding="2rem" borderRadius="lg" boxShadow="2xl">
        <Heading textAlign="center">Register</Heading>
        <Stack mt={10}>
          <FormControl isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input type="email" {...register("email")} />
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.username}>
            <FormLabel>Username</FormLabel>
            <Input type="text" {...register("username")} />
            <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>First name</FormLabel>
            <Input type="text" {...register("firstName")} />
          </FormControl>
          <FormControl>
            <FormLabel>Last name</FormLabel>
            <Input type="text" {...register("lastName")} />
          </FormControl>
          <FormControl>
            <FormLabel>Phone number</FormLabel>
            <Input type="text" {...register("phone")} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" {...register("password")} />
          </FormControl>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Register
          </Button>
          <Flex>
            <Text>
              Already registered? Sign in{" "}
              <Link style={{ color: LIGHT_PURPLE }} to="/login">
                here
              </Link>
            </Text>
          </Flex>
        </Stack>
      </Box>
    </Flex>
  )
}

export default RegisterPage
