import { SVGProps } from 'react';

export const ArrowDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="10"
    fill="none"
    viewBox="0 0 17 10"
    {...props}
  >
    <path
      fill="url(#paint0_linear_17776_2926)"
      d="M16.073.76H1.177a.754.754 0 00-.532 1.288l7.448 7.448c.28.28.756.28 1.064 0l7.448-7.448A.754.754 0 0016.073.76z"
    ></path>
    <defs>
      <linearGradient
        id="paint0_linear_17776_2926"
        x1="-4.569"
        x2="22.032"
        y1="0.896"
        y2="5.35"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor={props.color || '#24C6DC'}></stop>
      </linearGradient>
    </defs>
  </svg>
);
