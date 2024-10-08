"use client";

import styled, { ThemeProvider } from "styled-components";
import theme from "../../styles/theme";
import GlobalStyle from "../../styles/globalStyles";
import { Grid2 } from "@mui/material";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Main>
        <Grid2 container spacing={2}>
          <Grid2 size={4}></Grid2>
          <Grid2 size={8}>aboba</Grid2>
        </Grid2>
      </Main>
    </ThemeProvider>
  );
}

const Main = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
`;
