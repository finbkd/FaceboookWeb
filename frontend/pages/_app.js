import { ChakraProvider, theme } from "@chakra-ui/react";
import Theme from "../Components/Theme";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={Theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
