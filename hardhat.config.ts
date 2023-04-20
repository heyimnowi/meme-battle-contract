import { HardhatUserConfig, task } from "hardhat/config";
import { config as dotenvConfig } from "dotenv";
import "@nomicfoundation/hardhat-toolbox";

dotenvConfig();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
      console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      // This value will be replaced on runtime
      url: process.env.STAGING_QUICKNODE_KEY,
      accounts: [process.env.PRIVATE_KEY as string],
    },
    mainnet: {
      url: process.env.PRODUCTION_QUICKNODE_KEY,
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
};

export default config;
