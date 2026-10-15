import '../css/Mypage.css';

export default function MyPage() {
  return (
    <div className="mypage-content">
      <div className="mypage-1">
        <div className="mypage-badge-slot">
          <p className="round-1">쉼</p>
        </div>
        <div className="mypage-1-2">
          <h3>여행자여, 다음 쉼을 준비하여라</h3>
          <p>마음에 든 숙소를 비교하여 모아두고, 여행 전에 확인하여라</p>
        </div>
      </div>

      <div className="mypage-compare-slot">
        <p className="square-1">저장한 비교1</p>
      </div>

      <div className="mypage-2">
        <h3>저장한 숙소 비교</h3>
        <div className="save-content"></div>
      </div>
    </div>
  );
}

{
  /* <div>
      <h2>마이페이지</h2>
      <div className="mypage-content">
        <div className="mypage-1">
          <div className="mypage-1-1">
            <p className="round-1">쉼</p>
            <div className="mypage-1-2">
              <h3>여행자여, 다음 쉼을 준비하여라</h3>
              <p>마음에 든 숙소를 비교하여 모아두고, 여행 전에 확인하여라</p>
            </div>
          </div>
        </div>
        <p className="square-1">저장한 비교1</p>
        <h3>저장한 숙소 비교</h3>
        <div className="save-content"></div>
      </div>
    </div> */
}
