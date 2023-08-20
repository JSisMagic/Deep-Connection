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
import { loginUser } from "../../services/auth.services"
import { getUserByUid } from "../../services/users.services"

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm()

  const onSubmit = async values => {
    const { email, password } = values

    const credentials = await loginUser(email, password)
    const userData = await getUserByUid(credentials.user.uid)
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
        <Heading textAlign="center">Log in</Heading>
        <Stack mt={10}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" {...register("email")} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" {...register("password")} />
          </FormControl>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Log in
          </Button>
          <Flex>
            <Text>
              Don't have an account? Create one{" "}
              <Link style={{ color: LIGHT_PURPLE }} to="/register">
                here
              </Link>
            </Text>
          </Flex>
        </Stack>
      </Box>
    </Flex>
  )
}

export default LoginPage
