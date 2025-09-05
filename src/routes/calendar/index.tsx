import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { useState } from 'react';
import { useCalendar } from '@/hooks/useCalendar';

export default function CalendarPage () {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const { data } = useCalendar();
  console.log(data);
  return (
    <div className='min-h-screen  pb-[124px] bg-[#F8F8F8]'>

      <div className='px-[16px] bg-white pb-[30px] pt-[20px]'>
        <Calendar
          className='custom-calendar'
          calendarType='gregory'
          locale='ko'
          value={selectedDate}
          onChange={setSelectedDate}
          onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
          formatDay={(locale, date) => date.getDate().toString()}
          tileContent={({ date }) => {
            // 특정 날짜에 빨간 점 표시 (예시: 3일, 4일, 11일)
            const day = date.getDate();
            if ([3, 4, 11].includes(day)) {
              return <div className='emotion-dot' />;
            }
            return null;
          }}
          tileClassName={({ date }) => {
            const day = date.getDate();
            const isActiveMonth = date.getMonth() === activeStartDate.getMonth();

            let className = '';

            // 현재 보고 있는 월이 아닌 경우 연한 회색
            if (!isActiveMonth) {
              className += ' text-gray-400';
            } else {
              className += ' text-gray-800';
            }

            // 4일은 연한 빨간 배경
            if (day === 4) {
              className += ' bg-red-100';
            }
            // 17일은 진한 빨간 배경
            if (day === 17) {
              className += ' bg-red-500 text-white';
            }

            return className;
          }}
        />
      </div>

    </div>
  );
}
