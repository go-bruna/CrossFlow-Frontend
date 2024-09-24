import { OrderResType } from '@/types/api/order.ts'

export interface IOrderContext {
  orderList: OrderResType[],
  isLoading: boolean
}
