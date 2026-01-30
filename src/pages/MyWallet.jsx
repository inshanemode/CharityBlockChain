import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IoWalletOutline, IoSend, IoSwapHorizontal } from 'react-icons/io5';
import { SiEthereum } from 'react-icons/si';
import AddressDisplay from '../components/AddressDisplay';
import useWallet from '../hooks/useWallet';
import { ethers } from 'ethers';
import CharityABI from '../artifacts/contracts/Charity.sol/Charity.json';
import { nftBadges } from '../data/mockData';

/**
 * MyWallet Page - Wallet management với profile, badges, stats
 */

const pageStyle = {
  background: '#f5f5f7',
  color: '#0f172a',
  fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
  minHeight: '100vh',
  padding: '64px 20px 88px',
};

const cardStyle = {
  background: '#ffffff',
  border: '1px solid #f3f4f6',
  borderRadius: '14px',
  padding: '20px',
  boxShadow: '0 20px 56px rgba(15, 23, 42, 0.08)',
};

const buttonStyle = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid rgba(15, 23, 42, 0.08)',
    background: 'rgba(255,255,255,0.8)',
    color: '#0f172a',
    boxShadow: '0 12px 30px rgba(15,23,42,0.08)',
    backdropFilter: 'blur(14px)',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'transform 150ms ease, box-shadow 150ms ease',
  },
};

