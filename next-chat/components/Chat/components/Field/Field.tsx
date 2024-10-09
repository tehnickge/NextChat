import styled from "styled-components";

const Field = () => {
  return <Container>asdfads</Container>;
};

const Container = styled.div`
  overflow-y: auto;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
`;

export default Field;
