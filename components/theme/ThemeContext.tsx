import { createTheme, ThemeProvider as Provider } from "@mui/material/styles";
import Head from "next/head";
import { ReactNode } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f63f50",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ffea85",
      contrastText: "#5e5e5e",
    },
    text: {
      primary: "#5e5e5e",
    }
  },
  typography: {
    fontFamily: `'Nunito', sans-serif`,
    fontSize: 14,
    h1: {
      fontSize: "2em",
      margin: "0.67em 0",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "1.5em",
      margin: "0.67em 0",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "1.17em",
      margin: "0.67em 0",
      fontWeight: "bold",
    },
    body1: {
      margin: "0.5em 0",
    },
  },
});

const ThemeContext = (props: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <meta name="theme-color" content={theme.palette.primary.main} />
      </Head>
      <Provider theme={theme}>{props.children}</Provider>
    </>
  );
};

export default ThemeContext;
