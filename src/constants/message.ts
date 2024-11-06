export type MsgType = 'Warning' | 'Success' | 'Error'
export type MessageType = {
  type: MsgType
  title: string
  content?: string
  link?: string
}

const INITIAL_SUCCESS_NOTIFICATION = {
  type: 'Success' as MsgType,
  title: 'Success',
  content: 'Success',
}
const INITIAL_WARNING_NOTIFICATION = {
  type: 'Warning' as MsgType,
  title: 'Warning',
  content: 'Warning',
}
const INITIAL_ERROR_NOTIFICATION = {
  type: 'Error' as MsgType,
  title: 'Error',
  content: 'Error',
}

export const WALLET_NOT_CONNECTED = {
  ...INITIAL_WARNING_NOTIFICATION,
  title: 'Wallet not connected',
  content:
    'Please ensure that your wallet is properly connected to proceed with transactions',
}

export const LOADING_ASSETS = {
  ...INITIAL_WARNING_NOTIFICATION,
  title: 'Loading....',
  content: 'Plesae try again after finishing to load all assets',
}

export const INPUT_AMOUNT = {
  ...INITIAL_WARNING_NOTIFICATION,
  title: 'Warning!',
  content: 'Input amount should be greater than 0.',
}

export const INSUFFICIENT_TOKEN = (token: string) => {
  const alert = {
    ...INITIAL_WARNING_NOTIFICATION,
    title: 'Insufficient token',
    content: `Insufficient ${token}`,
  }
  return alert
}

export const OVER_BALANCE = {
  ...INITIAL_WARNING_NOTIFICATION,
  title: 'Warning!',
  content: 'You tried to swap more than the balance of the pool.',
}

export const ADDRESS_COPY_SUCCESS = {
  ...INITIAL_SUCCESS_NOTIFICATION,
  title: 'Success!',
  content: 'Address copied successfully.',
}
// success msg
export const SUCCESS_OPERATION = (content: string) => {
  const msg = {
    ...INITIAL_SUCCESS_NOTIFICATION,
    title: 'Success!',
    content,
  }
  return msg
}

// error msg
export const ERROR_MESSAGE = (content: string) => {
  const err_msg = {
    ...INITIAL_ERROR_NOTIFICATION,
    title: 'Error!',
    content,
  }
  return err_msg
}

export const NO_ADDRESS = {
  ...INITIAL_WARNING_NOTIFICATION,
  title: 'Warning!',
  content: 'No address found.',
}

export const NO_POOL_ADDRESS_FOUND = {
  ...INITIAL_WARNING_NOTIFICATION,
  title: 'Warning!',
  content: 'No pool address found.',
}

export const NO_ASSETS = {
  ...INITIAL_WARNING_NOTIFICATION,
  title: 'Warning!',
  content: 'No assets found.',
}

export const SUCCESS_ADD_LIQUIDITY_ORDER = {
  ...INITIAL_SUCCESS_NOTIFICATION,
  title: 'Success!',
  content: 'Transaction to add liquidity submitted!',
}

export const FAILED_ADD_LIQUIDITY = {
  ...INITIAL_ERROR_NOTIFICATION,
  title: 'Failed!',
  content: 'Transaction to add liquidity failed!',
}

export const UNEXPECTED_ERROR_ADD_LIQUIDITY = {
  ...INITIAL_WARNING_NOTIFICATION,
  title: 'Warning!',
  content: 'Unexpected error occurred while adding liquidity!',
}

export const SUCCESS_REMOVE_LIQUIDITY_ORDER = {
  ...INITIAL_SUCCESS_NOTIFICATION,
  title: 'Success!',
  content: 'Transaction to remove liquidity submitted!',
}

export const FAILED_REMOVE_LIQUIDITY = {
  ...INITIAL_ERROR_NOTIFICATION,
  title: 'Failed!',
  content: 'Transaction to remove liquidity failed!',
}

export const UNEXPECTED_ERROR_REMOVE_LIQUIDITY = {
  ...INITIAL_WARNING_NOTIFICATION,
  title: 'Warning!',
  content: 'Unexpected error occurred while removing liquidity!',
}

export const SUCCESS_SWAP_ORDER = {
  ...INITIAL_SUCCESS_NOTIFICATION,
  title: 'Success!',
  content: 'Transaction to swap submitted!',
}

export const INSUFFICIENT_FEE_AMOUNT = {
  ...INITIAL_WARNING_NOTIFICATION,
  title: 'Warning!',
  content: 'Insufficient Fee Amount',
}

export const INSUFFICIENT_TOKEN_BALANCE = (token: string, balance: string) => {
  const msg = {
    ...INITIAL_WARNING_NOTIFICATION,
    title: 'Warning!',
    content: `Insufficient ${token} Balance. ${balance} ${token}`,
  }
  return msg
}

export const UNEXPECTED_ERROR = {
  ...INITIAL_ERROR_NOTIFICATION,
  title: 'Error!',
  content: 'Something wrong. Try again later',
}

export const WALLET_INSTALL = (walletname: string) => {
  const msg = {
    ...INITIAL_WARNING_NOTIFICATION,
    title: 'Warning',
    content: `Please install ${walletname} wallet!`,
  }
  return msg
}

export const SUCCESS_WALLET_CONNECTION = {
  ...INITIAL_SUCCESS_NOTIFICATION,
  title: 'Success!',
  content: 'Wallet is connected.',
}

export const FAILED_WALLET_CONNECTION = (walletType: string) => {
  const msg = {
    ...INITIAL_ERROR_NOTIFICATION,
    title: 'Failed!',
    content: `Failed to connect ${walletType} wallet.`,
  }
  return msg
}

export const SUCCESS_TRANSACTION_SUBMIT = {
  ...INITIAL_SUCCESS_NOTIFICATION,
  title: 'Sucess!',
  content: 'Transaction submitted.',
}

export const FAILED_TRANSACTION_SUBMIT = {
  ...INITIAL_ERROR_NOTIFICATION,
  title: 'Failed!',
  content: 'Transaction failed.',
}

export const FAILED_TRANSACTION_TRY_AGAIN = {
  ...INITIAL_ERROR_NOTIFICATION,
  title: 'Failed!',
  content:
    'Please try again. Confirm the transaction and make sure you are paying enough gas.',
}

export const INITIAL_LINK_NOTIFICATION = {
  ...INITIAL_SUCCESS_NOTIFICATION,
  title: '',
  link: '',
  content: 'View on explorer',
}

export const SUCCESS_RECEIVE_ORBK = {
  ...INITIAL_SUCCESS_NOTIFICATION,
  title: 'Success!',
  content: 'Successfully received the $ORBK.',
}

export const SUCCESS_STAKE_ORBK = {
  ...INITIAL_SUCCESS_NOTIFICATION,
  title: 'Success!',
  content: 'Successfully staked the $ORBK.',
}

export const WARNING_MESSAGE = {
  ...INITIAL_WARNING_NOTIFICATION,
  title: 'Warning!',
  content: '',
}