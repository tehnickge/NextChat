import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { IChat } from "../../../../models/IChat";
import { ChatsWithLastMessage } from "../../../../models/ChatsWithLastMessage";

interface DashboardChatsProps {
  chat?: ChatsWithLastMessage;
  children?: React.ReactNode;
  onClick?(): void;
}

const DashboardChats = ({ chat, children, onClick }: DashboardChatsProps) => {
  return (
    <StyledListItem alignItems="flex-start">
      <ListItemButton disableRipple onClick={onClick}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <StyledTextContainer
          primary={chat && chat.name}
          secondary={
            <Typography component="span" variant="body2">
              <h4>{chat?.users[0].username}</h4>
              <h5> {(chat?.messages[0] && chat?.messages[0].content) || ""}</h5>
            </Typography>
          }
        />
      </ListItemButton>
    </StyledListItem>
  );
};

const StyledListItem = styled(ListItem)`
  padding: 0;
  margin: 0;
  :hover {
    background-color: ${({ theme }) => theme.colors.backgroundLight};
    * {
      background-color: ${({ theme }) => theme.colors.backgroundLight};
    }
  }
`;
const StyledTextContainer = styled(ListItemText)`
  max-height: 100px;
  overflow: hidden;
  padding: 0;
  margin: 0;
  span {
    color: ${({ theme }) => theme.colors.textHover};
    h4 {
      color: ${({ theme }) => theme.colors.text};
    }
    h5 {
      color: ${({ theme }) => theme.colors.textSamy};
    }
  }
`;
export default DashboardChats;
