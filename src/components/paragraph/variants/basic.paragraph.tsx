import { Typography } from "@/components/typography"
import { twMerge } from "tailwind-merge"

export type textStyle = {
  containerStyle?: string
  titleStyle?: string
  subTitleStyle?: string
  descriptionStyle?: string
}
export interface Props {
  title?: string
  subTitle?: string
  descripton?: string
  classOverride?: textStyle
}

export const ParagraphBasic = (props: Props) => {
  return (
    <div 
      className={twMerge(
        "flex flex-col gap-[15px]",
        props?.classOverride?.containerStyle
      )}
    >
      {props?.title && (
        <Typography
          variant="h5"
          className={twMerge("font-bold", props?.classOverride?.titleStyle)}
        >
          {props.title}
        </Typography>
      )}

      {props?.subTitle && (
        <Typography
          variant="label-large"
          className={twMerge("font-bold mt-[10px]", props?.classOverride?.subTitleStyle)}
        >
          {props.subTitle}
        </Typography>
      )}
      
      {props?.descripton && (
        <Typography
          variant="label-small"
          className={twMerge("font-normal", props?.classOverride?.descriptionStyle)}
        >
          {props.descripton}
        </Typography>
      )}
    </div>
  )
}