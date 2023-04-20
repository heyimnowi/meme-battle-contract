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
  console.log("Voting contract deployed to:", voting.address);
}

// Run the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });