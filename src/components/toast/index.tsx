import { ReactNode, useEffect } from "react";
import { Icon } from "../icon";
import { SuccessImg, WarningImg } from "@/assets/icons/png";
import { Typography } from "../typography";
import { twMerge } from "tailwind-merge";
import { MsgType } from "@/constants/message";
import { Avatar } from "../avatar";
import { CancelIcon } from "@/assets/icons/cancel";

interface MessageProps {
  type: MsgType
  msg?: string | ReactNode,
  title?: string
  link?: string
  closeToast: () => void
  timeout?: number
}

export const MessageContent = ({
  type,
  title, 
  msg, 
  closeToast, 
  link, 
  timeout = 3
}: MessageProps) => {

  useEffect(() => {
    setTimeout(() => {
      closeToast();
    }, timeout * 1000);
  })

  const notificationIcon = {
    "Warning": WarningImg,
    "Success": SuccessImg,
    "Error": WarningImg,
  }[type ?? "Warning"]

  const notificationTitleColor = {
    "Warning": 'text-orange-500',
    "Success": 'text-green-500',
    "Error": 'text-red-500',
  }[type ?? "Warning"]

  return (
    <MessageContainer>
      <Icon 
        className="w-6 h-6"
        src={notificationIcon} 
      />
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex justify-between items-center">
          <Typography 
            className={twMerge(
              "font-bold", 
              notificationTitleColor
            )}
            variant="label-medium" 
          >
            {title}
          </Typography>
          <Avatar icon={<CancelIcon />} onClick={closeToast} />
        </div>
        {link ? (
          <a
            className="underline text-white"
            href={link}
            target="_blank"
            rel="noreferrer"
          >
          <Typography variant="label-small" >{msg}</Typography>
        </a>
        ) : (
          <Typography variant="label-small" >{msg}</Typography>
        )}
      </div>
    </MessageContainer>
  )
}

function MessageContainer({ children }: {children: ReactNode, type?: string}) {
  return <div className={`flex gap-[15px] px-[2px] py-1 rounded-[10px]`}> {children}</div>;
}
