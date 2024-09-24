import { useState } from "react"
import { IContextChildrenProps } from "@/types/context";

import { MODAL_STATE } from "@/types/context/tx-modal";
import { TxModalContext } from "./context";

export const TxModalProvider: React.FC<IContextChildrenProps> = ({
  children
}): JSX.Element => {
  const [isTxModal, setIsTxModal] = useState(false);
  const [modalSteps, setModalSteps] = useState(1);
  const [modalState, setModalState] = useState(MODAL_STATE.SUCCEED);
  const [modalTitle, setModalTitle] = useState("");
  const [modalSubTitle, setModalSubTitle] = useState("");
  const [modalTxHash, setModalTxHash] = useState("");

  const updateModalState = (state: MODAL_STATE, title: string, subtitle: string, txHash: string = "", steps: number = 1) => {
    setModalSteps(steps);
    setModalState(state);
    setModalTitle(title);
    setModalSubTitle(subtitle);
    setModalTxHash(txHash);
    setIsTxModal(true);
  }

  return (
    <TxModalContext.Provider
      value={{
        isTxModal,
        modalSteps,
        modalState,
        modalTitle,
        modalSubTitle,
        modalTxHash,
        setIsTxModal,
        updateModalState
      }}
    >
      {children}
    </TxModalContext.Provider>
  );
}