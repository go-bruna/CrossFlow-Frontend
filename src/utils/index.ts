import { WalletType } from "@/types/interfaces"
import dayjs from "dayjs"
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

export const setCookie = (key: string, value: string | null) => {
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

export const pureNumberFormat = (param: string | number, decimal=2) => {
  if (typeof param === 'number') {
    return Number(param.toFixed(decimal)).toLocaleString()
  } else {
    return (Number(Number(param).toFixed(decimal)).toLocaleString())  
  }
}

export const numberFormat = (param?: string | number, decimal=2) => {
  if (!param)
    return 0
  let _number = typeof param === 'string' ? Number(param) : param

  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast((item: any) => _number >= item.value);
  
  return item ? (_number / item.value).toFixed(decimal).replace(regexp, "").concat(item.symbol) : "0";
}

export const dayDiff = (startTimeString?: string, endTimeString?: string) => {
  if (!startTimeString && !endTimeString)
    return 'NaN'
  const _date = dayjs()
  const _s_time = dayjs(endTimeString ?? startTimeString).valueOf()
  const diff = _date.diff(_s_time, 'day')
  if (diff === 0)
    return 'Today'
  return `${diff} Day(s)`
}