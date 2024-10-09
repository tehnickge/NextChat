"use client";

import styled, { ThemeProvider } from "styled-components";
import theme from "../../styles/theme";
import GlobalStyle from "../../styles/globalStyles";
import { Grid2 } from "@mui/material";
import DashBoard from "../../components/DashBoard/DashBoard";
import Chat from "../../components/Chat/Chat";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Main>
        <StyledGrid2 container>
          <StyledGrid2 size={3}>
            <DashBoard></DashBoard>
          </StyledGrid2>
          <StyledGrid2 size={9}>
            <Chat></Chat>
          </StyledGrid2>
        </StyledGrid2>
      </Main>
    </ThemeProvider>
  );
}

const StyledGrid2 = styled(Grid2)`
  padding: 0;
  margin: 0;
  height: 100vh;
`;
const Main = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
`;
