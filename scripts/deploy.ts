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

  // Vote for an option
  const optionIndex = 0;
  const signer = (await ethers.getSigners())[0];
  await voting.connect(signer).vote(optionIndex);

  // Print the updated vote counts
  console.log("Vote counts:");
  for (let i = 0; i < options.length; i++) {
    const option = await voting.options(i);
    console.log(`${option.name}: ${option.count}`);
  }
}

// Run the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });