import { useState } from 'react';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  //로그인 하는 아이디와 패스워드를 저장하는 변수
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  // 로그인 버튼을 클릭하면 서버로 데이터 보내기!
  const loginRequest = () => {
    console.log('버튼 눌림!');

    fetch('http://localhost:8080/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        // 보내는 데이터의 종류
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, pw }),
    })
      .then(async (응답) => {
        if (!응답.ok) {
          const errorMessage = await 응답.text();
          window.alert(errorMessage || '로그인에 실패했습니다.');
          return;
        }

        onLogin(id);
        //무조건 메인페이지로 이동을 하는게 아니라 기존에 있던
        // 위치를 기억을해서 돌아가거나 아니면 처음 로그인하면 그냥
        // 메인페이지로 가던! 둘중하는 하기?
        navigate('/');
      })
      .catch((error) => {
        console.error('로그인 요청에 실패했습니다.', error);
        window.alert('로그인 요청에 실패했습니다.');
      });
  };

  // form태그로 데이터가 갈 때는 RequestParam("id")
  // body라는 곳에 담긴다.
  return (
    <main className="loginPage">
      <section className="loginCard">
        <h2>쉬어가</h2>
        <div className="loginTabs">
          <button
            className={!isSignUp ? 'loginTabActive' : ''}
            type="button"
            onClick={() => setIsSignUp(false)}
          >
            로그인
          </button>
          <button
            className={isSignUp ? 'loginTabActive' : ''}
            type="button"
            onClick={() => setIsSignUp(true)}
          >
            회원가입
          </button>
        </div>
        {isSignUp ? (
          <form className="loginForm">
            <input
              type="text"
              placeholder="아이디"
              aria-label="아이디"
              onChange={(e) => setId(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호"
              aria-label="비밀번호"
              onChange={(e) => setPw(e.target.value)}
            />
            <input type="password" placeholder="비밀번호 확인" aria-label="비밀번호 확인" />
            <input type="tel" placeholder="휴대폰번호" aria-label="휴대폰번호" />
            <button type="button" style={{ backgroundColor: 'var(--primary)', color: '#ffffff' }}>
              회원가입
            </button>
          </form>
        ) : (
          <form className="loginForm">
            <input
              type="text"
              placeholder="아이디"
              aria-label="아이디"
              onChange={(e) => setId(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호"
              aria-label="비밀번호"
              onChange={(e) => setPw(e.target.value)}
            />
            <button
              type="button"
              style={{ backgroundColor: 'var(--primary)', color: '#ffffff' }}
              onClick={loginRequest}
            >
              로그인
            </button>
            <button className="kakaoLoginButton" type="button">
              카카오톡 로그인
            </button>
            <button className="googleLoginButton" type="button">
              구글 로그인
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
