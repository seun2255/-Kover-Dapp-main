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

const getAddress = async () => {
  const signer = await getSigner()
  return signer.address
}
const sepoliaScan = 'https://sepolia.arbiscan.io/tx'

const createTransactionLink = (hash: any) => {
  return `${sepoliaScan}/${hash}`
}
// const provider = new ethers.JsonRpcProvider(
//   `https://arbitrum-sepolia.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`
// )

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

// -----------------------------------------------------------------------------------------------------------------------------------------

/**
 * Transaction Handlers
 */

/**
 *
 * @param approvalAddress The address your approving token use for
 * @param amount The amount as a number in ether form
 * @param dispatch the redux dispatch object
 * @returns
 */
const handleTokenApproval = async (
  approvalAddress: string,
  amount: number,
  dispatch: any
): Promise<boolean> => {
  const address = await getAddress()
  const contract = await getTokenContract()
  const tokenBalanceString = await getTokenBalance(address)
  const tokenBalance = Number(tokenBalanceString)

  console.log('reached here 1')
  if (amount > tokenBalance) {
    dispatch(closeLoader())
    dispatch(
      openAlert({
        displayAlert: true,
        data: {
          id: 2,
          variant: 'Failed',
          classname: 'text-black',
          title: 'Transaction Failed',
          tag1: `Insufficient balance: need ${amount} kover`,
          tag2: 'please buy tokens before proceeding',
        },
      })
    )
    setTimeout(() => {
      dispatch(closeAlert())
    }, 10000)
    return false
  } else {
    try {
      const approvalTx = await contract.approve(
        approvalAddress,
        ethers.parseEther(amount.toString())
      )

      await approvalTx.wait()
      return true
    } catch (error: any) {
      dispatch(closeLoader())
      dispatch(
        openAlert({
          displayAlert: true,
          data: {
            id: 2,
            variant: 'Failed',
            classname: 'text-black',
            title: 'Transaction Rejected',
            tag1: 'User rejected transaction',
            tag2: 'please confirm the transaction next time',
          },
        })
      )
      setTimeout(() => {
        dispatch(closeAlert())
      }, 10000)
      return false
    }
  }
}

/**
 *
 * @param txFunction The contract function your running
 * @param dispatch The redux dispatch object
 * @returns
 */
const handleContractTransaction = async (
  txFunction: () => Promise<any>,
  dispatch: any
): Promise<string | undefined> => {
  try {
    const tx = await txFunction()
    await tx.wait()
    dispatch(closeLoader())
    return createTransactionLink(tx.hash)
  } catch (error: any) {
    console.log('The error: ', error)
    dispatch(closeLoader())
    if (error.reason === 'rejected') {
      dispatch(
        openAlert({
          displayAlert: true,
          data: {
            id: 2,
            variant: 'Failed',
            classname: 'text-black',
            title: 'Transaction Rejected',
            tag1: 'User rejected transaction',
            tag2: 'please confirm the transaction next time',
          },
        })
      )
    } else if (error.reason) {
      dispatch(
        openAlert({
          displayAlert: true,
          data: {
            id: 2,
            variant: 'Failed',
            classname: 'text-black',
            title: 'Transaction Failed',
            tag1: error.reason,
            tag2: 'please try again later',
          },
        })
      )
    } else {
      dispatch(
        openAlert({
          displayAlert: true,
          data: {
            id: 2,
            variant: 'Failed',
            classname: 'text-black',
            title: 'Transaction Failed',
            tag1: 'User rejected transaction',
            tag2: 'please try again and confirm the transaction',
          },
        })
      )
    }
    setTimeout(() => {
      dispatch(closeAlert())
    }, 10000)
    return undefined
  }
}

// -----------------------------------------------------------------------------------------------------------------------------------------

/**
 *
 * KYC Membership Application process
 *
 */

