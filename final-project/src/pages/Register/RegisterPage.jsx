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

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm()

  const onSubmit = async values => {
    const { email, username, firstName, lastName, password } = values

    const user = await getUser(username);
    if (user !== null) {
      return setError("alreadyRegistered", { message: "User already exists" })
    }

    try {
      const credentials = await registerUser(email, password)

      await createUser({
        uid: credentials.user.uid,
        email,
        username,
        firstName,
        lastName,
        password,
      })
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
      borderRadius="md"
    >
      <Box width="30%" bgColor="rgba(255,255,255, .05)" padding="2rem">
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
