"use client";
import { useSession } from "next-auth/react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../styles/theme";
import GlobalStyle from "../../styles/globalStyles";
import Dashboard from "../../components/dashboard/dasboard/Dashboard";

export default function Home() {
  const session = useSession();
  console.log(session.status);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Main>
        <Dashboard></Dashboard>
      </Main>
    </ThemeProvider>
  );
}

const Main = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;
