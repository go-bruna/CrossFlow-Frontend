import { useRef } from "react";
import { Id, toast } from "react-toastify";
import { MessageContent } from "@/components/toast";
import { MessageType } from "@/constants/message";

export function useToast() {
  const toastRef = useRef<Id | undefined>(undefined);

  const handleToastClose = () => {
    toast.dismiss(toastRef.current);
  };

  const Alert = (msgObj: MessageType, timeout = 3) => {
    (toastRef.current = toast(
      <MessageContent
        type={msgObj.type}
        title={msgObj.title}
        msg={msgObj.content}
        link={msgObj?.link}
        closeToast={handleToastClose}
        timeout={timeout}
      />
    ));
    return handleToastClose
  }


  return {
    messageApi: {
      Alert,
    }
  }

}