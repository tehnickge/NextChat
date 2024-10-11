import { IconButton, TextField } from "@mui/material";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";

const BarInput = () => {
  return (
    <Container>
      <StyledTextField
        id="filled-search"
        label="Search field"
        type="search"
        variant="filled"
      />
      <StyledIconButton disableRipple>
        <SendIcon />
      </StyledIconButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.background};
`;
const StyledTextField = styled(TextField)`
  flex-grow: 1; /* Растягиваем по ширине */
  margin-right: 10px; /* Отступ между TextField и кнопкой */
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #ff00cc; /* Цвет рамки */
    }
    &:hover fieldset {
      border-color: #00ccff; /* Цвет рамки при наведении */
    }
    &.Mui-focused fieldset {
      border-color: #ff00cc; /* Цвет рамки при фокусе */
    }
  }

  & .MuiInputLabel-root {
    color: #ff00cc; /* Цвет label */
  }

  & .MuiInputLabel-root.Mui-focused {
    color: #ff00cc; /* Цвет label при фокусе */
  }
`;

const StyledIconButton = styled(IconButton)`
  justify-content: center;
  align-items: center;
  align-items: center;
  padding: 0px 20px;
  background-color: #ff00cc; /* Цвет кнопки */
  color: white; /* Цвет иконки */
  &:hover {
    background-color: #e600b3; /* Цвет при наведении */
  }
  * {
    background-color: #ff00cc;
  }
`;

export default BarInput;
