import styled from "styled-components";
import { chatAPI } from "../../../../services/ChatSirvice";
import { Alert, CircularProgress, List, Typography } from "@mui/material";
import DashboardChats from "../chats/DashboardChats";

const ContainerWithChats = () => {
  const {
    data: chats,
    error,
    isLoading,
  } = chatAPI.useFetchAllChatsOfUserQuery(null, {
    pollingInterval: 10000,
  });

  return (
    <StyledList>
      {error && <Typography>ошибка</Typography>}
      {isLoading && <CircularProgress color="secondary" />}
      {chats &&
        chats.map((chat) => (
          <DashboardChats key={chat.id} chat={chat}></DashboardChats>
        ))}
      {chats && chats?.length < 1 && (
        <StyledAlert severity="info">созданйте ваш первый чат</StyledAlert>
      )}
    </StyledList>
  );
};

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

export default ContainerWithChats;
