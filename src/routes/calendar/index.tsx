import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { useState } from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import music from '@/assets/music.svg';

export default function CalendarPage () {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeStartDate, setActiveStartDate] = useState<Date>(new Date());
  const { data } = useCalendar();

  // 선택한 날짜에 해당하는 모든 데이터 찾기
  const selectedDateDataList = data?.filter(item => {
    const itemDate = new Date(item.createdAt);

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
    <div className='min-h-screen  pb-31 bg-[#F8F8F8]'>

      <div className='px-[16px] bg-white pb-[30px] pt-[20px]'>
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
              const itemDate = new Date(item.createdAt);
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
        <div className='p-[25px] flex flex-col gap-[24px]'>
          <p className='font-semibold text-[20px] text-gray800 leading-[140%]'>{formatDate(selectedDate)}</p>
          <div className='flex flex-col px-[20px] py-[16px] bg-white rounded-[16px]'>
            <div className='mb-[16px]'>
              {selectedDateData?.emotionTags?.length > 0
                ? (
                  <div className='flex flex-wrap gap-[8px]'>
                    {selectedDateData.emotionTags.map((tag, index) => (
                      <span key={index} className='px-[14px] py-[3px] bg-[#FFEBEA] text-primary text-[12px] font-medium leading-[140%] rounded-full border border-primary'>
                        {tag}
                      </span>
                    ))}
                  </div>
                  )
                : (
                  <p className='text-gray-400 text-sm'>이모션 태그가 없습니다</p>
                  )}
            </div>
            <div className='mb-[4px]'>
              {selectedDateData?.song && (
                <div className='flex items-center '>
                  <img src={music} alt='music' />
                  <p className='text-[16px] text-gray800 font-semibold leading-[140%]'>{selectedDateData.song.title} - {selectedDateData.song.artist}</p>
                </div>
              )}
            </div>
            <div className='mb-[16px]'>
              {selectedDateData?.dailyTags?.length > 0
                ? (
                  <div className='flex flex-wrap gap-[8px]'>
                    {selectedDateData.dailyTags.map((tag, index) => (
                      <span key={index} className='text-gray600 text-[14px] font-medium leading-[140%]'>
                        {tag}
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
