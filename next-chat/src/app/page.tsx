"use client";
import { useSession } from "next-auth/react";
import styled from "styled-components";

export default function Home() {
  const session = useSession();
  console.log(session.status);
  return <Main></Main>;
}

const Main = styled.div`
  color: black;
`;
