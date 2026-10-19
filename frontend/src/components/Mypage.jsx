import { useEffect } from 'react';
import '../css/Mypage.css';

export default function MyPage() {
  // 마이페이지가 열릴때 확인 한번하는
  useEffect(() => {
    // 스프링부트로 통신
    fetch('http://localhost:8080/me', { credentials: 'include' }).then((응답) => {
      // 로그인 되어있으면 로그인 상태를 저장하는 변수와
      // 로그인 id를 저장하는 변수 두개를 만든다.
    });
  });

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
