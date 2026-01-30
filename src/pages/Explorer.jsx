import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoTrendingUp, IoStatsChart, IoPeople, IoFlash, IoCube } from 'react-icons/io5';
import { SiEthereum } from 'react-icons/si';
import AddressDisplay from '../components/AddressDisplay';
import { formatTimeAgo, formatAddress } from '../data/mockData';
import { ethers } from 'ethers';
import CharityABI from '../artifacts/contracts/Charity.sol/Charity.json';

/**
 * Explorer Page - Blockchain explorer với live data
 * 
 * Features:
 * - Stats dashboard
 * - Live transaction feed
 * - Recent blocks
 * - Charts (simple version without Recharts)
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

const Explorer = () => {
  const [liveTxs, setLiveTxs] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [topCampaigns, setTopCampaigns] = useState([]);
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalTransactions: 0,
    uniqueDonors: 0,
    gasSpent: 0,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const donorsRef = useRef(new Set());

  const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

  useEffect(() => {
    let contractInstance;
    let providerInstance;

    const fetchExplorerData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!window.ethereum) {
          throw new Error('MetaMask is not installed');
        }
        if (!CONTRACT_ADDRESS) {
          throw new Error('Contract address is not configured');
        }

        providerInstance = new ethers.providers.Web3Provider(window.ethereum);
        contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CharityABI.abi, providerInstance);
        const currentBlock = await providerInstance.getBlockNumber();

        const recentBlocks = await Promise.all(
          Array.from({ length: 6 }, (_, i) => providerInstance.getBlock(currentBlock - i))
        );

        const fromBlock = Math.max(currentBlock - 10000, 0);
        const events = await contractInstance.queryFilter(contractInstance.filters.DonationReceived(), fromBlock, 'latest');

        const campaignIds = new Set(events.map((event) => event.args?.campaignId?.toNumber()));
        const campaignMap = {};
        await Promise.all(
          Array.from(campaignIds).map(async (campaignId) => {
            if (!campaignId) return;
            const campaign = await contractInstance.campaigns(campaignId);
            campaignMap[campaignId] = campaign?.name || `Campaign #${campaignId}`;
          })
        );

        const txs = await Promise.all(
          events
            .slice(-10)
            .reverse()
            .map(async (event) => {
              const block = await providerInstance.getBlock(event.blockNumber);
              return {
                hash: event.transactionHash,
                from: event.args?.donor,
                campaign: campaignMap[event.args?.campaignId?.toNumber()] || `Campaign #${event.args?.campaignId?.toNumber()}`,
                amount: parseFloat(ethers.utils.formatEther(event.args?.amount || 0)),
                timestamp: block ? new Date(block.timestamp * 1000).toISOString() : new Date().toISOString(),
              };
            })
        );

        const totalDonations = events.reduce((sum, event) => sum + parseFloat(ethers.utils.formatEther(event.args?.amount || 0)), 0);
        const uniqueDonors = new Set(events.map((event) => event.args?.donor?.toLowerCase())).size;

        const gasEvents = events.slice(-200);
        const gasFees = await Promise.all(
          gasEvents.map(async (event) => {
            const receipt = await providerInstance.getTransactionReceipt(event.transactionHash);
            if (!receipt?.effectiveGasPrice) return 0;
            return parseFloat(ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice)));
          })
        );
        const gasSpent = gasFees.reduce((sum, fee) => sum + fee, 0);

        const campaignCount = await contractInstance.campaignCount();
        const campaigns = await Promise.all(
          Array.from({ length: campaignCount.toNumber() }, (_, i) => contractInstance.campaigns(i + 1))
        );
        const topCampaignsData = campaigns
          .map((campaign) => ({
            name: campaign.name,
            value: parseFloat(ethers.utils.formatEther(campaign.totalDonations)),
          }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5);

        setBlocks(
          recentBlocks.map((block) => ({
            blockNumber: block.number,
            timestamp: new Date(block.timestamp * 1000).toISOString(),
            transactions: block.transactions.length,
            miner: block.miner,
            gasUsed: block.gasUsed.toNumber(),
          }))
        );
        setLiveTxs(txs);
        donorsRef.current = new Set(events.map((event) => event.args?.donor?.toLowerCase()));
        setStats({
          totalDonations,
          totalTransactions: events.length,
          uniqueDonors,
          gasSpent,
        });
        setTopCampaigns(topCampaignsData);

        contractInstance.on('DonationReceived', async (campaignId, donor, amount, event) => {
          const block = await providerInstance.getBlock(event.blockNumber);
          setLiveTxs((prev) => [{
            hash: event.transactionHash,
            from: donor,
            campaign: campaignMap[campaignId.toNumber()] || `Campaign #${campaignId.toNumber()}`,
            amount: parseFloat(ethers.utils.formatEther(amount)),
            timestamp: block ? new Date(block.timestamp * 1000).toISOString() : new Date().toISOString(),
          }, ...prev].slice(0, 10));
          const donorKey = donor?.toLowerCase();
          const isNewDonor = donorKey && !donorsRef.current.has(donorKey);
          if (isNewDonor) {
            donorsRef.current.add(donorKey);
          }
          setStats((prev) => ({
            ...prev,
            totalDonations: prev.totalDonations + parseFloat(ethers.utils.formatEther(amount)),
            totalTransactions: prev.totalTransactions + 1,
            uniqueDonors: isNewDonor ? prev.uniqueDonors + 1 : prev.uniqueDonors,
          }));
        });

      } catch (err) {
        console.error('Explorer fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExplorerData();

    return () => {
      if (contractInstance) {
        contractInstance.removeAllListeners('DonationReceived');
      }
    };
  }, []);

  const statsCards = [
    {
      icon: IoTrendingUp,
      label: 'Total Volume',
      value: `${stats.totalDonations.toFixed(2)} ETH`,
      subtitle: `$${(stats.totalDonations * 2500).toLocaleString()}`,
    },
    {
      icon: IoStatsChart,
      label: 'Total Transactions',
      value: stats.totalTransactions.toLocaleString(),
      subtitle: 'On-chain donations',
    },
    {
      icon: IoPeople,
      label: 'Total Donors',
      value: stats.uniqueDonors.toLocaleString(),
      subtitle: 'Unique wallets',
    },
    {
      icon: IoFlash,
      label: 'Gas Spent',
      value: `${stats.gasSpent.toFixed(4)} ETH`,
      subtitle: 'Last 200 donations',
    },
  ];

  // Animated counter
  const AnimatedCounter = ({ value, duration = 2 }) => {
    const [count, setCount] = useState(0);
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));

    useEffect(() => {
      let start = 0;
      const end = numericValue;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }, [numericValue, duration]);

    return <>{value.includes('ETH') ? `${count.toFixed(2)} ETH` : count.toLocaleString('en-US', { maximumFractionDigits: 0 })}</>;
  };

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div style={{ marginBottom: '22px' }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <h1 style={{ fontSize: 'clamp(30px, 5vw, 36px)', fontWeight: 500, color: '#111827', marginBottom: '6px' }}>Blockchain Explorer</h1>
          <p style={{ fontSize: '1.05rem', color: '#4b5563', lineHeight: 1.6 }}>Live on-chain data • Real-time updates.</p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: '18px', padding: '12px 14px', borderRadius: '12px', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }}
          >
            {error}
          </motion.div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '22px' }}>
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} style={cardStyle} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 30px rgba(15,23,42,0.06)' }}>
                    <Icon size={20} color="#111827" />
                  </div>
                  <div style={{ fontSize: '0.95rem', color: '#6b7280' }}>{stat.label}</div>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>
                  <AnimatedCounter value={stat.value} />
                </div>
                <div style={{ fontSize: '0.95rem', color: '#6b7280' }}>{stat.subtitle}</div>
              </motion.div>
            );
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '18px' }}>
          <motion.div style={{ ...cardStyle, height: '560px', display: 'flex', flexDirection: 'column' }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#111827', marginBottom: '14px' }}>Live Transactions</h2>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <AnimatePresence mode="popLayout">
                {liveTxs.map((tx, index) => (
                  <motion.div
                    key={`${tx.hash}-${index}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.2 }}
                    style={{ padding: '12px', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <SiEthereum size={16} color="#111827" />
                        <span style={{ fontSize: '0.9rem', fontFamily: 'monospace', color: '#4b5563' }}>{formatAddress(tx.from)}</span>
                        <span style={{ color: '#6b7280' }}>→</span>
                        <span style={{ fontSize: '0.95rem', color: '#111827', fontWeight: 600 }}>{tx.campaign}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827' }}>{tx.amount} ETH</div>
                      <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{formatTimeAgo(tx.timestamp)}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div style={{ ...cardStyle, height: '560px', display: 'flex', flexDirection: 'column' }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#111827', marginBottom: '14px' }}>Recent Blocks</h2>
            <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gap: '12px' }}>
              {blocks.map((block, index) => (
                <motion.div
                  key={block.blockNumber}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + index * 0.05 }}
                  style={{ padding: '14px', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 24px rgba(15,23,42,0.08)' }}>
                      <IoCube size={18} color="#111827" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#111827' }}>#{block.blockNumber}</div>
                      <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{formatTimeAgo(block.timestamp)}</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.9rem' }}>
                    <div>
                      <div style={{ color: '#6b7280' }}>Transactions</div>
                      <div style={{ color: '#111827', fontWeight: 600 }}>{block.transactions}</div>
                    </div>
                    <div>
                      <div style={{ color: '#6b7280' }}>Gas Used</div>
                      <div style={{ color: '#111827', fontWeight: 600 }}>{(block.gasUsed / 1000000).toFixed(2)}M</div>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <div style={{ color: '#6b7280', marginBottom: '4px' }}>Miner</div>
                      <AddressDisplay address={block.miner} size="sm" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div style={{ ...cardStyle, marginTop: '22px' }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>Top Campaigns by Volume</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            {topCampaigns.map((campaign, index) => {
              const maxValue = Math.max(...topCampaigns.map((item) => item.value), 1);
              const percentage = (campaign.value / maxValue) * 100;
              return (
                <div key={campaign.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.95rem', color: '#4b5563' }}>{campaign.name}</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>{campaign.value.toFixed(2)} ETH</span>
                  </div>
                  <div style={{ height: '12px', background: '#f3f4f6', borderRadius: '8px', overflow: 'hidden' }}>
                    <motion.div
                      style={{ height: '100%', background: '#0f172a' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.22 + index * 0.08, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Explorer;
