import { useEffect, useState } from 'react';
import './App.css';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Detail from './components/Detail';
import Compare from './components/compare/Compare';
import Login from './components/Login';
import Mypage from './components/Mypage';

// 인기 지역
const REGIONS = [
  {
    name: '서울',
    imageUrl:
      'https://images.unsplash.com/photo-1546874177-9e664107314e?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: '부산',
    imageUrl:
      'https://images.unsplash.com/photo-1768097666072-22f58f0b40cd?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: '제주',
    imageUrl:
      'https://images.unsplash.com/photo-1612977512598-3b8d6a498bbb?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: '강릉',
    imageUrl:
      'https://images.unsplash.com/photo-1723528582975-5c6629c6356e?auto=format&fit=crop&w=800&q=80',
  },
];

const FOOTER_LINKS = ['이용약관', '개인정보처리방침', '회사 소개'];

function App() {
  // 화면 인기 숙소를 보여주기 위해서!
  const [hotels, setHotels] = useState([]);
  const [userId, setUserId] = useState(() => sessionStorage.getItem('userId') || '');

  // 페이지 이동에 도움되는 도구를 가져와서 변수에 저장하기
  const navigate = useNavigate();

  const handleLogin = (id) => {
    fetch('http://localhost:8080/me', {
      credentials: 'include', //세션 쿠키 함께 보내기
    })
      .then((응답) => {
        if (!응답.ok) {
          throw new Error('로그인 상태 확인 실패!!');
        }
        // 정상적으로 정보가 왔다면 다음으로 넘길께
        return 응답.json();
      })
      .then((데이터) => {
        setUserId(데이터.userId);
      });
  };

  const handleLogout = () => {
    // 서버로 요청하기
    fetch('http://localhost:8080/logout', {
      method: 'POST',
      credentials: 'include', //세션 쿠키 함께 보내기
    })
      .then((응답) => {
        if (!응답.ok) {
          throw new Error('로그아웃 실패!');
        }

        // 로그아웃실패 아니고 정상이면
        sessionStorage.removeItem('userId');
        setUserId('');

        alert('로그아웃되었습니다.!');
        navigate('/');
      })
      .catch((에러) => {
        console.error(에러);
        alert('로그아웃에 실패했습니다.');
      });
  };

  // 페이지 실행하면 서버에서 데이터 가져오기
  // useEffect
  // - 서버에서 데이터를 불러올 때 안전하게 쓰기 위해서 useEffect
  //   안에 넣어준다.

  useEffect(() => {
    fetch('http://localhost:8080/')
      .then((res) => res.json())
      .then((data) => {
        console.log('응답: ' + data);
        setHotels(data);
      });
  }, []);
  return (
    <div className="main">
      <header className="header">
        <a className="logo" href="/">
          쉬어가
        </a>
        <nav className="menu">
          <a href="#">국내숙소</a>
          <a href="#">해외숙소</a>
          <a href="#">특가</a>
          {userId ? (
            <>
              <h3>{userId}님</h3>
              <Link className="login" to="/mypage">
                마이페이지
              </Link>
              <button className="login" type="button" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <Link className="login" to="/login">
              로그인
            </Link>
          )}
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <section className="hero">
                <h1>어디로 떠나세요?</h1>
                <p className="heroSubtitle">오늘 어디에서 쉬어갈까요?</p>
                <form className="heroSearch">
                  <div className="searchField">
                    <p>여행지역</p>
                    <select aria-label="여행지역" defaultValue="">
                      <option value="" disabled>
                        여행지역 선택
                      </option>
                      <option value="seoul">서울</option>
                      <option value="busan">부산</option>
                      <option value="jeju">제주</option>
                    </select>
                  </div>
                  <div className="searchField">
                    <p>체크인</p>
                    <input type="date" aria-label="체크인" />
                  </div>
                  <div className="searchField">
                    <p>체크아웃</p>
                    <input type="date" aria-label="체크아웃" />
                  </div>
                  <div className="searchField">
                    <p>인원</p>
                    <select aria-label="인원" defaultValue="">
                      <option value="" disabled>
                        인원 선택
                      </option>
                      <option value="1">1명</option>
                      <option value="2">2명</option>
                      <option value="3">3명</option>
                      <option value="4">4명 이상</option>
                    </select>
                  </div>
                  <button type="submit">숙소 검색</button>
                </form>
              </section>

              <section className="categoryTabs">
                <button className="categoryTab categoryTabActive" type="button">
                  <span className="categoryIcon" aria-hidden="true">
                    🏨
                  </span>
                  <span>호텔</span>
                </button>
                <button className="categoryTab" type="button">
                  <span className="categoryIcon" aria-hidden="true">
                    🏡
                  </span>
                  <span>펜션</span>
                </button>
                <button className="categoryTab" type="button">
                  <span className="categoryIcon" aria-hidden="true">
                    🏊
                  </span>
                  <span>풀빌라</span>
                </button>
                <button className="categoryTab" type="button">
                  <span className="categoryIcon" aria-hidden="true">
                    🏖️
                  </span>
                  <span>리조트</span>
                </button>
                <button className="categoryTab" type="button">
                  <span className="categoryIcon" aria-hidden="true">
                    🛏️
                  </span>
                  <span>게스트하우스</span>
                </button>
              </section>

              <section className="popularSection">
                <h2>이번 주 인기 숙소</h2>
                <p>먼저 쉬어간 여행자들이 추천해요</p>
                <ul className="popularList">
                  {hotels.map((hotel) => {
                    // 서버가 할인가를 주지 않으므로 프론트에서 계산
                    const discountedPrice = Math.round(
                      (hotel.originalPrice * (100 - hotel.discountRate)) / 100,
                    );

                    return (
                      <li key={hotel.id}>
                        <Link to={`/detail/${hotel.id}`}>
                          <article className="popularCard">
                            <div className="popularImageWrap">
                              <img src={hotel.imageUrl} alt={hotel.name} />
                              {hotel.discountRate > 0 && (
                                <span className="discountBadge">{hotel.discountRate}% 할인</span>
                              )}
                              <button className="favoriteButton" type="button" aria-label="찜하기">
                                ♡
                              </button>
                            </div>
                            <div className="popularCardContent">
                              <p className="popularLocation">
                                {hotel.city} · {hotel.district}
                              </p>
                              <h3>{hotel.name}</h3>
                              <p className="popularRating">
                                ⭐ {hotel.rating} · 리뷰 {hotel.reviewCount}개
                              </p>
                              <p className="popularPrice">
                                {hotel.discountRate > 0 && (
                                  <del>{hotel.originalPrice.toLocaleString()}원</del>
                                )}
                                <strong>{discountedPrice.toLocaleString()}원</strong>
                              </p>
                              <small>1박 기준 · 세금 포함</small>
                            </div>
                          </article>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <section className="regionSection">
                <h2>인기 여행 지역</h2>
                <ul className="regionList">
                  {REGIONS.map((region) => (
                    <li key={region.name}>
                      <figure className="regionCard">
                        <img src={region.imageUrl} alt={region.name} />
                        <figcaption>{region.name}</figcaption>
                      </figure>
                    </li>
                  ))}
                </ul>
              </section>
            </main>
          }
        />

        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>

      <footer className="footer">
        <h2>고객센터 1544-0000</h2>
        <p>매일 09:00–18:00 · 예약 관련 문의를 도와드려요.</p>
        <nav className="footerNav" aria-label="회사 정보">
          <ul>
            {FOOTER_LINKS.map((label) => (
              <li key={label}>
                <a href="#">{label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <address>
          주식회사 쉬어가 · 대표 홍길동 · 서울특별시 중구 여행로 10 · 사업자등록번호 000-00-00000
        </address>
        <small>숙소·가격·회사 정보는 디자인을 위한 예시입니다. © 2026 쉬어가</small>
      </footer>
    </div>
  );
}

export default App;

/*
프론트엔드에서 안쓰는 변수나 문법 실수 확인 
 npm run lint

필드가 깨지는지 확인
 npm run build

위에는 AI가 없을때 최소한의 문법검사랑 빌드 검사!

리뷰프롬프트 
App.jsx와 App.css를 코드 리뷰해줘. 코드는 절대 수정하지 말고 지적만 해줘.
검토 기준:
1. 시맨틱 태그가 알맞은가 (div 남용, img alt 누락, button type 누락)
2. map에 key가 있는가
3. 하드코딩된 반복 코드가 있는가 (상수 배열 + map으로 바꿀 수 있는 곳)
4. 중복되는 계산이나 CSS
5. 안 쓰는 import, 변수, CSS 클래스
6. 접근성 문제 (aria 속성, label 연결)
각 지적을 [심각 / 권장 / 취향]으로 분류하고, 위치(코드 일부)와 이유를 함께 알려줘.

리팩토링
[리팩토링]
 한번에 하나씩!하는게 제일 중요하다.
수정 파일은 App.jsx, App.css만. 화면 동작과 모양은 절대 바뀌면 안 돼.
이번에는 "아래 한 가지"만 정리해줘. 다른 건 건드리지 마.

대상: (예) 카테고리 탭의 하드코딩된 버튼 5개를 CATEGORIES 상수 배열 + map으로 바꿔줘.

끝에 "바뀐 부분 / 바뀌지 않은 부분"을 구분해서 요약해줘.



전체적 흐름
 프롬프트로 만들기 -> 확인(lint/build/눈) -> 커밋 -> AI 리뷰만 지적->
 지적중 [심각]부터 판단 -> 리팩토링(한 가지씩) -> 재확인(lint,build)
 -> 커밋

** 페이지들을 관리하는 리액트 라우터 나오면 모든 경로는 
  Routes안에 Route로 하나의 url 은 하나의 화면을 가진다
  추가적으로 Route경로를 쓰지 않으면 페이지들끼리 연결을 못한다.
  아무리 눌러도 이동할 수없다!**


*/
