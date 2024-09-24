export enum MODAL_STATE {
  NONE,
  APPROVE,
  CONFIRM,
  SUBMITTED,
  SUCCEED,
  FAILED
}

export interface ITxModalContext {
  isTxModal: boolean,
  modalSteps: number,
  modalState: MODAL_STATE,
  modalTitle: string,
  modalSubTitle: string,
  modalTxHash: string,
  setIsTxModal: Function,
  updateModalState: Function
}