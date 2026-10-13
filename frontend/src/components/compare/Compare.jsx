import "../../css/Compare.css";

export default function Compare() {
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
