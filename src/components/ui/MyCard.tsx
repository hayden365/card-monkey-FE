import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { loadImage } from "./LoadImage";

type MyCardType = {
  card: CardType;
};

export const MyCards = ({ card }: MyCardType) => {
  const [imageDimensions, setImageDimensions] = useState<width>({
    width: 0,
    height: 0,
  });
  const imageUrl = card.image;
  useEffect(() => {
    loadImage(setImageDimensions, imageUrl);
  }, []);

  const sizeCalc = () => {
    return imageDimensions.width > imageDimensions.height ? 110 : 70;
  };

  return (
    <Link to={`/detail/${card.id}`} style={{ textDecoration: "none" }}>
      <Mycard>
        <div className="box">
          <ImageWrapper size={sizeCalc()}>
            <div className="circle">
              <img src={card.image} />
            </div>
          </ImageWrapper>
          <div>
            <div className="cardname">{card.name}</div>
            <div>{card.company}</div>
            <div
              className={card.type === "CREDIT" ? "type credit" : "type check"}
            >
              {card.type === "CREDIT" ? "신용카드" : "체크카드"}
            </div>
          </div>
        </div>
      </Mycard>
    </Link>
  );
};

const Mycard = styled.div`
  .box {
    height: 135px;
    padding: 0 30px;
    border: 1px solid var(--color-gray);
    border-radius: 10px;
    display: flex;
    align-items: center;
    font-size: 13px;
    color: black;
    cursor: pointer;
    &:hover img {
      transform: translateY(-5px);
    }
  }

  .cardname {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 5px;
  }

  .type {
    display: inline-block;
    border-radius: 40px;
    font-size: 10px;
    font-weight: bold;
    margin-top: 7px;
    padding: 7px;
    text-align: center;
    &.credit {
      color: #ff6b00;
      background-color: #ffeacc;
    }
    &.check {
      color: #1bbbee;
      background-color: #dbf6ff;
    }
  }
`;

const ImageWrapper = styled.div<Size>`
  .circle {
    background-color: var(--color-lightgray);
    border-radius: 50%;
    width: 110px;
    height: 110px;
    margin-right: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: ${(props) => props.size}px;
      aspect-ratio: auto 1/1;
      transition: 0.2s;
      filter: drop-shadow(6px 4px 4px #c3c3c3);
    }
  }
`;
