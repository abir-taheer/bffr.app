import type { AppProps } from "next/app";
import "../styles/globals.css";
import ApolloProvider from "../components/apollo/ApolloProvider";
import AuthProvider from "../components/auth/AuthProvider";
import NavBar from "../components/navigation/NavBar";
import NavDrawer from "../components/navigation/NavDrawer";
import { useState } from "react";
import ThemeContext from "../components/theme/ThemeContext";

function MyApp({ Component, pageProps }: AppProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <ApolloProvider>
      <ThemeContext>
        {/*@ts-ignore*/}
        <AuthProvider>
          <NavBar />
          <NavDrawer open={drawerOpen} setOpen={setDrawerOpen} />
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeContext>
    </ApolloProvider>
  );
}

export default MyApp;
