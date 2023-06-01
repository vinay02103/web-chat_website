import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChatContainer from "../components/ChatContainer";
import Users from "../components/Users";
import { setContacts } from "../states/store";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function Chat() {
  const host = "http://localhost:5000";
  const allUserRoute = `${host}/api/auth/allUsers`;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const getUser = async () => {
      if (!localStorage.getItem("user-auth")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("user-auth")));
      }
    };
    getUser();
  }, [navigate]);

  useEffect(() => {
    const handleContacts = async () => {
      if (currentUser) {
        const userContacts = await axios.get(
          `${allUserRoute}/${currentUser._id}`
        );
        dispatch(setContacts(userContacts.data));
      }
    };
    handleContacts();
  }, [allUserRoute, currentUser, dispatch]);

  return (
    <>
      <Container>
        <div className="container">
          <Users />
          <ChatContainer />
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #142d4c;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #385170;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    @media screen and (min-width: 691px) and (max-width: 720px) {
      grid-template-columns: 40% 60%;
    }
    @media screen and (min-width: 480px) and (max-width: 690px) {
      grid-template-columns: 45% 55%;
    }
    @media screen and (min-width: 360px) and (max-width: 480px) {
      grid-template-columns: 50% 50%;
    }
  }
`;
