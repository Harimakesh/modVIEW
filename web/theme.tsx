import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const theme = extendTheme({
  fonts: {
    heading: `'share_tech_mono',monospace`,
    body: `'share_tech_mono',monospace`,
  },
});

export default theme;
