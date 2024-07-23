import { ethers, ContractFactory } from 'ethers'
// import CONTRACT from './contracts/TableLand.json'
import CONTRACT from './contracts/UserManager.json'
import REVIEWERCONTRACT from './contracts/Reviewer.json'
import POLICYMANAGERCONTRACT from './contracts/PolicyManager.json'
import TOKENCONTRACT from './contracts/KoverToken.json'
import PROTOCOLMANAGERCONTRACT from './contracts/ProtocolManager.json'
import POLICYCONTRACT from './contracts/Policy.json'
import POLICYMEMBERSCONTRACT from './contracts/PolicyMembers.json'
import POLICYMANAGEMENTCONTRACT from './contracts/PolicyManagement.json'
import POLICYCLAIMCONTRACT from './contracts/PolicyClaim.json'
import CLAIMCONTRACT from './contracts/Claim.json'
import STAKINGPOOLCONTRACT from './contracts/StakingPool.json'
import PREMIUMCONTRACT from './contracts/Premium.json'
import {
  getUser,
  getCover,
  get_membership_appliants,
  getAllCovers,
  getAllClaims,
  getClaim,
  getClaimById,
} from './tableland'
import axios from 'axios'
import { getCoverDetails, getUserDetails } from './database'
import {
  addClaimsContractState,
  addContractState,
  addPolicyContractState,
  formatStakeData,
  formatValidatorData,
  formatPremiumsPaid,
  formatPolicyBalance,
} from './utils/helpers'
import { toNumber } from 'ethers'
import { openLoader, closeLoader, closeAlert, openAlert } from './redux/alerts'

/**
 * Blockchain Integration
 */

// const getAddress = async () => {
//   const signer = await getSigner()
//   return signer.address
// }
const sepoliaScan = 'https://sepolia.arbiscan.io/tx'

const createTransactionLink = (hash: any) => {
  return `${sepoliaScan}/${hash}`
}

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

const getPolicyManagerContract = async () => {
  const signer = await getSigner()
  const contract = new ethers.Contract(
    process.env.REACT_APP_POLICY_MANAGER_CONTRACT_ADDRESS as string,
    POLICYMANAGERCONTRACT.abi,
    signer
  )
  return contract
}

const getPolicyContract = async (policyAddress: any) => {
  const signer = await getSigner()
  const contract = new ethers.Contract(
    policyAddress,
    POLICYCONTRACT.abi,
    signer
  )
  return contract
}

const getPremiumContract = async (premiumAddress: any) => {
  const signer = await getSigner()
  const contract = new ethers.Contract(
    premiumAddress,
    PREMIUMCONTRACT.abi,
    signer
  )
  return contract
}

const getPolicyMembersContract = async (policyAddress: any) => {
  const policyContract = await getPolicyContract(policyAddress)
  const policyAddresses = await policyContract.addresses()

  const signer = await getSigner()
  const contract = new ethers.Contract(
    policyAddresses.members,
    POLICYMEMBERSCONTRACT.abi,
    signer
  )
  return contract
}

const getPolicyManagementContract = async (policyAddress: any) => {
  const policyContract = await getPolicyContract(policyAddress)
  const policyAddresses = await policyContract.addresses()

  const signer = await getSigner()
  const contract = new ethers.Contract(
    policyAddresses.management,
    POLICYMANAGEMENTCONTRACT.abi,
    signer
  )
  return contract
}

const getPolicyClaimContract = async (policyAddress: any) => {
  const policyContract = await getPolicyContract(policyAddress)
  const policyAddresses = await policyContract.addresses()

  const signer = await getSigner()
  const contract = new ethers.Contract(
    policyAddresses.claims,
    POLICYCLAIMCONTRACT.abi,
    signer
  )
  return contract
}

const getClaimContract = async (claimAddress: any) => {
  const signer = await getSigner()
  const contract = new ethers.Contract(claimAddress, CLAIMCONTRACT.abi, signer)
  return contract
}

const getStakingPoolContract = async () => {
  const signer = await getSigner()
  const contract = new ethers.Contract(
    process.env.REACT_APP_STAKING_POOL_CONTRACT_ADDRESS as string,
    STAKINGPOOLCONTRACT.abi,
    signer
  )
  return contract
}

