import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { useState } from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import music from '@/assets/music.svg';
import { usePlayerShown } from '@/hooks/usePlayerShown';

export default function CalendarPage () {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeStartDate, setActiveStartDate] = useState<Date>(new Date());
  const { data } = useCalendar();
  const isPlayerShown = usePlayerShown();

  // UTC 시간을 한국시간으로 변환하는 함수
  const convertToKoreaTime = (utcDateString: string) => {
    const utcDate = new Date(utcDateString);
    // 한국시간은 UTC+9이므로 9시간을 더함
    const koreaTime = new Date(utcDate.getTime() + (9 * 60 * 60 * 1000));
    return koreaTime;
  };

  // 선택한 날짜에 해당하는 모든 데이터 찾기
  const selectedDateDataList = data?.filter(item => {
    const itemDate = convertToKoreaTime(item.createdAt);

    // 더 간단한 날짜 비교 방법
    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth() + 1;
    const selectedDay = selectedDate.getDate();

    const itemYear = itemDate.getFullYear();
    const itemMonth = itemDate.getMonth() + 1;
    const itemDay = itemDate.getDate();

    return selectedYear === itemYear && selectedMonth === itemMonth && selectedDay === itemDay;
  }) || [];

  // 첫 번째 데이터만 사용 (기존 로직 유지)
  const selectedDateData = selectedDateDataList[0];

  // 날짜 포맷팅 함수
  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.getDay()];
    return `${month}월 ${day}일 (${weekday})`;
  };

  return (
    <div className={`min-h-screen ${isPlayerShown ? 'pb-51' : 'pb-31'} bg-[#F8F8F8]`}>

      <div className='px-4 bg-white pb-7.5 pt-5'>
        <Calendar
          className='custom-calendar'
          calendarType='gregory'
          locale='ko'
          value={selectedDate}
          onChange={(value) => {
            if (value instanceof Date) {
              setSelectedDate(value);
            }
          }}
          onActiveStartDateChange={({ activeStartDate }) => {
            if (activeStartDate instanceof Date) {
              setActiveStartDate(activeStartDate);
            }
          }}
          formatDay={(_, date) => date.getDate().toString()}
          tileContent={({ date }) => {
            // createdAt이 존재하는 날짜에만 빨간 점 표시
            const hasData = data?.some(item => {
              const itemDate = convertToKoreaTime(item.createdAt);
              const selectedYear = date.getFullYear();
              const selectedMonth = date.getMonth() + 1;
              const selectedDay = date.getDate();

              const itemYear = itemDate.getFullYear();
              const itemMonth = itemDate.getMonth() + 1;
              const itemDay = itemDate.getDate();

              return selectedYear === itemYear && selectedMonth === itemMonth && selectedDay === itemDay;
            });

            if (hasData) {
              return <div className='emotion-dot' />;
            }
            return null;
          }}
          tileClassName={({ date }) => {
            const isActiveMonth = date.getMonth() === activeStartDate.getMonth();

            let className = '';

            // 현재 보고 있는 월이 아닌 경우 연한 회색
            if (!isActiveMonth) {
              className += ' text-gray-400';
            } else {
              className += ' text-gray-800';
            }

            return className;
          }}
        />
      </div>
      {selectedDateData && (
        <div className='p-6 flex flex-col gap-6'>
          <p className='font-semibold text-xl text-gray800 leading-[140%]'>{formatDate(selectedDate)}</p>
          <div className='flex flex-col px-5 py-4 bg-white rounded-2xl'>
            <div className='mb-4'>
              {selectedDateData?.emotionTags?.length > 0
                ? (
                  <div className='flex flex-wrap gap-2'>
                    {selectedDateData.emotionTags.map((tag, index) => (
                      <span key={index} className='px-3.5 py-1 bg-[#FFEBEA] text-primary text-xs font-medium leading-[140%] rounded-full border border-primary'>
                        {tag}
                      </span>
                    ))}
                  </div>
                  )
                : (
                  <p className='text-gray-400 text-sm'>이모션 태그가 없습니다</p>
                  )}
            </div>
            <div className='mb-1'>
              {selectedDateData?.song && (
                <div className='flex items-center '>
                  <img src={music} alt='music' />
                  <p className='text-[16px] text-gray800 font-semibold leading-[140%]'>{selectedDateData.song.title} - {selectedDateData.song.artist}</p>
                </div>
              )}
            </div>
            <div className='mb-4'>
              {selectedDateData?.dailyTags?.length > 0
                ? (
                  <div className='flex flex-wrap gap-2'>
                    {selectedDateData.dailyTags.map((tag, index) => (
                      <span key={index} className='text-gray600 text-sm font-medium leading-[140%]'>
                        #{tag}
                      </span>
                    ))}
                  </div>
                  )
                : (
                  <p className='text-gray-400 text-sm'>데일리 태그가 없습니다</p>
                  )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
