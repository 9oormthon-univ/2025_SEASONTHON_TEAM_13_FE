export default function Ranking () {
  return (
    <div className='relative min-h-screen w-full flex flex-col items-center gap-2'>
      <div
        className='absolute z-10 -top-[6.5rem] -left-[2rem] w-[calc(100%+4rem)] h-[12.7rem] rounded-[100%]'
        style={{
          background: 'linear-gradient(360deg, #EB5149 0%, #FF9F9A 50%)'
        }}
      />
      <div className='flex flex-col w-full h-48 bg-[#F8F8F8] justify-center items-center gap-2'>
        <img src='/vite.svg' alt='1st music' className='size-24 rounded-sm z-20' />
        <p className='body-xl'>1st music title</p>
      </div>
    </div>
  );
}