const getProtocolManagerContract = async () => {
  const signer = await getSigner()
  const contract = new ethers.Contract(
    process.env.REACT_APP_PROTOCOL_MANAGER_CONTRACT_ADDRESS as string,
    PROTOCOLMANAGERCONTRACT.abi,
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

/**
 *
 *
 *  Token Functions
 *
 */

const getTokenBalance = async (sender: any) => {
  const contract = await getTokenContract()
  const balance = await contract.balanceOf(sender)
  const balanceInEther = ethers.formatEther(balance)
  return balanceInEther
}

// User Manager
const is_kyc_reviewer = async (region: string) => {
  const contract = await getContract()

  const isReviewer = await contract.is_kyc_reviewer(region)
  return isReviewer
}

const apply_for_membership = async (
  data: string,
  region: string,
  dispatch: any
) => {
  const contract = await getContract()
  const feeParams = await contract.membership_fee_params()

  var fee = ethers.parseEther(feeParams.fee.toString())

  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Approving Token use',
    })
  )
  await approve(fee)

  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Applying for kyc',
    })
  )
  const tx = await contract.apply_for_membership(region, [data, data])
  await tx.wait()
  dispatch(closeLoader())
  return createTransactionLink(tx.hash)
}

const apply_for_InsurePro = async (
  data: string,
  type: string,
  region: string,
  poolName: string,
  dispatch: any
) => {
  const contract = await getReviewerContract()
  const feeParams = await contract.kyc_reviewer_application_fee_params()

  var fee = ethers.parseEther(feeParams.fee.toString())

  if (type === 'KYC Reviewer') {
    dispatch(
      openLoader({
        displaytransactionLoader: true,
        text: 'Approving Token use',
      })
    )
    await approveReviewer(fee)

    dispatch(
      openLoader({
        displaytransactionLoader: true,
        text: 'Applying for KYC Reviewer',
      })
    )
    const tx = await contract.apply_for_KYC_reviewer(region, [data, data])
    await tx.wait()
    dispatch(closeLoader())

    return { success: true, hash: createTransactionLink(tx.hash) }
  } else if (type === 'Policy Reviewer') {
    try {
      var newFee = ethers.parseEther('15')
      dispatch(
        openLoader({
          displaytransactionLoader: true,
          text: 'Approving Token use',
        })
      )
      await approvePolicyMembers(poolName, newFee)

      dispatch(
        openLoader({
          displaytransactionLoader: true,
          text: 'Applying for Policy Reviewer',
        })
      )
      const tx = await contract.apply_for_policy_reviewer(poolName, [
        data,
        data,
      ])

      const receipt = await tx.wait()

      dispatch(closeLoader())
      if (receipt.status === 1) {
        // Transaction was successful
        return { success: true, hash: createTransactionLink(tx.hash) }
      } else {
        // Transaction failed
        return {
          success: false,
          reason: 'Transaction failed',
          hash: createTransactionLink(tx.hash),
        }
      }
    } catch (error: any) {
      console.log(error)
      return {
        success: false,
        reason: 'Pool not accepting Policy reviewer applications',
      }
    }
  } else {
    try {
      dispatch(
        openLoader({
          displaytransactionLoader: true,
          text: 'Approving Token use',
        })
      )
      await approvePolicyMembers(poolName, fee)

      dispatch(
        openLoader({
          displaytransactionLoader: true,
          text: 'Applying for Adjustor',
        })
      )
      const tx = await contract.apply_for_adjustor(poolName, [data, data])
      const receipt = await tx.wait()
      dispatch(closeLoader())

      if (receipt.status === 1) {
        // Transaction was successful
        return { success: true, hash: createTransactionLink(tx.hash) }
      } else {
        // Transaction failed
        return {
          success: false,
          reason: 'Transaction failed',
          hash: createTransactionLink(tx.hash),
        }
      }
    } catch (error: any) {
      return {
        success: false,
        reason: 'Pool not accepting Adjustor applications',
      }
    }
  }
}

// const get_access_fee = async (signer: any) => {

// }

const assignMembershipApplication = async (
  signer: any,
  address: any,
  region: string,
  dispatch: any
) => {
  const contract = await getContract()

  const fee = ethers.parseEther('25')

  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Approving Token use',
    })
  )
  await approve(fee)

  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Assigning Application',
    })
  )
  const tx = await contract.assign_membership_application(
    address,
    region,
    false
  )
  await tx.wait()
  dispatch(closeLoader())
  return createTransactionLink(tx.hash)
}

const modifyMembershipApplication = async (
  region: string,
  data: string,
  dispatch: any
) => {
  const contract = await getContract()

  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Modifying Application',
    })
  )
  const tx = await contract.modify_membership_application(region, [data, data])
  await tx.wait()
  dispatch(closeLoader())
  return createTransactionLink(tx.hash)
}

