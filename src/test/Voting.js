const { ethers } = require("hardhat");

describe("VotingContract", function() {
  it("Should deploy and return contract address", async function() {
    const voting_contract = await ethers.getContractFactory("VotingContract");
    const voting_contract_deploy = await voting_contract.deploy(["Proposal A", "Proposal B"]);
    await voting_contract_deploy.deployed();
    console.log("Deploying VotingContract...");
    console.log("VotingContract deployed to:", voting_contract_deploy.address);
  });
});
