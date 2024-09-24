import { ITxModalContext, MODAL_STATE } from '@/types/context/tx-modal';
import { createContext } from 'react'

const initialState = {
  isTxModal: false,
  modalSteps: 1,
  modalState: MODAL_STATE.NONE,
  modalTitle: "",
  modalSubTitle: "",
  modalTxHash: "",
  setIsTxModal: () => {},
  updateModalState: () => {},
};

export const TxModalContext = createContext<ITxModalContext>(
  initialState
);

TxModalContext.displayName = 'OrderContext'