import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../api";
import "../css/Detail.css";
import DetailInfo from "./detail/DetailInfo";

export default function Detail() {
  //데이터를 안전하게 가져오는 방법 !
  // 페이지가 열릴때 한번만 가져와!
  // detail/1
  // detail/2
  // detail/3
  // detail/id변수명
  // detail/id
  // detail/no
  // detail/num
  //   URL에서 ID값을 꺼내는 도구! useParams()
  const { id } = useParams();

  // 화면에 보여주는 변수
  // 처음은 데이터가 없다
  const [hotel, setHotel] = useState(null);

  // 이미지는 이미지대로 따로! 저장하는 변수
  const [image, setImage] = useState(null);

  useEffect(() => {
    // 1. 스프링부트한테 통신 fetch(url)
    fetch(`${API_BASE_URL}/detail/${id}`)
      // 2. 응답
      .then((res) => res.json())
      .then((data) => {
        setHotel(data.숙소정보);
        setImage(data.이미지들);
      }); //받은데이터를 변수에저장
  }, []);

  // 데이터가 오기 전에 화면을 그리려고 할 수있다.
  if (!hotel) return <p>불러오는 중...</p>;

  // 로딩이나 에러에 대한 처리도 할 수있도록 코드를 추가하는게 좋다
  // if(!Error) return <p>데이터 로딩중...</p>;

  return (
    <div>
      <div className="total-detail">
        <ul className="detail-page">
          {image.map((url, index) => (
            <li key={index}>
              <img src={url} alt={hotel.name} />
            </li>
          ))}
        </ul>

        <button className="next-btn">다음</button>
      </div>

      <DetailInfo hotel={hotel} />

      <br></br>
    </div>
  );
}

/*
TanStack Query 
 - 서버에서 데이터를 가져오고 관리하는 라이브러리 (실무!)
 - 데이터 저장, 로딩 상태 관리, 다시 요청 
 - 캐시 - 같은 데이터는 저장해뒀다가 재사용!

파이프라인
useState(null) -> useEffect 안에서 fetch실행 -> setState저장
-> if()로딩표시 -> 화면에 그리기!


*/
