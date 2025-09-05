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
    <div className='pt-[92px]'>
      <p className=' text-center text-[30px] font-bold  leading-[140%] text-gray800  mb-[16px]'>감정과 음악을 <br /> 연결하러 함께 가볼까요</p>

      <p className='font-semibold text-[14px] text-primary text-center leading-[140%]'>이음에 오신 걸 환영합니다</p>
      <div className='fixed bottom-[46px] max-w-[500px] w-full'>
        <p className='text-center text-[12px] font-medium text-gray500 leading-[140%] mb-[16px]'>SNS 계정으로 로그인 / 회원가입</p>
        <div className='w-full px-[20px] '>
          <button
            className='w-full p-[20px] bg-[#FEE500] rounded-[10px] text-gray800 text-[16px] font-bold leading-[140%] cursor-pointer flex items-center justify-center relative'
            onClick={() => {
            // 현재 호스트를 기준으로 동적 redirect_uri 생성
              const currentHost = window.location.origin;
              const redirectUri = `${currentHost}/oauth/callback`;
              const encodedRedirectUri = encodeURIComponent(redirectUri);
              const kakaoAuthUrl = `https://accounts.kakao.com/login/?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26client_id%3Da791581bd3216a3c1fb275307a6310ff%26redirect_uri%3D${encodedRedirectUri}%26scope%3Daccount_email%252Cprofile_nickname%252Cprofile_image%26through_account%3Dtrue#login`;

              window.location.href = kakaoAuthUrl;
            }}
          >
            <img src={kakao} alt='카카오' className='absolute left-[20px] w-[18px] h-[18px]' />
            카카오로 로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
