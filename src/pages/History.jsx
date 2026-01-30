import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IoSearch,
  IoDownload,
  IoEye,
  IoOpenOutline,
  IoCheckmarkCircle,
  IoTimeOutline,
  IoCloseCircle,
} from 'react-icons/io5';
import { SiEthereum } from 'react-icons/si';
import TransactionTable from '../components/TransactionTable';
import AddressDisplay from '../components/AddressDisplay';
import { formatDateTime } from '../data/mockData';
import useWallet from '../hooks/useWallet';

/**
 * History Page - Transaction history với filters và table
 * 
 * Features:
 * - Search transactions
 * - Filter by type and status
 * - Sortable table
 * - Pagination
 * - Export CSV
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
  boxShadow: '0 18px 48px rgba(15, 23, 42, 0.08)',
};

const chipStyle = (active) => ({
  padding: '10px 14px',
  background: active ? '#f9fafb' : '#ffffff',
  border: active ? '1px solid #d1d5db' : '1px solid #e5e7eb',
  borderRadius: '10px',
  fontWeight: 600,
  color: '#111827',
  cursor: 'pointer',
  transition: 'all 0.25s ease',
  boxShadow: active ? '0 14px 36px rgba(15, 23, 42, 0.1)' : '0 8px 22px rgba(15, 23, 42, 0.06)',
});

const glassButtonStyle = {
  background: 'rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(10px)',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '10px 14px',
  fontWeight: 600,
  color: '#111827',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  boxShadow: '0 10px 28px rgba(15, 23, 42, 0.08)',
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px 12px 40px',
  border: '1px solid #e5e7eb',
  borderRadius: '10px',
  background: '#fff',
  color: '#0f172a',
  fontSize: '1rem',
  outline: 'none',
};

const History = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [transactions, setTransactions] = useState([]);
  const { address } = useWallet();

  // Filter tags
  const filterTags = [
    { id: 'all', label: 'All', count: transactions.length },
    { id: 'sent', label: 'Sent', count: transactions.filter(tx => tx.type === 'sent').length },
    { id: 'received', label: 'Received', count: transactions.filter(tx => tx.type === 'received').length },
    { id: 'pending', label: 'Pending', count: transactions.filter(tx => tx.status === 'pending').length },
    { id: 'success', label: 'Success', count: transactions.filter(tx => tx.status === 'success').length },
    { id: 'failed', label: 'Failed', count: transactions.filter(tx => tx.status === 'failed').length },
  ];

  // Filter transactions
  const filteredTransactions = transactions.filter((tx) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !tx.hash.toLowerCase().includes(query) &&
        !tx.campaign.toLowerCase().includes(query) &&
        !tx.from.toLowerCase().includes(query) &&
        !tx.to.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Type/status filter
    if (activeFilter !== 'all') {
      if (activeFilter === 'sent' || activeFilter === 'received') {
        if (tx.type !== activeFilter) return false;
      } else {
        if (tx.status !== activeFilter) return false;
      }
    }

    // Date range filter
    if (dateFrom) {
      if (new Date(tx.timestamp) < new Date(dateFrom)) return false;
    }
    if (dateTo) {
      if (new Date(tx.timestamp) > new Date(dateTo)) return false;
    }

    return true;
  });

  // Calculate stats
  const totalDonated = transactions
    .filter(tx => tx.type === 'sent' && tx.status === 'success')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalTransactions = transactions.length;

  // Table columns
  const columns = [
    {
      key: 'hash',
      label: 'Tx Hash',
      sortable: true,
      width: '15%',
      render: (hash) => (
        <AddressDisplay address={hash} size="sm" showExternalLink />
      ),
    },
    {
      key: 'timestamp',
      label: 'Date',
      sortable: true,
      width: '15%',
      render: (timestamp) => (
        <span style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
          {formatDateTime(timestamp)}
        </span>
      ),
    },
    {
      key: 'campaign',
      label: 'Campaign',
      width: '25%',
      render: (campaign) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <SiEthereum size={16} color="#111827" />
          <span style={{ color: '#111827', fontWeight: 600 }}>{campaign}</span>
        </div>
      ),
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      width: '15%',
      render: (amount, row) => (
        <div>
          <div
            style={{
              fontWeight: 700,
              color: '#111827',
            }}
          >
            {row.type === 'received' ? '+' : '-'}{amount.toFixed(4)} ETH
          </div>
          <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
            Gas: {row.gasFee.toFixed(4)} ETH
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      width: '15%',
      render: (status) => {
        const statusConfig = {
          success: {
            icon: IoCheckmarkCircle,
            color: '#16a34a',
            label: 'Success',
          },
          pending: {
            icon: IoTimeOutline,
            color: '#a16207',
            label: 'Pending',
          },
          failed: {
            icon: IoCloseCircle,
            color: '#b91c1c',
            label: 'Failed',
          },
        };

        const config = statusConfig[status];
        const Icon = config.icon;

        return (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '10px 12px',
              background: '#f9fafb',
              borderRadius: '8px',
              border: `1px solid #e5e7eb`,
            }}
          >
            <Icon size={16} color={config.color} />
            <span style={{ color: config.color, fontSize: '0.85rem', fontWeight: 600 }}>
              {config.label}
            </span>
          </div>
        );
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '15%',
      render: (_, row) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              padding: '0.5rem',
              color: '#4b5563',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.2s ease',
            }}
            title="View details"
          >
            <IoEye size={16} />
          </button>
          <button
            onClick={() => window.open(`https://etherscan.io/tx/${row.hash}`, '_blank')}
            style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              padding: '0.5rem',
              color: '#4b5563',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.2s ease',
            }}
            title="View on Etherscan"
          >
            <IoOpenOutline size={16} />
          </button>
        </div>
      ),
    },
  ];

  // Export CSV
  const handleExportCSV = () => {
    const csvContent = [
      ['Hash', 'Date', 'Campaign', 'Amount', 'Gas', 'Status', 'Type'].join(','),
      ...filteredTransactions.map(tx => [
        tx.hash,
        formatDateTime(tx.timestamp),
        tx.campaign,
        tx.amount,
        tx.gasFee,
        tx.status,
        tx.type,
      ].join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${Date.now()}.csv`;
    a.click();
  };

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div style={{ marginBottom: '20px' }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <h1 style={{ fontSize: 'clamp(30px, 5vw, 36px)', fontWeight: 500, color: '#111827', marginBottom: '6px' }}>
            Lịch sử giao dịch
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#4b5563', lineHeight: 1.6 }}>
            Toàn bộ transactions của bạn trên blockchain.
          </p>
        </motion.div>

        <motion.div
          style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <div style={{ ...cardStyle, padding: '16px 18px' }}>
            <div style={{ fontSize: '0.95rem', color: '#6b7280', marginBottom: '4px' }}>Total Donated</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#111827' }}>{totalDonated.toFixed(2)} ETH</div>
          </div>
          <div style={{ ...cardStyle, padding: '16px 18px' }}>
            <div style={{ fontSize: '0.95rem', color: '#6b7280', marginBottom: '4px' }}>Total Transactions</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#111827' }}>{totalTransactions}</div>
          </div>
        </motion.div>

        <motion.div
          style={{ ...cardStyle, marginBottom: '18px' }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div style={{ position: 'relative', marginBottom: '14px' }}>
            <IoSearch size={18} color="#6b7280" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              placeholder="Search by hash, campaign, or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
            {filterTags.map((filter) => (
              <button key={filter.id} style={chipStyle(activeFilter === filter.id)} onClick={() => setActiveFilter(filter.id)}>
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.95rem', color: '#6b7280', marginBottom: '6px' }}>From Date</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                style={{ ...inputStyle, paddingLeft: '12px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.95rem', color: '#6b7280', marginBottom: '6px' }}>To Date</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                style={{ ...inputStyle, paddingLeft: '12px' }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <button
            style={glassButtonStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.7)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.5)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onClick={handleExportCSV}
          >
            <IoDownload size={18} /> Export CSV
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <TransactionTable
            columns={columns}
            itemsPerPage={10}
            fetchFromChain
            currentAddress={address}
            filters={{
              searchQuery,
              activeFilter,
              dateFrom,
              dateTo,
            }}
            onDataLoaded={setTransactions}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default History;