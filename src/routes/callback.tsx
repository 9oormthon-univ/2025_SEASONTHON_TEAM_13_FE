import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { instance } from '@/apis/instance';

const getKakaoToken = async () => {
  try {
    const response = await instance.get('/login/authenticate', {
      params: { code: localStorage.getItem('code') },
    });

    const { accessToken, grantType } = response.data;

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('grantType', grantType);
    }
  } catch (error: unknown) {
    console.error('API 요청 실패:', error);
    throw error;
  }
};

export default function Callback () {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code') || '';
  localStorage.setItem('code', code);
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
        await getKakaoToken();
        navigate('/new/feeling');
        setLoading(false);
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
}
