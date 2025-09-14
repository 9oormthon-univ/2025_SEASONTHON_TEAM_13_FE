export const Progress = ({ selectedIndex = 0 }: { selectedIndex: 0 | 1 | 2 | 3 }) => {
  return (
    <div className='flex flex-row gap-1.5'>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className={`h-2 rounded-full ${i === selectedIndex ? 'bg-primary w-7' : 'bg-gray300 w-2'}`} />
      ))}
    </div>
  );
};
