import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

/**
 * useWallet Hook - Real MetaMask Integration with Ethers.js
 * 
 * Features:
 * - Connect/Disconnect wallet via MetaMask
 * - Real ETH balance fetching
 * - Real transaction sending
 * - Auto-update on account/chain changes
 * - Network switching
 */

const useWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [chainId, setChainId] = useState(null);
  const [error, setError] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  };

  // Initialize provider
  const initProvider = useCallback(() => {
    if (isMetaMaskInstalled()) {
      const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(ethersProvider);
      return ethersProvider;
    }
    return null;
  }, []);

  // Get balance using Ethers.js
  const getBalance = useCallback(async (walletAddress = address) => {
    if (!walletAddress) return 0;

    try {
      const ethersProvider = provider || initProvider();
      if (!ethersProvider) return 0;

      const balanceWei = await ethersProvider.getBalance(walletAddress);
      const balanceEth = parseFloat(ethers.utils.formatEther(balanceWei));
      setBalance(balanceEth);
      return balanceEth;
    } catch (err) {
      console.error('Error fetching balance:', err);
      setError(err.message);
      return 0;
    }
  }, [address, provider, initProvider]);

  // Handle account changes
  const handleAccountsChanged = useCallback(async (accounts) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      setAddress(null);
      setBalance(0);
      setIsConnected(false);
      localStorage.removeItem('walletConnected');
    } else {
      const newAddress = accounts[0];
      setAddress(newAddress);
      setIsConnected(true);
      localStorage.setItem('walletConnected', 'true');
      await getBalance(newAddress);
    }
  }, [getBalance]);

  // Handle chain changes
  const handleChainChanged = useCallback((newChainId) => {
    setChainId(newChainId);
    // Reload the page as recommended by MetaMask
    window.location.reload();
  }, []);

  // Setup event listeners
  useEffect(() => {
    if (!isMetaMaskInstalled()) return;

    initProvider();

    // Add event listeners
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    // Check if already connected
    const checkConnection = async () => {
      const wasConnected = localStorage.getItem('walletConnected');
      if (wasConnected === 'true') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAddress(accounts[0]);
            setIsConnected(true);
            await getBalance(accounts[0]);
            
            const network = await provider?.getNetwork();
            if (network) {
              setChainId('0x' + network.chainId.toString(16));
            }
          }
        } catch (err) {
          console.error('Error checking connection:', err);
        }
      }
    };

    checkConnection();

    // Cleanup listeners
    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [handleAccountsChanged, handleChainChanged, getBalance, initProvider, provider]);

  // Connect wallet - Real MetaMask connection
  const connectWallet = async () => {
    setError(null);
    
    // Check if MetaMask is installed
    if (!isMetaMaskInstalled()) {
      const errorMsg = 'MetaMask is not installed. Please install MetaMask extension.';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }

    setIsConnecting(true);

    try {
      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      if (accounts.length > 0) {
        const userAddress = accounts[0];
        setAddress(userAddress);
        setIsConnected(true);
        localStorage.setItem('walletConnected', 'true');

        // Initialize provider and signer
        const ethersProvider = initProvider();
        const ethersSigner = ethersProvider.getSigner();
        setSigner(ethersSigner);

        // Get network
        const network = await ethersProvider.getNetwork();
        setChainId('0x' + network.chainId.toString(16));

        // Get balance
        await getBalance(userAddress);

        setIsConnecting(false);
        return { success: true, address: userAddress };
      } else {
        throw new Error('No accounts found');
      }
    } catch (err) {
      setIsConnecting(false);
      
      let errorMsg = err.message;
      if (err.code === 4001) {
        errorMsg = 'User rejected the connection request';
      } else if (err.code === -32002) {
        errorMsg = 'Connection request already pending. Please open MetaMask.';
      }
      
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // Disconnect wallet (local state only - MetaMask doesn't have disconnect API)
  const disconnectWallet = () => {
    setAddress(null);
    setBalance(0);
    setIsConnected(false);
    setChainId(null);
    setError(null);
    setSigner(null);
    localStorage.removeItem('walletConnected');
  };

  // Send transaction - Real MetaMask transaction
  const sendTransaction = async ({ to, amount, data = '' }) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    if (!isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed');
    }

    try {
      const ethersProvider = provider || initProvider();
      if (!ethersProvider) {
        throw new Error('Provider not initialized');
      }

      const ethersSigner = signer || ethersProvider.getSigner();

      // Prepare transaction
      const tx = {
        to: to,
        value: ethers.utils.parseEther(amount.toString()),
      };

      if (data) {
        tx.data = data;
      }

      // Send transaction via MetaMask
      const txResponse = await ethersSigner.sendTransaction(tx);

      // Wait for transaction to be mined
      const receipt = await txResponse.wait();

      // Refresh balance after transaction
      await getBalance();

      const gasUsedEth = ethers.utils.formatEther(
        receipt.gasUsed.mul(receipt.effectiveGasPrice)
      );

      return {
        success: true,
        txHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
        amount: amount,
        gasUsed: parseFloat(gasUsedEth).toFixed(6),
        to: to,
        timestamp: new Date().toISOString(),
        status: receipt.status === 1 ? 'success' : 'failed',
      };
    } catch (err) {
      let errorMsg = err.message;
      if (err.code === 4001 || err.code === 'ACTION_REJECTED') {
        errorMsg = 'Transaction rejected by user';
      } else if (err.code === 'INSUFFICIENT_FUNDS') {
        errorMsg = 'Insufficient funds for transaction';
      }
      
      throw new Error(errorMsg);
    }
  };

  // Switch network
  const switchNetwork = async (chainIdHex) => {
    if (!isMetaMaskInstalled()) {
      return { success: false, error: 'MetaMask is not installed' };
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      });
      return { success: true };
    } catch (err) {
      // Chain not added to MetaMask
      if (err.code === 4902) {
        return { success: false, error: 'Please add this network to MetaMask first' };
      }
      return { success: false, error: err.message };
    }
  };

  // Add network to MetaMask
  const addNetwork = async (networkParams) => {
    if (!isMetaMaskInstalled()) {
      return { success: false, error: 'MetaMask is not installed' };
    }

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [networkParams],
      });
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Get network name from chain ID
  const getNetworkName = () => {
    const networks = {
      '0x1': 'Ethereum Mainnet',
      '0x5': 'Goerli Testnet',
      '0xaa36a7': 'Sepolia Testnet',
      '0x89': 'Polygon Mainnet',
      '0x13881': 'Mumbai Testnet',
      '0x38': 'BSC Mainnet',
      '0x61': 'BSC Testnet',
      '0x539': 'Localhost 8545',
      '0x7a69': 'Hardhat',
    };
    return networks[chainId] || `Chain ID: ${chainId}`;
  };

  return {
    // State
    isConnected,
    address,
    balance,
    isConnecting,
    chainId,
    error,
    provider,
    signer,
    
    // Methods
    connectWallet,
    disconnectWallet,
    getBalance,
    sendTransaction,
    switchNetwork,
    addNetwork,
    
    // Helpers
    isMetaMaskInstalled,
    getNetworkName,
  };
};

export default useWallet;
