import { SVGProps } from 'react';

export const ArrowUpIcon = ({
  fixedColor,
  ...props
}: { fixedColor?: string } & SVGProps<SVGSVGElement>) => (
  <svg width="17" height="10" viewBox="0 0 17 10" fill="red" xmlns="http://www.w3.org/2000/svg">
    <path
      id="Vector"
      d="M9.15701 1.02396C8.87701 0.743965 8.40101 0.743965 8.09301 1.02396L0.645015 8.47197C0.169015 8.94797 0.505015 9.75996 1.17702 9.75996H16.073C16.745 9.75996 17.081 8.94797 16.605 8.47197L9.15701 1.02396Z"
      fill="url(#paint0_linear_17776_2925)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_17776_2925"
        x1="-4.56885"
        y1="0.949509"
        x2="22.0316"
        y2="5.40393"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor={props.color || '#24C6DC'} />
      </linearGradient>
    </defs>
  </svg>
);
