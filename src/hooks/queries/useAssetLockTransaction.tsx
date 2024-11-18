import { useQuery } from '@tanstack/react-query'
import { GET_ASSET_LOCK_TRANSACTION } from '@/constants/query.ts'
import { getAssetLockTransaction } from '@/apis/pool'

export const useAssetLockTransaction= () => {
  const { data } = useQuery({
    queryKey: [GET_ASSET_LOCK_TRANSACTION],
    queryFn: async () => {
      return await getAssetLockTransaction()
    },
  })

  if (!data)
		return {
			data: null,
		}

  return { data }  
}
