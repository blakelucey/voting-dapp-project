import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Typography, Button } from "@mui/material";
import VotingContract from "../../bin/src/contracts/VotingContract.json";

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; // Replace with your contract address
const contractAbi = VotingContract.abi;

function VotingApp() {
  const [proposals, setProposals]: any = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [voted, setVoted] = useState(false);

  let provider: any;
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  }

  useEffect(() => {
    async function fetchData() {
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        provider
      );
      const proposalCount = await contract.getProposalCount();
      const proposals = [];
      for (let i = 0; i < proposalCount; i++) {
        const proposal = await contract.getProposal(i);
        proposals.push(proposal);
      }
      setProposals(proposals);
    }
    fetchData();
  }, [provider]);

  async function handleVote() {
    const contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      provider.getSigner()
    );
    await contract.vote(selectedProposal);
    setVoted(true);
  }

  return (
    <div>
      <Typography>Voting App</Typography>
      {proposals.map((proposal: any) => (
        <div key={proposal.id}>
          <Typography>{proposal.title}</Typography>
          <Typography>{proposal.description}</Typography>
          <Button onClick={() => setSelectedProposal(proposal.id)}>Vote</Button>
        </div>
      ))}
      {selectedProposal && (
        <div>
          <Typography>Selected Proposal: {selectedProposal}</Typography>
          <Button onClick={handleVote} disabled={voted}>
            Vote
          </Button>
          {voted && (
            <Typography>
              You have successfully voted for proposal {selectedProposal}
            </Typography>
          )}
        </div>
      )}
    </div>
  );
}

export default VotingApp;
