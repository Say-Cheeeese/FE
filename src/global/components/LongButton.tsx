interface LongButtonProps {
  text: string;
}

export default function LongButton({ text }: LongButtonProps) {
  return (
    <button
      type='button'
      className='bg-button-primary-fill text-body-1xl-semibold text-text-primary relative w-full rounded-lg py-[15px] text-center'
    >
      {text}
    </button>
  );
}
