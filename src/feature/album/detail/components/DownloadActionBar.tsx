interface DownloadActionBarProps {
  selectedCount: number;
  onDownload?: () => void;
}

export default function DownloadActionBar({
  selectedCount,
  onDownload,
}: DownloadActionBarProps) {
  const handleDownload = () => {
    if (selectedCount === 0) return;
    onDownload?.();
  };

  const isDisabled = selectedCount === 0;

  return (
    <section className='bg-background-dim-darkest fixed bottom-0 flex h-14 w-full items-center justify-between gap-3 px-4'>
      <div className='typo-heading-sm-semibold text-white'>
        {selectedCount}장의 사진이 선택됨
      </div>
      <button
        type='button'
        className='typo-body-sm-medium text-text-primary bg-button-primary-fill rounded-[4px] px-3 py-1.5 disabled:opacity-40'
        disabled={isDisabled}
        onClick={handleDownload}
      >
        다운로드
      </button>
    </section>
  );
}
