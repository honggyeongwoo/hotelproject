USE HotelProject;

-- 다시 실행해도 중복되지 않도록 기존 데이터를 비우고 id를 1부터 다시 시작한다.
-- (앱을 한 번 실행해서 테이블이 생성된 뒤에 실행해야 한다)
DELETE FROM accommodation_image;
DELETE FROM accommodation;
ALTER TABLE accommodation AUTO_INCREMENT = 1;
ALTER TABLE accommodation_image AUTO_INCREMENT = 1;

INSERT INTO accommodation
(name, type, city, district, address, description,
 original_price, discount_rate, rating, review_count,
 parking, breakfast, refundable, cancel_policy)
VALUES
-- 서울
('서울 모먼트 호텔', '호텔', '서울', '성수', '서울특별시 성동구 성수이로 100',
 '성수 카페거리 도보 5분, 감각적인 인테리어의 부티크 호텔입니다.',
 148000, 20, 4.9, 246, TRUE, TRUE, TRUE,
 '체크인 3일 전까지 무료 취소, 이후 1박 요금 100% 부과'),

('여의도 한강뷰 호텔', '호텔', '서울', '여의도', '서울특별시 영등포구 여의나루로 50',
 '한강이 한눈에 보이는 객실과 루프탑 라운지를 갖춘 호텔입니다.',
 189000, 10, 4.7, 389, TRUE, TRUE, TRUE,
 '체크인 2일 전까지 무료 취소, 이후 1박 요금 50% 부과'),

('명동 시티 호텔', '호텔', '서울', '명동', '서울특별시 중구 명동길 30',
 '명동 쇼핑 거리와 지하철역이 바로 앞인 비즈니스 호텔입니다.',
 125000, 0, 4.4, 520, FALSE, FALSE, TRUE,
 '체크인 1일 전까지 무료 취소'),

('북촌 한옥 스테이', '게스트하우스', '서울', '북촌', '서울특별시 종로구 계동길 20',
 '전통 한옥에서 즐기는 조용한 하루. 한식 조식이 제공됩니다.',
 98000, 0, 4.8, 167, FALSE, TRUE, FALSE,
 '예약 후 취소 불가 (환불 불가 특가)'),

('홍대 모던 게스트하우스', '게스트하우스', '서울', '홍대', '서울특별시 마포구 와우산로 45',
 '홍대 번화가 근처, 합리적인 가격의 깔끔한 게스트하우스입니다.',
 59000, 15, 4.3, 298, FALSE, FALSE, TRUE,
 '체크인 3일 전까지 무료 취소'),

('강남 테라스 호텔', '호텔', '서울', '역삼', '서울특별시 강남구 테헤란로 150',
 '넓은 테라스 객실과 피트니스를 갖춘 강남 프리미엄 호텔입니다.',
 210000, 25, 4.6, 431, TRUE, TRUE, FALSE,
 '예약 후 취소 시 1박 요금 100% 부과'),

-- 부산
('부산 파도 리조트', '리조트', '부산', '해운대', '부산광역시 해운대구 해운대해변로 200',
 '해운대 해변 바로 앞, 야외 수영장과 키즈존이 있는 리조트입니다.',
 159000, 0, 4.8, 512, TRUE, TRUE, TRUE,
 '체크인 3일 전까지 무료 취소, 이후 1박 요금 100% 부과'),

('광안리 오션 호텔', '호텔', '부산', '광안리', '부산광역시 수영구 광안해변로 120',
 '광안대교 야경이 보이는 오션뷰 호텔입니다.',
 138000, 10, 4.6, 356, TRUE, FALSE, TRUE,
 '체크인 2일 전까지 무료 취소, 이후 1박 요금 50% 부과'),