// Application
const apply_for_membership = async (
  data: string,
  region: string,
  dispatch: any
) => {
  // Token use approval
  const contract = await getContract()
  const feeParams = await contract.membership_fee_params()

  const tokensApproved = await handleTokenApproval(
    process.env.REACT_APP_CONTRACT_ADDRESS as string,
    Number(feeParams.fee.toString()),
    dispatch
  )

  if (tokensApproved) {
    dispatch(
      openLoader({
        displaytransactionLoader: true,
        text: 'Applying for kyc',
      })
    )
    const result = await handleContractTransaction(
      () => contract.apply_for_membership(region, [data, data]),
      dispatch
    )

    return result
  } else {
    return undefined
  }
}

// Assigning application
const assignMembershipApplication = async (
  address: any,
  region: string,
  dispatch: any
) => {
  const contract = await getContract()

  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Approving Token use',
    })
  )

  const tokensApproved = await handleTokenApproval(
    process.env.REACT_APP_CONTRACT_ADDRESS as string,
    Number('25'),
    dispatch
  )

  if (tokensApproved) {
    dispatch(
      openLoader({
        displaytransactionLoader: true,
        text: 'Assigning Application',
      })
    )
    const result = await handleContractTransaction(
      () => contract.assign_membership_application(address, region, false),
      dispatch
    )

    return result
  } else {
    return undefined
  }
}

// Modify application
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

// Submitting application review
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

  const result = await handleContractTransaction(
    () =>
      contract.submit_membership_application_result(
        address,
        region,
        [link, link],
        decision
      ),
    dispatch
  )

  return result
}

// Concluding application
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

  const result = await handleContractTransaction(
    () => contract.conclude_membership_application(address, region),
    dispatch
  )

  return result
}

// -----------------------------------------------------------------------------------------------------------------------------------------

/**
 *
 * Insure Pro application process
 *
 */

const apply_for_InsurePro = async (
  data: string,
  type: string,
  region: string,
  poolName: string,
  dispatch: any
) => {
  const contract = await getReviewerContract()
  const feeParams = await contract.kyc_reviewer_application_fee_params()

  const poolAddresses = await getPoolAddresses(poolName)
  const policyContract = await getPolicyContract(poolAddresses.policy)
  const policyAddresses = await policyContract.addresses()
  const policyMembersContract = policyAddresses.members

  var fee = Number(feeParams.fee.toString())

  if (type === 'KYC Reviewer') {
    const tokensApproved = await handleTokenApproval(
      process.env.REACT_APP_REVIEWER_CONTRACT_ADDRESS as string,
      fee,
      dispatch
    )

    if (tokensApproved) {
      dispatch(
        openLoader({
          displaytransactionLoader: true,
          text: 'Applying for KYC Reviewer',
        })
      )
      const result = await handleContractTransaction(
        () => contract.apply_for_KYC_reviewer(region, [data, data]),
        dispatch
      )

      return result
    }
  } else if (type === 'Policy Reviewer') {
    var newFee = Number('15')
    const tokensApproved = await handleTokenApproval(
      policyMembersContract as string,
      newFee,
      dispatch
    )

    if (tokensApproved) {
      dispatch(
        openLoader({
          displaytransactionLoader: true,
          text: 'Applying for Policy Reviewer',
        })
      )
      const result = await handleContractTransaction(
        () => contract.apply_for_policy_reviewer(poolName, [data, data]),
        dispatch
      )

      return result
    }
  } else {
    var newFee = Number('25')
    const tokensApproved = await handleTokenApproval(
      policyMembersContract as string,
      newFee,
      dispatch
    )

    if (tokensApproved) {
      dispatch(
        openLoader({
          displaytransactionLoader: true,
          text: 'Applying for Adjustor',
        })
      )
      const result = await handleContractTransaction(
        () => contract.apply_for_adjustor(poolName, [data, data]),
        dispatch
      )

      return result
    }
  }
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
    const result = await handleContractTransaction(
      () =>
        contract.conclude_KYC_reviewer_application(address, region, isApproved),
      dispatch
    )

    return result
  } else if (type === 'Policy Reviewer') {
    const result = await handleContractTransaction(
      () =>
        contract.conclude_policy_reviewer_application(
          poolName,
          address,
          isApproved
        ),
      dispatch
    )

    return result
  } else {
    const result = await handleContractTransaction(
      () =>
        contract.conclude_adjustor_application(poolName, address, isApproved),
      dispatch
    )

    return result
  }
}

