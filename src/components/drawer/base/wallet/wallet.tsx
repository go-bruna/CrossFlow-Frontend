import { useState } from 'react'
import { ClipboardIcon } from '@/assets/icons/clipboard'
import { DisconnectIcon } from '@/assets/icons/disconnect'
import { Avatar } from '@/components/avatar'
import Button from '@/components/button'
import Card from '@/components/card'
import { Typography } from '@/components/typography'
import { useToast } from '@/hooks/useToast'
import { copyText, displayAddress } from '@/utils'
import { ADDRESS_COPY_SUCCESS } from '@/constants/message'
import { twMerge } from 'tailwind-merge'

interface Props {
  img: string
  address: string // wallet name or wallet address
  status: boolean
  onConnect: () => void
  type?: string
}
// Wallet component
export const Wallet = (props: Props) => {
  const { messageApi } = useToast()
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [_disconnect, setDisconnect] = useState<boolean>(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div className="flex justify-between items-center pl-1 py-3 lg:p-3 cursor-pointer rounded-md hover:bg-slate-50">
      <div
        className="flex items-center gap-4"
        onClick={() => {
          if (props.status) return
          props.onConnect()
        }}
      >
        <img src={props.img} width={34} alt="Wallet Image" />
        <Typography variant="label-medium" className='font-semibold'>
          {props.status ? displayAddress(props.address, 6) : props.address}
        </Typography>
      </div>
      {props.status && !_disconnect ? (
        <div className="flex justify-center items-center gap-3">
          <Avatar
            icon={<ClipboardIcon />}
            onClick={() => {
              copyText(props.address, () => {
                messageApi.Alert(ADDRESS_COPY_SUCCESS)
              })
            }}
            className="bg-transparent w-[20px] h-[20px]"
          />
          <Avatar
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            icon={<DisconnectIcon stroke={isHovered ? 'red' : '#43E023'} />}
            onClick={() => setDisconnect(true)}
            className="bg-transparent w-[20px] h-[20px]"
          />
        </div>
      ) : (
        props.status &&
        _disconnect && (
          <div
            className="hover:bg-slat-200 lg:px-[10px] py-0 rounded-xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              setDisconnect(false)
              setIsHovered(false)
              props.status && props.onConnect()
            }}
          >
            <Card.Wrapper
              isShadow={false}
              classOverride={{
                subContainer: 'flex flex-col gap-2 p-0'
              }}
            >
              <Button.Basic
                className="justify-end gap-2 px-2 py-1 bg-white"
                textStyle={twMerge('text-[13px] text-gray-900', isHovered && 'text-[#F00]')}
                label="Disconnect"
                icon={<DisconnectIcon stroke={isHovered ? 'red' : '#858585'} />}
                iconStyle={'bg-transparent w-[12px] h-[12px]'}
              />
            </Card.Wrapper>
          </div>
        )
      )}
    </div>
  )
}

