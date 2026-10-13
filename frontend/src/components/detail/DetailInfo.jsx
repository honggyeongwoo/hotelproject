import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DetailInfo({ hotel }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // 카카오 로딩,에러 상태처리
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [mapError, setMapError] = useState('');

  // 다시 시도 횟수 상태 처리
  const [retryCount, setReTryCount] = useState(0);

  // 비교하기 버튼을 클릭하면 id 값을 저장하겠다.
  const [compareIds, setCompareIds] = useState(() => {
    //처음 열릴 때 저장된 값을 로컬 스토리지에서 읽어온다.
    const saved = localStorage.getItem('compareIds');
    return saved ? JSON.parse(saved) : [];
  });

  // 페이지 이동 도구
  const navigate = useNavigate();

  const discountedPrice = Math.round((hotel.originalPrice * (100 - hotel.discountRate)) / 100);
  const ratingMessage =
    hotel.rating >= 4.5 ? '최고예요' : hotel.rating >= 4.0 ? '아주 좋아요' : '좋아요';

  useEffect(() => {
    let cancelled = false;
    let finished = false;

    setIsMapLoading(true);
    setMapError('');

    const timeoutId = setTimeout(() => {
      if (cancelled || finished) return;
      finished = true;
      setMapError('지도를 불러오는 시간이 초과되었습니다.');
      setIsMapLoading(false);
    }, 10000);

    const finishWithError = (message) => {
      if (cancelled || finished) return;
      finished = true;
      setMapError(message);
      setIsMapLoading(false);
    };

    try {
      const mapContainer = document.getElementById('locationMapPlaceholder');
      if (!mapContainer || !window.kakao?.maps?.services) {
        finishWithError('카카오 지도를 불러오지 못했습니다.');
      } else {
        const map = new window.kakao.maps.Map(mapContainer, {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        });
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(hotel.address, (result, status) => {
          if (cancelled || finished) return;

          try {
            if (status !== window.kakao.maps.services.Status.OK) {
              finishWithError(`숙소 주소를 검색하지 못했습니다: ${status}`);
              return;
            }

            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            new window.kakao.maps.Marker({ map, position: coords });
            map.setCenter(coords);
            finished = true;
            setIsMapLoading(false);
          } catch (error) {
            console.error('카카오 지도 주소 처리 중 오류가 발생했습니다.', error);
            finishWithError('숙소 위치를 지도에 표시하지 못했습니다.');
          }
        });
      }
    } catch (error) {
      console.error('카카오 지도를 생성하는 중 오류가 발생했습니다.', error);
      finishWithError('카카오 지도를 생성하지 못했습니다.');
    }

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [hotel.address]);

  // 비교하기 클릭했을 때 값 변경
  //  useState는 페이지 이동을 하면 값이 전달 되지
  // 않는다. 그래서 자바스크립트에서 페이지를 이동해도
  // 값을 유지하는 로컬스토리를 사용한다.

  // 리액트의 단점
  // useState의 값이 한번 늦게 저장되는 버그!

  const compareClick = () => {
    // 이미 담긴 숨소라면 중단 true는 이미 담김,false 안 담김
    if (compareIds.includes(hotel.id)) return;
    // 3개가 꽉 차면 중단
    if (compareIds.length >= 3) return;

    const newId = [...compareIds, hotel.id];
    setCompareIds(newId);
    localStorage.setItem('compareIds', JSON.stringify(newId));
    if (newId.length === 3 && window.confirm('3개를 담았어요. 비교표를 볼까요?')) {
      navigate('/compare');
    }
  };

  return (
    <section className="detail-info">
      <div className="detail-info-heading">
        <span className="detail-info-type">{hotel.type}</span>
        <button
          className={`detail-info-favorite${isFavorite ? ' is-favorite' : ''}`}
          type="button"
          aria-label={isFavorite ? '찜 취소' : '찜하기'}
          aria-pressed={isFavorite}
          onClick={() => setIsFavorite((favorite) => !favorite)}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>

      <h1 className="detail-info-name">{hotel.name}</h1>
      <p className="detail-info-location">
        {hotel.city} · {hotel.district}
      </p>
      <p className="detail-info-address">{hotel.address}</p>

      <p className="detail-info-rating">
        <span aria-label={`평점 ${hotel.rating}점`}>★ {hotel.rating}</span>
        <span>{ratingMessage}</span>
        <span>리뷰 {hotel.reviewCount.toLocaleString()}개</span>
      </p>

      <div className="detail-info-price">
        <div>
          {hotel.discountRate > 0 && (
            <div className="detail-info-discount">
              <del>{hotel.originalPrice.toLocaleString()}원</del>
              <span>{hotel.discountRate}% 할인</span>
            </div>
          )}
          <h2>{discountedPrice.toLocaleString()}원</h2>
        </div>

        <button
          className="btn"
          type="button"
          style={{
            boxSizing: 'border-box',
            width: '100px',
            height: '50px',
            padding: '10px 15px',
            borderRadius: '15px',
            backgroundColor: 'var(--primary)',
            color: '#ffffff',
          }}
          onClick={compareClick}
        >
          비교하기
        </button>
      </div>

      <ul className="detail-info-amenities">
        <li className={hotel.parking ? 'is-available' : 'is-unavailable'}>
          <span>주차</span>
          <strong>{hotel.parking ? '가능' : '불가'}</strong>
        </li>
        <li className={hotel.breakfast ? 'is-available' : 'is-unavailable'}>
          <span>조식</span>
          <strong>{hotel.breakfast ? '가능' : '불가'}</strong>
        </li>
        <li className={hotel.refundable ? 'is-available' : 'is-unavailable'}>
          <span>무료 취소</span>
          <strong>{hotel.refundable ? '가능' : '불가'}</strong>
        </li>
      </ul>

      <section className="detail-info-description">
        <h2>숙소 소개</h2>
        <p>{hotel.description}</p>
      </section>

      <section>
        <hr className="cancellationDivider" />
        <h3>취소 및 환불 규정</h3>
        <p>객실별 취소 정책이 상이하니 객실 상세 정보를 확인해 주세요.</p>
      </section>

      <section>
        <hr className="locationDivider" />
        <h3 className="locationTitle">위치</h3>
        <div
          id="locationMapPlaceholder"
          className="locationMapPlaceholder"
          aria-label={`${hotel.name} 위치 지도`}
          role="img"
        />
        {mapError ? (
          <p role="alert">{mapError}</p>
        ) : (
          isMapLoading && <p role="status">지도를 불러오는 중...</p>
        )}
        <br />
        <br />
      </section>
    </section>
  );
}
/*
401 에러가 뜬다
 1. 키 오류 확인
    - 카카오 개발자센터 앱 -> 플랫폼 키 확인 

 2. 도메인이 등록 안되있나 확인
    - 리액트(5173)를 이용해서 지도를 사용할 것!
 3. 카카오맵 사용 설정 OFF? 
    - ON 되어야됨!

상태 처리란?
 - 화면에서  바뀌는 값을 저장하고 그 값에 따라 화면을 
   바꾸는 것! 

카카오 지도 로딩,에러상태 
 - 카카오에서 업데이트를 한다거나 키 만료됬거나 등등
 - 네트워크가 약간 끊겼다가 다시 실행된다.


*/
