export default function CartIcon({className, fill}) {

    
  return (
    <svg
      className={className}
      fill= {fill || "#08415c"}
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" fill="none" width="24" height="24" />
      <g>
        <path d="M9 20c0 1.1-.9 2-2 2s-1.99-.9-1.99-2S5.9 18 7 18s2 .9 2 2zm8-2c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm.396-5c.937 0 1.75-.65 1.952-1.566L21 5H7V4c0-1.105-.895-2-2-2H3v2h2v11c0 1.105.895 2 2 2h12c0-1.105-.895-2-2-2H7v-2h10.396z" />
      </g>
    </svg>
  );
}