const modifyInsureProApplication = async (
  region: string,
  data: string,
  type: string,
  dispatch: any,
  poolName?: string
) => {
  const contract = await getReviewerContract()

  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Modifying Application',
    })
  )
  if (type === 'KYC Reviewer') {
    const tx = await contract.modify_KYC_reviewer_application(region, [
      data,
      data,
    ])
    await tx.wait()
    dispatch(closeLoader())
    return createTransactionLink(tx.hash)
  } else if (type === 'Policy Reviewer') {
    const tx = await contract.modify_policy_reviewer_application(poolName, [
      data,
      data,
    ])
    await tx.wait()
    dispatch(closeLoader())
    return createTransactionLink(tx.hash)
  } else {
    const tx = await contract.modify_adjustor_application(poolName, [
      data,
      data,
    ])
    await tx.wait()
    dispatch(closeLoader())
    return createTransactionLink(tx.hash)
  }
}

const submitApplicationReviewResult = async (
  address: any,
  region: string,
  link: string,
  decision: boolean,
  dispatch: any
) => {
  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Submitting Result',
    })
  )
  const contract = await getContract()

  const tx = await contract.submit_membership_application_result(
    address,
    region,
    [link, link],
    decision
  )
  await tx.wait()
  dispatch(closeLoader())
  return createTransactionLink(tx.hash)
}

const concludeMembershipApplication = async (
  address: any,
  region: string,
  dispatch: any
) => {
  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Concluding Application',
    })
  )
  const contract = await getContract()

  const tx = await contract.conclude_membership_application(address, region)
  await tx.wait()
  dispatch(closeLoader())
  return createTransactionLink(tx.hash)
}

const concludeInsureproApplication = async (
  address: any,
  region: string,
  type: string,
  isApproved: boolean,
  dispatch: any,
  poolName?: string
) => {
  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Concluding Application',
    })
  )
  const contract = await getReviewerContract()

  if (type === 'KYC Reviewer') {
    const tx = await contract.conclude_KYC_reviewer_application(
      address,
      region,
      isApproved
    )
    await tx.wait()
    dispatch(closeLoader())
    return createTransactionLink(tx.hash)
  } else if (type === 'Policy Reviewer') {
    const tx = await contract.conclude_policy_reviewer_application(
      poolName,
      address,
      isApproved
    )
    await tx.wait()
    dispatch(closeLoader())
    return createTransactionLink(tx.hash)
  } else {
    const tx = await contract.conclude_adjustor_application(
      poolName,
      address,
      isApproved
    )
    await tx.wait()
    dispatch(closeLoader())
    return createTransactionLink(tx.hash)
  }
}

const revertMembershipApplication = async (
  signer: any,
  region: string,
  address: string,
  dispatch: any
) => {
  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Reverting Application',
    })
  )
  const contract = await getContract()

  const tx = await contract.revert_membership_application_result(
    address,
    region,
    false,
    false
  )
  await tx.wait()
  dispatch(closeLoader())
}

const get_applications = async (region: string) => {
  const contract = await getContract()
  var applicants = await contract.get_membership_applicants(region)
  const addressesArray = Object.values(applicants || {}).map((address: any) =>
    address.toLowerCase()
  )
  const membershipApplicants = await get_membership_appliants(addressesArray)
  // const membershipApplicants = await getAllUsers()
  return membershipApplicants
}

const get_covers = async (region: string) => {
  const covers = await getAllCovers()

  const axiosRequests = covers.map(async (cover) => {
    const response = await axios.get(cover.data as string)

    const result = { ...response.data, ...cover }
    return result
  })
  const covers_data = await Promise.all(axiosRequests)
  return covers_data
}

const get_claims = async (region: string) => {
  const claims = await getAllClaims()

  const axiosRequests = claims.map(async (claim) => {
    const response = await axios.get(claim.data as string)

    const result = { ...response.data, ...claim }
    return result
  })
  const claims_data = await Promise.all(axiosRequests)
  return claims_data
}

