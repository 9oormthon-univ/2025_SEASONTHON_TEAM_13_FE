import { useLocation, Link } from 'react-router-dom';
import feed from '@/assets/navbar/feed.svg';
import search from '@/assets/navbar/search.svg';
import ranking from '@/assets/navbar/ranking.svg';
import calendar from '@/assets/navbar/calendar.svg';
import profile from '@/assets/navbar/profile.svg';
import activeFeed from '@/assets/navbar/feed_active.svg';
import activeSearch from '@/assets/navbar/search_active.svg';
import activeRanking from '@/assets/navbar/ranking_active.svg';
import activeCalendar from '@/assets/navbar/calendar_active.svg';
import activeProfile from '@/assets/navbar/profile_active.svg';

interface NavbarProps {
  currentPath?: string;
}

export const Navbar = ({ currentPath }: NavbarProps) => {
  const location = useLocation();
  const actualPath = currentPath || location.pathname;

  const isActive = (path: string) => actualPath === path;

  return (
    <div className='pt-[17px] pb-[34px] border-t border-t-[#F2F2F2] rounded-t-[24px] flex justify-center items-center fixed bottom-0 max-w-[500px] w-full'>
      <Link to='/feed' className='flex flex-col items-center gap-[4px] flex-grow' aria-current={isActive('/feed') ? 'page' : undefined}>
        <img src={actualPath === '/feed' ? activeFeed : feed} alt='' aria-hidden='true' />
        <p className={`body-s ${actualPath === '/feed' ? 'text-primary' : 'text-gray300'} font-semibold`}>
          피드
        </p>
      </Link>

      <Link to='/search' className='flex flex-col items-center gap-[4px] flex-grow' aria-current={isActive('/search') ? 'page' : undefined}>
        <img src={actualPath === '/search' ? activeSearch : search} alt='' aria-hidden='true' />
        <p className={`body-s ${actualPath === '/search' ? 'text-primary' : 'text-gray300'} font-semibold`}>
          검색
        </p>
      </Link>

      <Link to='/ranking' className='flex flex-col items-center gap-[4px] flex-grow' aria-current={isActive('/ranking') ? 'page' : undefined}>
        <img src={actualPath === '/ranking' ? activeRanking : ranking} alt='' aria-hidden='true' />
        <p className={`body-s ${actualPath === '/ranking' ? 'text-primary' : 'text-gray300'} font-semibold`}>
          랭킹
        </p>
      </Link>

      <Link to='/calendar' className='flex flex-col items-center gap-[4px] flex-grow' aria-current={isActive('/calendar') ? 'page' : undefined}>
        <img src={actualPath === '/calendar' ? activeCalendar : calendar} alt='' aria-hidden='true' />
        <p className={`body-s ${actualPath === '/calendar' ? 'text-primary' : 'text-gray300'} font-semibold`}>
          캘린더
        </p>
      </Link>

      <Link to='/profile' className='flex flex-col items-center gap-[4px] flex-grow' aria-current={isActive('/profile') ? 'page' : undefined}>
        <img src={actualPath === '/profile' ? activeProfile : profile} alt='' aria-hidden='true' />
        <p className={`body-s ${actualPath === '/profile' ? 'text-primary' : 'text-gray300'} font-semibold`}>
          프로필
        </p>
      </Link>
    </div>
  );
};
