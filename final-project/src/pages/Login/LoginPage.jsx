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
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { LIGHT_PURPLE } from "../../common/colors"
import { AuthContext } from "../../context/AuthContext"
import { loginUser } from "../../services/auth.services"
import bgImage from "../../assets/images/hero.png"

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

    await loginUser(email, password)
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
      <Box
        width="30%"
        bgColor="rgba(255,255,255, .1)"
        backdropFilter="blur(16px)"
        color="white"
        padding="2rem"
        borderRadius="lg"
        boxShadow="2xl"
      >
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
