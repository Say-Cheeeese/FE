import SelectAlbumBody from '@/feature/album-select/components/SelectAlbumBody';
import CustomHeader from '@/global/components/header/CustomHeader';

export default function Page() {
  return (
    <div>
      <CustomHeader title='앨범 채우기' isShowBack={true} />
      <SelectAlbumBody />
    </div>
  );
}