const get_Reviewer_applications = async (region: string) => {
  const contract = await getReviewerContract()
  var applicants = await contract.get_membership_applicants(region)
  const addressesArray = Object.values(applicants || {}).map((address: any) =>
    address.toLowerCase()
  )
  const membershipApplicants = await get_membership_appliants(addressesArray)
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
  // var data = await fetch('https://ipinfo.io/json')
  // const ip = await data.json()
  const country = 'NG'

  console.log('Got here 1')
  const applicant: any = await getUser(address)
  console.log('Got here 2')
  console.log(applicant)
  const response = await axios.get(applicant.data as string)
  console.log('Got here 3')
  const kyc_details = await getKycDetails(response.data.address, country)
  var result = addContractState(response.data, kyc_details)
  const userFirebaseDetails = await getUserDetails(address)
  result = { ...result, ...userFirebaseDetails }
  result.id = applicant.id
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

const approvePolicy = async (pool: string, amount: any) => {
  const tokenContract = await getTokenContract()
  const poolAddresses = await getPoolAddresses(pool)

  const approvalTx = await tokenContract.approve(poolAddresses.policy, amount)

  await approvalTx.wait()
}

const approvePolicyMembers = async (pool: string, amount: any) => {
  const tokenContract = await getTokenContract()
  const poolAddresses = await getPoolAddresses(pool)
  const policyContract = await getPolicyContract(poolAddresses.policy)
  const policyAddresses = await policyContract.addresses()

  const approvalTx = await tokenContract.approve(
    policyAddresses.members,
    amount
  )

  await approvalTx.wait()
}

const getPremiumContractInstance = async (pool: string) => {
  const poolAddresses = await getPoolAddresses(pool)
  const premiumContract = await getPremiumContract(poolAddresses.premium)

  return premiumContract
}

const approvePolicyManagement = async (pool: string, amount: any) => {
  console.log('Reached here 3')
  const tokenContract = await getTokenContract()
  console.log('Reached here 3.5')
  const poolAddresses = await getPoolAddresses(pool)
  console.log('Reached here 4')
  const policyContract = await getPolicyContract(poolAddresses.policy)
  console.log('Reached here 5')
  const policyAddresses = await policyContract.addresses()
  console.log('Reached here 6')

  const approvalTx = await tokenContract.approve(
    policyAddresses.management,
    amount
  )
  console.log('Reached here 7')

  await approvalTx.wait()
}

const approvePolicyClaim = async (pool: string, amount: any) => {
  const tokenContract = await getTokenContract()
  const poolAddresses = await getPoolAddresses(pool)
  const policyContract = await getPolicyContract(poolAddresses.policy)
  const policyAddresses = await policyContract.addresses()

  const approvalTx = await tokenContract.approve(policyAddresses.claims, amount)

  await approvalTx.wait()
}

const getPools = async () => {
  const protocolManagerContract = await getProtocolManagerContract()

  const poolNames = await protocolManagerContract.get_pool_names()
  return poolNames
}

const getPoolAddresses = async (pool: string) => {
  const protocolManagerContract = await getProtocolManagerContract()
  console.log('Reached here 3.75')

  console.log('Poolname: ', pool)
  const poolAddresses = await protocolManagerContract.get_pool_addresses(pool)
  console.log('Reached here 3.85')
  return poolAddresses
}

const getAdminAddress = async () => {
  const protocolManagerContract = await getProtocolManagerContract()

  const adminAddress = await protocolManagerContract.get_admin_address()
  return adminAddress
}

const getPoolDetails = async (pool: string) => {
  const addresses = await getPoolAddresses(pool)
}

// Policy Functions
const applyForPolicy = async (
  pool: string,
  data: string,
  durationIndex: any,
  cost: number,
  policyValues: any,
  dispatch: any
) => {
  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Paying Application Fee',
    })
  )
  console.log('Reached here 1')
  const policyManagerContract = await getPolicyManagerContract()
  console.log('Reached here 2')

  var newFee = ethers.parseEther('15')
  await approvePolicyManagement(pool, newFee)
  console.log('Reached here 3')

  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Applying for Policy',
    })
  )
  const tx = await policyManagerContract.apply_for_or_modify_policy(
    pool,
    [data, data],
    durationIndex,
    cost,
    [
      ethers.parseEther(policyValues.maxExposure.toString()),
      ethers.parseEther(policyValues.src.toString()),
      ethers.parseEther(policyValues.deductiblePerc.toString()),
      ethers.parseEther(policyValues.riskFactor.toString()),
    ]
  )
  await tx.wait()
  dispatch(closeLoader())
  return createTransactionLink(tx.hash)
}

const getPolicyDetails = async (address: any, pool: string) => {
  const addresses = await getPoolAddresses(pool)
  const contract = await getPolicyManagementContract(addresses.policy)

  var policyDetails = await contract.pool_policy_data_map(address)
  return policyDetails
}

const getPolicyBalanceDetails = async (address: any, pool: string) => {
  const addresses = await getPoolAddresses(pool)
  const contract = await getPolicyContract(addresses.policy)

  const policyBalanceWei = await contract.policy_account_balance(address)
  const premiumsPaidWei = await contract.premiums_paid(address)

  const policyBalance = ethers.formatEther(policyBalanceWei)
  const premiumsPaid = ethers.formatEther(premiumsPaidWei)

  return {
    policyBalance: formatPolicyBalance(policyBalance),
    premiumsPaid: formatPremiumsPaid(premiumsPaid),
  }
}

