import { Container, Grid2, List } from "@mui/material";
import styled from "styled-components";
import BarInput from "./components/BarInput/BarInput";
import Field from "./components/Field/Field";

const Chat = () => {
  return (
    <StyledContainer>
      <StyledFieldContainer>
        <Field></Field>
      </StyledFieldContainer>
      <StyledBarInputContainer>
        <BarInput></BarInput>
      </StyledBarInputContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled(Grid2)`
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden; /* Отключаем прокрутку на уровне контейнера */
`;
const StyledFieldContainer = styled(Grid2)`
  flex-grow: 1; /* Растягиваем по высоте */
  padding: 0;
  margin: 0;
  width: 100%;
  overflow-y: auto; /* Добавляем прокрутку, если нужно */
  box-sizing: border-box;
`;
const StyledBarInputContainer = styled(Grid2)`
  height: 60px; /* Фиксированная высота */
  width: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
`;
export default Chat;
