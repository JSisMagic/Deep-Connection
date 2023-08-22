import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { LIGHT_PURPLE } from "../../common/colors"
import { useForm } from "react-hook-form"
import { registerUser } from "../../services/auth.services"
import { createUser, getUser } from "../../services/users.services"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import bgImage from "../../assets/images/hero.png"

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm()
  const { setAuthState } = useContext(AuthContext)

  const onSubmit = async values => {
    const { email, username, firstName, lastName, password } = values

    const user = await getUser(username)
    if (user !== null) {
      return setError("alreadyRegistered", { message: "User already exists" })
    }

    try {
      const credentials = await registerUser(email, password)

      const userData = await createUser({
        uid: credentials.user.uid,
        email,
        username,
        firstName,
        lastName,
        password,
      })

      setAuthState(prev => ({ ...prev, userData: userData }))
    } catch (e) {
      console.error(e)
    }

    //TODO redirect to private part
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
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" {...register("email")} />
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input type="text" {...register("username")} />
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
