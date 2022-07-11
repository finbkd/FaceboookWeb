import { extendTheme } from "@chakra-ui/react";
import { StyleFunctionProps } from "@chakra-ui/theme-tools";

const Theme = extendTheme({
  components: {
    DrawerContent: {
      // 2. We can add a new button size or extend existing
    },
  },
});

export default Theme;
