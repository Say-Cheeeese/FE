'use client';

import { Switch } from '@/components/ui/switch';

interface IncludeMyPhotosToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function IncludeMyPhotosToggle({
  checked,
  onChange,
}: IncludeMyPhotosToggleProps) {
  return (
    <div className='bg-background-muted flex rounded-[8px] py-2'>
      <div className='flex items-center gap-2'>
        <span className='typo-body-sm-medium text-foreground'>
          내가 올린 사진 포함
        </span>
        <Switch
          aria-label='내가 올린 사진 포함'
          checked={checked}
          onCheckedChange={onChange}
        />
      </div>
    </div>
  );
}
