import '../../css/Compare.css';

export default function CompareCard({ accommodation, images = [] }) {
  const discountedPrice = Math.round(
    (accommodation.originalPrice * (100 - accommodation.discountRate)) / 100,
  );

  return (
    <article className="compareCard">
      <h3>{accommodation.name}</h3>
      {images[0] && <img src={images[0]} alt={accommodation.name} />}
      <div className="compareCardContent">
        <p>
          {accommodation.city} · {accommodation.district}
        </p>
        <p className="compareCardPrice">
          <strong>
            <span className="compareDiscountedPrice">{discountedPrice.toLocaleString()}</span>원
          </strong>
          {accommodation.discountRate > 0 && (
            <>
              {' '}
              <del>{accommodation.originalPrice.toLocaleString()}원</del>
              <span> {accommodation.discountRate}% 할인</span>
            </>
          )}
        </p>
        <p>평점 {accommodation.rating}</p>
        <p>리뷰 {accommodation.reviewCount.toLocaleString()}개</p>
        <p>주차: {accommodation.parking ? '가능' : '불가'}</p>
        <p>조식: {accommodation.breakfast ? '가능' : '불가'}</p>
        <p>취소 및 환불: {accommodation.refundable ? '가능' : '불가'}</p>
        <p>취소 정책: {accommodation.cancelPolicy || '정보 없음'}</p>
        <p>환불: {accommodation.refundable ? '가능' : '불가'}</p>
        <button type="button" aria-label="비교 카드 기능">
          빼기
        </button>
      </div>
    </article>
  );
}