const MyWallet = () => {
  const navigate = useNavigate();
  const { isConnected, address, balance, connectWallet } = useWallet();
  const [copied, setCopied] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

  useEffect(() => {
    const fetchUserTransactions = async () => {
      if (!address) return;

      try {
        setLoading(true);
        setError(null);

        if (!window.ethereum) {
          throw new Error('MetaMask is not installed');
        }
        if (!CONTRACT_ADDRESS) {
          throw new Error('Contract address is not configured');
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CharityABI.abi, provider);
        const currentBlock = await provider.getBlockNumber();
        const fromBlock = Math.max(currentBlock - 10000, 0);
        const events = await contract.queryFilter(contract.filters.DonationReceived(), fromBlock, 'latest');

        const campaignIds = new Set(events.map((event) => event.args?.campaignId?.toNumber()));
        const campaignMap = {};
        await Promise.all(
          Array.from(campaignIds).map(async (campaignId) => {
            if (!campaignId) return;
            const campaign = await contract.campaigns(campaignId);
            campaignMap[campaignId] = campaign?.name || `Campaign #${campaignId}`;
          })
        );

        const userTransactions = await Promise.all(
          events
            .filter((event) => event.args?.donor?.toLowerCase() === address.toLowerCase())
            .map(async (event) => {
              const block = await provider.getBlock(event.blockNumber);
              return {
                hash: event.transactionHash,
                campaign: campaignMap[event.args?.campaignId?.toNumber()] || `Campaign #${event.args?.campaignId?.toNumber()}`,
                amount: parseFloat(ethers.utils.formatEther(event.args?.amount || 0)),
                timestamp: block ? new Date(block.timestamp * 1000).toISOString() : new Date().toISOString(),
                status: 'success',
                type: 'sent',
              };
            })
        );

        setTransactions(userTransactions.reverse());
      } catch (err) {
        console.error('Wallet fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTransactions();
  }, [address]);

  const totalDonated = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const totalTransactions = transactions.length;
  const impactScore = Math.round(totalDonated * 100);
  const globalRanking = totalDonated > 0 ? Math.max(1, Math.floor(10000 / totalDonated)) : 0;

  const userStats = {
    totalDonated,
    totalTransactions,
    impactScore,
    globalRanking,
  };

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isConnected) {
    return (
      <div style={pageStyle}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ ...cardStyle, textAlign: 'center', padding: '48px 24px' }}>
            <div style={{ width: '96px', height: '96px', margin: '0 auto 24px', borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 30px rgba(15,23,42,0.08)' }}>
              <IoWalletOutline size={46} color="#0f172a" />
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#111827', marginBottom: '10px' }}>Connect Your Wallet</h1>
            <p style={{ fontSize: '1rem', color: '#4b5563', marginBottom: '22px' }}>Kết nối ví để xem thông tin cá nhân.</p>
            <button style={buttonStyle.base} onClick={connectWallet}>
              <IoWalletOutline size={20} /> Connect Wallet
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={{ ...cardStyle, padding: '26px', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: '#111827', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700 }}>
              {address ? address[2].toUpperCase() : 'U'}
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>My Wallet</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <AddressDisplay address={address} showExternalLink size="lg" />
              </div>
              <div style={{ fontSize: '0.95rem', color: '#4b5563' }}>Member since Nov 2025</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ marginBottom: '2rem' }}
      >
        <div style={{ ...cardStyle, padding: '24px', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 24px rgba(15,23,42,0.08)' }}>
              <SiEthereum size={26} color="#111827" />
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', color: '#4b5563', marginBottom: '4px' }}>Total Balance</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#111827' }}>{balance.toFixed(4)} ETH</div>
              <div style={{ fontSize: '1rem', color: '#6b7280' }}>≈ ${(balance * 2500).toFixed(2)} USD</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
            <button style={buttonStyle.base} onClick={() => navigate('/donate')}><IoSend size={18} />Send</button>
            <button style={buttonStyle.base}><IoSwapHorizontal size={18} />Receive</button>
          </div>
        </div>
      </motion.div>

      {/* NFT Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ marginBottom: '2rem' }}
      >
        <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#111827', marginBottom: '14px' }}>Achievement Badges</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          {nftBadges.map((badge) => (
            <div
              key={badge.id}
              style={{
                ...cardStyle,
                padding: '16px',
                textAlign: 'center',
                opacity: badge.unlocked ? 1 : 0.5,
                filter: badge.unlocked ? 'none' : 'grayscale(100%)',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{badge.icon}</div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: '#111827', marginBottom: '6px' }}>{badge.name}</div>
              <div style={{ fontSize: '0.9rem', color: '#4b5563' }}>{badge.description}</div>
              {badge.unlocked && badge.unlockedAt && (
                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '6px' }}>
                  Unlocked {new Date(badge.unlockedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginBottom: '2rem' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {[{ label: 'Total Donated', value: `${userStats.totalDonated} ETH` }, { label: 'Transactions', value: userStats.totalTransactions }, { label: 'Impact Score', value: userStats.impactScore.toLocaleString() }, { label: 'Global Ranking', value: `#${userStats.globalRanking}` }].map((item) => (
            <div key={item.label} style={{ ...cardStyle, padding: '16px' }}>
              <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '6px' }}>{item.label}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#111827' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#111827', marginBottom: '14px' }}>Recent Activity</h2>
        <div style={{ ...cardStyle, padding: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {error && (
              <div style={{ color: '#b91c1c' }}>{error}</div>
            )}
            {loading && (
              <div style={{ color: '#6b7280' }}>Loading transactions...</div>
            )}
            {transactions.slice(0, 5).map((tx, index) => (
              <div key={tx.hash} style={{ display: 'flex', gap: '12px', position: 'relative', paddingBottom: index < 4 ? '14px' : 0, borderBottom: index < 4 ? '1px solid #e5e7eb' : 'none' }}>
                <div style={{ position: 'relative', paddingTop: '4px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: tx.status === 'success' ? '#22c55e' : '#f59e0b' }} />
                  {index < 4 && <div style={{ position: 'absolute', left: '4px', top: '10px', width: '2px', height: 'calc(100% + 14px)', background: '#e5e7eb' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#111827', marginBottom: '4px' }}>{tx.campaign}</div>
                  <div style={{ fontSize: '0.95rem', color: '#4b5563', marginBottom: '4px' }}>{tx.type === 'sent' ? 'Sent' : 'Received'} {tx.amount} ETH</div>
                  <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{new Date(tx.timestamp).toLocaleString()}</div>
                </div>
                <button style={{ ...buttonStyle.base, padding: '10px 12px', borderRadius: '10px' }} onClick={() => navigate('/history')}>View</button>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <button style={buttonStyle.base} onClick={() => navigate('/history')}>View All Transactions</button>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default MyWallet;
