import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import congratulations from "../../lottie/congratulations.json";
import Lottie from "lottie-react";

type Props = {};

const Complete = (props: Props) => {
  const navigate = useNavigate();

  const clickButton = () => {
    navigate(`/login`, { replace: true });
  };
  return (
    <Wrap>
      <Lottie
        className="lottie"
        animationData={congratulations}
        loop={true}
      ></Lottie>
      <img src="./monkey_wink.png" alt="" />
      <h4>
        <span>👏🏻👏🏻👏🏻</span>
        <br />
        축하합니다
        <br />
        카드몽키 회원가입이 완료되었습니다.
      </h4>
      <Button onClick={clickButton}>로그인하러 가기</Button>
    </Wrap>
  );
};

const Wrap = styled.div`
  height: 600px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: flex-start;
  flex-wrap: wrap;
  .lottie {
    position: absolute;
  }
  h4 {
    text-align: center;
    width: 100%;
    font-size: 22px;
    font-weight: 400;
    line-height: 1.4;
    color: var(--color-black);
    z-index: 1;
    span {
      font-size: 45px;
    }
  }
  img {
    margin-top: 80px;
    width: 50%;
    height: 38%;
    z-index: 1;
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

export default Complete;
