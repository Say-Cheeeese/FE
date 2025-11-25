'use client';

interface MenuItemProps {
  title: string;
  selected?: boolean;
  onClick?: () => void;
}

function MenuItem({ title, selected, onClick }: MenuItemProps) {
  return (
    <div
      className='typo-body-md-medium flex flex-1 cursor-pointer items-center justify-center rounded-full select-none transition-all duration-300 ease-out'
      style={{
        backgroundColor: selected ? '#fff' : '#F1F2F3',
        color: selected ? '#18191B' : '#94969E',
        boxShadow: selected ? '0px 0px 3px 1px rgba(0,0,0,0.05)' : 'none',
      }}
      onClick={onClick}
    >
      {title}
    </div>
  );
}

const MENU_TITLES = ['7일', '띱', '치즈네컷'];

export interface SelectMenuProps {
  selectedMenu?: 'first' | 'second' | 'third';
  setSelectedMenu?: (menu: 'first' | 'second' | 'third') => void;
}

export default function SelectMenu({
  selectedMenu = 'first', // 기본 first (1번)
  setSelectedMenu,
}: SelectMenuProps) {
  const selectedIdx =
    selectedMenu === 'first'
      ? 0
      : selectedMenu === 'second'
        ? 1
        : selectedMenu === 'third'
          ? 2
          : 0; // 기본 0

  const handleClick = (idx: number) => {
    if (!setSelectedMenu) return;
    if (idx === 0) setSelectedMenu('first');
    else if (idx === 1) setSelectedMenu('second');
    else if (idx === 2) setSelectedMenu('third');
  };

  return (
    <div className='typo-body-md-medium text-text-disabled bg-element-gray-light flex h-12 w-full gap-0.5 rounded-full px-1 py-1'>
      {MENU_TITLES.map((title, idx) => (
        <MenuItem
          key={title}
          title={title}
          selected={idx === selectedIdx}
          onClick={() => handleClick(idx)}
        />
      ))}
    </div>
  );
}
