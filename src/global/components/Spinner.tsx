export default function Spinner() {
  return (
    <div className='flex h-full w-full items-center justify-center py-10'>
      <svg
        className='text-primary-400 h-8 w-8 animate-spin'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
      >
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
        ></path>
      </svg>
    </div>
  );
}