('해운대 비치 호텔', '호텔', '부산', '해운대', '부산광역시 해운대구 우동 1500',
 '해운대 해수욕장 도보 3분, 부모님과 함께 묵기 좋은 넓은 객실의 호텔입니다.',
 172000, 15, 4.7, 478, TRUE, TRUE, TRUE,
 '체크인 3일 전까지 무료 취소, 이후 1박 요금 100% 부과'),

('서면 비즈니스 호텔', '호텔', '부산', '서면', '부산광역시 부산진구 서전로 70',
 '서면역 도보 2분, 가성비 좋은 비즈니스 호텔입니다. 주차장은 없습니다.',
 89000, 0, 4.2, 274, FALSE, FALSE, TRUE,
 '체크인 1일 전까지 무료 취소'),

('남포동 감성 게스트하우스', '게스트하우스', '부산', '남포동', '부산광역시 중구 남포길 15',
 '자갈치시장과 국제시장이 가까운 감성 게스트하우스입니다.',
 45000, 0, 4.4, 203, FALSE, TRUE, FALSE,
 '예약 후 취소 불가 (환불 불가 특가)'),

('기장 오션 풀빌라', '풀빌라', '부산', '기장', '부산광역시 기장군 기장읍 연화길 88',
 '프라이빗 수영장과 바비큐 시설을 갖춘 기장 바다 앞 풀빌라입니다.',
 245000, 20, 4.9, 189, TRUE, TRUE, TRUE,
 '체크인 5일 전까지 무료 취소, 이후 1박 요금 100% 부과'),

-- 제주
('제주 온유 풀빌라', '풀빌라', '제주', '애월', '제주특별자치도 제주시 애월읍 애월로 123',
 '프라이빗 수영장이 있는 애월 바다 근처 풀빌라입니다.',
 236000, 20, 4.9, 328, TRUE, FALSE, TRUE,
 '체크인 3일 전까지 무료 취소, 이후 1박 요금 100% 부과'),

('서귀포 바다 리조트', '리조트', '제주', '중문', '제주특별자치도 서귀포시 중문관광로 72',
 '중문 관광단지 인근, 조식 뷔페와 해변 산책로가 있는 리조트입니다.',
 198000, 0, 4.7, 445, TRUE, TRUE, TRUE,
 '체크인 3일 전까지 무료 취소, 이후 1박 요금 100% 부과'),

('협재 해변 펜션', '펜션', '제주', '협재', '제주특별자치도 제주시 한림읍 협재리 1000',
 '협재 해수욕장 도보 5분, 바다를 보며 쉬기 좋은 독채 펜션입니다.',
 120000, 0, 4.5, 212, TRUE, FALSE, FALSE,
 '예약 후 취소 시 1박 요금 100% 부과'),

('성산 일출 게스트하우스', '게스트하우스', '제주', '성산', '제주특별자치도 서귀포시 성산읍 일출로 60',
 '성산일출봉이 보이는 아담한 게스트하우스. 간단한 조식이 포함됩니다.',
 52000, 0, 4.3, 176, TRUE, TRUE, FALSE,
 '예약 후 취소 불가 (환불 불가 특가)'),

('함덕 비치 호텔', '호텔', '제주', '함덕', '제주특별자치도 제주시 조천읍 함덕로 40',
 '함덕 해수욕장 앞, 에메랄드빛 바다가 보이는 호텔입니다.',
 145000, 10, 4.6, 367, TRUE, TRUE, TRUE,
 '체크인 2일 전까지 무료 취소, 이후 1박 요금 50% 부과'),

('한라산 숲속 펜션', '펜션', '제주', '아라', '제주특별자치도 제주시 아라일동 500',
 '한라산 자락의 조용한 숲속 펜션. 가족 단위 여행객에게 인기입니다.',
 110000, 15, 4.4, 98, TRUE, FALSE, TRUE,
 '체크인 3일 전까지 무료 취소'),