// const getPolicyData = async (address: any, poolName: string) => {
//   // var data = await fetch('https://ipinfo.io/json')
//   // const ip = await data.json()
//   // const country = ip.country

//   const applicant: any = await getCover(address, poolName)
//   const response = await axios.get(applicant.data as string)
//   const policy_details = await getPolicyDetails(
//     response.data.address,
//     response.data.poolName
//   )
//   var result = addPolicyContractState(response.data, policy_details)
//   const coverFirebaseDetails = await getCoverDetails(address, poolName)
//   result = { ...applicant, ...result, ...coverFirebaseDetails }
//   result.coverId = applicant.id
//   return result
// }

const getPolicyData = async (address: any, poolName: string) => {
  // var data = await fetch('https://ipinfo.io/json')
  // const ip = await data.json()
  // const country = ip.country

  // const applicant: any = await getCover(address, poolName)
  // const response = await axios.get(applicant.data as string)
  const policy_details = await getPolicyDetails(address, poolName)
  var result = addPolicyContractState({}, policy_details)
  const coverFirebaseDetails = await getCoverDetails(address, poolName)
  const response = await axios.get(coverFirebaseDetails.formData as string)
  result = { ...result, ...coverFirebaseDetails, fee: 5, ...response.data }
  // result.coverId = applicant.id
  return result
}

const modifyPolicy = async (
  pool: string,
  data: string,
  durationIndex: any,
  dispatch: any
) => {
  const policyManagerContract = await getPolicyManagerContract()

  const tx = await policyManagerContract.modify_policy_application(
    pool,
    [data, data],
    durationIndex
  )
  await tx.wait()
  return createTransactionLink(tx.hash)
}

const assignPolicyApplication = async (
  poolName: string,
  address: any,
  region: string,
  dispatch: any
) => {
  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Approving Token Use',
    })
  )
  const contract = await getPolicyManagerContract()

  const fee = ethers.parseEther('25')

  await approvePolicyManagement(poolName, fee)

  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Assigning Application',
    })
  )
  const tx = await contract.assign_policy_application(poolName, address, false)
  await tx.wait()
  dispatch(closeLoader())
  return createTransactionLink(tx.hash)
}

const submitPolicyApplicationResult = async (
  poolName: string,
  address: any,
  reviewerAddress: any,
  data: string,
  userData: string,
  decision: boolean,
  policyValues: any,
  dispatch: any
) => {
  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Submitting Result',
    })
  )
  const addresses = await getPoolAddresses(poolName)

  const policyContract = await getPolicyContract(addresses.policy)
  const policyManagementContract = await getPolicyManagementContract(
    addresses.policy
  )

  const tx = await policyManagementContract.submit_policy_application_result(
    address,
    reviewerAddress,
    [userData, userData],
    [data, data],
    decision,
    reviewerAddress
  )
  await tx.wait()

  const makeRiskModule = await policyContract.set_risk_module_address(
    reviewerAddress
  )
  await makeRiskModule.wait()

  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Submitting Assesement',
    })
  )
  const submitAssesment =
    await policyManagementContract.submit_policy_application_assessment(
      address,
      reviewerAddress,
      policyValues.maxExposure,
      policyValues.src,
      policyValues.deductiblePerc,
      policyValues.riskFactor
    )
  await submitAssesment.wait()
  dispatch(closeLoader())
  return createTransactionLink(tx.hash)
}

const concludePolicyAssesement = async (
  poolName: string,
  address: any,
  dispatch: any
) => {
  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Concluding Assesement',
    })
  )
  const addresses = await getPoolAddresses(poolName)

  const policyContract = await getPolicyManagementContract(addresses.policy)

  const tx = await policyContract.conclude_policy_assessment(address)
  await tx.wait()
  dispatch(closeLoader())
  return createTransactionLink(tx.hash)
}

const acceptPolicy = async (
  poolName: string,
  data: any,
  address: any,
  depositAmount: number,
  dispatch: any
) => {
  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Submitting Decision',
    })
  )
  const addresses = await getPoolAddresses(poolName)

  const policyContract = await getPolicyManagementContract(addresses.policy)

  const fee = ethers.parseEther(depositAmount.toString())

  const accept = await policyContract.accept_decline_policy_assessment(
    address,
    [data, data],
    true,
    fee
  )
  await accept.wait()
  dispatch(closeLoader())
  return createTransactionLink(accept.hash)
}

