import { ethers } from 'ethers'
// import CONTRACT from './contracts/TableLand.json'
import CONTRACT from './contracts/UserManager.json'
import REVIEWERCONTRACT from './contracts/Reviewer.json'
import TOKENCONTRACT from './contracts/KoverToken.json'
import { getUser, get_membership_appliants } from './tableland'
import axios from 'axios'
import { getUserDetails } from './database'
import { addContractState } from './utils/helpers'

/**
 * Blockchain Integration
 */

// const getAddress = async () => {
//   const signer = await getSigner()
//   return signer.address
// }

const getSigner = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  return signer
}

const getContract = async () => {
  const signer = await getSigner()
  const contract = new ethers.Contract(
    process.env.REACT_APP_CONTRACT_ADDRESS as string,
    CONTRACT.abi,
    signer
  )
  return contract
}

const getReviewerContract = async () => {
  const signer = await getSigner()
  const contract = new ethers.Contract(
    process.env.REACT_APP_REVIEWER_CONTRACT_ADDRESS as string,
    REVIEWERCONTRACT.abi,
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

const getTokenContract = async () => {
  const signer = await getSigner()
  const contract = new ethers.Contract(
    process.env.REACT_APP_KOVER_TOKEN_CONTRACT_ADDRESS as string,
    TOKENCONTRACT.abi,
    signer
  )
  return contract
}

// User Manager
const is_kyc_reviewer = async (signer: any, region: string) => {
  const contract = await getContract()

  const isReviewer = await contract.is_kyc_reviewer(region)
  return isReviewer
}

const apply_for_membership = async (data: string, region: string) => {
  const contract = await getContract()
  const feeParams = await contract.membership_fee_params()

  var fee = ethers.parseEther(feeParams.fee.toString())
  // fee = ethers.parseUnits(fee, 18)

  await approve(fee)

  const tx = await contract.apply_for_membership(region, [data, data])
  // await contract.createUser(data)
  await tx.wait()
}

const apply_for_InsurePro = async (data: string, region: string) => {
  const contract = await getReviewerContract()
  const feeParams = await contract.kyc_reviewer_application_fee_params()

  var fee = ethers.parseEther(feeParams.fee.toString())
  // fee = ethers.parseUnits(fee, 18)

  await approveReviewer(fee)
  console.log('Succesfully paid the fee')

  const tx = await contract.apply_for_KYC_reviewer(region, [data, data])
  // await contract.createUser(data)
  await tx.wait()
}

// const get_access_fee = async (signer: any) => {

// }

const assignMembershipApplication = async (
  signer: any,
  address: any,
  region: string
) => {
  const contract = await getContract()

  const fee = ethers.parseEther('25')

  await approve(fee)

  const tx = await contract.assign_membership_application(
    address,
    region,
    false
  )
  await tx.wait()
}

const modifyMembershipApplication = async (region: string, data: string) => {
  const contract = await getContract()

  console.log(data)
  const tx = await contract.modify_membership_application(region, [data, data])
  await tx.wait()
}

const modifyInsureProApplication = async (region: string, data: string) => {
  const contract = await getReviewerContract()

  const tx = await contract.modify_KYC_reviewer_application(region, [
    data,
    data,
  ])
  await tx.wait()
}

const submitApplicationReviewResult = async (
  address: any,
  region: string,
  link: string,
  decision: boolean
) => {
  const contract = await getContract()

  const tx = await contract.submit_membership_application_result(
    address,
    region,
    [link, link],
    decision
  )
  await tx.wait()
}

const concludeMembershipApplication = async (address: any, region: string) => {
  const contract = await getContract()

  const tx = await contract.conclude_membership_application(address, region)
  await tx.wait()
}

const concludeInsureproApplication = async (
  address: any,
  region: string,
  isApproved: boolean
) => {
  const contract = await getReviewerContract()

  const tx = await contract.conclude_KYC_reviewer_application(
    address,
    region,
    isApproved
  )
  await tx.wait()
}

const revertMembershipApplication = async (
  signer: any,
  region: string,
  address: string
) => {
  const contract = await getContract()

  const tx = await contract.revert_membership_application_result(
    address,
    region,
    false,
    false
  )
  await tx.wait()
}

const get_applications = async (region: string) => {
  const contract = await getContract()
  var applicants = await contract.get_membership_applicants(region)
  const addressesArray = Object.values(applicants || {}).map((address: any) =>
    address.toLowerCase()
  )
  // console.log(applicants)
  const membershipApplicants = await get_membership_appliants(addressesArray)
  // console.log(membershipApplicants)
  // const membershipApplicants = await getAllUsers()
  return membershipApplicants
}

const get_Reviewer_applications = async (region: string) => {
  const contract = await getReviewerContract()
  var applicants = await contract.get_membership_applicants(region)
  const addressesArray = Object.values(applicants || {}).map((address: any) =>
    address.toLowerCase()
  )
  // console.log(applicants)
  const membershipApplicants = await get_membership_appliants(addressesArray)
  // console.log(membershipApplicants)
  // const membershipApplicants = await getAllUsers()
  return membershipApplicants
}

const getKycDetails = async (address: any, region: string) => {
  const contract = await getContract()
  var kycDetails = await contract.region_KYC_map(region, address)
  return kycDetails
}

const getKycReveiwerDetails = async (address: any, region: string) => {
  const contract = await getReviewerContract()
  var kycDetails = await contract.region_KYC_reviewer_map(region, address)
  return kycDetails
}

const getUserData = async (address: any) => {
  var data = await fetch('https://ipinfo.io/json')
  const ip = await data.json()
  const country = ip.country

  const applicant: any = await getUser(address)
  const response = await axios.get(applicant.data as string)
  const kyc_details = await getKycDetails(response.data.address, country)
  const result = addContractState(response.data, kyc_details)
  return result
}

// Token
const approve = async (amount: any) => {
  const contract = await getTokenContract()

  const approvalTx = await contract.approve(
    process.env.REACT_APP_CONTRACT_ADDRESS as string,
    amount
  )

  await approvalTx.wait()
}

const approveReviewer = async (amount: any) => {
  const contract = await getTokenContract()

  const approvalTx = await contract.approve(
    process.env.REACT_APP_REVIEWER_CONTRACT_ADDRESS as string,
    amount
  )

  await approvalTx.wait()
}

export {
  is_kyc_reviewer,
  approve,
  apply_for_membership,
  apply_for_InsurePro,
  get_applications,
  get_Reviewer_applications,
  getKycDetails,
  getKycReveiwerDetails,
  assignMembershipApplication,
  submitApplicationReviewResult,
  revertMembershipApplication,
  modifyMembershipApplication,
  concludeMembershipApplication,
  modifyInsureProApplication,
  concludeInsureproApplication,
  getUserData,
}
