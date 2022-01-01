import React, { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { contractAbi, contractAddress } from "../utils/constants";

export const ElectionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(contractAddress, contractAbi, signer);

  return contract;
};

export const ElectionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [candidates, setCandidates] = useState([]);

  const getCandidates = async () => {
    try {
      if (ethereum) {
        const contract = getEthereumContract();
        const candidates = await contract.getAllCandidates();
        setCandidates(candidates);
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object");
    }
  };

  const checkIfConnected = async () => {
    try {
      if (!ethereum) return alert("Install Metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        console.log(accounts[0]);
        setCurrentAccount(accounts[0]);
        getCandidates();
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object found");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object");
    }
  };

  const voteCandidate = async (candidateId) => {
    try {
      if (ethereum) {
        const contract = getEthereumContract();
        contract.vote(candidateId);
      }
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object");
    }
  };

  const addCandidate = async (candidateName) => {
    try {
      if (ethereum) {
        const contract = getEthereumContract();
        contract.addCandidate(candidateName);
      }
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfConnected();
  }, []);

  return (
    <ElectionContext.Provider
      value={{
        currentAccount,
        connectWallet,
        candidates,
        voteCandidate,
        addCandidate,
      }}
    >
      {children}
    </ElectionContext.Provider>
  );
};
