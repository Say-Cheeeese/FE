import Svg4Cut from '../svg/Svg4Cut';

interface Container4CutProps {}

export default function Container4Cut({}: Container4CutProps) {
  return (
    <div className='border-border-primary border'>
      <Svg4Cut
        width={216}
        height={384}
        photos={[
          '/ut/2주차_1.jpg',
          '/ut/2주차_2.jpg',
          '/ut/2주차_3.jpg',
          '/ut/2주차_4.jpg',
        ]}
      />
    </div>
  );
}