-- 강릉
('강릉 하루 스테이', '펜션', '강릉', '안목', '강원특별자치도 강릉시 창해로 150',
 '안목 커피거리와 가까운 아늑한 독채 스테이입니다.',
 98000, 0, 4.7, 183, TRUE, FALSE, TRUE,
 '체크인 2일 전까지 무료 취소'),

('경포 오션뷰 호텔', '호텔', '강릉', '경포', '강원특별자치도 강릉시 경포로 300',
 '경포 해변과 경포호가 모두 보이는 오션뷰 호텔입니다.',
 165000, 10, 4.7, 402, TRUE, TRUE, TRUE,
 '체크인 3일 전까지 무료 취소, 이후 1박 요금 100% 부과'),

('강릉 바다 리조트', '리조트', '강릉', '강문', '강원특별자치도 강릉시 강문해변길 80',
 '강문 해변 앞 대형 리조트. 실내외 수영장과 조식 뷔페가 있습니다.',
 220000, 20, 4.8, 334, TRUE, TRUE, TRUE,
 '체크인 3일 전까지 무료 취소, 이후 1박 요금 100% 부과'),

('주문진 어촌 펜션', '펜션', '강릉', '주문진', '강원특별자치도 강릉시 주문진읍 해안로 90',
 '주문진 수산시장 인근, 저렴한 가격의 바다 앞 펜션입니다.',
 85000, 0, 4.2, 121, TRUE, FALSE, FALSE,
 '예약 후 취소 시 1박 요금 100% 부과'),

('안목 커피거리 게스트하우스', '게스트하우스', '강릉', '안목', '강원특별자치도 강릉시 창해로 160',
 '커피거리 한가운데, 직접 내린 커피와 토스트 조식이 인기인 게스트하우스입니다.',
 48000, 0, 4.5, 259, FALSE, TRUE, FALSE,
 '예약 후 취소 불가 (환불 불가 특가)'),

('정동진 일출 풀빌라', '풀빌라', '강릉', '정동진', '강원특별자치도 강릉시 강동면 정동진리 200',
 '정동진 일출을 객실에서 볼 수 있는 프라이빗 풀빌라입니다.',
 260000, 25, 4.8, 142, TRUE, TRUE, TRUE,
 '체크인 5일 전까지 무료 취소, 이후 1박 요금 100% 부과');

