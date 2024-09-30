import { ITag } from '@/types/interfaces'
import { twMerge } from 'tailwind-merge'

type ClassOverrideProps = {
  container?: string
  tabButton?: string
}
interface Props {
  tabs: ITag[]
  selected: ITag
  onSelect?: (id: ITag) => void
  classOverride?: ClassOverrideProps
}

export const ItemsTab = (props: Props) => {
  return (
    <div
      className={twMerge(
        'flex justify-center items-center gap-[10px] place-self-start',
        props?.classOverride?.container
      )}
    >
      {props.tabs.map((tag: ITag, index: number) => (
        <button 
          className={twMerge(
            'flex justify-center items-center gap-1 bg-[#101010] border border-[#36f5cf]/10 text-white py-[3px] rounded-full hover:bg-[#5e7e8e]/10',
            props?.classOverride?.tabButton,
            tag.title === props.selected.title && 'bg-[#203933]'
          )}
          onClick={() => props?.onSelect && props.onSelect(tag)}
          key={index}
        >
          {tag?.icon && tag.icon}
          {tag.title}
        </button>
      ))}
    </div>
  )
}
