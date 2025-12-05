import EmptySvg from './svg/EmptySvg';

interface EmptyAlbumProps {
  title: string;
}

export default function EmptyAlbum({ title }: EmptyAlbumProps) {
  return (
    <section className='bg-element-gray-lighter flex flex-col items-center justify-center gap-3 rounded-[20px] py-18 text-center'>
      <EmptySvg />
      <p className='typo-caption-md-regular text-text-disabled whitespace-pre-line'>
        {title}
      </p>
    </section>
  );
}
