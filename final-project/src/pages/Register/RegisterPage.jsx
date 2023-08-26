import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import bgImage from "../../assets/images/hero.png";
import { errorMessages } from "../../common/error-messages";
import { registerUser } from "../../services/auth.services";
import { createUser, getUser } from "../../services/users.services";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form"; // Add this import

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm();
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (values) => {
    const { email, username, firstName, lastName, phone, password } = values;

    const user = await getUser(username);
    if (user !== null) {
      return setError("username", { message: errorMessages.USER_EXISTS });
    }

    try {
      const credentials = await registerUser(email, password);

      const userData = await createUser({
        uid: credentials.user.uid,
        email,
        username,
        firstName,
        phone,
        lastName,
        password,
      });

      setAuthState((prev) => ({ ...prev, userData: userData }));
      console.log("successful registration");
      navigate("/");
    } catch (e) {
      setError("email", { message: errorMessages.EMAIL_EXISTS });
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
        bgColor="rgba(255,255,255)"
        padding="2rem"
        borderRadius="lg"
        boxShadow="2xl"
      >
        <Heading textAlign="center">Register</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit">Register</Button>
          </Stack>
        </form>
        <Stack pt={6}>
          {errors.email && (
            <Text color="red.500" align="center">
              {errorMessages.EMAIL_EXISTS}
            </Text>
          )}
          <Text align="center">
            Already registered? Sign in{" "}
            <Link to="/login" style={{ color: "purple" }}>
              here
            </Link>
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
};

export default RegisterPage;
