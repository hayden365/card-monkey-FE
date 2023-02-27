import React, { useState } from "react";
import styled from "styled-components";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const Agreement = ({ setStep }: Props) => {
  const list = [
    {
      id: "adultConfirm",
      content: "[필수] 만 19세 이상",
    },
    {
      id: "termsConfirm",
      content: "[필수] 이용약관 동의",
    },
    {
      id: "personalInfoConfirm",
      content: "[필수] 개인정보 처리방침 동의",
    },
  ];

  const [agree, setAgree] = useState<string[]>([]);

  const handleCheck = (checked: boolean, id: string) => {
    if (checked) {
      setAgree((prev) => [...prev, id]);
    } else {
      setAgree(agree.filter((item) => item != id));
    }
  };

  const handleAllCheck = (checked: boolean) => {
    if (checked) {
      const checkedArray: string[] = [];
      list.forEach((item) => checkedArray.push(item.id));
      setAgree(checkedArray);
    } else {
      setAgree([]);
    }
  };

  return (
    <Wrap>
      <h4>
        카드몽키 서비스 이용약관에
        <br />
        동의해주세요.
      </h4>
      <InputWrap>
        <div className="allCheck">
          <input
            type="checkbox"
            id="allCheck"
            checked={agree.length === 3 ? true : false}
            onChange={(e) => {
              handleAllCheck(e.target.checked);
            }}
          />
          <label htmlFor="allCheck">모두 동의</label>
        </div>
        {list.map((item, idx) => {
          return (
            <div className="checkList" key={idx}>
              <input
                type="checkbox"
                id={item.id}
                checked={agree.includes(item.id) ? true : false}
                onChange={(e) => {
                  handleCheck(e.target.checked, e.target.id);
                }}
              />
              <label htmlFor={item.id}>{item.content}</label>
            </div>
          );
        })}
      </InputWrap>
      <Button
        disabled={agree.length === 3 ? false : true}
        onClick={() => {
          setStep(2);
        }}
      >
        동의
      </Button>
    </Wrap>
  );
};

const Wrap = styled.div`
  height: 600px;
  width: 100%;
  h4 {
    padding-bottom: 40px;
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
  input {
    width: 20px;
    height: 20px;
  }
  label {
    color: var(--color-black);
    font-size: 14px;
    padding: 2px 0 0 10px;
    cursor: pointer;
  }
  .allCheck {
    display: flex;
    align-items: center;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--color-lightgray);
  }
  .checkList {
    display: flex;
    align-items: center;
    padding: 20px 0 0 0;
  }
`;

export default Agreement;
