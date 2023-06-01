import React from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";

export default function ChatContainer({ currentChat }) {
  const handleSendMsg = () => {};
  return (
    <>
      <Container>
        <div className="chat-header">
          <div className="user-details">
            <div className="icon">
              {currentChat.username.charAt(0).toUpperCase()}
            </div>
            <div className="username">
              <h3>{currentChat.username}</h3>
            </div>
          </div>
          <Logout />
        </div>
        <div className="chat-messages"></div>
        <ChatInput handleSendMsg={handleSendMsg} />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      .icon {
        background-color: #66bfbf;
        border-radius: 50% 50%;
        height: 40px;
        width: 40px;
        font-size: 25px;
        text-align: center;
        line-height: 40px;
      }
    }
  }
`;
