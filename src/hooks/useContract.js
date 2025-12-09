import { useState } from 'react';
import { campaigns } from '../data/mockData';

/**
 * useContract Hook - Mock smart contract interactions
 * 
 * Features:
 * - Get campaign info
 * - Donate to campaign
 * - Get transaction history
 * - Mock blockchain delays
 */

const useContract = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get campaign info by ID
  const getCampaignInfo = async (campaignId) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate blockchain read delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const campaign = campaigns.find(c => c.id === campaignId);
      
      if (!campaign) {
        throw new Error('Campaign not found');
      }

      setLoading(false);
      return {
        success: true,
        data: campaign,
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
  const donate = async ({ campaignId, amount, message, gasSpeed = 'normal' }) => {
    setLoading(true);
    setError(null);

    try {
      // Validate inputs
      if (!campaignId) {
        throw new Error('Campaign ID required');
      }
      if (!amount || amount <= 0) {
        throw new Error('Invalid donation amount');
      }

      // Get campaign
      const campaign = campaigns.find(c => c.id === campaignId);
      if (!campaign) {
        throw new Error('Campaign not found');
      }

      // Calculate gas fee based on speed
      const gasFees = {
        slow: 0.001,
        normal: 0.002,
        fast: 0.004,
      };
      const gasFee = gasFees[gasSpeed] || gasFees.normal;

      // Simulate transaction mining delay
      const miningTimes = {
        slow: 5000,   // 5 seconds
        normal: 3000, // 3 seconds
        fast: 1500,   // 1.5 seconds
      };
      await new Promise(resolve => setTimeout(resolve, miningTimes[gasSpeed] || 3000));

      // Generate mock transaction result
      const txHash = generateMockTxHash();
      const blockNumber = Math.floor(Math.random() * 1000000) + 18000000;
      const timestamp = new Date().toISOString();

      // Create transaction receipt
      const receipt = {
        success: true,
        txHash,
        blockNumber,
        campaignId,
        campaignTitle: campaign.title,
        amount,
        gasFee,
        total: amount + gasFee,
        message: message || '',
        timestamp,
        status: 'confirmed',
      };

      setLoading(false);
      return receipt;
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
      // Simulate blockchain read delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock transactions data
      const mockTransactions = generateMockTransactions(campaignId);

      setLoading(false);
      return {
        success: true,
        data: mockTransactions,
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
      // Simulate blockchain read delay
      await new Promise(resolve => setTimeout(resolve, 1200));

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

  // Estimate gas fee
  const estimateGas = async (amount, gasSpeed = 'normal') => {
    // Simulate estimation delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const baseFees = {
      slow: 0.001,
      normal: 0.002,
      fast: 0.004,
    };

    const estimatedTimes = {
      slow: '~5 mins',
      normal: '~2 mins',
      fast: '~30 secs',
    };

    return {
      fee: baseFees[gasSpeed] || baseFees.normal,
      time: estimatedTimes[gasSpeed] || estimatedTimes.normal,
      speed: gasSpeed,
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

// Helper: Generate mock transaction hash
const generateMockTxHash = () => {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
};

// Helper: Generate mock transactions for a campaign
const generateMockTransactions = (campaignId) => {
  const count = Math.floor(Math.random() * 5) + 3; // 3-7 transactions
  const transactions = [];

  for (let i = 0; i < count; i++) {
    transactions.push({
      hash: generateMockTxHash(),
      from: generateMockAddress(),
      amount: parseFloat((Math.random() * 2 + 0.01).toFixed(4)),
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'confirmed',
    });
  }

  return transactions;
};

// Helper: Generate mock address
const generateMockAddress = () => {
  const chars = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
};

export default useContract;
