import { DropdownIcon } from "@/assets/icons/dropdown"
import { Typography } from "@/components/typography"
import { IBaseLoan } from "@/types/api/pool";
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
  value: IBaseLoan | undefined
  list: IBaseLoan[]
  onChange: (x: IBaseLoan) => void
  className?: string
}

export const DropdownLoans = (props: Props) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    setOpenDropdown(false);
  });
  
  return (
    <div 
      ref={wrapperRef}
      className={twMerge(
        'flex relative justify-start items-center w-full h-11 gap-2.5 z-[1] cursor-pointer min-w-[6.5rem] border border-[#5e7e8e]',
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
        <Typography variant="label-extrasmall" className="font-bold">
          {props.value?.collateral_symbol ?? 'Choose Locked Asset'}
        </Typography>
        <DropdownIcon />
      </div>
      {/* dropdown list */}
      <div
        className={twMerge(
          'absolute w-full bg-[#101010] max-h-[300px] shadow-[1px_17px_55px_rgba(3,2,41,0.1)] overflow-auto cursor-pointer py-2 px-0 rounded-[0_0_10px_10px] top-[42px] transition-all transform origin-top opacity-0 scale-95 pointer-events-none border border-[#5e7e8e] border-t-[#0000]',
          openDropdown ? 'opacity-100 scale-100 pointer-events-auto' : '',
          props?.className
        )}
      >
        {props.list.map((item: IBaseLoan, i: number) => (
          <div
            className={twMerge(
              'px-3 py-2 flex justify-start flex-col gap-1 transition-all duration-300 translate-y-[-1rem] opacity-0 hover:bg-[#1b1b1b]',
              openDropdown ? 'translate-y-0 opacity-100' : '',
            )}
            key={i}
            onClick={() => {
              props.onChange(item)
              setOpenDropdown(false)
            }}
          >
            <Typography variant="label-small" className={'semibold'}>
              {`Collateral Symbol: ${item.collateral_symbol}`}
            </Typography>
            <Typography variant="label-extrasmall" className={'semibold'}>
              {`Loan TransactionID: ${item.loan_tx_id}`}
            </Typography>
            <Typography variant="label-extrasmall" className={'semibold'}>
              {`Health: ${item.health}`}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  )
}