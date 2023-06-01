import React from "react";
import { TbLogout } from "react-icons/tb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Logout() {
  const navigate = useNavigate();
  const eventHandler = async () => {
    localStorage.removeItem("user-auth");
    navigate("/login");
  };
  return (
    <Button onClick={eventHandler}>
      <TbLogout />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.7rem;
  border: none;
  cursor: pointer;
  justify-content: center;
  background-color: #ffb5b5;
`;
