import { DropdownIcon } from "@/assets/icons/dropdown"
import { Typography } from "@/components/typography"
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const useOutsideAlerter = (ref: any, onClickOutside: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    };
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [ref]);
};

interface Props {
  value: string
  list: string[]
  onChange: (x: string) => void
  className?: string
}

export const DropdownBasic = (props: Props) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    setOpenDropdown(false);
  });
  
  return (
    <div 
      ref={wrapperRef}
      className={twMerge(
        'flex relative justify-start items-center w-full h-11 gap-2.5 z-[1] cursor-pointer min-w-[6.5rem]',
        props?.className
      )}
    >
      <div 
        className="flex justify-between items-center w-full px-3" 
        onClick={() => {
          if (openDropdown) return;
          setOpenDropdown(!openDropdown);
        }}
>
        <Typography variant="label-extrasmall" className="font-bold">{props.value}</Typography>
        <DropdownIcon />
      </div>
      {/* dropdown list */}
      <div
        className={twMerge(
          'absolute w-full bg-white max-h-[300px] shadow-[1px_17px_55px_rgba(3,2,41,0.1)] overflow-auto cursor-pointer py-2 px-0 rounded-[0_0_10px_10px] top-10 transition-all transform origin-top opacity-0 scale-95 pointer-events-none',
          openDropdown ? 'opacity-100 scale-100 pointer-events-auto' : '',
          props?.className
        )}
      >
        {props.list.map((item, i) => (
          <div
            className={twMerge(
              'px-3 py-3 flex items-center justify-start transition-all duration-300 translate-y-[-1rem] opacity-0 hover:bg-slate-50',
              openDropdown ? 'translate-y-0 opacity-100' : '',
            )}
            key={i}
            onClick={() => {
              props.onChange(item)
              setOpenDropdown(false)
            }}
          >
            <Typography variant="label-extrasmall" className={'font-bold'}>
              {item}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  )
}