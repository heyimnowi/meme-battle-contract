import { ethers } from "hardhat";

const OPTION_NAMES = [
  "Distracted Boyfriend",
  "One Does Not Simply",
  "Two Buttons",
  "Change My Mind",
  "Expanding Brain",
  "Drake Hotline Bling"
];

const EXPIRE_DATE = new Date(Date.UTC(2023, 4, 15)).getTime();

async function main() {
  // Compile the contract
  const Voting = await ethers.getContractFactory("Voting");

  const voting = await Voting.deploy(OPTION_NAMES, EXPIRE_DATE);

  // Wait for the contract to be deployed
  await voting.deployed();

  // Print the contract address
  console.log("Contract deployment: Voting Contract");
  console.log("Contract deployed to:", voting.address);
  console.log("Transaction hash:", voting.deployTransaction.hash);
  console.log("Contract options:", OPTION_NAMES)
  console.log("From:", await voting.deployTransaction.from)
  console.log("Gas used by deployment:", await voting.deployTransaction.gasLimit.toString())
  console.log("Block number:", await voting.deployTransaction.blockNumber)
}

// Run the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });