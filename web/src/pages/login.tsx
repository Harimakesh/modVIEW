import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useRouter } from "next/router";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { Link } from "@chakra-ui/react";
interface registerProps {}

const Login: React.FC<registerProps> = ({}) => {
  const [, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Wrapper variant="regular">
      <Text
        bgGradient="linear(to-r, #00AEAE, #008080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
        alignItems="center"
      >
        mODVIEW
      </Text>
      <Flex direction="column" background="gray.100" p={12} rounded={6}>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({ options: values });
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="username" label="Username" />
              <Box mt={4}>
                <InputField name="password" label="Password" type="password" />
              </Box>
              <Button
                mt={4}
                type="submit"
                colorScheme="teal"
                isLoading={isSubmitting}
                width="100%"
                bgGradient="linear(to-l, #00AEAE, #008080)"
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <Link href="/register" mt={4} textAlign="end">
          Register
        </Link>
      </Flex>
    </Wrapper>
  );
};

export default Login;
