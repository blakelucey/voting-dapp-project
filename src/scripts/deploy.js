const { ethers } = require("hardhat");


async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  const VotingContract = await ethers.getContractFactory("Lock", provider);
  const proposalNames = ["1", "2", "3"];

  console.log("Debug proposalNames: ", proposalNames);
  const contract = await VotingContract.deploy(proposalNames);
  await contract.deployed();
  console.log("VotingContract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
