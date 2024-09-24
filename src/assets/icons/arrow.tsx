

export const ArrowUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
      <path d="M18.25 15.29L12.25 9.29004L6.25 15.29" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props?: any) => {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.59082 12.8516H20.5908M20.5908 12.8516L14.5908 6.85156M20.5908 12.8516L14.5908 18.8516" stroke={props?.stroke ?? "#12A50A"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

