import Link from 'next/link';
import SvgCloseAlbumEmptyPhoto from '../svg/SvgCloseAlbumEmptyPhoto';

interface CloseAlbumProps {
  code: string;
  title: string;
  date: string;
  author: string;
  images: string[];
}

export default function CloseAlbum({
  code,
  title,
  date,
  author,
  images,
}: CloseAlbumProps) {
  return (
    <Link
      href={`/album/4cut/${code}`}
      className='drop-shadow-25-5 flex items-center gap-5 overflow-hidden rounded-[20px]'
    >
      <div className='h-[100px] w-[100px] overflow-hidden'>
        {images.length < 4 ? (
          <div className='flex h-full w-full items-center justify-center'>
            <SvgCloseAlbumEmptyPhoto />
          </div>
        ) : (
          <div className='grid h-full w-full grid-cols-2 grid-rows-2'>
            {images.slice(0, 4).map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`이미지${i + 1}`}
                className='h-full w-full object-cover'
              />
            ))}
          </div>
        )}
      </div>

      <div className='flex flex-col justify-center'>
        <h4 className='typo-body-md-semibold text-text-basic text-left'>
          {title}
        </h4>
        <div className='typo-body-sm-medium text-text-subtler'>
          {date} · {author}
        </div>
      </div>
    </Link>
  );
}
