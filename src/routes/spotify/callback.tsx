import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { instance } from '@/apis/instance';

const getSpotifyToken = async (code: string) => {
  try {
    const response = await instance.get('/login/spotify/authenticate', {
      params: { code },
    });

    const { access_token: accessToken, expires_in: expiresIn } = response.data;

    if (accessToken) {
      localStorage.setItem('spotifyToken', JSON.stringify({
        token: accessToken,
        expiresAt: Date.now() + expiresIn * 1000,
      }));
    }
  } catch (error: unknown) {
    console.error('API 요청 실패:', error);
    throw error;
  }
};

export const SpotifyCallback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code') ?? '';
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasExecuted = useRef(false);

  useEffect(() => {
    // 이미 실행된 경우 중복 실행 방지
    if (hasExecuted.current) return;

    if (!code) {
      setError('인증 코드를 찾을 수 없습니다.');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        hasExecuted.current = true;
        setLoading(true);
        await getSpotifyToken(code);
        navigate('/feed');
      } catch (err) {
        console.error('API 호출 실패:', err);
        setError('로그인 처리 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchData();
  }, [code, navigate]);

  if (loading) {
    return (
      <div />
    );
  }

  if (error) {
    return (
      <div />
    );
  }

  return (
    <></>
  );
};
