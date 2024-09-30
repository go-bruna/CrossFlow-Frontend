import { twMerge } from "tailwind-merge"

export interface Props {
  id: string
  label: string
  isSelected: boolean
  onSelect: (id: string) => void
}

export const ButtonTab = (props: Props) => {
  const textStyle = props.isSelected ? 'text-white' : 'text-gray-400'

  return (
    <button 
      className={twMerge('text-white hover:bg-[#5e7e8e]/10', textStyle)}
      onClick={() => props.onSelect(props.id)}
    >
      {props.label}
    </button>
  )
}