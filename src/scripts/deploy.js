const { ethers } = require("hardhat");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  const VotingContract = await ethers.getContractFactory("Lock", provider);
  

  // Pass an array of string values to the constructor
  // const proposalOne = "1";
  // const proposalTwo = "2";
  // const proposalThree = "3";


  console.log("Debug proposalNames: ");
  const gasLimit = 2000000; // Set the gasLimit to 2 million
  const contract = await VotingContract.deploy("1", { gasLimit });
  await contract.deployed();
  console.log("VotingContract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
