import CloseAlbum from '@/feature/main/components/close-album/CloseAlbum';
import { type ClosedAlbumSection } from '../utils/buildClosedAlbumSections';

interface ClosedAlbumSectionListProps {
  sections: ClosedAlbumSection[];
}

export default function ClosedAlbumSectionList({
  sections,
}: ClosedAlbumSectionListProps) {
  if (sections.length === 0) return null;

  return sections.map(({ year, albums }) => (
    <section key={year} className='mb-12 last:mb-0'>
      <h2 className='typo-heading-md-semibold text-text-subtle mb-4'>{year}</h2>
      <div className='flex flex-col gap-4'>
        {albums.map((album) => (
          <CloseAlbum
            key={album.code}
            code={album.code}
            title={album.title}
            date={album.date}
            author={album.author}
            images={album.images}
          />
        ))}
      </div>
    </section>
  ));
}
