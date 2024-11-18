
import Drawer from 'react-modern-drawer'
import Button from '@/components/button'
import Tab from '@/components/tab'
import Paragraph from '@/components/paragraph'
import { BaseProps } from '@/types/context/drawer'
import { useWindowSize } from '@/hooks/useWindowSize'
import { twMerge } from 'tailwind-merge'
import { ChangeEvent, useEffect, useState } from 'react'
import { Input } from '@/components/input'
import { LogoIcon } from '@/assets/icons/logo'
import { Avatar } from '@/components/avatar'
import { Typography } from '@/components/typography'
import { 
  useAccount, 
  useBalance, 
  useOfflineSigners
} from 'graz'
import { cosmoshub } from '@/config/graz'
import { getFixedNumber, pureNumberFormat } from '@/utils'
import { useToast } from '@/hooks/useToast'
import { ERROR_MESSAGE, SUCCESS_OPERATION, WALLET_NOT_CONNECTED, WARNING_MESSAGE } from '@/constants/message'
import { IValidator } from '@/types/api/stake'
import { MsgDelegate } from '@/cf-client/cosmos.circuit.v1.staking/tx'
import { Coin } from '@cosmjs/proto-signing'
import { TxClient } from '@/cf-client/client'
import { queryClient } from '@/wagmi'
import { GET_STAKE_ALL_VALIDATORS, GET_STAKE_SUMMARY } from '@/constants/query'
import { TailSpin } from 'react-loader-spinner'

export interface Props extends BaseProps {
  validator: IValidator
}

export const StakeDrawer = (props: Props) => {
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ amount, setAmount ] = useState<number | undefined>(undefined)
  
  const { isDesktop } = useWindowSize()
  const { messageApi } = useToast()
  const { data: offlineSigners } = useOfflineSigners()
  const { data: account } = useAccount()
  const { data: balance, refetch } = useBalance({
    chainId: cosmoshub.chainId,
    denom: cosmoshub.stakeCurrency.coinMinimalDenom,
    bech32Address: account?.bech32Address
  })

  /**
   * Handle stake operation
   */
  const handleStake = async () => {
    if (!account?.bech32Address || !offlineSigners?.offlineSigner)
      return messageApi.Alert(WALLET_NOT_CONNECTED)
    if (!amount)
      return messageApi.Alert({...WARNING_MESSAGE, content: `Stake amount should be greater than 0.`})
    else if (amount > Number(balance?.amount))
      return messageApi.Alert({...WARNING_MESSAGE, content: `Stake amount should be less than available CFN`})

    try {
      setLoading(true)
      const _amount: Coin = {
        denom: cosmoshub.stakeCurrency.coinMinimalDenom,
        amount: (amount * 1e6).toString()
      }
      const _stakeData: MsgDelegate = {
        delegatorAddress: account?.bech32Address,
        validatorAddress: props.validator.operator_address,
        amount: _amount
      }

      const client = await TxClient(offlineSigners?.offlineSigner);
      if (!client) {
        messageApi.Alert({...WARNING_MESSAGE, content: ''})
        setLoading(false)
        return;
      }
      let msg = await client.msgDelegate(_stakeData);
      await client.signAndBroadcast([msg]);

      setLoading(false)
      await invalidateQuery()

      messageApi.Alert(SUCCESS_OPERATION('Successfully Staked'))
    } catch (error: any) {
      setLoading(false)
      messageApi.Alert(ERROR_MESSAGE(error as string))
    }
  }

  const invalidateQuery = async () => {
		Promise.all([
			queryClient.invalidateQueries({ queryKey: [GET_STAKE_SUMMARY] }),
			queryClient.invalidateQueries({
			  queryKey: [GET_STAKE_ALL_VALIDATORS],
			}),
		])
	}

  useEffect(() => {
    refetch()
  }, [account?.bech32Address])

  return (
    <Drawer
      open={props.visible}
      onClose={props.onClose}
      direction={'right'}
      style={{
        width: isDesktop ? '520px' : '100%',
      }}
    >
        <div
          className={twMerge(
            'bg-[#101010] flex flex-col gap-5 h-full px-11 py-10',
          )}
        >
          {/* tabs */}
          <Tab.Item
            label='Stake'
          />

          <div className={'w-full'}>
            <Input 
              label='Amount'
              type="number"
              value={amount ?? ''}
              placeholder="0.00"
              icon={<LogoIcon />}
              innerButtonLabel="Max"
              onMax={() => setAmount(getFixedNumber(Number(balance?.amount ?? 0) / 1e6, 0))}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAmount(Number(parseInt(e.target.value)))
              }
              classOverride={{
                inputContainer: 'bg-black mt-[15px]',
                input: 'bg-black ml-1',
                value: 'text-base text-white',
                icon: 'w-8'
              }}
            />

            <Paragraph.List 
              label={(
                <div className="flex items-center gap-2">
                  <Avatar icon={<LogoIcon />} className="w-[16px] justify-start"/>
                  <Typography variant="label-medium" className="text-[13px] mt-0.5">Available CFN</Typography>
                </div>
              )}
              value={`${pureNumberFormat(Number(balance?.amount ?? 0) / 1e6)} CFN`}
              classOverride={{
                container: 'flex-1 pt-4 pb-5 border-b border-[#36f5cf]/10',
                value: 'text-white'
              }}
            />

            {/* Button group */}
            <div className='flex flex-col gap-[25px]'>
            {loading ? (
              <div className="flex flex-1 justify-center items-center bg-[#0aab8b] rounded-lg py-[17px]">
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
            ) : amount && amount > 0 ? (
                <Button.Basic 
                  label="Stake"
                  className="w-full bg-[#0aab8b]"
                  onClick={handleStake}
                />
              ) : (
                <Button.Basic 
                  label="Enter a valid amount"
                  className="w-full bg-[#36f5cf]/10"
                  onClick={() => {}}
                />
              )}
            </div>
          </div>
        </div>
    </Drawer>
  )
}
