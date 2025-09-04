import heart from '@/assets/heart.svg';
import heart_active from '@/assets/heart_active.svg';
import comment from '@/assets/comment.svg';

const data = [{
  id: 1,
  emotionTags: [
    '외로움',
    '두근거림',
    '설렘'
  ],
  dailyTags: [
    '케데헌',
    '입문',
    '노래짱'
  ],
  trackId: '02sy7FAs8dkDNYsHp4Ul3f',
  user: '차현우',
  likeCount: 0,
  createdAt: '2025-09-04T13:07:17.179745',
  updatedAt: '2025-09-04T13:07:17.179816'
}
];

export default function Feed () {
  return (
    <div className='min-h-screen bg-[#F8F8F8]'>
      {/* <div>Tab</div> */}
      <div className='flex flex-col gap-[24px]  pb-[124px]'>
        {data.map((item) => (
          <div
            key={item.id}
            className='p-[20px] bg-white rounded-[16px'
          >
            <div className='flex items-center mb-[20px]'>
              <div className='flex flex-col gap-[2px]'>
                <p className='text-gray800 text-[14px] font-semibold leading-[140%]'>{item.user}</p>
                <p className='text-gray400 text-[14px] leading-[140%]'>{item.createdAt}</p>
              </div>
            </div>
            <div className='w-full h-[80px]'>
              <iframe
                data-testid='embed-iframe'
                src={`https://open.spotify.com/embed/track/${item.trackId}?utm_source=generator&theme=0`}
                width='100%'
                height='100%'
                allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                loading='lazy'
              />
            </div>
            <div className='flex gap-[6px] mt-[16px] mb-[12px] '>
              {item.dailyTags.map((tag, index) => (
                <div
                  className='text-gray600 text-[14px] leading-[140%] font-medium'
                  key={index}
                >{tag}
                </div>
              ))}
            </div>
            <div className='flex gap-[8px]'>
              {item.emotionTags.map((tag, index) => (
                <div
                  className='border border-primary rounded-[100px] px-[16px] py-[4px] text-primary text-[14px] leading-[140%] font-medium bg-[#FFEBEA]'
                  key={index}
                >{tag}
                </div>
              ))}
            </div>
            <div className='h-[1px] bg-[#E7E7E7] my-[20px]' />
            <div className='flex items-center gap-[16px]'>
              <div className='flex items-center gap-[4px]'>
                <img src={heart} alt='heart' />
                <p className='text-gray600 text-[14px] leading-[140%] font-medium'>{item.likeCount}</p>
              </div>
              <div className='flex items-center gap-[4px]'>
                <img src={comment} alt='comment' />
                <p className='text-gray600 text-[14px] leading-[140%] font-medium'>{item.commentCount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