const depositIntoPolicy = async (
  poolName: string,
  depositAmount: number,
  dispatch: any
) => {
  try {
    dispatch(
      openLoader({
        displaytransactionLoader: true,
        text: 'Depositing Tokens',
      })
    )
    const addresses = await getPoolAddresses(poolName)

    const policyContract = await getPolicyManagementContract(addresses.policy)

    const fee = ethers.parseEther(depositAmount.toString())

    const tx = await policyContract.depositIntoPolicyBalance(fee)
    await tx.wait()
    dispatch(closeLoader())
    return createTransactionLink(tx.hash)
  } catch {
    dispatch(closeLoader())
    dispatch(
      openAlert({
        displayAlert: true,
        data: {
          id: 2,
          variant: 'Failed',
          classname: 'text-black',
          title: 'Transaction Failed',
          tag1: 'User rejected transaction',
          tag2: 'please cofirm the transactions in wallet',
        },
      })
    )
    setTimeout(() => {
      dispatch(closeAlert())
    }, 10000)
  }
}

const getPolicyBalance = async (poolName: string, address: string) => {
  const addresses = await getPoolAddresses(poolName)

  const policyContract = await getPolicyContract(addresses.policy)

  const balance = await policyContract.policy_account_balance(address)
  return balance
}

const isPoolPolicyReviewer = async (address: any, pool: string) => {
  const addresses = await getPoolAddresses(pool)
  const contract = await getPolicyMembersContract(addresses.policy)
  var policyRevierDetails = await contract.pool_policy_reviewer_map(address)
  return policyRevierDetails.is_expert
}

const isPoolAdjustor = async (address: any, pool: string) => {
  const addresses = await getPoolAddresses(pool)
  const contract = await getPolicyMembersContract(addresses.policy)
  var adjustorDetails = await contract.pool_adjustor_map(address)
  return adjustorDetails.is_expert
}

const approvePoolToSpend = async (
  poolName: string,
  amount: number,
  dispatch: any
) => {
  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Approving Token use',
    })
  )
  const fee = ethers.parseEther(amount.toString())

  await approvePolicyManagement(poolName, fee)
  dispatch(closeLoader())
}

/**
 *
 * Claim
 *
 */

// const getUsersClaimAddress = async (poolName: string) => {
//   const addresses = await getPoolAddresses(poolName)

//   const policyContract = await getPolicyContract(addresses.policy)

//   const address = await policyContract.get_policy_claim_address()
//   return address
// }

const getClaimAddress = async (poolName: string, userAddress: string) => {
  const addresses = await getPoolAddresses(poolName)

  const policyContract = await getPolicyClaimContract(addresses.policy)

  const address = await policyContract.get_users_claim_address(userAddress)
  return address
}

const getClaimDetails = async (poolName: string, address: any) => {
  const claimAddress = await getClaimAddress(poolName, address)
  const claimContract = await getClaimContract(claimAddress)

  const claim_data = await claimContract.claim_data()
  return claim_data
}

const getClaimData = async (poolName: string, address: any) => {
  const contract_data = await getClaimDetails(poolName, address)

  const applicant: any = await getClaim(address, poolName)
  const response = await axios.get(applicant.data as string)
  var result = await addClaimsContractState(response.data, contract_data)
  // const claimFirebaseDetails = await getClaimDetails(address, poolName)
  result = { ...applicant, ...result }
  result.claimId = applicant.id
  return result
}

const getClaimValidationData = async (poolName: string, address: any) => {
  const claimAddress = await getClaimAddress(poolName, address)
  const claimContract = await getClaimContract(claimAddress)

  const validatorsCount = await claimContract.getValidatorsCount()
  const validators = []
  const totalVotePowerContract = await claimContract.total_vote_power()
  const yesVotePowerContract = await claimContract.yes_vote_power()

  const totalVotePower = Number(ethers.formatEther(totalVotePowerContract))
  const yesVotePower = Number(ethers.formatEther(yesVotePowerContract))

  for (let i = 0; i < validatorsCount; i++) {
    const validatorAddress = await claimContract.validators(i)
    const data = await claimContract.validations_map(validatorAddress)
    const formattedData = formatValidatorData(data)
    validators.push({ ...formattedData, address: validatorAddress })
  }

  var votesFor
  var votesAgainst

  if (totalVotePower === 0) {
    votesFor = 0
    votesAgainst = 0
  } else {
    votesFor = yesVotePower
    votesAgainst = totalVotePower - yesVotePower
  }

  return {
    validators: validators,
    totalVotePower,
    votesFor,
    votesAgainst,
  }
}

