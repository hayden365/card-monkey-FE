import React from "react";
import styled from "styled-components";

type Props = {};

const CardSkeleton = (props: Props) => {
  return (
    <CardContainer>
      <CardImageWrapper>
        <Circle></Circle>
      </CardImageWrapper>
      <CardInfo>
        <div className="wrapper">
          <Name></Name>
          <Company></Company>
          <Type></Type>
        </div>
      </CardInfo>
    </CardContainer>
  );
};

export const SkeletonItem = styled.div`
  background-color: var(--color-lightgray);
  position: relative;
  overflow: hidden;
  border-radius: 4px;

  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: skeleton-gradient 1.5s infinite ease-in-out;
  }
`;

const CardContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  border: 2px solid var(--color-gray);
  border-radius: 12px;
  padding: 30px;
  position: relative;
`;

const CardImageWrapper = styled.div`
  margin-right: 20px;
  width: 110px;
  position: relative;
`;

const Circle = styled(SkeletonItem)`
  width: 110px;
  height: 110px;
  border-radius: 50%;
`;

const CardInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled(SkeletonItem)`
  width: 234px;
  height: 20px;
  margin-bottom: 10px;
`;
const Company = styled(SkeletonItem)`
  width: 100px;
  height: 14px;
  margin-bottom: 10px;
`;
const Type = styled(SkeletonItem)`
  border-radius: 40px;
  width: 54px;
  height: 24px;
`;
export default CardSkeleton;
