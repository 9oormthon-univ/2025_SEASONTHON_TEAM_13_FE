/**
 * UTC 시간을 한국 시간으로 변환하고 포맷팅하는 함수
 * @param utcDateString - UTC 시간 문자열 (예: "2025-09-15T08:42:39.290217")
 * @returns 포맷팅된 한국 시간 문자열 (예: "9월15일 (월)")
 */
export function formatKoreanDate (utcDateString: string): string {
  // UTC 시간을 Date 객체로 변환
  const utcDate = new Date(utcDateString);

  // 한국 시간으로 변환 (UTC + 9시간)
  const koreanDate = new Date(utcDate.getTime() + (9 * 60 * 60 * 1000));

  // 월 이름 배열
  const months = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  // 요일 이름 배열
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  // 월, 일, 요일 추출
  const month = months[koreanDate.getUTCMonth()];
  const day = koreanDate.getUTCDate();
  const weekday = weekdays[koreanDate.getUTCDay()];

  return `${month}${day}일 (${weekday})`;
}

/**
 * UTC 시간을 한국 시간으로 변환하고 상세 포맷팅하는 함수
 * @param utcDateString - UTC 시간 문자열
 * @returns 포맷팅된 한국 시간 문자열 (예: "2025년 9월 15일 (월)")
 */
export function formatKoreanDateDetailed (utcDateString: string): string {
  const utcDate = new Date(utcDateString);
  const koreanDate = new Date(utcDate.getTime() + (9 * 60 * 60 * 1000));

  const months = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  const year = koreanDate.getUTCFullYear();
  const month = months[koreanDate.getUTCMonth()];
  const day = koreanDate.getUTCDate();
  const weekday = weekdays[koreanDate.getUTCDay()];

  return `${year}년 ${month} ${day}일 (${weekday})`;
}

/**
 * UTC 시간을 한국 시간으로 변환하고 시간까지 포함하여 포맷팅하는 함수
 * @param utcDateString - UTC 시간 문자열
 * @returns 포맷팅된 한국 시간 문자열 (예: "9월15일 (월) 17:42")
 */
export function formatKoreanDateTime (utcDateString: string): string {
  const utcDate = new Date(utcDateString);
  const koreanDate = new Date(utcDate.getTime() + (9 * 60 * 60 * 1000));

  const months = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  const month = months[koreanDate.getUTCMonth()];
  const day = koreanDate.getUTCDate();
  const weekday = weekdays[koreanDate.getUTCDay()];
  const hours = koreanDate.getUTCHours().toString().padStart(2, '0');
  const minutes = koreanDate.getUTCMinutes().toString().padStart(2, '0');

  return `${month}${day}일 (${weekday}) ${hours}:${minutes}`;
}
