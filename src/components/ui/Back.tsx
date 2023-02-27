import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import styled from "styled-components";

interface BackButtonProps {
  color?: string;
}

export default function Back({ color }: BackButtonProps) {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(-1);
  };

  return (
    <Button className={"button"} type="button" onClick={clickHandler}>
      <IoIosArrowBack className="back" style={{ width: 25, height: 25 }} />
    </Button>
  );
}

const Button = styled.button`
  background-color: inherit;
  border: none;
  color: ${(props) => props.color || "var(--color-primary)"};
  cursor: pointer;
  .back {
    padding: 20px 0 0 20px;
    font-size: 28px;
    cursor: pointer;
    color: var(--color-gray);
    &:hover {
      color: var(--color-primary);
    }
  }
`;