const revertMembershipApplication = async (
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

// -----------------------------------------------------------------------------------------------------------------------------------------

/**
 *
 * Getter Functions
 *
 */

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

  const applicant: any = await getUser(address)
  const response = await axios.get(applicant.data as string)
  const kyc_details = await getKycDetails(response.data.address, country)
  var result = addContractState(response.data, kyc_details)
  const userFirebaseDetails = await getUserDetails(address)
  result = { ...result, ...userFirebaseDetails }
  result.id = applicant.id
  return result
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

const getPremiumContractInstance = async (pool: string) => {
  const poolAddresses = await getPoolAddresses(pool)
  const premiumContract = await getPremiumContract(poolAddresses.premium)

  return premiumContract
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

// Claim

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

const getClaimValidationTimeLeft = async (poolName: string, address: any) => {
  const claimAddress = await getClaimAddress(poolName, address)
  const claimContract = await getClaimContract(claimAddress)

  const validationEndTime = await claimContract.claim_end_timestamp()

  // Convert the uint256 value to a Date object (assuming UTC)
  const contractTime = new Date(parseInt(validationEndTime) * 1000)

  // Get the current time (UTC)
  const currentTime = new Date()

  // Calculate the difference in milliseconds
  const timeDifference = contractTime.getTime() - currentTime.getTime()

  console.log('Contract: ', timeDifference)

  // Check if the contract time has ended
  if (timeDifference < 0) {
    return 'validation over'
  } else {
    // Calculate the remaining time in days, hours, minutes, and seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    )
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)
    // Format the remaining time string
    let remainingTime = ''
    if (days > 0) {
      remainingTime += `${days} day${days > 1 ? 's' : ''}, `
    }
    if (hours > 0) {
      remainingTime += `${hours} hr${hours > 1 ? 's' : ''}, `
    }
    if (days <= 0 && hours <= 0) {
      remainingTime += `${minutes} min${minutes > 1 ? 's' : ''}, `
    }
    // if (days <= 0 && hours <= 0 && seconds > 0) {
    //   remainingTime += `${seconds} sec${seconds > 1 ? 's' : ''}, `
    // }
    remainingTime = remainingTime.slice(0, -2) // Remove the trailing comma and space

    console.log(`${remainingTime} left`)
    return `${remainingTime} left`
  }
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

// Stake

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

const getStakeRewards = async (user: string) => {
  const stakingPoolContract = await getStakingPoolContract()

  const stakeReward = await stakingPoolContract.rewards_recieved(user)
  return Number(ethers.formatEther(stakeReward))
}

const getStakeBalance = async (address: string) => {
  const stakingPoolContract = await getStakingPoolContract()

  const balance = await stakingPoolContract.get_stake(address)

  const balanceInEther = ethers.formatEther(balance)
  return balanceInEther
}

// -----------------------------------------------------------------------------------------------------------------------------------------

/**
 *
 * Policy Purchase process
 *
 */

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
  const policyManagerContract = await getPolicyManagerContract()
  const poolAddresses = await getPoolAddresses(pool)
  const policyContract = await getPolicyContract(poolAddresses.policy)
  const policyAddresses = await policyContract.addresses()

  // dispatch(
  //   openLoader({
  //     displaytransactionLoader: true,
  //     text: 'Approving Token use',
  //   })
  // )
  // const fee = ethers.parseEther(amount.toString())

  // await approvePolicyManagement(poolName, fee)
  // dispatch(closeLoader())

  const policyFeeParams = await policyContract.policy_fee_params()
  const policyFee = Number(policyFeeParams.fee)

  const tokensApproved = await handleTokenApproval(
    policyAddresses.management,
    cost + policyFee,
    dispatch
  )

  if (tokensApproved) {
    dispatch(
      openLoader({
        displaytransactionLoader: true,
        text: 'Applying for Policy',
      })
    )

    const result = await handleContractTransaction(
      () =>
        policyManagerContract.apply_for_or_modify_policy(
          pool,
          [data, data],
          durationIndex,
          ethers.parseEther(cost.toString()),
          [
            ethers.parseEther(policyValues.maxExposure.toString()),
            ethers.parseEther(policyValues.src.toString()),
            ethers.parseEther(policyValues.deductiblePerc.toString()),
            ethers.parseEther(policyValues.riskFactor.toString()),
          ]
        ),
      dispatch
    )

    return result
  }
}

const modifyPolicy = async (
  pool: string,
  data: string,
  durationIndex: any,
  dispatch: any
) => {
  const policyManagerContract = await getPolicyManagerContract()

  const result = await handleContractTransaction(
    () =>
      policyManagerContract.modify_policy_application(
        pool,
        [data, data],
        durationIndex
      ),
    dispatch
  )

  return result
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
  const poolAddresses = await getPoolAddresses(poolName)
  const policyContract = await getPolicyContract(poolAddresses.policy)
  const policyAddresses = await policyContract.addresses()

  const fee = Number('25')

  const tokensApproved = await handleTokenApproval(
    policyAddresses.management,
    fee,
    dispatch
  )

  if (tokensApproved) {
    dispatch(
      openLoader({
        displaytransactionLoader: true,
        text: 'Assigning Application',
      })
    )

    const result = await handleContractTransaction(
      () => contract.assign_policy_application(poolName, address, false),
      dispatch
    )

    return result
  }
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

  // const tx =
  // await policyManagementContract.submit_policy_application_result(
  //   address,
  //   reviewerAddress,
  //   // [userData, userData],
  //   // [data, data],
  //   decision,
  //   reviewerAddress
  // )
  // await tx.wait()
  const tx = await handleContractTransaction(
    () =>
      policyManagementContract.submit_policy_application_result(
        address,
        reviewerAddress,
        // [userData, userData],
        // [data, data],
        decision,
        reviewerAddress
      ),
    dispatch
  )

  if (tx) {
    const makeRiskModule = await handleContractTransaction(
      () => policyContract.set_risk_module_address(reviewerAddress),
      dispatch
    )

    // await policyContract.set_risk_module_address(
    //   reviewerAddress
    // )
    // await makeRiskModule.wait()

    if (makeRiskModule) {
      dispatch(
        openLoader({
          displaytransactionLoader: true,
          text: 'Submitting Assesement',
        })
      )

      const submitAssesment = await handleContractTransaction(
        () =>
          policyManagementContract.submit_policy_application_assessment(
            address,
            reviewerAddress,
            policyValues.maxExposure,
            policyValues.src,
            policyValues.deductiblePerc,
            policyValues.riskFactor
          ),
        dispatch
      )

      //   await policyManagementContract.submit_policy_application_assessment(
      //     address,
      //     reviewerAddress,
      //     policyValues.maxExposure,
      //     policyValues.src,
      //     policyValues.deductiblePerc,
      //     policyValues.riskFactor
      //   )
      // await submitAssesment.wait()
      return submitAssesment
    } else {
      return makeRiskModule
    }
  } else {
    return tx
  }
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

  const result = await handleContractTransaction(
    () => policyContract.conclude_policy_assessment(address),
    dispatch
  )

  return result
}

// -----------------------------------------------------------------------------------------------------------------------------------------

/**
 *
 * Redundant / TO be deleted functions
 *
 */
// Token
const approve = async (amount: any, dispatch: any) => {
  const address = await getAddress()
  console.log('address: ', address)
  const contract = await getTokenContract()
  const tokenBalance = await getTokenBalance(address)
  console.log('Token Balance: ', tokenBalance)
  console.log('Amount needed: ', ethers.formatEther(amount))
  if (Number(ethers.formatEther(amount)) > Number(tokenBalance)) {
    dispatch(closeLoader())
    dispatch(
      openAlert({
        displayAlert: true,
        data: {
          id: 2,
          variant: 'Failed',
          classname: 'text-black',
          title: 'Transaction Failed',
          tag1: 'Insufficient balance',
          tag2: 'please buy tokens before proceeding',
        },
      })
    )
    setTimeout(() => {
      dispatch(closeAlert())
    }, 10000)
    return false
  } else {
    try {
      const approvalTx = await contract.approve(
        process.env.REACT_APP_CONTRACT_ADDRESS as string,
        amount
      )

      await approvalTx.wait()
      return true
    } catch (error: any) {
      console.log('Error: ', error)
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
            tag2: 'please try again and confirm the transaction',
          },
        })
      )
      setTimeout(() => {
        dispatch(closeAlert())
      }, 10000)
      return false
    }
  }
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

