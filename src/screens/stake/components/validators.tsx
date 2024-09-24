import Card from "@/components/card"
import { useState } from "react"

type Props = {
  data: any
}
export const ValidatorItem = ({ data }: Props) => {
  const [ hover, setHover ] = useState<boolean>(false)
  console.log(data)

  return (
    <Card.Wrapper 
      classOverride={{
        subContainer: "hover:bg-gradient-to-b hover:from-gray-900 hover:to-teal-900"
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Card.Validator hover={hover}/>
    </Card.Wrapper>
  )
}