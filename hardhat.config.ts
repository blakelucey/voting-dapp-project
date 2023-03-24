import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  // networks: {
  //   localhost: {
  //     url: "http://localhost:8545", // URL to your local node
  //     chainId: 1337, // The network ID for your local network
  //   },
  // },
  solidity: "0.8.18",
};

export default config;