const approvePolicyManagement = async (pool: string, amount: any) => {
  const tokenContract = await getTokenContract()
  const poolAddresses = await getPoolAddresses(pool)
  const policyContract = await getPolicyContract(poolAddresses.policy)
  const policyAddresses = await policyContract.addresses()

  console.log('Management: ', policyAddresses.management)

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

// Policy Functions

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

// const getUsersClaimAddress = async (poolName: string) => {
//   const addresses = await getPoolAddresses(poolName)

//   const policyContract = await getPolicyContract(addresses.policy)

//   const address = await policyContract.get_policy_claim_address()
//   return address
// }

const approveClaim = async (poolName: string, amount: any, user: string) => {
  const tokenContract = await getTokenContract()
  const address = await getClaimAddress(poolName, user)

  const approvalTx = await tokenContract.approve(address, amount)

  await approvalTx.wait()
}

const approveStakingContract = async (amount: any) => {
  const tokenContract = await getTokenContract()

  const approvalTx = await tokenContract.approve(
    process.env.REACT_APP_STAKING_POOL_CONTRACT_ADDRESS,
    amount
  )

  await approvalTx.wait()
}

// -----------------------------------------------------------------------------------------------------------------------------------------

/**
 *
 * Policy Management
 *
 */

const depositIntoPolicy = async (
  poolName: string,
  depositAmount: number,
  dispatch: any
) => {
  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Depositing Tokens',
    })
  )
  const addresses = await getPoolAddresses(poolName)

  const policyContract = await getPolicyManagementContract(addresses.policy)

  const fee = Number(depositAmount.toString())

  const result = await handleContractTransaction(
    () =>
      policyContract.depositIntoPolicyBalance(
        ethers.parseEther(depositAmount.toString())
      ),
    dispatch
  )

  return result
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
  const poolAddresses = await getPoolAddresses(poolName)
  const policyContract = await getPolicyContract(poolAddresses.policy)
  const policyAddresses = await policyContract.addresses()
  const fee = Number(amount.toString())

  const tokensApproved = await handleTokenApproval(
    policyAddresses.management,
    fee,
    dispatch
  )

  return tokensApproved
}

