import { motion } from 'framer-motion'
import { twMerge } from "tailwind-merge"
import { Typography } from "../typography"
import { Avatar } from '../avatar'
import { ShieldIcon } from '@/assets/icons/shield'
import { InforCircleIcon } from '@/assets/icons/infor'

type ClassOverrideProps = {
  container?: string
  header?: string
  progressBar?: string
  currentValue?: string
  text?: string
  footer?: string
}
type Props = {
  headerLabels?: string[]
  headerValues?: string[]
  footerLabel?: string
  footerValue?: string
  current: string
  limit?: string
  classOverride?: ClassOverrideProps
}

export const CustomProgress = (props: Props) => {

  const headerContainer = () => {
    if (!props?.headerLabels && !props?.headerValues)
      return null

    return (
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          {props.headerLabels && props.headerLabels?.length > 0 && (
            <Typography variant="label-medium" className={twMerge("text-base", props?.classOverride?.text)}>{props.headerLabels[0]}</Typography>
          )}
          {props.headerValues && props.headerValues?.length > 0 && (
            <Typography variant="label-medium" className={twMerge("text-base", props?.classOverride?.text)}>{props.headerValues[0]}</Typography>
          )}
        </div>
        <div className="flex items-center gap-1">
          {props.headerLabels && props.headerLabels?.length > 1 && (
            <Typography variant="label-medium" className={twMerge("text-base", props?.classOverride?.text)}>{props.headerLabels[1]}</Typography>
          )}
          {props.headerValues && props.headerValues?.length > 1 && (
            <Typography variant="label-medium" className={twMerge("text-base", props?.classOverride?.text)}>{props.headerValues[1]}</Typography>
          )}
        </div>
      </div>
    )
  }

  const footerContainer = () => {
    if (!props?.footerLabel && !props?.footerValue)
      return null

    return (
      <div className='flex items-center'>
        <Avatar icon={<ShieldIcon />}/>
        <Typography variant="label-medium" className="ml-1.5">{`${props.footerLabel}: ${props?.footerValue}`}</Typography>
        <Avatar icon={<InforCircleIcon />}/>
      </div>
    )
  }

  return (
    <div 
      className={twMerge(
        'flex flex-col gap-5',
        props?.classOverride?.container
      )}
    >
      {headerContainer()}
      <div className={twMerge(
        "relative flex flex-1 bg-[#36f5cf]/10 dark:bg-zinc-900 rounded-full relative h-2",
        props?.classOverride?.progressBar
      )}>
        <motion.div
          initial={{
            width: props.current + '%',
          }}
          animate={{
            width: props.current + '%',
          }}
          exit={{
            width: 0,
          }}
          className={twMerge(
            "bg-[#36f5cf] rounded-full h-2 top-0 left-0",
            props?.classOverride?.currentValue
          )}
        />
        {/* limit value */}
        {props?.limit && (
          <div 
            className='absolute bg-red-500 w-2 h-full rounded-[2px]'
            style={{
              left: `${Number(props.limit) - 2}%`
            }}
          />
        )}
      </div>
      {footerContainer()}
    </div>
  )
}