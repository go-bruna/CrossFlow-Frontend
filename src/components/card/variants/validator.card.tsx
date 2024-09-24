import { ClipboardIcon } from "@/assets/icons/clipboard"
import { DelegateLargeIcon } from "@/assets/icons/delegate"
import { Avatar } from "@/components/avatar"
import Button from "@/components/button"
import Paragraph from "@/components/paragraph"
import { Typography } from "@/components/typography"
import { twMerge } from "tailwind-merge"

type Props = {
  hover: boolean
}
export const CardValidator = ({ hover } : Props) => {
  return (
    <div 
      className="flex flex-col gap-5 min-w-[220px]"
    >
      <div className="flex flex-col justify-center items-center gap-3">
        <Avatar 
          icon={<DelegateLargeIcon />}
          className="w-[5.86rem] h-[5.86rem]"
        />
        <Typography 
          variant="label-large" 
          className={twMerge("font-bold", hover && 'text-white')}
        >
          Satoshi Sage
        </Typography>
      </div>
      <div className="flex justify-center items-center gap-2">
        <Typography 
          variant="label-small" 
          className="text-sky-400 font-bold"
        >
          Oxf633...e91a
        </Typography>
        <Avatar 
          icon={<ClipboardIcon />}
          className="w-[1.125rem] h-[1.125rem]"
        />
      </div>
      <div className="flex flex-col gap-[9px]">
        <Paragraph.List 
          label="Network share" 
          value={"35.35%"}
          classOverride={{
            label: twMerge(hover && 'text-white'),
            value:twMerge(hover && 'text-white'),
          }}
        />
        <Paragraph.List 
          label="APR" 
          value={"35.35%"}
          classOverride={{
            label:twMerge(hover && 'text-white'),
            value:twMerge(hover && 'text-white'),
          }}
        />
        <Paragraph.List 
          label="Total rewards" 
          value={"25000 ORBK"}
          classOverride={{
            label:twMerge(hover && 'text-white'),
            value:twMerge(hover && 'text-white'),
          }}
        />
      </div>
      <Button.Basic 
        label="Delegate"
        className={twMerge(
          "py-3",
          hover && 'bg-white'
        )}
        textStyle={hover ? 'text-gray-900' : 'text-white'}
        onClick={() => {}}
      />
    </div>
  )
}