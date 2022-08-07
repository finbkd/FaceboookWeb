import { ChakraProvider, theme } from "@chakra-ui/react";
import Theme from "../Components/Theme";
import "../styles/globals.css";
import { store } from "../store";
import { Provider, useSelector } from "react-redux";
import useLoadingWithRefresh from "../hooks/useLoadingWithRefresh";
import axios from "axios";
import { useEffect, useState } from "react";
import { setAuth } from "../store/authSlice";
// import { SocketContext, socket } from "../context/socket";
import React from "react";
import { io } from "socket.io-client";

import { useRef } from "react";
import { socketInit } from "../context/socket";
import { api } from "../http";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
