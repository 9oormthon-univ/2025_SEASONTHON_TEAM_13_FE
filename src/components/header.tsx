import logo from '@/assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import logoText from '@/assets/logo_text.svg';

export default function Header () {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/feed');
  };

  return (
    <div className='flex items-end w-full bg-white py-[0.875rem] pl-[1.5625rem] gap-[0.375rem]' onClick={handleClick}>
      <img src={logo} alt='logo' className='w-10.5 h-7 cursor-pointer' />
      <img src={logoText} alt='logo' className='cursor-pointer' />
    </div>
  );
}
