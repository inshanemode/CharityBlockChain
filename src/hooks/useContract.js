import { useState } from 'react';
import { ethers } from 'ethers';
import CharityABI from '../artifacts/contracts/Charity.sol/Charity.json';
import { formatAddress } from '../data/mockData';

/**
 * useContract Hook - Real smart contract interactions (Ethers.js)
 * 
 * Features:
 * - Get campaign info
 * - Donate to campaign
 * - Get transaction history from events
 */

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

const getProvider = () => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }
  return new ethers.providers.Web3Provider(window.ethereum);
};

const getContract = (providerOrSigner) => {
  if (!CONTRACT_ADDRESS) {
    throw new Error('Contract address is not configured');
  }
  return new ethers.Contract(CONTRACT_ADDRESS, CharityABI.abi, providerOrSigner);
};

const formatCampaign = (campaign) => ({
  id: campaign.id.toNumber(),
  title: campaign.name,
  description: `Campaign by ${formatAddress(campaign.creator)}`,
  creator: campaign.creator,
  goal: parseFloat(ethers.utils.formatEther(campaign.goal)),
  raised: parseFloat(ethers.utils.formatEther(campaign.totalDonations)),
  isActive: campaign.isActive,
  status: campaign.isActive ? 'active' : 'closed',
  contractAddress: CONTRACT_ADDRESS,
});

const useContract = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get campaign info by ID
  const getCampaignInfo = async (campaignId) => {
    setLoading(true);
    setError(null);

    try {
      if (!campaignId) {
        throw new Error('Campaign ID required');
      }

      const provider = getProvider();
      const contract = getContract(provider);
      const campaign = await contract.campaigns(campaignId);

      if (!campaign || campaign.id.toNumber() === 0) {
        throw new Error('Campaign not found');
      }

      setLoading(false);
      return {
        success: true,
        data: formatCampaign(campaign),
      };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return {
        success: false,
        error: err.message,
      };
    }
  };

  // Donate to campaign - Main transaction function
  const donate = async ({ campaignId, amount }) => {
    setLoading(true);
    setError(null);

    try {
      if (!campaignId) {
        throw new Error('Campaign ID required');
      }
      if (!amount || amount <= 0) {
        throw new Error('Invalid donation amount');
      }

      const provider = getProvider();
      const signer = provider.getSigner();
      const contract = getContract(signer);

      const txResponse = await contract.donate(campaignId, {
        value: ethers.utils.parseEther(amount.toString()),
      });

      setLoading(false);
      return {
        success: true,
        txResponse,
      };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return {
        success: false,
        error: err.message,
      };
    }
  };

  // Get transactions for a campaign
  const getTransactions = async (campaignId) => {
    setLoading(true);
    setError(null);

    try {
      const provider = getProvider();
      const contract = getContract(provider);

      const currentBlock = await provider.getBlockNumber();
      const fromBlock = Math.max(currentBlock - 5000, 0);
      const events = await contract.queryFilter(contract.filters.DonationReceived(), fromBlock, 'latest');
      const filteredEvents = events.filter((event) => event.args?.campaignId?.toNumber() === Number(campaignId));

      const transactions = await Promise.all(
        filteredEvents.map(async (event) => {
          const block = await provider.getBlock(event.blockNumber);
          const receipt = await provider.getTransactionReceipt(event.transactionHash);
          const gasFee = receipt && receipt.effectiveGasPrice
            ? parseFloat(ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice)))
            : 0;

          return {
            hash: event.transactionHash,
            from: event.args?.donor,
            amount: parseFloat(ethers.utils.formatEther(event.args?.amount || 0)),
            timestamp: block ? new Date(block.timestamp * 1000).toISOString() : new Date().toISOString(),
            status: receipt?.status === 1 ? 'success' : 'failed',
            blockNumber: event.blockNumber,
            gasFee,
          };
        })
      );

      setLoading(false);
      return {
        success: true,
        data: transactions,
      };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return {
        success: false,
        error: err.message,
      };
    }
  };

  // Get all campaigns with updated data
  const getAllCampaigns = async () => {
    setLoading(true);
    setError(null);

    try {
      const provider = getProvider();
      const contract = getContract(provider);
      const campaignCount = await contract.campaignCount();
      const count = campaignCount.toNumber();

      const campaigns = [];
      for (let i = 1; i <= count; i++) {
        const campaign = await contract.campaigns(i);
        if (campaign && campaign.id.toNumber() > 0) {
          campaigns.push(formatCampaign(campaign));
        }
      }

      setLoading(false);
      return {
        success: true,
        data: campaigns,
      };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return {
        success: false,
        error: err.message,
      };
    }
  };

  // Estimate gas fee for donation
  const estimateGas = async ({ campaignId, amount }) => {
    const provider = getProvider();
    const signer = provider.getSigner();
    const contract = getContract(signer);
    const gasEstimate = await contract.estimateGas.donate(campaignId, {
      value: ethers.utils.parseEther(amount.toString()),
    });
    const feeData = await provider.getFeeData();
    const gasFeeWei = gasEstimate.mul(feeData.maxFeePerGas || feeData.gasPrice || 0);
    return {
      gasLimit: gasEstimate.toString(),
      fee: parseFloat(ethers.utils.formatEther(gasFeeWei)),
    };
  };

  return {
    loading,
    error,
    getCampaignInfo,
    donate,
    getTransactions,
    getAllCampaigns,
    estimateGas,
  };
};

export default useContract;
