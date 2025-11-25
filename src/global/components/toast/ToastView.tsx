import { AlertCircle } from 'lucide-react';

interface ToastViewProps {
  lucideIcon?: React.ReactNode;
  message: string;
}

export default function ToastView({ lucideIcon, message }: ToastViewProps) {
  return (
    <div className='bg-surface-info pointer-events-none fixed bottom-[84px] left-1/2 z-999 flex h-14 w-[calc(100%-32px)] max-w-[430px] -translate-x-1/2 items-center rounded-xl px-5 transition-opacity duration-400'>
      <div className='typo-body-md-medium text-text-basic-inverse pointer-events-auto flex items-center gap-2'>
        {lucideIcon ?? <AlertCircle width={20} height={20} />}

        <span className='whitespace-pre-line'>{message}</span>
      </div>
    </div>
  );
}
