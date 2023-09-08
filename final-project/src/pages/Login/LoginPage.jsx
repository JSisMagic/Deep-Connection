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
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import bgImage from "../../assets/images/hero.png"
import { loginUser } from "../../services/auth.services"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons" // Add this import
import { getUserByEmail } from "../../services/users.services"

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = async values => {
    const { email, password } = values

    try {
      const user = await getUserByEmail(email)

      if (user.isBlocked) {
        return setError("email", {
          message: "The user associated with this email address has been blocked. Access denied.",
        })
      }
      await loginUser(email, password)
      navigate("/")
    } catch (e) {
      setError("email", { message: "Invalid email or password" })
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
      <Box
        width={["90%", "80%", "60%", "30%"]} // responsive width
        maxWidth="500px" // example max width to set
        bgColor="rgba(255,255,255)"
        backdropFilter="blur(16px)"
        padding={["1rem", "2rem"]} // smaller padding for mobile and larger for other devices
        borderRadius="lg"
        boxShadow="2xl"
      >
        <Heading textAlign="center" fontSize={["2xl", "3xl", "4xl"]}>
          Log in
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack mt={10} spacing={4}>
            <FormControl isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input type="email" width="100%" {...register("email")} />
              <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  width="100%"
                  {...register("password")}
                />
                <InputRightElement>
                  <Button
                    onClick={handleTogglePassword}
                    variant="ghost"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit" width="100%">
              Log in
            </Button>
          </Stack>
        </form>
        <Stack pt={6}>
          {errors.email && (
            <Text color="red.500" align="center">
              Invalid email or password
            </Text>
          )}
          <Text align="center">
            Don't have an account? Create one{" "}
            <Link to="/register" style={{ color: "purple" }}>
              here
            </Link>
          </Text>
        </Stack>
      </Box>
    </Flex>
  )
}

export default LoginPage