// -----------------------------------------------------------------------------------------------------------------------------------------

/**
 *
 * Claim process
 *
 */

const raiseClaim = async (
  poolName: string,
  data: string,
  address: string,
  premiumQuote: number,
  dispatch: any
) => {
  const addresses = await getPoolAddresses(poolName)

  const policyContract = await getPolicyContract(addresses.policy)
  const policyAddresses = await policyContract.addresses()

  const policyClaimContract = await getPolicyClaimContract(addresses.policy)

  const minClaim = ethers.parseEther((premiumQuote / 2).toString())
  const maxClaim = ethers.parseEther(premiumQuote.toString())

  const tokensApproved = await handleTokenApproval(
    policyAddresses.claims,
    (premiumQuote * 5) / 100,
    dispatch
  )

  if (tokensApproved) {
    dispatch(
      openLoader({
        displaytransactionLoader: true,
        text: 'Rasising Claim',
      })
    )

    const raiseClaimTx = await handleContractTransaction(
      () =>
        policyClaimContract.raise_claim(
          process.env.REACT_APP_CLAIMS_TABLE_CONTRACT_ADDRESS,
          policyAddresses.members,
          [minClaim, maxClaim],
          [data, data],
          poolName,
          address
        ),
      dispatch
    )

    return raiseClaimTx
  }
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
  const fee = Number('250')

  const tokensApproved = await handleTokenApproval(
    claimContractAddress,
    fee,
    dispatch
  )

  if (tokensApproved) {
    dispatch(
      openLoader({
        displaytransactionLoader: true,
        text: 'Assigning Adjustor',
      })
    )
    const result = await handleContractTransaction(
      () => claimContract.assign_adjustor(),
      dispatch
    )
    return result
  }
}

