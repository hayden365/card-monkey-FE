import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { selectBenefit, submitForm, resetForm } from "../../store/signUpSlice";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const Benefit = ({ setStep }: Props) => {
  const dispatch = useDispatch();
  const [benefit, setBenefit] = useState<string[]>([]);
  const [satisfaction, setSatisfaction] = useState(false);
  const [complete, setComplete] = useState(false);
  const benefits = [
    ["커피", "coffee"],
    ["교통", "transportation"],
    ["영화", "movie"],
    ["배달", "delivery"],
    ["통신", "phone"],
    ["주유", "gas"],
    ["간편결제", "simplePayment"],
    ["공과금", "tax"],
    ["쇼핑", "shopping"],
  ];

  const handleBenefit = (item: string) => {
    if (benefit.length === 3) {
      setSatisfaction(true);
      setTimeout(() => {
        setSatisfaction(false);
      }, 1000);
      if (benefit.includes(item)) {
        setBenefit(benefit.filter((icon) => icon != item));
      }
      return;
    }
    if (!benefit.includes(item)) {
      setBenefit((prev) => [...prev, item]);
    } else {
      setBenefit(benefit.filter((icon) => icon != item));
    }
  };

  useEffect(() => {
    if (benefit.length === 3) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  }, [benefit]);

  return (
    <Wrap>
      <h4>
        관심있는 카드 혜택을
        <br />
        3개 선택해주세요.
        <p>선택한 관심혜택은 몽키추천 서비스에 이용됩니다. 🐒 </p>
      </h4>
      <BenefitWrap>
        {benefits.map((item, idx) => {
          return (
            <Icon
              key={idx}
              className={benefit.includes(item[1]) ? "select" : "basic"}
              onClick={() => {
                handleBenefit(item[1]);
              }}
            >
              <img src={`/benefit_${item[1]}.png`} alt="" />
              <p>{item[0]}</p>
            </Icon>
          );
        })}
      </BenefitWrap>
      <Message className={satisfaction ? "satisfaction" : "basic"}>
        <p>
          선택 가능한 관심 혜택 개수는 3개입니다.
          <br />
          다른 혜택을 원하실 경우 하나 취소 후 다시 선택해 주세요.
        </p>
      </Message>
      <Button
        disabled={!complete}
        onClick={() => {
          setStep(6);
          dispatch(selectBenefit(benefit));
          dispatch(submitForm());
          dispatch(resetForm());
        }}
      >
        회원가입 완료하기
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
  p {
    color: var(--color-gray);
    padding-top: 10px;
    font-size: 16px;
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

const BenefitWrap = styled.div`
  display: grid;
  justify-content: center;
  padding-top: 10px;
  gap: 20px;
  grid-template-columns: repeat(3, 130px);
  grid-template-rows: repeat(3, 100px);
  place-items: center;
`;

const ValidConditions = styled.div`
  display: flex;
  font-size: 14px;
  width: 100%;
  color: var(--color-gray);
  .icon {
    padding: 0 15px 0 3px;
  }
  &.satisfaction {
    color: green;
  }
`;

const Icon = styled.div`
  width: 110px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 15px 0;
  cursor: pointer;
  img {
    width: 38px;
    padding-bottom: 3px;
  }
  p {
    width: 100%;
    text-align: center;
    color: var(--color-gray);
  }
  &.basic:hover {
    border: 1px solid var(--color-primary);
    border-radius: 20px;
  }
  &.select {
    border: 1px solid var(--color-primary);
    border-radius: 20px;
    &:hover {
      border: 2px solid var(--color-primary);
    }
  }
`;

const Message = styled.div`
  width: 100%;
  padding-top: 10px;
  p {
    text-align: center;
    color: red;
    font-size: 14px;
    line-height: 1.3;
  }
  &.satisfaction {
    display: block;
    transition: ease-in 0.1s;
  }
  &.basic {
    opacity: 0;
    transition: ease-in-out 0.2s;
  }
`;

export default Benefit;
