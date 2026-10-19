import "../css/Compare.css";

export default function CompareCard({ accommodation, onRemove }) {
  if (!accommodation) {
    return null;
  }

  const hotel = accommodation.숙소정보;
  const imageUrl = accommodation.이미지들?.[0];
  const discountedPrice = Math.round(
    (hotel.originalPrice * (100 - hotel.discountRate)) / 100,
  );

  return (
    <>
      <h3>{hotel.name}</h3>
      {imageUrl && <img src={imageUrl} alt={hotel.name} />}
      <p>
        <span className="compareDiscountPrice">
          {discountedPrice.toLocaleString()}
        </span>
        원
      </p>
      <p>평점: {hotel.rating}</p>
      <p>리뷰: {hotel.reviewCount}개</p>
      <p>주차: {hotel.parking ? "가능" : "불가"}</p>
      <p>조식: {hotel.breakfast ? "포함" : "미포함"}</p>
      <p>취소 정책: {hotel.cancelPolicy}</p>
      <p>환불: {hotel.refundable ? "가능" : "불가"}</p>
      <button onClick={onRemove} type="button" aria-label="비교 카드 기능">
        빼기
      </button>
    </>
  );
}
