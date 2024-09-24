import { Typography } from "@/components/typography"
import { twMerge } from "tailwind-merge"
import Card from ".."
import { Avatar } from "@/components/avatar"

type ClassOverride = {
  container?: string
  title?: string
  description?: string
  icon?: string
  textGap?: string
}
type Props = {
  icon?: JSX.Element
  suffixIcon?: JSX.Element
  title?: string
  description?: string | number
  descriptionElement?: JSX.Element
  comingSoon?: boolean
  classOverride?: ClassOverride
}

export const BaseItem = (props: Props) => {
  return (
    <div className={twMerge('flex gap-3', props.classOverride?.container)}>

      {/* Icon */}
      {props?.icon && (
        <Avatar 
          className={twMerge('w-[26px] h-[26px]', props.classOverride?.icon)}
          icon={props.icon as JSX.Element}
        />
      )}
      
      <div className={twMerge('flex flex-col', props.classOverride?.textGap)}>

        {/* Title */}
        <div className="flex items-center gap-3">
          <Typography 
            variant="label-medium" 
            className={twMerge('font-bold', props.classOverride?.title)} 
          >
            {props.title}
          </Typography>

          {props?.comingSoon && (
            <Card.Wrapper
              isShadow={false}
              classOverride={{
                subContainer: 'p-0'
              }}
            >
              <div className="w-full bg-white px-2 py-1 rounded-[18px]">
                <Typography 
                  variant="label-extrasmall" 
                  className='font-bold text-sky-500'
                >
                  {'Coming Soon'}
                </Typography>
              </div>
            </Card.Wrapper>
          )}
        </div>

        {/* Description */}
        {props.description && (
          <Typography 
            variant="label-small" 
            className={twMerge(props.classOverride?.description)}
          >
            {props.description}
          </Typography>
        )}
        {props?.descriptionElement && props.descriptionElement}
      </div>
      {/* SuffixIcon */}
      {props?.suffixIcon && (
        <Avatar 
          className={twMerge('w-[26px] h-[26px]', props.classOverride?.icon)}
          icon={props.suffixIcon as JSX.Element}
        />
      )}
    </div>
  )
}