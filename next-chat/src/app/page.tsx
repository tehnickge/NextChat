"use client";

import styled, { ThemeProvider } from "styled-components";
import theme from "../../styles/theme";
import GlobalStyle from "../../styles/globalStyles";
import Dashboard from "../../components/dashboard/dasboard/Dashboard";
import Link from "next/link";

export default function Home() {


  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Main>
        <Dashboard></Dashboard>
        <ul>
          <li>
            {" "}
            <Link href="/register"> register</Link>
          </li>
          <li>
            <Link href="/login"> login</Link>
          </li>
        </ul>
      </Main>
    </ThemeProvider>
  );
}

const Main = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
`;
