import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { fillPassword } from "../../store/signUpSlice";
import { BsCheckCircle } from "react-icons/bs";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const Password = ({ setStep }: Props) => {
  const dispatch = useDispatch();
  const [pwd, setPwd] = useState("");
  const [pwdValid, setPwdValid] = useState(false);
  const [pwdChk, setPwdChk] = useState("");
  const [pwdChkValid, setPwdChkValid] = useState(false);
  const regex = /^(?=.*?[A-Za-z])(?=.*?\d)[A-Za-z\d]{8,14}$/;

  // 비밀번호 입력
  const handlePwd = (value: string) => {
    setPwd(value);
  };
  useEffect(() => {
    if (regex.test(pwd)) {
      setPwdValid(true);
    } else {
      setPwdValid(false);
    }
  }, [pwd]);

  const handlePwdChk = (value: string) => {
    setPwdChk(value);
  };

  useEffect(() => {
    if (pwdChk === pwd && pwdValid) {
      setPwdChkValid(true);
    } else {
      setPwdChkValid(false);
    }
  }, [pwdChk, pwd]);

  return (
    <Wrap>
      <h4>
        로그인에 사용할
        <br />
        비밀번호를 입력해주세요.
      </h4>
      <InputWrap>
        <div className="group">
          <div className="inputTitle">비밀번호</div>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            onChange={(e) => {
              handlePwd(e.target.value);
            }}
          />
        </div>
        <ValidConditions
          className={`${pwdValid && pwd.length > 0 && "satisfaction"}`}
        >
          <p>8~12자 영문 숫자 조합</p>
          <BsCheckCircle className="icon" />
        </ValidConditions>
        <div className="group">
          <div className="inputTitle">비밀번호 확인</div>
          <input
            type="password"
            placeholder="한 번 더 입력하세요."
            onChange={(e) => {
              handlePwdChk(e.target.value);
            }}
          />
        </div>
        <ValidConditions
          className={`${pwdChkValid && pwdChk.length > 0 && "satisfaction"}`}
        >
          <p>비밀번호와 일치</p>
          <BsCheckCircle className="icon" />
        </ValidConditions>
      </InputWrap>
      <Button
        disabled={!pwdChkValid}
        onClick={() => {
          dispatch(fillPassword(pwd));
          setStep(5);
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
      width: 30%;
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
  padding-bottom: 20px;
  .icon {
    padding: 0 15px 0 3px;
  }
  &.satisfaction {
    color: green;
  }
`;
export default Password;
