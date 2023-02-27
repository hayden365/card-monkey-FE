import React, { useState, useEffect } from "react";
import getTokenApi from "../api/monkeyGetToken";
import styled from "styled-components";
import CardItem from "../components/searchProduct/CardItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchFavor } from "../store/favorSlice";
import CardSkeleton from "../components/ui/CardSkeleton";

type Props = {};

const Favor = (props: Props) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const favorList = useSelector((state: RootState) => state.favor.favorList);
  const status = useSelector((state: RootState) => state.favor.status);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchFavor());
  }, []);

  const name = userInfo.name;
  const length = favorList.length;

  return (
    <Wrapper>
      <TopWrapper>
        <h2>나의 관심카드</h2>
        <img src="/monkeycard_yellow.png" />
        <span>
          {name}님의 관심카드는 {length}개 입니다.
        </span>
      </TopWrapper>
      <CardWrapper>
        {status === "idle" ? (
          favorList.length === 0 ? (
            <NoItem>관심카드를 등록해보세요.</NoItem>
          ) : (
            favorList.map((card) => {
              return (
                // 이부분 백쪽에서 리팩토링 되면 수정
                <CardItem card={card} key={card.id} />
              );
            })
          )
        ) : (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        )}
      </CardWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: inline-block;
  width: var(--width-inner);
  padding: 30px;
  padding-top: 80px;
  padding-bottom: var(--margin-bottom);
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-size: 18px;
    font-weight: 900;
    margin: 0 auto;
    padding: 1rem 2rem;
  }
  img {
    width: 212px;
  }
  span {
    color: var(--color-brown);
    font-weight: 600;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 2rem;
`;

const NoItem = styled.div`
  text-align: center;
  margin-top: 70px;
  color: var(--color-brown);
  font-weight: 600;
`;

export default Favor;
