"use client";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Container>
      <CircularProgress color="inherit" />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
