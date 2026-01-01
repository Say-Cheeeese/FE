interface PersonSvgProps {}

export default function PersonSvg({}: PersonSvgProps) {
  return (
    <svg
      width='10'
      height='10'
      viewBox='0 0 10 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5 6C7.76142 6 10 7.79086 10 10H0C0 7.79086 2.23858 6 5 6ZM5 0C6.38071 0 7.5 1.11929 7.5 2.5C7.5 3.88071 6.38071 5 5 5C3.61929 5 2.5 3.88071 2.5 2.5C2.5 1.11929 3.61929 0 5 0Z'
        fill='#424349'
      />
    </svg>
  );
}
