import { ethers } from "hardhat";

async function main() {
  // Compile the contract
  const Voting = await ethers.getContractFactory("Voting");
  const options = [
    "Distracted Boyfriend",
    "One Does Not Simply",
    "Mocking Spongebob",
    "Two Buttons",
    "Change My Mind",
    "Surprised Pikachu",
    "Expanding Brain",
    "Unsettled Tom",
    "Drake Hotline Bling",
    "Ancient Aliens"
  ];
  const voting = await Voting.deploy(options);

  // Wait for the contract to be deployed
  await voting.deployed();

  // Print the contract address
  console.log("Contract deployment: Voting Contract");
  console.log("Contract deployed to:", voting.address);
  console.log("Transaction hash:", voting.deployTransaction.hash);
  console.log("Contract options:", options)
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