const getClaimDataById = async (claimId: string) => {
  const applicant: any = await getClaimById(Number(claimId))
  const contract_data = await getClaimDetails(
    applicant.poolName,
    applicant.address
  )

  const response = await axios.get(applicant.data as string)
  var result = await addClaimsContractState(response.data, contract_data)
  // const claimFirebaseDetails = await getClaimDetails(address, poolName)
  result = { ...applicant, ...result }
  result.claimId = applicant.id
  return result
}

const approveClaim = async (poolName: string, amount: any, user: string) => {
  const tokenContract = await getTokenContract()
  const address = await getClaimAddress(poolName, user)

  const approvalTx = await tokenContract.approve(address, amount)

  await approvalTx.wait()
}

const raiseClaim = async (
  poolName: string,
  data: string,
  address: string,
  dispatch: any
) => {
  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Rasising Claim',
    })
  )
  const addresses = await getPoolAddresses(poolName)

  const policyContract = await getPolicyContract(addresses.policy)
  const policyAddresses = await policyContract.addresses()

  const policyClaimContract = await getPolicyClaimContract(addresses.policy)

  const raiseClaimTx = await policyClaimContract.raise_claim(
    process.env.REACT_APP_CLAIMS_TABLE_CONTRACT_ADDRESS,
    policyAddresses.members
  )
  await raiseClaimTx.wait()

  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Setting Claim Data',
    })
  )

  const claimAddress = await getClaimAddress(poolName, address)
  const claimContract = await getClaimContract(claimAddress)

  const initaiateClaimTx = await claimContract.setClaimParams(
    [ethers.parseEther('10'), ethers.parseEther('100')],
    [data, data],
    poolName,
    address
  )
  await initaiateClaimTx.wait()

  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Paying Claim fees',
    })
  )

  const fee = ethers.parseEther('1000000')

  await approveClaim(poolName, fee, address)

  const payDuesTx = await claimContract.clearOutstandingDues()
  await payDuesTx.wait()
  dispatch(closeLoader())
  return createTransactionLink(payDuesTx.hash)
}

const assignClaimApplication = async (
  poolName: string,
  claimant: string,
  user: string,
  dispatch: any
) => {
  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Approving Token Use',
    })
  )
  const claimContractAddress = await getClaimAddress(poolName, claimant)
  const claimContract = await getClaimContract(claimContractAddress)
  const fee = ethers.parseEther('250')

  await approveClaim(poolName, fee, claimant)

  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Assigning Adjustor',
    })
  )
  const tx = await claimContract.assign_adjustor()
  await tx.wait()
  dispatch(closeLoader())
  return createTransactionLink(tx.hash)
}

const submitClaimAssesment = async (
  poolName: string,
  claimantAddress: string,
  decision: boolean,
  amount: string,
  data: string,
  dispatch: any
) => {
  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Submitting Assesement',
    })
  )
  const claimContractAddress = await getClaimAddress(poolName, claimantAddress)
  const claimContract = await getClaimContract(claimContractAddress)

  const approved_payout = ethers.parseEther(amount)

  const tx = await claimContract.submit_adjustor_assessment(
    decision,
    approved_payout,
    data
  )
  await tx.wait()
  dispatch(closeLoader())
  return createTransactionLink(tx.hash)
}

const submitClaimAssesmentDecision = async (
  poolName: string,
  claimantAddress: string,
  decision: boolean,
  rating: number,
  dispatch: any
) => {
  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Submitting Decision',
    })
  )
  const claimContractAddress = await getClaimAddress(poolName, claimantAddress)
  const claimContract = await getClaimContract(claimContractAddress)

  const tx = await claimContract.submit_claimant_assessment_decision(
    claimantAddress,
    decision,
    rating
  )
  await tx.wait()
  dispatch(closeLoader())
  return createTransactionLink(tx.hash)
}

const approveStakingContract = async (amount: any) => {
  const tokenContract = await getTokenContract()

  const approvalTx = await tokenContract.approve(
    process.env.REACT_APP_STAKING_POOL_CONTRACT_ADDRESS,
    amount
  )

  await approvalTx.wait()
}

