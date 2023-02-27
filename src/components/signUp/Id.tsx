import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { fillId } from "../../store/signUpSlice";
import { BsCheckCircle } from "react-icons/bs";
import setTokenApi from "../../api/monkeySetToken";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const Id = ({ setStep }: Props) => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [idValid, setIdValid] = useState(false);
  const [idCheck, setIdCheck] = useState(false);
  const [fail, setFail] = useState<boolean>(false);
  const regex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{5,14}$/;

  useEffect(() => {
    if (regex.test(userId)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
    setIdCheck(false);
  }, [userId]);

  const clickIdCheck = async (userId: string) => {
    const res = await setTokenApi.idCheck(userId);
    if (!res) {
      setIdCheck(true);
    } else {
      setFail(true);
      setTimeout(() => {
        setFail(false);
      }, 1000);
    }
  };

  const handleChange = (value: string) => {
    setUserId(value);
  };
  return (
    <Wrap>
      <h4>
        로그인에 사용할
        <br />
        아이디를 입력해주세요.
      </h4>
      <InputWrap>
        <div className="group">
          <div className="inputTitle">아이디</div>
          <input
            type="text"
            id="id"
            placeholder="아이디를 입력하세요."
            onChange={(e) => {
              handleChange(e.target.value);
            }}
          />
          <button
            className="idCheck"
            onClick={() => {
              clickIdCheck(userId);
            }}
            disabled={!idValid}
          >
            아이디 중복 확인
          </button>
        </div>
        <div className="valid">
          <ValidConditions
            className={`${idValid && userId.length > 0 && "satisfaction"}`}
          >
            <p>5~12자 영문, 숫자 조합</p>
            <BsCheckCircle className="icon" />
          </ValidConditions>
          <ValidConditions
            className={`${idCheck && userId.length > 0 && "satisfaction"}`}
          >
            <p>아이디 중복 확인</p>
            <BsCheckCircle className="icon" />
          </ValidConditions>
        </div>

        <Message className={fail ? "failError" : "basic"}>
          <p>동일한 아이디가 있습니다. 다른 아이디를 입력해주세요.</p>
        </Message>
      </InputWrap>
      <Button
        disabled={!idCheck}
        onClick={() => {
          dispatch(fillId(userId));
          setStep(4);
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
    padding-bottom: 43px;
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
    .idCheck {
      outline: none;
      width: 200px;
      padding: 5px 0;
      box-sizing: border-box;
      background-color: transparent;
      font-weight: 700;
      cursor: pointer;
      border: none;
      color: var(--color-primary);
      &:disabled {
        color: var(--color-gray);
        transition: 0.2s;
      }
    }
  }
  .valid {
    display: flex;
    flex-wrap: nowrap;
  }
`;

const ValidConditions = styled.div`
  display: flex;
  font-size: 14px;
  width: auto;
  color: var(--color-gray);
  .icon {
    padding: 0 15px 0 3px;
  }
  &.satisfaction {
    color: green;
  }
`;

const Message = styled.div`
  width: 100%;
  padding-top: 20px;
  p {
    text-align: left;
    color: red;
    font-size: 14px;
  }
  &.failError {
    display: block;
    transition: ease-in 0.1s;
  }
  &.basic {
    opacity: 0;
    transition: ease-in-out 0.2s;
  }
`;
export default Id;
