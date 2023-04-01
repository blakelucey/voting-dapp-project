import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  Typography,
  Button,
  Container,
  ThemeProvider,
  createTheme,
  Stack,
} from "@mui/material";
import VotingContract from "../../bin/src/contracts/VotingContract.json";

const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"; // Replace with your contract address
const contractAbi = VotingContract.abi;

interface Proposal {
  id: number;
  title: string;
  description: string;
}

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0f0",
    },
    background: {
      default: "#111111",
      paper: "#212121",
    },
  },
  typography: {
    fontFamily: "Open Sans",
    h1: {
      fontFamily: "Ubuntu Mono",
    },
    h2: {
      fontFamily: "Ubuntu Mono",
    },
    h3: {
      fontFamily: "Ubuntu Mono",
    },
    h4: {
      fontFamily: "Ubuntu Mono",
    },
    h6: {
      fontFamily: "Ubuntu Mono",
    },
    h5: {
      fontFamily: "Ubuntu Mono",
    },
    subtitle1: {
      fontFamily: "Ubuntu Mono",
    },
    subtitle2: {
      fontFamily: "Ubuntu Mono",
    },
    button: {
      fontFamily: "Ubuntu Mono",
      fontWeight: 900,
    },
    overline: {
      fontFamily: "Ubuntu Mono",
    },
  },
});

function VotingApp() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [selectedProposal, setSelectedProposal] = useState<number>(0);
  const [voted, setVoted] = useState<boolean>(false);
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    async function fetchProviderAndData() {
      if (
        typeof window !== "undefined" &&
        typeof window.ethereum !== "undefined"
      ) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log("provider: ", provider);
        setProvider(provider);
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          provider
        );
        const proposalCount = await contract.getProposalCount();
        console.log("proposalCount: ", proposalCount.toString());
        const proposals = [];
        for (let i = 1; i <= proposalCount; i++) {
          const proposal = await contract.functions.proposals(i);
          console.log("proposal: ", proposal);
          proposals.push({
            id: i,
            title: proposal.title,
            description: proposal.description,
          });
        }
        console.log("proposals: ", proposals);
        setProposals(proposals);
      }
    }

    fetchProviderAndData();
  }, []);

  console.log("This has been read!");

  async function handleVote() {
    if (provider) {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      const transaction = await contract.functions.vote(selectedProposal);
      await transaction.wait();
      console.log("voted: ", voted);
      setVoted(true);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Stack spacing={2}>
          <Typography variant="h1" align="center">
            Voting App
          </Typography>
          {proposals.map((proposal) => (
            <div key={proposal.id}>
              <Typography variant="h3">{proposal.title}</Typography>
              <Typography variant="body1">{proposal.description}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setSelectedProposal(proposal.id)}
              >
                {selectedProposal === proposal.id ? "Selected" : "Select"}
              </Button>
            </div>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={handleVote}
            disabled={!selectedProposal || voted}
          >
            Vote
          </Button>
          {voted && (
            <Typography variant="h5" align="center">
              Thank you for voting!
            </Typography>
          )}
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default VotingApp;
