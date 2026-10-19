import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api";

export default function Mypage() {
  const navigate = useNavigate();

  // 마이페이지가 열릴때 확인 한번!
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const logoutCheck = userId
      ? window.setInterval(() => {
          if (!sessionStorage.getItem("userId")) {
            navigate("/");
          }
        }, 100)
      : undefined;

    // 1. 스프링부트 서버로 통신!
    fetch(`${API_BASE_URL}/me`, { credentials: "include" }).then(
      (응답) => {
        console.log(응답.status);

        if (응답.status === 403) {
          navigate(
            userId && !sessionStorage.getItem("userId") ? "/" : "/login",
          );
          return;
        }

        // 로그인 정보를 가져온다.
        // 로그인 되어있으면 로그인 상태를 저장하는
        // 변수와 로그인id를 저장하는 변수 두개를 만든다.
      },
    );

    return () => {
      if (logoutCheck !== undefined) {
        window.clearInterval(logoutCheck);
      }
    };
  }, [navigate]);

  return (
    <main>
      <h2>마이페이지</h2>
      <div className="mypage-content">
        <div className="mypage-content-detail">
          <p>쉼</p>
          <div>
            <h3>여행자님, 다음 쉼을 준비하세요</h3>
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
