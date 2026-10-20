import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Mypage() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');

  // 로딩페이지!
  const [isPage, setIsPage] = useState(false);

  // 에러발생했을 때 처리할 수있는 코드도 추가!
  const [error, setError] = useState('');

  // 마이페이지가 열릴때 확인 한번!
  useEffect(() => {
    // 1. 스프링부트 서버로 통신!
    fetch('http://localhost:8080/me', { credentials: 'include' })
      .then((응답) => {
        console.log(응답);

        if (!응답.ok) {
          throw new Error('로그인 상태를 확인하지 못했습니다.');
        }
        return 응답.json();
      })
      .then((데이터) => {
        //로그인 하지 않았다면 로그인 페이지로 이동.
        if (!데이터.userId) {
          navigate('/login');
          return; //함수도 종료시키기!
        }

        //로그인 정보 있는데!
        setUserId(데이터.userId);
      })
      .catch((에러) => {
        console.error('로그인 확인 오류:', 에러);

        setError('로그인 상태및 서버를 확인하세요');
        //로딩페이지 안 보이게 설정
        setIsPage(false);
      });
  }, [navigate]);

  // 로그인 중이면 로딩페이지를 보여주고 로그인 되었다면
  // 마이페이지 보여준다

  if (isPage) {
    return <h3>로그인 확인 중....</h3>;
  }

  // 에러가 났을 때 보일 페이지를 만든다.
  if (error) {
    return (
      <main>
        <h3>{error}</h3>

        <button type="button" onClick={() => window.location.reload()}>
          다시 시도
        </button>
      </main>
    );
  }

  return (
    <main>
      <h2>마이페이지</h2>
      <div className="mypage-content">
        <div className="mypage-content-detail">
          <p>쉼</p>
          <div>
            <h3>{userId}님, 다음 쉼을 준비하세요</h3>
            <p>마음에 든 숙소 비교를 모아두고, 여행 전 다시 살펴보세요.</p>
          </div>
        </div>
        <div className="mypage-content-detail2">
          <p>저장한 비교1</p>
          <h3>저장한 숙소 비교</h3>
        </div>
      </div>
      <div className="save-content"></div>
    </main>
  );
}
