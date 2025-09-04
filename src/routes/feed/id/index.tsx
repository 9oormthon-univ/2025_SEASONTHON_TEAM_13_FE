import arrowBack from '@/assets/arrow_back.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetFeedById } from '@/hooks/useFeed';

export default function FeedId () {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: feed } = useGetFeedById(Number(id));

  console.log(feed);
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(-1);
  };

  return (
    <div>
      <div className='relative px-[20px] py-[14px] bg-white flex items-center justify-center text-gray800 text-[20px] font-semibold leading-[140%]'>
        <img src={arrowBack} alt='뒤로가기' className='absolute left-[20px] cursor-pointer' onClick={handleClick} />
        게시글
      </div>

    </div>
  );
}
