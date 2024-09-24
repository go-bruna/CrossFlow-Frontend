import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { type DecodedError, ErrorDecoder } from "ethers-decode-error";
import { useEthersProvider, useEthersSigner } from "@/utils/ethersAdapter";
import {
  CHAIN_ID,
  CHAIN_SCAN,
  TOKEN_LIST,
  // ORBK_PAIR,
  TokenSymbolType,
} from "@/constants";
import { TX_TYPE, MODAL_STATE } from "@/types/interfaces";
import { IBalance, IRedeemInfo, IStake } from "@/types/context/web3";
import { useToast } from "./useToast";
import { fromWei, toWei } from "@/utils";
import { useTxModalState } from "@/contexts/tx-modal";
import { ERROR_MESSAGE, INITIAL_LINK_NOTIFICATION, SUCCESS_RECEIVE_ORBK, SUCCESS_STAKE_ORBK } from "@/constants/message";

export const useSigningWeb3Client = () => {
  const { address } = useAccount();
  const provider = useEthersProvider({ chainId: CHAIN_ID });

  const signer = useEthersSigner({ chainId: CHAIN_ID });
  const { messageApi } = useToast();
  const { setIsTxModal, updateModalState } = useTxModalState();

  const [loading, setLoading] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [txType, setTxType] = useState<TX_TYPE>(TX_TYPE.NONE);
  const [allowance, setAllowance] = useState<number>(0);
  const [balance, setBalance] = useState<IBalance>({});
  const [tvl, setTvl] = useState(0);
  const [periodStaked, setPeriodStaked] = useState(0)
  const [totalBurnt, setTotalBurnt] = useState(0)
  const [averageAPR, setAverageAPR] = useState<bigint>(0n);
  const [stakeLen, setStakeLen] = useState<number>(0)
  const [totalRewards, setTotalRewards] = useState(0)
  const [redeemInfo] = useState<IRedeemInfo>({
    totalBurned: 0,
    totalRedeemORBK: 0,
    totalRedeemVeORBK: 0,
    totalStaked: 0
  });
  const [userStakes, setUserStakes] = useState<IStake[]>([]);
  const [redeemStakes, setRedeemStakes] = useState([]);
  // const [ORBKInEth] = useState<number>(0);

  const errorDecoder = ErrorDecoder.create();


  const updateUserInfo = useCallback(async () => {
    const timeout = setTimeout(async() => {
      await getBurntAmount()
      await getTvl();
      getAverageAPR();
      // getRedeemInfo();
      // const history = await provider.getHistory(address);
      if (address) {
        const promise1 = getTokenBalance("ORBK");
        const promise2 = getTokenBalance("VEORBK");
        const promise3 = getAllowance();
        setLoading(true);
        setTxType(TX_TYPE.BALANCE);
        await Promise.all([promise1, promise2, promise3]);
        setTxType(TX_TYPE.NONE);
        await getUserStakes();
        await getTotalRewards()
        setLoading(false);
        setCompleted(false)
      } else {
        setBalance({});
        setUserStakes([]);
        setAllowance(0);
      }
    }, 500);
    return () => clearTimeout(timeout)
  }, [address]);

  const getTokenBalance = useCallback(async (symbol: TokenSymbolType) => {
    try {
      const contract = new ethers.Contract(
        TOKEN_LIST[symbol].address,
        TOKEN_LIST[symbol].abi,
        provider
      );
      const result = await contract.balanceOf(address);
      const tokenBalance = balance;

      tokenBalance[symbol] = fromWei(result);
      setBalance({ ...balance, ...tokenBalance });
    } catch (err) {
      console.log(err);
    }
  }, [provider, address, balance]);

  const getPeriodStakingAmount = useCallback(async (period: number) => {
    try {
      const contract = new ethers.Contract(
        TOKEN_LIST['VEORBK'].address,
        TOKEN_LIST['VEORBK'].abi,
        provider
      );
      const _periodStaked = await contract.totalStakingAmount(period);
      const _maxCapacity = await contract.maxStakingAmount(period )
      const _staking_capacity = (fromWei(_periodStaked)/fromWei(_maxCapacity)) * 100
      setPeriodStaked(_staking_capacity)
    } catch (err) {
      console.log(err);
    }
  }, [provider, address, balance]);

  const getBurntAmount = useCallback(async () => {
    try {
      // const contract = new ethers.Contract(
      //   TOKEN_LIST['ORBK'].address,
      //   TOKEN_LIST['ORBK'].abi,
      //   provider
      // );
      const contract = new ethers.Contract(
        TOKEN_LIST.VEORBK.address,
        TOKEN_LIST.VEORBK.abi,
        provider
      );
      const totalBurned = await contract.totalBurned();
      // setTotalBurnt(1e9 - fromWei(_totalSupply));
      setTotalBurnt(fromWei(totalBurned));
    } catch (err) {
      console.log("get burnt amount err =====", err);
    }
  }, [provider, address, balance]);

  const getTvl = useCallback(async () => {
    try {
      const contract = new ethers.Contract(
        TOKEN_LIST.VEORBK.address,
        TOKEN_LIST.VEORBK.abi,
        provider
      );
      const result = await contract.tvl();
      setTvl(fromWei(result));
    } catch (err) {
      console.log('get tvl err=====', err);
    }
  }, [provider, address]);

  const getAllowance = useCallback(async () => {
    try {
      const contract = new ethers.Contract(
        TOKEN_LIST.ORBK.address,
        TOKEN_LIST.ORBK.abi,
        provider
      );
      const result = await contract.allowance(
        address,
        TOKEN_LIST.VEORBK.address
      );
      setAllowance(fromWei(result));
    } catch (err) {
      console.log("getAllowance error ====>", err);
    }
  }, [provider, address]);

  const getUserStakes = useCallback(async () => {
    try {
      const contract = new ethers.Contract(
        TOKEN_LIST.VEORBK.address,
        TOKEN_LIST.VEORBK.abi,
        provider
      );
      
      const len = await contract.getUserStakesLength(address);
      const length = Number(len)
      setStakeLen(length)

      let promiseArr = [];
      for (let i = 0; i < length; i++) {
        const promise = await contract.getUserStake(address, i);
        promiseArr.push(promise);
      }
      const values = await Promise.all(promiseArr);

      let burnPercentageArr = [];
      for (let i = 0; i < values.length; i++) {
        const promise = await contract.burnPercentages(parseFloat(values[i].lockPeriod));
        burnPercentageArr.push(promise);
      }
      let burn_percent_values = await Promise.all(burnPercentageArr)

      const stakes: IStake[] = [];

      for (let j = 0; j < values.length; j++) {
        const value = values[j];
        
        const stake = {
          amount: fromWei(value.amount),
          startBlock: parseFloat(value.startBlock),
          startTime: parseFloat(value.startTime),
          lockPeriod: parseFloat(value.lockPeriod),
          reward: fromWei(value.reward),
          lastClaimedBlock: parseFloat(value.lastClaimedBlock),
          burnPercentage: parseFloat(burn_percent_values[j]),
          index: parseFloat(value.index),
        };
        stakes.push(stake);
      }
      setUserStakes(stakes);
    } catch (err) {
      console.log("getUserStakes error ===>", err);
    }
  }, [provider, address]);

  const getAPRAndRewards = async(amount: number, lockPeriod: number) => {
    try {
      const contract = new ethers.Contract(
        TOKEN_LIST.VEORBK.address,
        TOKEN_LIST.VEORBK.abi,
        provider
      );
      
      const yearlyRewards = await contract.calculateExpectedYearlyRewards(toWei(amount), lockPeriod)
      const apr = fromWei(yearlyRewards) / amount * 100
      
      return { 
        apr: Number(apr.toFixed(2)).toLocaleString(),
        expectedRewards: fromWei(yearlyRewards),
      }
    } catch (err) {
      console.log("getAPR err ====>", err);
      return {
        apr: 0,
        expectedRewards: 0,
      }
    }
  }

  const getTotalStakedInPeriod = async(lockPeriod: number) => {
    try {
      const contract = new ethers.Contract(
        TOKEN_LIST.VEORBK.address,
        TOKEN_LIST.VEORBK.abi,
        provider
      );
      const totalStakedInPeriod = await contract.totalStakedInPeriod(lockPeriod)
      return fromWei(totalStakedInPeriod)
    } catch(err) {
      console.log("getTotalStakedInPeriod =====", err)
      return 0
    }
  }
  
  const getAverageAPR = useCallback(async () => {
    try {
      const contract = new ethers.Contract(
        TOKEN_LIST.VEORBK.address,
        TOKEN_LIST.VEORBK.abi,
        provider
      );
      const result = await contract.getUserAverageAPR(address);
      setAverageAPR(result);
    } catch (err) {
      setAverageAPR(0n);
      console.log("getAverageAPR error ====>", err);
    }
  }, [provider, address]);

  /*const getORBKPriceInEth = useCallback(async () => {
    try {
      const contract = new ethers.Contract(
        ORBK_PAIR.address,
        ORBK_PAIR.abi,
        provider
      );
      const result = await contract.getReserves();
      if (result.length > 0 && result[0] > 0) {
        const priceInEth = fromWei(result[1]) / fromWei(result[0]);
        setORBKInEth(priceInEth);
      }
    } catch (err) {
      console.log(err);
    }
  }, [provider])*/

  /* --------------------------------------------------------------*/

  const getTotalRewards = useCallback(async () => {
    try {
      let contract = new ethers.Contract(
        TOKEN_LIST.VEORBK.address,
        TOKEN_LIST.VEORBK.abi,
        provider
      );
      const len = await contract.getUserStakesLength(address);
      const length = Number(len)
      if (length > 0) {
        const rewards = await contract.getTotalRewards(address)
        setTotalRewards(fromWei(rewards))
      }
    } catch (err) {
      console.log("total rewards error ===>", err)
    }
  }, [stakeLen])

  // Claim all rewards
  const writeClaim = async () => {
    try {
      setCompleted(false)
      setPending(true);
  
      setTxType(TX_TYPE.CLAIMALL);
      updateModalState(
        MODAL_STATE.CONFIRM,
        "Confirm Claim",
        `${totalRewards} ORBK`
      );
      setIsTxModal(true);
  
      const contract = new ethers.Contract(
        TOKEN_LIST.VEORBK.address,
        TOKEN_LIST.VEORBK.abi,
        signer
      );
      const tx = await contract.claim();
      updateModalState(
        MODAL_STATE.SUBMITTED,
        "Transaction Submitted",
        `${totalRewards} ORBK`
      );
      await tx.wait();
      messageApi.Alert({
        ...INITIAL_LINK_NOTIFICATION,
        title: 'Successfully Claimed the $ORBK.',
        link: `${CHAIN_SCAN}/tx/${tx?.hash}`,
      })
      updateModalState(MODAL_STATE.SUCCEED, "Succeed", " ", tx?.hash);
    } catch (err) {
      console.log('Error on writeClaim')
      console.log(err);
      const error: DecodedError = await errorDecoder.decode(err);
      // * TODO: Temporary fix for missing r error
      if (error?.reason === "missing r") {
        console.log('missing r error handled')
        messageApi.Alert(SUCCESS_RECEIVE_ORBK)
        updateModalState(MODAL_STATE.SUCCEED, "Succeed", " ", "0x");
      } else {
        messageApi.Alert(ERROR_MESSAGE(error?.reason ?? 'Unknown error.'));
        updateModalState(MODAL_STATE.FAILED, "Failed", error?.reason);
      }
    } finally {
      setTxType(TX_TYPE.NONE);
      setPending(false);
      setCompleted(true)
      await updateUserInfo();
    }
  }

  const writeApproveStake = useCallback(async (amount: number, period: number) => {
    try {
      setCompleted(false)
      setPending(true);
      setTxType(TX_TYPE.APPROVE);

      updateModalState(MODAL_STATE.APPROVE, "Approving ORBK", " ", "", 2);
      setIsTxModal(true);

      let contract = new ethers.Contract(
        TOKEN_LIST.ORBK.address,
        TOKEN_LIST.ORBK.abi,
        signer
      );
      const tokenAmount = amount?.toString();
      const params1: string[] = [TOKEN_LIST.VEORBK.address, toWei(tokenAmount)];
      const transaction = {
        from: address,
        to: TOKEN_LIST.ORBK.address,
        data: contract.interface.encodeFunctionData("approve", params1),
      };

      await provider?.estimateGas(transaction);

      let tx = await contract.approve(
        TOKEN_LIST.VEORBK.address,
        toWei(tokenAmount)
      );
      await tx.wait();

      messageApi.Alert({
        ...INITIAL_LINK_NOTIFICATION,
        title: 'Transaction receipt!',
        link: `${CHAIN_SCAN}/tx/${tx?.hash}`,
      })

      updateModalState(
        MODAL_STATE.CONFIRM,
        "Confirm Stake",
        `${amount} ORBK -> ${amount} VEORBK`,
        "",
        2
      );
      contract = new ethers.Contract(
        TOKEN_LIST.VEORBK.address,
        TOKEN_LIST.VEORBK.abi,
        signer
      );

      tx = await contract.stake(toWei(amount), period);
      updateModalState(
        MODAL_STATE.SUBMITTED,
        "Transaction Submitted",
        `${amount} ORBK -> ${amount} VEORBK`,
        "",
        2
      );
      await tx.wait();

      messageApi.Alert({
        ...INITIAL_LINK_NOTIFICATION,
        title: 'Successfully staked the $ORBK.',
        link: `${CHAIN_SCAN}/tx/${tx?.hash}`,
      })

      updateModalState(MODAL_STATE.SUCCEED, "Succeed", " ", tx?.hash, 2);
    } catch (err) {
      console.log('Error on writeApproveStake')
      console.log(err);
      const error: DecodedError = await errorDecoder.decode(err);

      console.log('error ===', error?.reason)

      // * TODO: Temporary fix for missing r error
      if (error?.reason === "missing r") {
        console.log('missing r error handled')
        messageApi.Alert(SUCCESS_RECEIVE_ORBK);

        updateModalState(MODAL_STATE.SUCCEED, "Succeed", " ", "0x", 2);
      } else {
      messageApi.Alert(ERROR_MESSAGE(error?.reason ?? 'Unknown error.'));
      updateModalState(MODAL_STATE.FAILED, "Failed", error?.reason);
      }
    } finally {
      setTxType(TX_TYPE.NONE);
      setPending(false);
      setCompleted(true)
      await updateUserInfo();

    }
  }, [signer, provider, address, errorDecoder]);


  const writeStake = async (amount: number, period: number) => {
    try {
      setCompleted(false)
      setPending(true);
      setTxType(TX_TYPE.STAKE);

      updateModalState(
        MODAL_STATE.CONFIRM,
        "Confirm Stake",
        `${amount} ORBK -> ${amount} VEORBK`
      );
      setIsTxModal(true);

      const contract = new ethers.Contract(
        TOKEN_LIST.VEORBK.address,
        TOKEN_LIST.VEORBK.abi,
        signer
      );

      const tx = await contract.stake(toWei(amount), period);
      updateModalState(
        MODAL_STATE.SUBMITTED,
        "Transaction Submitted",
        `${amount} ORBK -> ${amount} VEORBK`
      );
      await tx.wait();
      messageApi.Alert({
        ...INITIAL_LINK_NOTIFICATION,
        title: 'Successfully staked the $ORBK.',
        link: `${CHAIN_SCAN}/tx/${tx?.hash}`,
      })
      updateModalState(MODAL_STATE.SUCCEED, "Succeed", " ", tx?.hash);
    } catch (err) {
      console.log('Error on writeStake')
      console.log(err);
      const error: DecodedError = await errorDecoder.decode(err);
      // * TODO: Temporary fix for missing r error
      if (error?.reason === "missing r") {
        console.log('missing r error handled')
        messageApi.Alert(SUCCESS_RECEIVE_ORBK);
        updateModalState(MODAL_STATE.SUCCEED, "Succeed", " ", "0x");
      } else {
        messageApi.Alert(ERROR_MESSAGE(error?.reason ?? 'Unknown error.'));
        updateModalState(MODAL_STATE.FAILED, "Failed", error?.reason);
      }
    } finally {
      setTxType(TX_TYPE.NONE);
      setPending(false);
      setCompleted(true)
      await updateUserInfo();
    }
  };

  const writeRedeemByIndex = useCallback(async (VEORBKAmount: number, redeemAmount: number, stakeIndex: number) => {
    if (stakeIndex >= userStakes?.length) {
      messageApi.Alert(ERROR_MESSAGE("Redeem Error."));
      return;
    }
    try {
      setCompleted(false)
      setPending(true);
      setTxType(TX_TYPE.REDEEM);

      updateModalState(
        MODAL_STATE.CONFIRM,
        "Confirm Redeem",
        `${VEORBKAmount} VEORBK -> ${redeemAmount} ORBK`
      );
      setIsTxModal(true);

      const contract = new ethers.Contract(
        TOKEN_LIST.VEORBK.address,
        TOKEN_LIST.VEORBK.abi,
        signer
      );

      const tx = await contract.redeem(stakeIndex);
      updateModalState(
        MODAL_STATE.SUBMITTED,
        "Transaction Submitted",
        `${VEORBKAmount} VEORBK -> ${redeemAmount} ORBK`
      );
      await tx.wait();
      messageApi.Alert({
        ...INITIAL_LINK_NOTIFICATION,
        title: 'Successfully unstaked.',
        link: `${CHAIN_SCAN}/tx/${tx?.hash}`,
      })
      updateModalState(MODAL_STATE.SUCCEED, "Succeed", " ", tx?.hash);
    } catch (err) {
      console.log('Error on writeRedeemByIndex')
      console.log(err);
      const error: DecodedError = await errorDecoder.decode(err);
      // * TODO: Temporary fix for missing r error
      if (error?.reason === "missing r") {
        console.log('missing r error handled')
        messageApi.Alert(SUCCESS_RECEIVE_ORBK)
        updateModalState(MODAL_STATE.SUCCEED, "Succeed", " ", "0x");
      } else {
        messageApi.Alert(ERROR_MESSAGE(error?.reason ?? 'Unknown error.'));
        updateModalState(MODAL_STATE.FAILED, "Failed", error?.reason);
      }
    } finally {
      setTxType(TX_TYPE.NONE);
      setPending(false);
      setCompleted(true)
      await updateUserInfo();
    }
  }, [signer, provider, errorDecoder]);

  const writeFinalRedeem = useCallback(async (VEORBKAmount: number, orbkAmount: number, redeemCount: number) => {
    try {
      setCompleted(false)
      setPending(true);
      setTxType(TX_TYPE.FINAL);
      updateModalState(
        MODAL_STATE.CONFIRM,
        "Confirm Final Redeem",
        `${VEORBKAmount} VEORBK -> ${orbkAmount} ORBK`
      );
      setIsTxModal(true);

      const contract = new ethers.Contract(
        TOKEN_LIST.VEORBK.address,
        TOKEN_LIST.VEORBK.abi,
        signer
      );
      const params = [toWei(VEORBKAmount), redeemCount];
      const transaction = {
        from: address,
        to: TOKEN_LIST.VEORBK.address,
        data: contract.interface.encodeFunctionData("finalizeRedeem", params),
      };

      await provider?.estimateGas(transaction);
      const tx = await contract.finalizeRedeem(toWei(VEORBKAmount), redeemCount);
      updateModalState(
        MODAL_STATE.SUBMITTED,
        "Transaction Submitted",
        `${VEORBKAmount} VEORBK -> ${orbkAmount} ORBK`
      );
      await tx.wait();
      messageApi.Alert({
        ...INITIAL_LINK_NOTIFICATION,
        title: 'Successfully received the $ORBK.',
        link: `${CHAIN_SCAN}/tx/${tx?.hash}`,
      })
  
      updateModalState(MODAL_STATE.SUCCEED, "Succeed", " ", tx?.hash);
    } catch (err) {
      console.log('Error on writeFinalRedeem')
      console.log(err);
      const error: DecodedError = await errorDecoder.decode(err);
      // * TODO: Temporary fix for missing r error
      if (error?.reason === "missing r") {
        console.log('missing r error handled')
        messageApi.Alert(SUCCESS_STAKE_ORBK);
        updateModalState(MODAL_STATE.SUCCEED, "Succeed", " ", "0x");
      } else {
        messageApi.Alert(ERROR_MESSAGE(error?.reason ?? 'Unknown error'));
        updateModalState(MODAL_STATE.FAILED, "Failed", error?.reason);
      }
    } finally {
      setTxType(TX_TYPE.NONE);
      setPending(false);
      setCompleted(true)
      updateUserInfo();
    }
  }, [signer, provider, address, errorDecoder]);

  useEffect(() => {
    updateUserInfo();
    // getORBKPriceInEth();
    console.log("chainid ===", CHAIN_ID)
  }, [address]);

  useEffect(() => {
    getTotalRewards()
  }, [stakeLen])

  return {
    loading,
    pending,
    completed,
    txType,
    // ORBKInEth,
    balance,
    allowance,
    tvl,
    averageAPR,
    userStakes,
    redeemInfo,
    redeemStakes,
    periodStaked,
    totalBurnt,
    totalRewards,

    updateUserInfo,
    setRedeemStakes,

    writeApproveStake,
    writeStake,
    writeRedeemByIndex,
    writeFinalRedeem,
    writeClaim,
    getPeriodStakingAmount,
    getAPRAndRewards,
    getTotalStakedInPeriod,
  }
};