const submitClaimAssesment = async (
  poolName: string,
  claimantAddress: string,
  decision: boolean,
  amount: string,
  data: string,
  dispatch: any
) => {
  const claimContractAddress = await getClaimAddress(poolName, claimantAddress)
  const claimContract = await getClaimContract(claimContractAddress)

  const approved_payout = ethers.parseEther(amount)

  const result = await handleContractTransaction(
    () =>
      claimContract.submit_adjustor_assessment(decision, approved_payout, data),
    dispatch
  )
  return result
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

  const result = await handleContractTransaction(
    () =>
      claimContract.submit_claimant_assessment_decision(
        claimantAddress,
        decision,
        rating
      ),
    dispatch
  )
  return result
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
  const claimContractAddress = await getClaimAddress(poolName, claimantAddress)

  const stakeEther = Number(stake)

  ethers.parseEther(stake)

  const tokensApproved = await handleTokenApproval(
    claimContractAddress,
    stakeEther,
    dispatch
  )

  if (tokensApproved) {
    dispatch(
      openLoader({
        displaytransactionLoader: true,
        text: 'Validating Claim',
      })
    )

    const result = await handleContractTransaction(
      () =>
        UserManagerContract.validate(
          poolName,
          claimantAddress,
          ethers.parseEther(stake),
          rating,
          decision
        ),
      dispatch
    )

    return result
  }
}

// -----------------------------------------------------------------------------------------------------------------------------------------

/**
 *
 * Staking process
 *
 */

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

  const result = await handleContractTransaction(
    () => stakingPoolContract.stake(stakeEther, duration),
    dispatch
  )
  return result
}

const unstake = async (stakeId: number, dispatch: any, network?: string) => {
  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Unstaking',
    })
  )

  const stakingPoolContract = await getStakingPoolContract()

  const result = await handleContractTransaction(
    () => stakingPoolContract.unstake(stakeId),
    dispatch
  )
  return result
}

const approveKoverToStake = async (amount: string, dispatch: any) => {
  dispatch(
    openLoader({
      displaytransactionLoader: true,
      text: 'Approving Token Use',
    })
  )
  const stakeEther = Number(amount)
  const approved = await handleTokenApproval(
    process.env.REACT_APP_STAKING_POOL_CONTRACT_ADDRESS as string,
    stakeEther,
    dispatch
  )
  return approved
}

// -----------------------------------------------------------------------------------------------------------------------------------------

// Exports

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
  getStakeRewards,
  getClaimValidationTimeLeft,
}
