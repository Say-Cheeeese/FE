import SvgBackgroundQrCode from '../svg/SvgBackgroundQrCode';
import CardAlbumQrcode from './CardAlbumQrcode';

interface ScreenAlbumQrcodeProps {}

export default function ScreenAlbumQrcode({}: ScreenAlbumQrcodeProps) {
  return (
    <div>
      <SvgBackgroundQrCode />
      <CardAlbumQrcode />
    </div>
  );
}
