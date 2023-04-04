import "@/styles/globals.css";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import { getDefaultProvider } from "ethers";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
  webSocketProvider,
});

// 2. Call `createTheme` and pass your custom theme values
const theme = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
    colors: {
      // primary: "#4ADE7B",
      // secondary: "#F9CB80",
      // error: "#FCC5D8",
    },
  },
});

const inter = Inter({ subsets: ["latin"] });
const MyApp = ({ Component, pageProps }) => {
  return (
    <section className={inter.className}>
      <WagmiConfig client={client}>
        <ChakraProvider>
          <NextUIProvider theme={theme}>
            <Component {...pageProps} />
          </NextUIProvider>
        </ChakraProvider>
      </WagmiConfig>
    </section>
  );
};

export default MyApp;
