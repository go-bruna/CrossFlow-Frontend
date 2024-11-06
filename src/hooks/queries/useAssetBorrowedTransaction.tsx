import { useQuery } from '@tanstack/react-query'
import { GET_ASSET_BORROW_TRANSACTION } from '@/constants/query.ts'
import { getAssetBorrowTransaction } from '@/apis/pool'

export const useAssetBorrowTransaction= () => {
  const { data } = useQuery({
    queryKey: [GET_ASSET_BORROW_TRANSACTION],
    queryFn: async () => {
      return await getAssetBorrowTransaction()
    },
  })

  return { data }  
}
