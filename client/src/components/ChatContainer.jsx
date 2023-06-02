import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";

export default function ChatContainer({ currentChat }) {
  const host = "http://localhost:5000";
  const addMessageRoute = `${host}/api/chat/addChat`;
  const getMessageRoute = `${host}/api/chat/getChat`;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const currentUser = await JSON.parse(localStorage.getItem("user-auth"));
      const response = await axios.post(getMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    };
    fetchMessages();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const currentUser = await JSON.parse(localStorage.getItem("user-auth"));
    await axios.post(addMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
  };
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
        <div className="chat-messages">
          {messages.map((message) => {
            return (
              <div>
                <div
                  className={`message ${message.self ? "sended" : "received"}`}
                >
                  <div className="content ">
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
  .chat-messages {
    display: flex;
    flex-direction: column;
    overflow: auto;
    padding: 1rem;
    gap: 1rem;

    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #cbf078;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 0.5rem;
        font-size: 1rem;
        border-radius: 1rem;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #5f5dbd;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #f67280;
      }
    }
  }
`;
