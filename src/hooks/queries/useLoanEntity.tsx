import { useQuery } from '@tanstack/react-query'
import { GET_LOAN_ENTITY } from '@/constants/query.ts'
import { getLoanEntity } from '@/apis/pool'

export const useLoanEntity= () => {
  const { data } = useQuery({
    queryKey: [GET_LOAN_ENTITY],
    queryFn: async () => {
      return await getLoanEntity()
    },
  })

  return { data }  
}
