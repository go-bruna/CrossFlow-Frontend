import { WalletType } from "@/types/interfaces"
import { BigNumberish, ethers } from "ethers"
import Cookies from 'js-cookie'

// Manage Ether wei
export function fromWei(amount: BigNumberish, decimal = 18): number {
  amount = ethers.formatUnits(amount, decimal)
  if (typeof amount === 'string') {
    amount = Number(amount)
  }
  return isNaN(amount) ? 0 : amount
}

export function toWei(amount: BigNumberish, decimal = 18): string {
  return ethers.parseUnits(amount.toString(), decimal).toString()
}

// Manage cookies
export const clearCookie = (key: string) => {
  Cookies.remove(key)
}

export const setCookie = (key: string, value: WalletType | null) => {
  Cookies.set(key, value as any, { expires: 1 })
}

export const getCookie = (key: string) => {
  return Cookies.get(key) as WalletType | null
}

// Wallet address
export const displayAddress = (address: string, sublength: number = 4) => {
  if (!address || !address.length) return ''
  return address.slice(0, sublength) + '...' + address.slice(-sublength)
}

export const copyText = (text: string, cb: () => void) => {
  if (navigator.clipboard && navigator.permissions) {
    navigator.clipboard.writeText(text).then(cb)
  } else if (document.queryCommandSupported('copy')) {
    const ele = document.createElement('textarea')
    ele.value = text
    document.body.appendChild(ele)
    ele.select()
    document.execCommand('copy')
    document.body.removeChild(ele)
    cb?.()
  }
}

// Handle animation between page
let timeout: any
export const handleAnimation = async (setOpacityAnimation: Function) => {
  clearTimeout(timeout)
  setOpacityAnimation(true)
  await new Promise((resolve) => {
    timeout = setTimeout(resolve, 200)
  })
}