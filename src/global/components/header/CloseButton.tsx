'use client';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CloseButtonProps {}

export default function CloseButton({}: CloseButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button type='button' onClick={handleClick}>
      <X />
    </button>
  );
}
