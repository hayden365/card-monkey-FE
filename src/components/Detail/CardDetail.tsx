import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Back from "../ui/Back";
import { v4 as uuidv4 } from "uuid";
import getTokenApi from "../../api/monkeyGetToken";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReview,
  fetchReviewList,
  selectReview,
} from "../../store/reviewSlice";
import { AppDispatch, RootState } from "../../store/store";
import { addFavor, deleteFavor, fetchFavor } from "../../store/favorSlice";
import { CgSmileSad } from "react-icons/cg";
import SuggestCard from "../ui/SuggestCard";
import { Benefits } from "../../pages/Suggest";
import { toast, ToastContainer } from "react-toastify";

type Props = {
  card: CardInfo;
};

const CardDetail = ({ card }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isApplicated, SetIsApplicated] = useState(false);
  const [myCard, setMyCard] = useState<Array<CardType>>([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const favorList = useSelector((state: RootState) => state.favor.favorList);

  const cardImage = new Image();
  cardImage.src = card.image;

  const getMyCard = async () => {
    const data = await getTokenApi.cardList();
    setMyCard(data);
  };

  useEffect(() => {
    getMyCard();
  }, []);

  const benefits: Benefits = {
    coffee: "커피",
    transportation: "교통",
    movie: "영화",
    delivery: "배달",
    phone: "통신",
    gas: "주유",
    simplePayment: "간편결제",
    tax: "공과금",
    shopping: "쇼핑",
  };

  const findBenefit = () => {
    const result = [];
    for (let i = 0; i < card.benefit.length; i++) {
      const benefit = card.benefit[i];
      const kor = benefits[`${benefit}`];
      result.push(
        <div className="element" key={uuidv4()}>
          <img src={`/benefit_${card.benefit[i]}.png`} />
          <span>{kor}</span>
        </div>,
      );
    }
    return result;
  };

  const toggleFavor = async (e: any) => {
    e.stopPropagation();
    const data = await getTokenApi.toggleFavor(card.id);
    if (data === "찜하기 완료") {
      const newCard: Card = {
        id: card.id,
        company: card.company,
        name: card.name,
        image: card.image,
        type: card.type,
      };
      dispatch(addFavor(newCard));
      toast.success("관심상품에 추가되었습니다!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
    } else if (data === "찜하기 취소 완료") {
      dispatch(deleteFavor(card.id));
      toast.success("관심상품에 삭제되었습니다!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
    } else {
      alert("찜하기 오류 발생");
    }
  };

  useEffect(() => {
    dispatch(fetchFavor());
  }, []);

  const application = async (id: number) => {
    return await getTokenApi.cardApplication(id);
  };

  const clickHandler = (id: number) => {
    application(id);
    SetIsApplicated((prev) => !prev);
    toast.success("카드신청 완료!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
    });
  };
  // const selectedReview = useSelector(
  //   (state: RootState) => state.review.message,
  // );

  // const getReview = async () => {
  //   const data = await getTokenApi.getReview(card.id);
  //   setReviewList(data);
  // };

  // const clickSelect = (text: string) => {
  //   dispatch(selectReview(text));
  // };

  // const reviewArray = [
  //   "MZ세대가 선택한 카드",
  //   "마트,,,다녀오셨어요? 쇼핑할 때 좋은 카드",
  //   "뚜벅이분들~대중교통 할인 해줍니다",
  //   "중요한건 꺾이지 않은 적립율",
  //   "개봉 영화 모두 섭렵하는 나는 영화광",
  //   "반려동물도 내 가족이니까! 동물병원 할인",
  //   "핸드폰 비용도 알뜰하게 할인!",
  //   "꼼꼼한 여행러에게 필수 카드",
  // ];

  const width = () => {
    let width = cardImage.width > cardImage.height ? 240 : 150;
    return width;
  };

  return (
    <Wrapper>
      <div className="Half">
        <Back />
        <CardImg size={width()}>
          <img src={card?.image} />
        </CardImg>
      </div>
      <InfoWrap>
        <span
          className={card?.type === "CREDIT" ? "type credit" : "type check"}
        >
          {card?.type === "CREDIT" ? "신용카드" : "체크카드"}
        </span>
        <h3 className="name">{card?.name}</h3>
        <h4 className="company">{card?.company}</h4>
        {card?.lastMonthPaid !== 0 ? (
          <span className="detail-info">
            전월실적 <strong>{String(card?.lastMonthPaid).slice(0, -4)}</strong>{" "}
            만원 이상
          </span>
        ) : (
          ""
        )}
        {card?.annualFee !== 0 ? (
          <span className="detail-info">
            연회비 <strong>{card.annualFee?.toLocaleString("ko-KR")}</strong> 원
          </span>
        ) : (
          ""
        )}
      </InfoWrap>
      <SectionTitle>
        <hr className="top" color="#f5f5f5" />
        <div className="content">
          <h5>Benefit</h5>
          <span>주요혜택</span>
        </div>
      </SectionTitle>
      {!card.benefit?.length ? (
        <div className="fail-div">
          <CgSmileSad className="smile-sad" size={28} />
          <span className="fail">확인 가능한 키워드가 없어요.</span>
        </div>
      ) : (
        <Benefit>{findBenefit()}</Benefit>
      )}
      <ButtonWrapper>
        <div className="first-row">
          {isApplicated ||
          (myCard && myCard.find((item) => item.id === card.id)) ? (
            <Button
              color={"var(--color-lightgray)"}
              background={"var(--color-brown)"}
              className={"apply"}
              disabled
            >
              이미 신청한 카드입니다.
            </Button>
          ) : (
            <Button
              color={"var(--color-white)"}
              background={"var(--color-primary)"}
              onClick={() => clickHandler(card.id)}
              className={"able"}
            >
              카드 신청하기
            </Button>
          )}
          <Button
            color={"var(--color-primary)"}
            background={"var(--color-white)"}
            className={"able card"}
            onClick={() => window.open(card.apply)}
          >
            카드사 바로가기
          </Button>
        </div>
        {favorList.find((item) => item.id === card.id) ? (
          <Button
            color={"var(--color-brown)"}
            background={"var(--color-lightgray)"}
            onClick={toggleFavor}
            className={"able"}
          >
            내 관심카드에서 삭제하기
          </Button>
        ) : (
          <Button
            color={"var(--color-brown)"}
            background={"var(--color-lightgray)"}
            onClick={toggleFavor}
            className={"able"}
          >
            내 관심카드에 추가하기
          </Button>
        )}
      </ButtonWrapper>
      <SectionTitle>
        <hr className="top" color="#f5f5f5" />
        <div className="content">
          <h5>Suggest</h5>
          <span>{userInfo.name}님의 관심혜택을 기반으로 추천드립니다.</span>
        </div>
      </SectionTitle>
      <SuggestCard />
      {/* <SectionTitle>
          <hr className="top" color="#f5f5f5" />
          <div className="content">
            <h5>Keyword</h5>
            <span>사용자가 평가한 이 카드의 키워드입니다.</span>
          </div>
          <hr className="bottom" color="#f5f5f5" />
        </SectionTitle>
        <Reviews>
          {reviewList.message[0] !== "" ? (
            reviewList.message.map((message: string) => (
              <li className="text" key={uuidv4()}>
                {message}
              </li>
            ))
          ) : (
            <div className="fail-div">
              <CgSmileSad className="smile-sad" size={28} />
              <span className="fail">확인 가능한 키워드가 없어요.</span>
            </div>
          )}
        </Reviews>
        <hr className="bottom" color="#f5f5f5" />
        <ChooseKeyword>
          {reviewArray.map((text) => (
            <BtnReview
              type="button"
              key={uuidv4()}
              className={selectedReview.includes(text) ? "active" : ""}
              onClick={() => clickSelect(text)}
            >
              {text}
            </BtnReview>
          ))}
          {reviewList.message[0] !== "" ? (
            <Button
              color={"var(--color-white)"}
              background={"var(--color-primary)"}
              className={"able"}
              onClick={() => dispatch(fetchReview({ id, selectedReview }))}
            >
              선택한 리뷰 변경하기
            </Button>
          ) : (
            <Button
              color={"var(--color-white)"}
              background={"var(--color-primary)"}
              className={"able"}
              onClick={() => dispatch(fetchReview({ id, selectedReview }))}
            >
              리뷰 선택하기
            </Button>
          )}
        </ChooseKeyword> */}{" "}
      <ToastContainer limit={1} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: inline-block;
  width: 100%;
  .Half {
    width: 500px;
    height: auto;
    background: linear-gradient(
      to top,
      var(--color-white) 0%,
      var(--color-white) 50%,
      #f5f5f5 50%,
      #f5f5f5 100%
    );
  }

  .content {
    box-shadow: 0 7px 10px 4px #f3f3f3;
  }
  .fail-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 3px dashed var(--color-gray);
    border-radius: 10px;
    width: 90%;
    height: 200px;
    margin: 30px auto 50px;
    .smile-sad {
      color: var(--color-gray);
      padding-bottom: 10px;
    }
    .fail {
      color: var(--color-gray);
    }
  }
`;

const CardImg = styled.div<Size>`
  text-align: center;
  img {
    border-radius: 10px;
    mix-blend-mode: darken;
    width: ${(props) => props.size}px;
    background-color: inherit;
    margin: 20px auto 10px auto;
    box-shadow: 1px 10px 35px 3px rgba(0, 0, 0, 0.25);
  }
`;

const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;
  .name {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .company {
    font-size: 14px;
    font-weight: 530;
    margin-bottom: 20px;
  }
  .detail-info {
    margin-top: 10px;
    font-size: 12px;
    strong {
      font-weight: bold;
      font-size: 18px;
    }
  }

  .type {
    display: inline-block;
    border-radius: 40px;
    font-size: 10px;
    font-weight: bold;
    padding: 7px;
    text-align: center;
    margin-bottom: 10px;
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

const SectionTitle = styled.div`
  height: 150px;
  color: #ff6b00;
  text-align: center;
  margin-top: 10px;
  .content {
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h5 {
      margin-bottom: 10px;
      font-style: italic;
      font-weight: 600;
      font-size: 30px;
    }
    span {
      font-weight: 400;
      font-size: 15px;
      position: relative;
    }
  }
`;

const ButtonWrapper = styled.div`
  background-color: inherit;
  padding-bottom: 40px;
  width: 90%;
  margin: 0 auto;
  .first-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }
`;

const Button = styled.button<Button>`
  display: block;
  margin: 10px auto;
  height: 70px;
  width: 100%;
  border: none;
  font-size: 15px;
  font-weight: 600;
  color: ${(props) => props.color};
  background-color: ${(props) => props.background};
  cursor: pointer;
  transition: 0.5s;
  &.able {
    &:hover {
      color: var(--color-white);
      background-color: var(--color-brown);
    }
    &.card {
      border: 2px solid var(--color-primary);
      &:hover {
        background-color: var(--color-primary);
      }
    }
  }
`;

const Benefit = styled.div`
  margin: 30px 0;
  padding-bottom: 10px;
  height: auto;
  display: grid;
  gap: 20px 0;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto auto;
  .element {
    height: 100px;
    display: flex;
    border-right: 1px solid var(--color-lightgray);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    :nth-child(3n) {
      border: none;
    }
    img {
      width: 30px;
      height: 30px;
    }
    span {
      margin-top: 10px;
      font-size: 13px;
      color: var(--color-gray);
      font-weight: 600;
    }
  }
`;

// const Reviews = styled.ul`
//   display: grid;
//   grid-gap: 10px;
//   width: 400px;
//   margin: 0 auto;
//   place-items: center;
//   padding-bottom: 30px;
//   .text {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     border-radius: 15px;
//     background-color: var(--color-lightgray);
//     color: var(--color-primary);
//     font-weight: 600;
//     width: 100%;
//     height: 50px;
//     &::marker {
//       background-color: var(--color-lightgray);
//       color: var(--color-primary);
//     }
//   }
// `;

// const ChooseKeyword = styled.div`
//   padding: 50px;
//   justify-content: center;
//   row-gap: 30px;
//   column-gap: 0;
//   place-items: center;
// `;

// const BtnReview = styled.button`
//   display: inline-block;
//   border: 1px solid #e0e0e0;
//   border-radius: 15px;
//   background-color: #ffffff;
//   height: 50px;
//   width: 400px;
//   line-height: 22px;
//   padding: 0 13px;
//   margin-right: 12px;
//   margin-top: 12px;
//   cursor: pointer;
//   &:hover {
//     background: #f1f2f4;
//   }
//   &.active {
//     background: #fffaef;
//     border: 1px solid var(--color-primary);
//   }
// `;

export default CardDetail;
