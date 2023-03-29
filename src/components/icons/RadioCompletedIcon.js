export default function RadioCompletedIcon({ className, fill }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g fill="none" fillRule="evenodd">
        <g>
          <g>
            <path
              d="M0 0L24 0 24 24 0 24z"
              transform="translate(-38.000000, -189.000000) translate(38.000000, 189.000000)"
            />
            <path
              fill={fill ? fill : "#4CB944"}
              fillRule="nonzero"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z"
              transform="translate(-38.000000, -189.000000) translate(38.000000, 189.000000)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
