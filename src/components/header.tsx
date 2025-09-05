import logo from '@/assets/logo.svg';
import { useNavigate } from 'react-router-dom';

export default function Header () {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/feed');
  };

  return (
    <div className='flex items-center justify-center w-full bg-white py-[0.875rem]'>
      <img src={logo} alt='logo' className='w-[42px] h-[28px] cursor-pointer' onClick={handleClick} />
    </div>
  );
}
