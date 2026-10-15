import { useEffect } from "react";
import "../../css/Compare.css";

export default function Compare() {
  // 페이지가 열릴때 딱 한번 타이밍 맞춰서 데이터 가져오기
  useEffect(() => {
    // 1. 로컬 스토리지에서 꺼내오기
    const saved = localStorage.getItem("compareIds");

    // 2. JSON타입 -> 자바스크립트 객체로 변경
    const ids = JSON.parse(saved);

    // 3. 서버로 통신하기
    //  http://localhost:8080/compare?ids=1,2,3
    fetch("http://localhost:8080/compare?ids=" + ids.join(",")).then((응답) => {
      console.log(응답.json());
    });
  }, []);

  return (
    <main className="comparePage">
      <h2>세 곳의 쉼, 한눈에 비교해요</h2>
      <section className="compareSearchInfo" aria-label="검색 조건">
        <p>지역: 여행지역 선택</p>
        <p>인원수: 인원 선택</p>
        <p>체크인: 미정</p>
        <p>체크아웃: 미정</p>
      </section>
      <div className="compareGrid">
        <div className="compareCard"></div>
        <div className="compareCard"></div>
        <div className="compareCard"></div>
      </div>
    </main>
  );
}
