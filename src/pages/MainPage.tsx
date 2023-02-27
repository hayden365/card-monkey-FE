import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import getTokenApi from "../api/monkeyGetToken";
import { MyCards } from "../components/ui/MyCard";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadImage } from "../components/ui/LoadImage";

const MainPage = () => {
  const [topCard, setTopCard] = useState<Array<CardType>>();
  const [myCard, setMyCard] = useState<Array<CardType>>([]);
  const [imageDimensions, setImageDimensions] = useState<width>({
    width: 0,
    height: 0,
  });
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  let nowUrl = window.location.href;

  SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay]);

  const notify = () =>
    toast.success("링크가 복사되었습니다!", {
      position: "top-center",
      autoClose: 2000,
    });

  const getHot3 = async () => {
    const topList = await getTokenApi.hot3();
    setTopCard(topList);
  };

  const getMyCard = async (userId: string) => {
    const data = await getTokenApi.cardList();
    setMyCard(data);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(nowUrl).then((res) => {
      notify();
    });
  };
  const sizeCalc = () => {
    return imageDimensions.width > imageDimensions.height ? 70 : 70;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getHot3();
    getMyCard(userInfo.userId);
  }, []);

  return (
    <Container>
      <div className="title">
        <span className="mycard">나의 카드</span>
        <Link to="/mypage" style={{ textDecoration: "none" }}>
          <span className="chart">나의 카드목록 보기</span>
        </Link>
      </div>
      {/* 나의 카드 출력 */}
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={true}
      >
        {myCard.length > 0 ? (
          myCard?.map((data: CardType) => (
            <SwiperSlide key={data.id}>
              <MyCards card={data} />
            </SwiperSlide>
          ))
        ) : (
          <Empty>나의 카드 정보가 없습니다.</Empty>
        )}
      </Swiper>
      {/* 카드 추천 링크 배너 */}
      <Link to="/suggest" style={{ textDecoration: "none" }}>
        <img className="banner" src="../banner_main.png" />
      </Link>
      {/* top3 카드 출력 */}
      <div className="top3">몽키차트 TOP 5</div>
      {Array.isArray(topCard) ? (
        topCard.map((data, index) => {
          return (
            <Link
              to={`/detail/${data.id}`}
              key={data.id}
              style={{ textDecoration: "none" }}
            >
              <Topcard>
                <span className="num">
                  {index + 1}
                  <ImageWrapper size={sizeCalc()}>
                    <img src={data.image} />
                  </ImageWrapper>
                </span>
                <div className="cardInfo">
                  <div className="card">{data.name}</div>
                  <div>{data.company}</div>
                  <div
                    className={
                      data.type === "CREDIT" ? "type credit" : "type check"
                    }
                  >
                    {data.type === "CREDIT" ? "신용카드" : "체크카드"}
                  </div>
                </div>
              </Topcard>
            </Link>
          );
        })
      ) : (
        <div>error</div>
      )}
      {/* 링크복사 배너 */}
      <img
        className="banner"
        src="../banner_sub.png"
        onClick={() => copyUrl()}
      />
      <ToastContainer limit={1} />
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  width: 425px;
  margin: 0 auto;
  padding-bottom: 80px;
  padding-top: 80px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 20px 0 10px;
  }
  .mycard,
  .top3 {
    font-size: 20px;
    font-weight: 700;
  }
  .chart {
    font-size: 12px;
    color: black;
    cursor: pointer;
    :hover {
      color: var(--color-primary);
    }
  }
  .top3 {
    margin: 30px 0 20px;
  }
  .banner {
    border-radius: 10px;
    margin-top: 20px;
    width: 425px;
    aspect-ratio: auto 1/1;
    cursor: pointer;
    :nth-child(2n) {
      margin-top: 10px;
    }
  }
  .swiper-pagination-bullet-active {
    background-color: var(--color-primary) !important;
  }
  .swiper-button-prev {
    color: var(--color-primary) !important;
    font-size: 15px;
    &::after {
      font-size: 20px !important;
      font-weight: 600;
      padding-right: 10px;
    }
  }
  .swiper-button-next {
    color: var(--color-primary) !important;
    &::after {
      font-size: 20px !important;
      font-weight: 600;
    }
  }
`;

export const Empty = styled.div`
  height: 135px;
  padding: 0 30px;
  border: 1px solid var(--color-gray);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: var(--color-gray);
`;

const Topcard = styled.div`
  height: 95px;
  border: 1px solid var(--color-gray);
  border-radius: 10px;
  margin: 10px 0;
  padding: 0 30px;
  color: black;
  display: flex;
  align-items: center;
  cursor: pointer;
  :hover {
    .card {
      color: var(--color-primary);
    }
  }
  span {
    font-size: 25px;
    font-weight: 700;
    margin-right: 70px;
    width: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  div {
    display: flex;
    flex-direction: column;
    font-size: 12px;
  }
  .card {
    font-size: 16px;
    font-weight: 600;
    padding: 3px 0;
  }
  .type {
    width: 40px;
    border-radius: 40px;
    font-size: 10px;
    font-weight: bold;
    margin-top: 5px;
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
  img {
    margin-left: 25px;
    height: ${(props) => props.size}px;
    aspect-ratio: auto 1/1;
  }
`;
