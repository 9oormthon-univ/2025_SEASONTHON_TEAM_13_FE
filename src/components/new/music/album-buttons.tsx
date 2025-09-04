import { DiscIcon } from '@/icons/disc';

// NOTE: it tries to use full width, but it's intended
// for a specific use case so it doesn't matter
export const SmallMusicAlbum = ({ title, albumURL, onClick }: { title: string; albumURL: string; onClick?: () => void }) => {
  return (
    <div className='flex flex-col justify-center gap-2 hover:cursor-pointer' onClick={onClick}>
      <img src={albumURL} alt={title} className='w-full h-auto rounded' />
      <p className='text-sm font-medium text-center'>{title}</p>
    </div>
  );
};

export const BigMusicAlbum = ({ title, albumURL, artist, playCount, onClick }: {
  title: string;
  albumURL: string;
  artist: string;
  playCount: number;
  onClick?: () => void;
}) => {
  return (
    <div className='flex justify-center items-center gap-4 w-full hover:cursor-pointer' onClick={onClick}>
      <img src={albumURL} alt={title} className='w-16 h-auto rounded' />
      <div className='flex flex-grow flex-col'>
        <p className='font-medium'>{title}</p>
        <p className='text-xs font-medium text-gray500'>{artist}</p>
        <div className='flex items-center gap-1'>
          <DiscIcon className='size-4 text-gray500' />
          <p className='text-xs font-medium text-gray500'>{playCount}</p>
        </div>
      </div>
    </div>
  );
};
