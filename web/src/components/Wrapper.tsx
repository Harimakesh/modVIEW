import { Box } from "@chakra-ui/layout";
import React from "react";

interface WrapperProps {
  variant?: "small" | "regular";
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      maxW={variant === "regular" ? "400px" : "400px"}
      mt={variant === "regular" ? 200 : 8}
      w="100%"
      mx="auto"
    >
      {children}
    </Box>
  );
};
