import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  useBreakpointValue,
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
import { createUser, getUserByUsername } from "../../services/users.services";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import validation from "../../common/validation-enums";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    // watch,
  } = useForm();
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    MIN_USERNAME_LENGTH,
    MAX_USERNAME_LENGTH,
    MIN_FIRSTNAME_LENGTH,
    MAX_FIRSTNAME_LENGTH,
    MIN_LASTNAME_LENGTH,
    MAX_LASTNAME_LENGTH,
    PHONE_NUM_LENGTH,
    MIN_PASSWORD_LENGTH,
    MAX_PASSWORD_LENGTH,
  } = validation;

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (values) => {
    const { email, username, firstName, lastName, phone, password } = values;

    const user = await getUserByUsername(username);
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
      });

      setAuthState((prev) => ({ ...prev, userData: userData }));
      console.log("successful registration");
      navigate("/");
    } catch (e) {
      setError("email", { message: errorMessages.EMAIL_EXISTS });
    }
  };
  console.log("errors", errors);
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
        bgColor="rgba(255,255,255)"
        padding={["1rem", "2rem"]} // Smaller padding for mobile, larger for desktop
        borderRadius="lg"
        boxShadow="2xl"
      >
        <Heading mb={4} textAlign="center">
          Register
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack mt={10}>
            <FormControl id="email" isRequired isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                id="email"
                {...register("email", {
                  required: "This is required!",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format!",
                  },
                })}
              />
              <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={errors.username}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                {...register("username", {
                  required: "This is required!",
                  minLength: {
                    value: MIN_USERNAME_LENGTH,
                    message: `Minimum length should be ${MIN_USERNAME_LENGTH}`,
                  },
                  maxLength: {
                    value: MAX_USERNAME_LENGTH,
                    message: `Maximum length should be ${MAX_USERNAME_LENGTH}`,
                  },
                  validate: {
                    startsWithLowercase: (value) =>
                      /^[a-z].*/.test(value) ||
                      "Username must start with a lowercase letter.",
                  },
                })}
              />
              <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={errors.firstName}>
              <FormLabel>First name</FormLabel>
              <Input
                type="text"
                {...register("firstName", {
                  required: "This is required!",
                  minLength: {
                    value: MIN_FIRSTNAME_LENGTH,
                    message: `Minimum length should be ${MIN_FIRSTNAME_LENGTH}`,
                  },
                  maxLength: {
                    value: MAX_FIRSTNAME_LENGTH,
                    message: `Maximum length should be ${MAX_FIRSTNAME_LENGTH}`,
                  },
                  validate: {
                    containsOnlyLetters: (value) =>
                      /^[a-zA-Z]+$/.test(value) ||
                      "First name must contain only uppercase and lowercase letters!",
                  },
                })}
              />
              <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={errors.lastName}>
              <FormLabel>Last name</FormLabel>
              <Input
                type="text"
                {...register("lastName", {
                  required: "This is required!",
                  minLength: {
                    value: MIN_LASTNAME_LENGTH,
                    message: `Minimum length should be ${MIN_LASTNAME_LENGTH}`,
                  },
                  maxLength: {
                    value: MAX_LASTNAME_LENGTH,
                    message: `Maximum length should be ${MAX_LASTNAME_LENGTH}`,
                  },
                  validate: {
                    containsOnlyLetters: (value) =>
                      /^.[A-Za-z]+$/.test(value) ||
                      "Last name must contain only uppercase and lowercase letters!",
                  },
                })}
              />
              <FormErrorMessage>{errors?.lastName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={errors.phone}>
              <FormLabel>Phone number</FormLabel>
              <Input
                type="text"
                {...register("phone", {
                  required: "This is required!",
                  validate: {
                    haveFixedLength: (value) =>
                      value.length === PHONE_NUM_LENGTH ||
                      "Phone number must have 10 digit!",
                    containsOnlyDigits: (value) =>
                      /^[0-9]+$/.test(value) ||
                      "Phone number must have only digits!",
                  },
                })}
              />
              <FormErrorMessage>{errors?.phone?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    minLength: {
                      value: MIN_PASSWORD_LENGTH,
                      message: `Minimum length should be ${MIN_PASSWORD_LENGTH}`,
                    },
                    maxLength: {
                      value: MAX_PASSWORD_LENGTH,
                      message: `Maximum length should be ${MAX_PASSWORD_LENGTH}`,
                    },
                    required: "This is required!",
                    validate: {
                      containsUpperLetter: (value) =>
                        /^.*[a-z]+.*/.test(value) ||
                        "Password must contain at least one lowercase letter!",
                      containsCapitalLetter: (value) =>
                        /^.*[A-Z]+.*/.test(value) ||
                        "Password must contain at least one capital letter!",
                      containsNumber: (value) =>
                        /^.*[0-9]+.*/.test(value) ||
                        "Password must contain at least one number!",
                      containsSpecialChar: (value) =>
                        /^.*[!@#$%^&*]+.*/.test(value) ||
                        "Password must contain at least one special character!",
                    },
                  })}
                />
                <InputRightElement>
                  {showPassword ? (
                    <ViewIcon cursor="pointer" onClick={handleTogglePassword} />
                  ) : (
                    <ViewOffIcon
                      cursor="pointer"
                      onClick={handleTogglePassword}
                    />
                  )}
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
