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

interface DashboardChatsProps {
  chat?: IChat;
  children?: React.ReactNode;
}

const DashboardChats = ({ chat, children }: DashboardChatsProps) => {
  return (
    <StyledListItem alignItems="flex-start">
      <ListItemButton disableRipple>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <StyledTextContainer
          primary={chat && chat.name}
          secondary={
            <Typography component="span" variant="body2">
              <h4>Ali Connors</h4>
              <h5> — I'll be in your neighborhood doing errands this…</h5>
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
