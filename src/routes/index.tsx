import { useState, useEffect } from 'react';
import kakao from '@/assets/kakao.svg';

function App () {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <>
        <div className='w-full h-screen bg-primary flex items-center justify-center'>
          <div>
            <p className='text-white text-[50px] font-bold leading-[140%]'>이음</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <p className='font-semibold text-[14px] text-primary text-center leading-[140%]'>이음에 오신 걸 환영합니다</p>
      <p className='text-center text-[30px] font-bold  leading-[140%] text-gray800 mt-[8px] mb-[60px]'>감정과 음악을 <br /> 연결하러 함께 가볼까요</p>
      <p className='text-center text-[12px] font-medium text-gray500 leading-[140%] mb-[16px]'>SNS 계정으로 로그인 / 회원가입</p>
      <div className='w-full px-[20px] '>
        <button
          className='w-full p-[20px] bg-[#FEE500] rounded-[10px] text-gray800 text-[16px] font-bold leading-[140%] cursor-pointer flex items-center justify-center relative'
          onClick={() => {
            window.location.href = 'https://accounts.kakao.com/login/?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26client_id%3Da791581bd3216a3c1fb275307a6310ff%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A5173%252Foauth%252Fcallback%26scope%3Daccount_email%252Cprofile_nickname%252Cprofile_image%26through_account%3Dtrue#login';
          }}
        >
          <img src={kakao} alt='카카오' className='absolute left-[20px] w-[18px] h-[18px]' />
          카카오로 로그인
        </button>
      </div>
    </div>
  );
}

export default App;
