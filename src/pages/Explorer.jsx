import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoTrendingUp, IoStatsChart, IoPeople, IoFlash, IoCube } from 'react-icons/io5';
import { SiEthereum } from 'react-icons/si';
import AddressDisplay from '../components/AddressDisplay';
import { recentTransactions, blocksData, stats, formatTimeAgo, formatAddress } from '../data/mockData';

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
  background: '#ffffff',
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
  const [liveTxs, setLiveTxs] = useState(recentTransactions.slice(0, 10));
  const [counter, setCounter] = useState(0);

  // Simulate live transactions (add new tx every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => prev + 1);
      // Rotate transactions to simulate new ones
      setLiveTxs(prev => {
        const newTx = recentTransactions[counter % recentTransactions.length];
        return [newTx, ...prev.slice(0, 9)];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [counter]);

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
      subtitle: '+234 today',
    },
    {
      icon: IoPeople,
      label: 'Total Donors',
      value: stats.uniqueDonors.toLocaleString(),
      subtitle: '+89 this week',
    },
    {
      icon: IoFlash,
      label: 'Gas Spent',
      value: '45.67 ETH',
      subtitle: 'Avg 21000 Gwei',
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
              {blocksData.slice(0, 6).map((block, index) => (
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
            {[
              { name: 'Hỗ trợ khẩn cấp lũ lụt', value: 156.89 },
              { name: 'Thiết bị y tế bệnh viện', value: 210.67 },
              { name: 'Học bổng sinh viên', value: 123.45 },
              { name: 'Trồng rừng môi trường', value: 92.15 },
              { name: 'Mổ tim trẻ em', value: 78.34 },
            ].map((campaign, index) => {
              const maxValue = 210.67;
              const percentage = (campaign.value / maxValue) * 100;
              return (
                <div key={campaign.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.95rem', color: '#4b5563' }}>{campaign.name}</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>{campaign.value} ETH</span>
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
