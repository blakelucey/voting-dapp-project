import { ethers } from "ethers";

const axios = require("axios");
const VotingContract = require("./contracts/VotingContract.sol");

const contractAddress = "0x..."; // Replace with your contract address
const contractAbi = VotingContract.abi;

async function getProposalCount() {
  const contract = axios.create({
    baseURL: `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
  });
  const instance = contract.getContract(contractAddress, contractAbi);
  const proposalCount = await instance.getProposalCount();
  return proposalCount.toNumber();
}

async function getProposal(proposalId: any) {
  const contract = axios.create({
    baseURL: `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
  });
  const instance = contract.getContract(contractAddress, contractAbi);
  const proposal = await instance.getProposal(proposalId);
  return proposal;
}

async function vote(proposalId: any, accountPrivateKey: any) {
  const provider = new ethers.providers.InfuraProvider(
    "ropsten",
    process.env.INFURA_PROJECT_ID
  );
  const wallet = new ethers.Wallet(accountPrivateKey, provider);
  const contract = new ethers.Contract(contractAddress, contractAbi, wallet);
  const tx = await contract.vote(proposalId);
  await tx.wait();
}

module.exports = { getProposalCount, getProposal, vote };
