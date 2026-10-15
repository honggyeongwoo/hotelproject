import { useEffect, useState } from 'react';
import '../../css/Compare.css';

export default function Compare() {
  const [initialRequest] = useState(() => {
    const saved = localStorage.getItem('compareIds');
    try {
      const ids = saved ? JSON.parse(saved) : [];
      if (!Array.isArray(ids) || ids.some((id) => !Number.isInteger(id))) {
        throw new Error('비교할 숙소 ID 목록이 올바르지 않습니다.');
      }
      return { ids, error: '' };
    } catch (requestError) {
      return { ids: [], error: requestError.message };
    }
  });
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(
    initialRequest.ids.length > 0 && !initialRequest.error,
  );
  const [error, setError] = useState(initialRequest.error);

  useEffect(() => {
    const { ids } = initialRequest;
    if (ids.length === 0) {
      return;
    }

    const controller = new AbortController();
    fetch(`http://localhost:8080/compare?ids=${ids.join(',')}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`비교 정보를 불러오지 못했습니다. (${response.status})`);
        }
        return response.json();
      })
      .then(setAccommodations)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [initialRequest]);

  return (
    <main className="comparePage">
      <h2>세 곳의 쉼, 한눈에 비교해요</h2>
      <section className="compareSearchInfo" aria-label="검색 조건">
        <p>지역: 여행지역 선택</p>
        <p>인원수: 인원 선택</p>
        <p>체크인: 미정</p>
        <p>체크아웃: 미정</p>
      </section>
      <div className="compareSaveInfo">
        <p>비교를 저장하고 마이페이지에서 다시 확인하세요</p>
        <button type="button">비교표 저장하기</button>
      </div>
      {loading && <p>비교 정보를 불러오는 중...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && accommodations.length === 0 && (
        <p>비교할 숙소를 먼저 추가해 주세요.</p>
      )}
      <div className="compareGrid">
        {accommodations.map(({ 숙소정보, 이미지들 }) => (
          <article className="compareCard" key={숙소정보.id}>
            {이미지들?.[0] && (
              <img src={이미지들[0]} alt={숙소정보.name} />
            )}
            <div className="compareCardContent">
              <h3>{숙소정보.name}</h3>
              <p>{숙소정보.city} · {숙소정보.district}</p>
              <p>{숙소정보.originalPrice.toLocaleString()}원</p>
              <p>평점 {숙소정보.rating} · 리뷰 {숙소정보.reviewCount}개</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
