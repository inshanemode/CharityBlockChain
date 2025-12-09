import { useState, useEffect } from 'react';

/**
 * useWallet Hook - Mock wallet connection và management
 * 
 * Features:
 * - Connect/Disconnect wallet
 * - Mock address generation
 * - Mock balance (random 1-10 ETH)
 * - Send transaction simulation
 */

const useWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);

  // Check if wallet was previously connected (from localStorage)
  useEffect(() => {
    const savedAddress = localStorage.getItem('mockWalletAddress');
    const savedBalance = localStorage.getItem('mockWalletBalance');
    
    if (savedAddress) {
      setAddress(savedAddress);
      setBalance(parseFloat(savedBalance) || 0);
      setIsConnected(true);
    }
  }, []);

  // Connect wallet - Mock MetaMask connection
  const connectWallet = async () => {
    setIsConnecting(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Generate mock address
      const mockAddress = generateMockAddress();
      const mockBalance = generateMockBalance();
      
      setAddress(mockAddress);
      setBalance(mockBalance);
      setIsConnected(true);
      
      // Save to localStorage
      localStorage.setItem('mockWalletAddress', mockAddress);
      localStorage.setItem('mockWalletBalance', mockBalance.toString());
      
      setIsConnecting(false);
      return { success: true, address: mockAddress };
    } catch (error) {
      setIsConnecting(false);
      return { success: false, error: error.message };
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAddress(null);
    setBalance(0);
    setIsConnected(false);
    
    // Clear localStorage
    localStorage.removeItem('mockWalletAddress');
    localStorage.removeItem('mockWalletBalance');
  };

  // Get balance - Refresh balance
  const getBalance = async () => {
    if (!isConnected) return 0;
    
    // Simulate network call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newBalance = generateMockBalance();
    setBalance(newBalance);
    localStorage.setItem('mockWalletBalance', newBalance.toString());
    
    return newBalance;
  };

  // Send transaction - Mock transaction
  const sendTransaction = async ({ to, amount, message }) => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    if (amount > balance) {
      throw new Error('Insufficient balance');
    }

    // Simulate transaction processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate mock transaction hash
    const txHash = generateMockTxHash();
    const blockNumber = Math.floor(Math.random() * 1000000) + 18000000;
    const gasUsed = (Math.random() * 0.005 + 0.001).toFixed(6);

    // Update balance
    const newBalance = balance - amount - parseFloat(gasUsed);
    setBalance(newBalance);
    localStorage.setItem('mockWalletBalance', newBalance.toString());

    return {
      success: true,
      txHash,
      blockNumber,
      amount,
      gasUsed,
      to,
      message,
      timestamp: new Date().toISOString(),
    };
  };

  // Switch network (mock)
  const switchNetwork = async (networkName) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, network: networkName };
  };

  return {
    isConnected,
    address,
    balance,
    isConnecting,
    connectWallet,
    disconnectWallet,
    getBalance,
    sendTransaction,
    switchNetwork,
  };
};

// Helper: Generate mock Ethereum address
const generateMockAddress = () => {
  const chars = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
};

// Helper: Generate mock balance (1-10 ETH)
const generateMockBalance = () => {
  return parseFloat((Math.random() * 9 + 1).toFixed(4));
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

export default useWallet;
