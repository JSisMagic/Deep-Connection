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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/hero.png";
import { loginUser } from "../../services/auth.services";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"; // Add this import

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (values) => {
    const { email, password } = values;

    try {
      await loginUser(email, password);
      navigate("/");
    } catch (e) {
      setError("email", { message: "Invalid email or password" });
    }
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack mt={10}>
            <FormControl isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input type="email" {...register("email")} />
              <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
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
            <Button type="submit">Log in</Button>
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
  );
};

export default LoginPage;
