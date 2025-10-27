interface CloseAlbumProps {
  title: string;
  date: string;
  author: string;
  images: string[];
}

export default function CloseAlbum({
  title,
  date,
  author,
  images,
}: CloseAlbumProps) {
  return (
    <button
      type='button'
      className='drop-shadow-25-5 flex items-center gap-5 overflow-hidden rounded-[20px] border border-white bg-white'
    >
      {/* 이미지 4개 */}
      <div className='grid h-[100px] w-[100px] grid-cols-2 grid-rows-2 overflow-hidden'>
        {images.slice(0, 4).map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`이미지${i + 1}`}
            className='h-full w-full object-cover'
          />
        ))}
      </div>

      <div className='flex flex-col justify-center'>
        <h4 className='text-body-md-semibold text-text-basic text-left'>
          {title}
        </h4>
        <div className='text-body-sm-medium text-text-subtler'>
          {date} · {author}
        </div>
      </div>
    </button>
  );
}
