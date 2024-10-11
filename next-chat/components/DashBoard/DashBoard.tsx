import {
  Alert,
  CircularProgress,
  List,
  modalClasses,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import DashboardChats from "./components/chats/DashboardChats";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { chatAPI } from "../../services/ChatSirvice";
import MenuBar from "./components/meneBar/MenuBar";
import CreateChatDialog from "./components/createChatDialog/createChatDialog";


const DashBoard = () => {
  const dispatch = useAppDispatch();

  const {
    data: chats,
    error,
    isLoading,
  } = chatAPI.useFetchAllChatsOfUserQuery(null, {
    pollingInterval: 5000,
  });

  return (
    <Container>
      <StyledList>
        {error && <Typography>ошибка</Typography>}
        {isLoading && <CircularProgress color="secondary" />}
        {chats &&
          chats.map((chat) => (
            <DashboardChats key={chat.id} chat={chat}></DashboardChats>
          ))}
        {chats && chats?.length < 1 && (
          <StyledAlert severity="info">созданйте вош первый чат</StyledAlert>
        )}
      </StyledList>
      <MenuBarStyled />
      <CreateChatDialog />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* Занимает всю высоту окна */
`;

const StyledList = styled(List)`
  padding: 0;
  margin: 0;
  flex: 1; /* Занимает оставшееся пространство */
  background-color: ${({ theme }) => theme.colors.backgroundDatk};
  * {
    transition: 0.4s;
    background-color: ${({ theme }) => theme.colors.backgroundDatk};
  }
  overflow-y: auto;
`;

const StyledAlert = styled(Alert)`
  display: flex;
  justify-content: center; /* Центрирует содержимое */
  margin-right: 100px;
`;

const MenuBarStyled = styled(MenuBar)`
  height: 60px;
`;

export default DashBoard;
