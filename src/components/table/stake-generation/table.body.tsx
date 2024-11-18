import { TxClient } from "@/cf-client/client";
import Button from "@/components/button";
import { ERROR_MESSAGE, SUCCESS_OPERATION, WALLET_NOT_CONNECTED, WARNING_MESSAGE } from "@/constants/message";
import { GET_STAKE_ALL_DELEGATIONS } from "@/constants/query";
import { useToast } from "@/hooks/useToast";
import { IStakeDelegation } from "@/types/api/stake";
import { pureNumberFormat, truncateAddress } from "@/utils";
import { queryClient } from "@/wagmi";
import { useAccount, useOfflineSigners } from "graz";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";

interface Props {
  data: IStakeDelegation[]
}
interface IRowProps {
  data: IStakeDelegation
  index: number
}


const Row = ({ data, index }: IRowProps) => {
  const [ loading, setLoading ] = useState<boolean>(false)
  const { messageApi } = useToast()
  const { data: account } = useAccount()
  const { data: offlineSigners } = useOfflineSigners()

  // Withdraw operation
  const handleWithdraw = async () => {
    if (!account?.bech32Address || !offlineSigners?.offlineSigner)
      return messageApi.Alert(WALLET_NOT_CONNECTED)

    try {
      setLoading(true)
      const _withdrawObj = {
        delegatorAddress: data.delegation.delegator_address,
        validatorAddress: data.delegation.validator_address
      }

      const client = await TxClient(offlineSigners?.offlineSigner)

      if (!client) {
        messageApi.Alert({...WARNING_MESSAGE, content: ''})
        setLoading(false)
        return;
      }
      
      const msg = await client.msgWithdrawDelegatorReward(_withdrawObj)
      await client.signAndBroadcast([msg])

      setLoading(false)
      await queryClient.invalidateQueries({ queryKey: [GET_STAKE_ALL_DELEGATIONS] })

      messageApi.Alert(SUCCESS_OPERATION('Successfully Withdrawn.'))

    } catch (error: any) {
      setLoading(false)
      messageApi.Alert(ERROR_MESSAGE(error as string))
    }
  }

  return (
    <tr className="h-[48px] text-[13px] hover:bg-[#1b1b1b] text-white">
      <td className="pl-5">{index}</td>
      <td>{truncateAddress(data.delegation.validator_address, 8)}</td>
      <td>{pureNumberFormat(Number(data.delegation.shares)/1e6, 0)}</td>
      <td>{data.balance.denom}</td>
      <td>{pureNumberFormat(Number(data.balance.amount)/1e6, 0)}</td>
      <td className="pr-5">
        <div className="flex items-center">
          {loading ? (
            <div className="flex flex-1 justify-center items-center bg-[#0aab8b] rounded-lg py-[10px]">
              <TailSpin
                visible={true}
                height="20"
                width="20"
                color="#fff"
                ariaLabel="tail-spin-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            <Button.Basic 
              label="Withdraw"
              className="w-full bg-[#1b312b] py-1.5"
              onClick={handleWithdraw}
            />
          )}
        </div>
      </td>
    </tr>
  )
}

export const StakeGenerationTableBody = ({ data }: Props) => {
  return (
    <tbody className="overflow-y-auto">
    {data.map((item: IStakeDelegation, index: number) => (
      <Row 
        data={item as IStakeDelegation} 
        index={index+1}
        key={index} 
      />
    ))}
    </tbody>
  )
}