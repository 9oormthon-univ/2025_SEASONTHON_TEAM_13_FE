/**
 * 상대적 시간을 계산하는 함수
 * @param dateString - ISO 날짜 문자열
 * @returns "몇분전", "몇시간전", "몇일전" 등의 문자열
 */
export function getRelativeTime (dateString: string): string {
  // 현재 시간 (한국 시간대)
  const now = new Date();

  // createdAt이 UTC 시간이라면 한국 시간대로 변환 (UTC+9)
  const targetDate = new Date(dateString);
  const kstTargetDate = new Date(targetDate.getTime() + (9 * 60 * 60 * 1000));

  // 시간 차이 계산 (밀리초)
  const diffInMs = now.getTime() - kstTargetDate.getTime();

  // 밀리초를 초로 변환
  const diffInSeconds = Math.floor(diffInMs / 1000);

  // 1분 미만
  if (diffInSeconds < 60) {
    return '방금 전';
  }

  // 1시간 미만
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  // 1일 미만
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  // 7일 미만
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  }

  // 30일 미만
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}주 전`;
  }

  // 1년 미만
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}개월 전`;
  }

  // 1년 이상
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}년 전`;
}

/**
 * 날짜를 한국어 형식으로 포매팅하는 함수
 * @param dateString - ISO 날짜 문자열
 * @returns "2024년 9월 4일" 형식의 문자열
 */
export function formatKoreanDate (dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}

/**
 * 날짜를 간단한 형식으로 포매팅하는 함수
 * @param dateString - ISO 날짜 문자열
 * @returns "9/4" 형식의 문자열
 */
export function formatShortDate (dateString: string): string {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month}/${day}`;
}
