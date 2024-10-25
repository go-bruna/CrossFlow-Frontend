import { crossflowClient } from "@/contexts/auth"

// Post method
export const processVoting = async (
  data: any
): Promise<any | undefined> => {
  try {
    const res = await crossflowClient.CfprotocolLoan.tx.sendObserveVote(data)
    if (!res) return undefined

  } catch (error: any) {
    console.log("handleVoting Error ==>", error)
  }
  
}