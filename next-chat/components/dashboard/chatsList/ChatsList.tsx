import styled from "styled-components";

const Chats = [
  {
    title: "aboba",
    image: "kek",
  },
  {
    title: "aboba",
    image: "kek",
  },
  {
    title: "aboba",
    image: "kek",
  },
  {
    title: "aboba",
    image: "kek",
  },
  {
    title: "aboba",
    image: "kek",
  },
  {
    title: "aboba",
    image: "kek",
  },
  {
    title: "aboba",
    image: "kek",
  },
  {
    title: "aboba",
    image: "kek",
  },
];

const ChatsList = () => {
  return (
    <ChatListContainer>
      {Chats.map((el, i) => (
        <div style={{ backgroundColor: "transparent", color: "white" }} key={i}>
          {el.title}
        </div>
      ))}
    </ChatListContainer>
  );
};

const ChatListContainer = styled.div`
  background-color: transparent;
`;
export default ChatsList;
