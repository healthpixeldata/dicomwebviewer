// import React from 'react';
// import type { IconProps } from '../types';

// export const LoadingOHIFMark = (props: IconProps) => (
//   <svg
//     width="47"
//     height="47"
//     viewBox="0 0 47 47"
//     xmlns="http://www.w3.org/2000/svg"
//     {...props}
//   >
//     <g
//       fill="#FFF"
//       fillRule="nonzero"
//     >
//       <path d="M43.585 0H29.763a3.415 3.415 0 0 0-3.415 3.415v13.822a3.415 3.415 0 0 0 3.415 3.415h13.822A3.415 3.415 0 0 0 47 17.237V3.415A3.415 3.415 0 0 0 43.585 0zM29.763 1.366h13.822c1.132 0 2.05.917 2.05 2.049v13.822a2.049 2.049 0 0 1-2.05 2.049H29.763a2.049 2.049 0 0 1-2.049-2.05V3.416c0-1.132.918-2.05 2.05-2.05zM17.237 0H3.415A3.415 3.415 0 0 0 0 3.415v13.822a3.415 3.415 0 0 0 3.415 3.415h13.822a3.415 3.415 0 0 0 3.415-3.415V3.415A3.415 3.415 0 0 0 17.237 0zM3.415 1.366h13.822c1.131 0 2.049.917 2.049 2.049v13.822a2.049 2.049 0 0 1-2.05 2.049H3.416a2.049 2.049 0 0 1-2.05-2.05V3.416c0-1.132.918-2.05 2.05-2.05zM43.585 26.348H29.763a3.415 3.415 0 0 0-3.415 3.415v13.822A3.415 3.415 0 0 0 29.763 47h13.822A3.415 3.415 0 0 0 47 43.585V29.763a3.415 3.415 0 0 0-3.415-3.415zm-13.822 1.366h13.822c1.132 0 2.05.918 2.05 2.05v13.821a2.049 2.049 0 0 1-2.05 2.05H29.763a2.049 2.049 0 0 1-2.049-2.05V29.763c0-1.131.918-2.049 2.05-2.049zM17.237 26.348H3.415A3.415 3.415 0 0 0 0 29.763v13.822A3.415 3.415 0 0 0 3.415 47h13.822a3.415 3.415 0 0 0 3.415-3.415V29.763a3.415 3.415 0 0 0-3.415-3.415zM3.415 27.714h13.822c1.131 0 2.049.918 2.049 2.05v13.821a2.049 2.049 0 0 1-2.05 2.05H3.416a2.049 2.049 0 0 1-2.05-2.05V29.763c0-1.131.918-2.049 2.05-2.049z" />
//     </g>
//   </svg>
// );

// export default LoadingOHIFMark;



import React from 'react';
import type { IconProps } from '../types';

export const LoadingOHIFMark = (props: IconProps) => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <style>
      {`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spinner {
          animation: spin 1s linear infinite;
          transform-origin: center;
        }
      `}
    </style>
    <circle
      className="spinner"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      stroke="#5acce6"
      strokeWidth="4"
      strokeDasharray="31.4 31.4"
      strokeLinecap="round"
    />
  </svg>
);

export default LoadingOHIFMark;
