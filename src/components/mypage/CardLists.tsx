import React, { useEffect, useState } from "react";
import getTokenApi from "../../api/monkeyGetToken";
import { Empty } from "../../pages/MainPage";
import { MyCards } from "../ui/MyCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CardLists = () => {
  const [myCard, setMyCard] = useState<Array<CardType>>([]);
  const [section, setSection] = useState("all");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const notify = (message: string) =>
    toast.success(message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
    });

  useEffect(() => {
    getMyCard();
  }, []);

  const changeSection = (event: any) => {
    setSection(event.target.className);
  };

  const getMyCard = async () => {
    const data = await getTokenApi.cardList();
    setMyCard(data);
  };

  const handleClick = async (id: number, e: any) => {
    e.stopPropagation();
    const res = await getTokenApi.deleteCard(id);
    if (res === "카드신청 취소 완료") {
      notify("카드신청 취소가 완료되었습니다.");
      let newData = myCard.filter((data) => data.id !== data.id);
      setMyCard(newData);
    } else {
      return notify("오류가 발생하였습니다.");
    }
    getMyCard();
  };

  return (
    <div className="myaccount">
      <div className="user-name">{userInfo.name}님의 카드</div>
      <div className="cards">
        <span
          className="all"
          id={section === "all" ? "primary" : "basic"}
          onClick={changeSection}
        >
          전체카드
        </span>
        <span
          className="credit"
          id={section === "credit" ? "primary" : "basic"}
          onClick={changeSection}
        >
          신용카드
        </span>
        <span
          className="check"
          id={section === "check" ? "primary" : "basic"}
          onClick={changeSection}
        >
          체크카드
        </span>
      </div>
      <div className="list">
        {myCard.length > 0 ? (
          myCard
            .filter((card) =>
              section === "all"
                ? true
                : section === "credit"
                ? card.type.includes("CREDIT")
                : false || section === "check"
                ? card.type.includes("CHECK")
                : false,
            )
            .map((data) => (
              <div key={data.id}>
                <MyCards card={data} />
                <div
                  className="cancle"
                  onClick={(e) => handleClick(data.id, e)}
                >
                  카드 신청 취소
                </div>
              </div>
            ))
        ) : (
          <Empty>나의 카드 정보가 없습니다.</Empty>
        )}
      </div>
      <ToastContainer limit={1} />
    </div>
  );
};
