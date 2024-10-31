import { useQuery } from '@tanstack/react-query'
import { GET_BTC_BALANCE } from '@/constants/query.ts'
import { getChainStats } from '@/apis/pool'

export const useGetChainStats= (address: string) => {
  const { data } = useQuery({
    queryKey: [GET_BTC_BALANCE],
    queryFn: async () => {
      const data = await getChainStats(address)
      return data
    },
    enabled: !!address
  })

  return data 
}
