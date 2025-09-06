import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import kakao from '@/assets/kakao.svg';
import logo from '@/assets/logo.svg';
import logoAnimation from '@/assets/logo_animation.json';
import Lottie from 'lottie-react';
import { getMyTodayFeed } from '@/apis/feed';
import { toast } from 'sonner';

function App () {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const decodedToken: { exp?: number } = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000);
          if ((decodedToken.exp ?? 0) > currentTime) {
            try {
              const myTodayFeed = await getMyTodayFeed();
              if (myTodayFeed) {
                navigate('/feed');
                return;
              } else {
                navigate('/new/feeling');
                return;
              }
            } catch (error) {
              console.error("Error fetching today's feed:", error);
              toast.error('오늘 작성한 게시글을 확인하는데 실패했어요. 잠시 후 다시 시도해주세요.');
            }
          } else {
            localStorage.removeItem('accessToken');
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          localStorage.removeItem('accessToken');
        }
      }
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (showSplash) {
    return (
      <>
        <div className='w-full h-screen bg-primary flex items-center justify-center'>
          <div className='relative flex items-center justify-center'>
            <Lottie
              animationData={logoAnimation} loop autoplay
              style={{ width: '80%', aspectRatio: '173/120' }}
            />
            <p className='absolute text-xl font-bold leading-[140%] text-white -top-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap'>
              오늘의 감정과 음악을 연결하다
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className='pt-23 bg-white'>
      <p className='text-center text-3xl font-bold  leading-[140%] text-gray800  mb-2'>감정과 음악을 <br /> 연결하러 함께 가볼까요</p>
      <div className='w-full aspect-square relative'>
        <div className='absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(242,86,58,0.15)_0%,rgba(242,86,58,0)_100%)] blur-[2px]' />
        <div className='relative z-10 flex flex-col items-center justify-center h-full'>
          <div className='flex flex-col items-center justify-center relative'>
            <img src={logo} alt='logo' />
            <p className='font-semibold leading-[140%] text-primary absolute -bottom-13.5 whitespace-nowrap'>이음에 오신 걸 환영합니다</p>
          </div>
        </div>
      </div>
      <div className='fixed bottom-11.5 max-w-[500px] w-full'>
        <p className='text-center text-xs font-medium text-gray500 leading-[140%] mb-4'>SNS 계정으로 로그인 / 회원가입</p>
        <div className='w-full px-5 '>
          <button
            className='w-full p-5 bg-[#FEE500] rounded-[10px] text-gray800 font-bold leading-[140%] cursor-pointer flex items-center justify-center relative'
            onClick={() => {
            // 현재 호스트를 기준으로 동적 redirect_uri 생성
              const currentHost = window.location.origin;
              const redirectUri = `${currentHost}/oauth/callback`;
              const encodedRedirectUri = encodeURIComponent(redirectUri);
              const kakaoAuthUrl = `https://accounts.kakao.com/login/?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26client_id%3Da791581bd3216a3c1fb275307a6310ff%26redirect_uri%3D${encodedRedirectUri}%26scope%3Daccount_email%252Cprofile_nickname%252Cprofile_image%26through_account%3Dtrue#login`;

              window.location.href = kakaoAuthUrl;
            }}
          >
            <img src={kakao} alt='카카오' className='absolute left-5 size-4.5' />
            카카오로 로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
