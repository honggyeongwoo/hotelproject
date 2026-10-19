import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Compare.css';
import CompareCard from '../CompareCard';

export default function Compare() {
  const navigate = useNavigate();
  const [accommodations, setAccommodations] = useState([]);

  //아이디값이 변경될 수 있기 때문에 변수
  const [ids, setIds] = useState();

  // 페이지가 열릴때 딱 한번 타이밍 맞춰서 데이터 가져오기
  useEffect(() => {
    // 1. 세션스토리지에서 꺼내오기
    const saved = sessionStorage.getItem('compareIds');

    // 2. JSON타입 -> 자바스크립트 객체로 변경
    // 브라우저가 꺼졌다가 켜지면 아에 데이터가 없어서 파싱할 문자가
    // 없다. 그럼 에러가 유발!
    const idList = saved ? JSON.parse(saved) : [];
    setIds(idList);

    // 3. 서버로 통신하기
    //  http://localhost:8080/compare?ids=1,2,3
    fetch('http://localhost:8080/compare?ids=' + idList.join(','))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`비교 숙소를 불러오지 못했습니다: ${response.status}`);
        }
        return response.json();
      })
      .then(setAccommodations)
      .catch((error) => {
        console.error('비교 숙소 조회에 실패했습니다.', error);
      });
  }, []);

  // 4. 빼기를 눌렀을 때 카드들의 상태와 sessionStorage를 같이 바꾸는 코드
  // filter() : 삭제할 데이터를 필터링하는것 (자동반복!)
  // 필요없는거는 제거하고 새로운 리스트를 만들어준다.
  const removeOne = (id) => {
    const newIds = ids.filter((x) => x != id);
    sessionStorage.setItem('compareIds', JSON.stringify(newIds));
    // 아이디들만 저장하는 변수 수정!
    setIds(newIds);
    // 숙소에 대한 정보들을 가지고 있는 변수 수정!
    setAccommodations(accommodations.filter((a) => a.숙소정보.id != id));
  };

  return (
    <main className="comparePage">
      <h2>세 곳의 쉼, 한눈에 비교해요</h2>
      <section className="compareSearchInfo" aria-label="검색 조건">
        <p>지역: 여행지역 선택</p>
        <p>인원수: 인원 선택</p>
        <p>체크인: 미정</p>
        <p>체크아웃: 미정</p>
      </section>
      <div>
        <p>이 비교를 저장하고 마이페이지에서 다시 확인하세요.</p>
        <button onClick={() => navigate('/login')}>비교표 저장하기</button>
      </div>
      <div className="compareGrid">
        {[0, 1, 2].map((i) => (
          <div className="compareSlot" key={i}>
            <CompareCard
              accommodation={accommodations[i]?.숙소정보}
              images={accommodations[i]?.이미지들}
              onRemove={() => removeOne(accommodations[i].숙소정보.id)}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
