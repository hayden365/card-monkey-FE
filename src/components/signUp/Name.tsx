import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fillName } from "../../store/signUpSlice";
import { BsCheckCircle } from "react-icons/bs";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const Name = ({ setStep }: Props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(false);
  const regex = /^[가-힣]{2,6}$/;

  useEffect(() => {
    if (regex.test(name)) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  }, [name]);

  const handleChange = (value: string) => {
    setName(value);
  };

  return (
    <Wrap>
      <h4>이름을 입력해주세요.</h4>
      <InputWrap>
        <div className="group">
          <div className="inputTitle">이름</div>
          <input
            type="text"
            id="id"
            placeholder="이름을 입력하세요."
            onChange={(e) => {
              handleChange(e.target.value);
            }}
          />
        </div>
        <ValidConditions
          className={`${nameValid && name.length > 0 && "satisfaction"}`}
        >
          <p>2~6자 한글 </p>
          <BsCheckCircle />
        </ValidConditions>
      </InputWrap>
      <Button
        disabled={!nameValid}
        onClick={() => {
          dispatch(fillName(name));
          setStep(3);
        }}
      >
        다음
      </Button>
    </Wrap>
  );
};

const Wrap = styled.div`
  height: 600px;
  width: 100%;
  h4 {
    padding-bottom: 80px;
    font-size: 26px;
    font-weight: 400;
    line-height: 1.4;
    color: var(--color-black);
  }
`;

const Button = styled.button`
  border: none;
  position: fixed;
  bottom: 0;
  margin: 0 -37.5px;
  width: 500px;
  height: 70px;
  background-color: var(--color-primary);
  font-weight: 600;
  font-size: 15px;
  color: var(--color-white);
  cursor: pointer;
  transition: 0.3s;
  &:disabled {
    background-color: var(--color-gray);
    transition: 0.2s;
  }
`;

const InputWrap = styled.div`
  .group {
    display: flex;
    width: 100%;
    margin-bottom: 15px;
    align-items: center;
    border-bottom: 1px solid var(--color-gray);
    font-size: 14px;
    .inputTitle {
      width: 20%;
      font-weight: 600;
      padding-right: 20px;
    }
    input {
      width: 100%;
      height: 30px;
      border: none;
      outline: none;
      background-color: transparent;
    }
  }
`;

const ValidConditions = styled.div`
  display: flex;
  font-size: 14px;
  width: 100%;
  color: var(--color-gray);
  p {
    padding-right: 5px;
  }
  &.satisfaction {
    color: green;
  }
`;
export default Name;