const validateClaim = async (
  poolName: string,
  claimantAddress: string,
  stake: string,
  decision: boolean,
  rating: number,
  dispatch: any
) => {
  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Approving Token Use',
    })
  )
  const UserManagerContract = await getContract()
  const stakingPoolContract = await getStakingPoolContract()
  const claimContractAddress = await getClaimAddress(poolName, claimantAddress)

  const stakeEther = ethers.parseEther(stake)

  await approveStakingContract(stakeEther)

  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Making a Stake',
    })
  )
  const txStake = await stakingPoolContract.stake(stakeEther)
  await txStake.wait()

  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Locking Staked Tokens',
    })
  )
  const approveStakeLock = await stakingPoolContract.approve_stake_lock(
    claimContractAddress,
    stakeEther
  )
  await approveStakeLock.wait()

  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Validating Claim',
    })
  )
  const tx = await UserManagerContract.validate(
    poolName,
    claimantAddress,
    ethers.parseEther(stake),
    rating,
    decision
  )
  await tx.wait()
  dispatch(closeLoader())
  return createTransactionLink(tx.hash)
}

// Staking

const stake = async (
  amount: number,
  duration: number,
  dispatch: any,
  network?: string
) => {
  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Making a Stake',
    })
  )
  const stakingPoolContract = await getStakingPoolContract()

  const stakeEther = ethers.parseEther(amount.toString())

  const txStake = await stakingPoolContract.stake(stakeEther, duration)
  await txStake.wait()
  dispatch(closeLoader())
  return createTransactionLink(txStake.hash)
}

const unstake = async (stakeId: number, dispatch: any, network?: string) => {
  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Unstaking',
    })
  )

  const stakingPoolContract = await getStakingPoolContract()

  const txUnstake = await stakingPoolContract.unstake(stakeId)
  await txUnstake.wait()
  dispatch(closeLoader())
  return createTransactionLink(txUnstake.hash)
}

// const getUsersStake = async (user: string) => {
//   const stakingPoolContract = await getStakingPoolContract()

//   const stakedAmount = await stakingPoolContract.stakes(user)
//   const stakedAmountEther = ethers.formatEther(stakedAmount)

//   var timestamp = await stakingPoolContract.stake_rewards_initiation_timestamp(
//     user
//   )
//   timestamp = Number(timestamp)

//   // Convert the timestamp to milliseconds
//   const date = new Date(timestamp * 1000)

//   // Function to pad single digit numbers with a leading zero
//   const pad = (num: number) => (num < 10 ? '0' : '') + num

//   // Extract the date components
//   const year = date.getFullYear()
//   const month = pad(date.getMonth() + 1) // Months are zero-based in JS
//   const day = pad(date.getDate())

//   const hours = pad(date.getHours())
//   const minutes = pad(date.getMinutes())
//   const seconds = pad(date.getSeconds())

//   // Construct the formatted date string
//   const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`

//   return { amount: stakedAmountEther, date: formattedDate }
// }

const getUsersStakes = async (user: string) => {
  var data: any[] = []
  const stakingPoolContract = await getStakingPoolContract()

  const stakeIds = await stakingPoolContract.get_stakes()
  stakeIds.map((id: any) => {
    data.push(Number(id))
  })

  const stakesPromises = data.map(async (stakeId: number) => {
    const stakeDetails = await stakingPoolContract.get_stake_details(stakeId)
    const formattedDetails = formatStakeData(stakeDetails)

    return formattedDetails
  })
  const stakes = await Promise.all(stakesPromises)

  return stakes
}

const approveKoverToStake = async (amount: string, dispatch: any) => {
  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Approving Token Use',
    })
  )
  const stakeEther = ethers.parseEther(amount)
  await approveStakingContract(stakeEther)
  dispatch(closeLoader())
}

const getStakeBalance = async (address: string) => {
  const stakingPoolContract = await getStakingPoolContract()

  const balance = await stakingPoolContract.get_stake(address)

  const balanceInEther = ethers.formatEther(balance)
  return balanceInEther
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
  getPools,
  applyForPolicy,
  getPoolAddresses,
  isPoolPolicyReviewer,
  get_covers,
  get_claims,
  modifyPolicy,
  getPolicyData,
  assignPolicyApplication,
  submitPolicyApplicationResult,
  concludePolicyAssesement,
  getTokenBalance,
  acceptPolicy,
  approvePoolToSpend,
  depositIntoPolicy,
  raiseClaim,
  assignClaimApplication,
  getClaimData,
  getClaimDataById,
  submitClaimAssesment,
  submitClaimAssesmentDecision,
  validateClaim,
  getClaimValidationData,
  stake,
  approveKoverToStake,
  getStakeBalance,
  getAdminAddress,
  getPolicyBalance,
  getUsersStakes,
  isPoolAdjustor,
  unstake,
  getPolicyBalanceDetails,
  getPremiumContractInstance,
}
