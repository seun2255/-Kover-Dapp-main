import { ethers } from 'ethers'
import CONTRACT from './contracts/TableLand.json'
import TOKENCONTRACT from './contracts/KoverToken.json'
import { getAllUsers, get_membership_appliants } from './tableland'

/**
 * Blockchain Integration
 */

// const getAddress = async () => {
//   const signer = await getSigner()
//   return signer.address
// }

const getContract = async (signer: any) => {
  const contract = new ethers.Contract(
    process.env.REACT_APP_CONTRACT_ADDRESS as string,
    CONTRACT.abi,
    signer
  )
  return contract
}

const getTokenContract = async (signer: any) => {
  const contract = new ethers.Contract(
    process.env.REACT_APP_KOVER_TOKEN_CONTRACT_ADDRESS as string,
    TOKENCONTRACT.abi,
    signer
  )
  return contract
}

// User Manager
const is_kyc_reviewer = async (signer: any) => {
  const contract = await getContract(signer)

  const isReviewer = await contract.is_kyc_reviewer('Nigeria')
  return isReviewer
}

const apply_for_membership = async (signer: any, data: string) => {
  const contract = await getContract(signer)
  console.log('Got here 1')
  // const feeParams = await contract.membership_fee_params()

  // const fee = parseInt(feeParams.fee.toString())

  await approve(signer, 5)

  // const tx = await contract.apply_for_membership('Nigeria', data)
  await contract.createUser(data)
  // await tx.wait()
}

const get_applications = async (signer: any) => {
  // const contract = await getContract(signer)
  // var applicants = await contract.get_membership_applicants()
  // applicants = applicants['0']
  // const addressesArray = Object.values(applicants || {}).map((address: any) =>
  //   address.toLowerCase()
  // )
  // const membershipApplicants = await get_membership_appliants(addressesArray)
  const membershipApplicants = await getAllUsers()
  return membershipApplicants
}

// Token
const approve = async (signer: any, amount: number) => {
  const contract = await getTokenContract(signer)

  const approvalTx = await contract.approve(
    process.env.REACT_APP_CONTRACT_ADDRESS as string,
    amount
  )

  // await approvalTx.wait()
}

// const isCommunityMember = async (contractAddress) => {
//   const contract = await getCommunityContract(contractAddress)

//   const isMember = await contract.isMember()
//   return isMember
// }

// const joinCommunity = async (contractAddress, cost) => {
//   const contract = await getCommunityContract(contractAddress)
//   const tokenContract = await getTokenContract()

//   const costAmount = ethers.parseEther(cost.toString())

//   if (cost !== '0') {
//     const approvalTx = await tokenContract.approve(contractAddress, costAmount)

//     await approvalTx.wait()
//   }
//   console.log('e reach here')

//   let txn = await contract.joinCommunity()
//   await txn.wait()
// }

// const uploadFileCommunity = async (
//   title,
//   description,
//   type,
//   url,
//   hash,
//   tags,
//   contractAddress
// ) => {
//   const contract = await getCommunityContract(contractAddress)

//   const currentDate = new Date()
//   const createdAt = fileUploadTime(currentDate)

//   let txn = await contract.uploadFile(
//     title,
//     description,
//     type,
//     url,
//     hash,
//     tags,
//     createdAt
//   )
//   await txn.wait()
// }

// const getTable = async () => {
//   const signer = await getSigner()

//   const tableland = new Database({ signer })
//   return tableland
// }

export { is_kyc_reviewer, approve, apply_for_membership, get_applications }
