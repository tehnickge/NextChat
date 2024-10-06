import styled from "styled-components";
import ChatsList from "../chatsList/ChatsList";

const Dashboard = () => {
  return (
    <DashWrapper>
      <ChatsList></ChatsList>
    </DashWrapper>
  );
};

const DashWrapper = styled.div`
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;

  width: 15vw;
  max-width: 40vw;

  height: 100vh;

  background-color: #303030;
`;
export default Dashboard;
