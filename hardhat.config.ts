import { HardhatUserConfig, task } from "hardhat/config";
import { config as dotenvConfig } from "dotenv";
import "@nomiclabs/hardhat-waffle";

dotenvConfig();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
      console.log(account.address);
  }
});

const { API_KEY, ENDPOINT_URL, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  networks: {
    sepolia: {
      url: ENDPOINT_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  solidity: {
    version: "0.8.18",
  },
  defaultNetwork: "sepolia"
};

export default config;