-- 숙소 이미지 (숙소 이름으로 accommodation_id를 찾아서 넣는다)
INSERT INTO accommodation_image (accommodation_id, image_url, sort_order)
SELECT id, 'https://picsum.photos/seed/acc1-1/800/533', 1 FROM accommodation WHERE name = '서울 모먼트 호텔';
INSERT INTO accommodation_image (accommodation_id, image_url, sort_order)
SELECT id, 'https://picsum.photos/seed/acc2-1/800/533', 1 FROM accommodation WHERE name = '여의도 한강뷰 호텔';
INSERT INTO accommodation_image (accommodation_id, image_url, sort_order)
SELECT id, 'https://picsum.photos/seed/acc3-1/800/533', 1 FROM accommodation WHERE name = '명동 시티 호텔';
INSERT INTO accommodation_image (accommodation_id, image_url, sort_order)
SELECT id, 'https://picsum.photos/seed/acc4-1/800/533', 1 FROM accommodation WHERE name = '북촌 한옥 스테이';
INSERT INTO accommodation_image (accommodation_id, image_url, sort_order)
SELECT id, 'https://picsum.photos/seed/acc5-1/800/533', 1 FROM accommodation WHERE name = '홍대 모던 게스트하우스';
INSERT INTO accommodation_image (accommodation_id, image_url, sort_order)
SELECT id, 'https://picsum.photos/seed/acc6-1/800/533', 1 FROM accommodation WHERE name = '강남 테라스 호텔';
INSERT INTO accommodation_image (accommodation_id, image_url, sort_order)
SELECT id, 'https://picsum.photos/seed/acc7-1/800/533', 1 FROM accommodation WHERE name = '부산 파도 리조트';
INSERT INTO accommodation_image (accommodation_id, image_url, sort_order)
SELECT id, 'https://picsum.photos/seed/acc8-1/800/533', 1 FROM accommodation WHERE name = '광안리 오션 호텔';
INSERT INTO accommodation_image (accommodation_id, image_url, sort_order)
SELECT id, 'https://picsum.photos/seed/acc9-1/800/533', 1 FROM accommodation WHERE name = '해운대 비치 호텔';
INSERT INTO accommodation_image (accommodation_id, image_url, sort_order)
SELECT id, 'https://picsum.photos/seed/acc10-1/800/533', 1 FROM accommodation WHERE name = '서면 비즈니스 호텔';
INSERT INTO accommodation_image (accommodation_id, image_url, sort_order)
SELECT id, 'https://picsum.photos/seed/acc11-1/800/533', 1 FROM accommodation WHERE name = '남포동 감성 게스트하우스';
INSERT INTO accommodation_image (accommodation_id, image_url, sort_order)
SELECT id, 'https://picsum.photos/seed/acc12-1/800/533', 1 FROM accommodation WHERE name = '기장 오션 풀빌라';
INSERT INTO accommodation_image (accommodation_id, image_url, sort_order)
SELECT id, 'https://picsum.photos/seed/acc13-1/800/533', 1 FROM accommodation WHERE name = '제주 온유 풀빌라';
INSERT INTO accommodation_image (accommodation_id, image_url, sort_order)
SELECT id, 'https://picsum.photos/seed/acc14-1/800/533', 1 FROM accommodation WHERE name = '서귀포 바다 리조트';
INSERT INTO accommodation_image (accommodation_id, image_url, sort_order)
SELECT id, 'https://picsum.photos/seed/acc15-1/800/533', 1 FROM accommodation WHERE name = '협재 해변 펜션';
INSERT INTO accommodation_image (accommodation_id, image_url, sort_order)
SELECT id, 'https://picsum.photos/seed/acc16-1/800/533', 1 FROM accommodation WHERE name = '성산 일출 게스트하우스';
INSERT INTO accommodation_image (accommodation_id, image_url, sort_order)
SELECT id, 'https://picsum.photos/seed/acc17-1/800/533', 1 FROM accommodation WHERE name = '함덕 비치 호텔';
INSERT INTO accommodation_image (accommodation_id, image_url, sort_order)
SELECT id, 'https://picsum.photos/seed/acc18-1/800/533', 1 FROM accommodation WHERE name = '한라산 숲속 펜션';
INSERT INTO accommodation_image (accommodation_id, image_url, sort_order)
SELECT id, 'https://picsum.photos/seed/acc19-1/800/533', 1 FROM accommodation WHERE name = '강릉 하루 스테이';
INSERT INTO accommodation_image (accommodation_id, image_url, sort_order)
SELECT id, 'https://picsum.photos/seed/acc20-1/800/533', 1 FROM accommodation WHERE name = '경포 오션뷰 호텔';
INSERT INTO accommodation_image (accommodation_id, image_url, sort_order)
SELECT id, 'https://picsum.photos/seed/acc21-1/800/533', 1 FROM accommodation WHERE name = '강릉 바다 리조트';
INSERT INTO accommodation_image (accommodation_id, image_url, sort_order)
SELECT id, 'https://picsum.photos/seed/acc22-1/800/533', 1 FROM accommodation WHERE name = '주문진 어촌 펜션';
INSERT INTO accommodation_image (accommodation_id, image_url, sort_order)
SELECT id, 'https://picsum.photos/seed/acc23-1/800/533', 1 FROM accommodation WHERE name = '안목 커피거리 게스트하우스';
INSERT INTO accommodation_image (accommodation_id, image_url, sort_order)
SELECT id, 'https://picsum.photos/seed/acc24-1/800/533', 1 FROM accommodation WHERE name = '정동진 일출 풀빌라';
