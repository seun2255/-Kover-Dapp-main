import { ethers } from 'ethers'
// import CONTRACT from './contracts/TableLand.json'
import CONTRACT from './contracts/UserManager.json'
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

// const getContractJson = async () => {
//     const rpcURL = 'http://127.0.0.1:8545';

//     // Creates an ethers.js provider using the JSON-RPC URL
//     const provider = new ethers.JsonRpcProvider(rpcURL);

//     // Creates a contract instance
//     const contractJson = new ethers.Contract(
//     CONTRACT.abi as string,
//       CONTRACT,
//       provider
//     );
//   }
//   return contractJson;
// };

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
  const feeParams = await contract.membership_fee_params()

  var fee = ethers.parseEther(feeParams.fee.toString())
  // fee = ethers.parseUnits(fee, 18)

  await approve(signer, fee)

  const tx = await contract.apply_for_membership('Nigeria', [data, data])
  // await contract.createUser(data)
  // await tx.wait()
}

// const get_access_fee = async (signer: any) => {

// }

const assignMembershipApplication = async (signer: any, address: any) => {
  const contract = await getContract(signer)

  const fee = ethers.parseEther('2.5')

  await approve(signer, fee)

  const tx = await contract.assign_membership_application(
    address,
    'Nigeria',
    false
  )
}

const get_applications = async (signer: any) => {
  const contract = await getContract(signer)
  var applicants = await contract.get_membership_applicants()
  const addressesArray = Object.values(applicants || {}).map((address: any) =>
    address.toLowerCase()
  )
  // console.log(applicants)
  const membershipApplicants = await get_membership_appliants(addressesArray)
  // console.log(membershipApplicants)
  // const membershipApplicants = await getAllUsers()
  return membershipApplicants
}

const getKycDetails = async (signer: any, address: any) => {
  const contract = await getContract(signer)
  console.log('In getKYCdetails')
  console.log('got contract')
  var kycDetails = await contract.region_KYC_map('Nigeria', address)
  console.log('got kycdetails')
  return kycDetails
}

// Token
const approve = async (signer: any, amount: any) => {
  const contract = await getTokenContract(signer)

  const approvalTx = await contract.approve(
    process.env.REACT_APP_CONTRACT_ADDRESS as string,
    amount
  )

  // await approvalTx.wait()
}

export {
  is_kyc_reviewer,
  approve,
  apply_for_membership,
  get_applications,
  getKycDetails,
  assignMembershipApplication,
}
