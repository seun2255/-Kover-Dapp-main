import { Database } from '@tableland/sdk'
import { ethers } from 'ethers'
import { convertJsonStringToObject } from './utils/helpers'

//Localhost
// const usersTableName = ' kover_finance_31337_2'
const usersTableName = 'kover_finance_421614_468'

//mumbai
// const usersTableName = "libra_80001_7661";
// const communitiesTableName = "libra_communities_80001_7662";

const createTable = async (signer: any) => {
  const db = new Database({ signer })

  // This is the table's `prefix`--a custom table value prefixed as part of the table's name
  const prefix = 'kover_finance'
  const { meta: create } = await db
    .prepare(`CREATE TABLE ${prefix} (address text primary key, data text);`)
    .run()
  await create.txn?.wait()

  // The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
  const tableName = create.txn?.names[0] ?? ''
  console.log(tableName)
}

const getAllUsers = async () => {
  const db = new Database()
  const { results } = await db.prepare(`SELECT * FROM ${usersTableName};`).all()
  return results
}

const get_membership_appliants = async (addresses: any[]) => {
  const db = new Database()
  // const address = userAddress.toLowerCase()
  const { results } = await db
    .prepare(
      `SELECT * FROM ${usersTableName} WHERE address IN (${addresses
        .map((addr) => `"${addr.toLowerCase()}"`)
        .join(', ')});`
    )
    .all()
  return results
}

const getUser = async (userAddress: string) => {
  const db = new Database()
  const address = userAddress.toLowerCase()
  const { results } = await db
    .prepare(
      `SELECT * FROM ${usersTableName} WHERE address = "${address.toLowerCase()}";`
    )
    .all()
  console.log(results)
  return results
}

const createUser = async (userAddress: any, userData: string, signer: any) => {
  console.log(userAddress)
  try {
    const db = new Database({ signer })
    const address = userAddress.toLowerCase()
    const { meta: insert } = await db
      .prepare(`INSERT INTO ${usersTableName} (address, data) VALUES (?, ?);`)
      .bind(address, userData)
      .run()
  } catch {
    console.log('')
  }
}

// const getAllCommunities = async () => {
//   const db = new Database();
//   const { results } = await db
//     .prepare(`SELECT * FROM ${communitiesTableName};`)
//     .all();
//   return results;
// };

// const getMyFiles = async (userAddress) => {
//   const db = new Database();
//   const address = userAddress.toString();
//   console.log(address.toLowerCase());
//   const { results } = await db
//     .prepare(
//       `SELECT * FROM ${usersTableName} WHERE address = "${address.toLowerCase()}";`
//     )
//     .all();
//   console.log(results);
//   return results;
// };

// const getCommunity = async (id) => {
//   var data;
//   const db = new Database();
//   const community = await db
//     .prepare(`SELECT * FROM ${communitiesTableName} WHERE id = "${id}";`)
//     .all();
//   const tableName = community.results[0].files;
//   console.log(tableName);

//   const communityFiles = await db.prepare(`SELECT * FROM ${tableName};`).all();
//   console.log(communityFiles.results);
//   data = community.results[0];
//   data.files = communityFiles.results;
//   return data;
// };

export {
  getAllUsers,
  getUser,
  createUser,
  createTable,
  get_membership_appliants,
}
