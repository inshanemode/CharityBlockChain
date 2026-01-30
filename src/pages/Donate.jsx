import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import {
  IoCheckmarkCircle,
  IoWalletOutline,
  IoSend,
  IoCopyOutline,
  IoCheckmark,
} from 'react-icons/io5';
import { SiEthereum } from 'react-icons/si';
import GasFeeDisplay from '../components/GasFeeDisplay';
import TransactionStatus from '../components/TransactionStatus';
import GlassButton from '../components/base/GlassButton';
import useWallet from '../hooks/useWallet';
import useContract from '../hooks/useContract';
import { formatAddress } from '../data/mockData';
const useCampaignIdFromQuery = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  return params.get('campaign');
};
/**
 * Donate Page - Donation flow với Web3 integration
 * 
 * Features:
 * - Wallet connection status
 * - Campaign selection
 * - Amount selection (quick pills + custom)
 * - Gas fee calculation
 * - Transaction sending
 * - Loading states
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
  padding: '24px',
  boxShadow: '0 20px 60px rgba(15, 23, 42, 0.08)',
};

const labelStyle = {
  display: 'block',
  fontSize: '1rem',
  fontWeight: 600,
  color: '#111827',
  marginBottom: '10px',
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  border: '1px solid #e5e7eb',
  borderRadius: '10px',
  background: '#fff',
  color: '#0f172a',
  fontSize: '1rem',
  outline: 'none',
};

const glassButtonStyle = {
  background: 'rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(12px)',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '11px 16px',
  fontWeight: 600,
  color: '#1f2937',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  boxShadow: '0 10px 28px rgba(15, 23, 42, 0.06)',
};

const pillButtonStyle = (active) => ({
  padding: '11px 14px',
  background: active ? '#f9fafb' : '#ffffff',
  border: active ? '1px solid #d1d5db' : '1px solid #e5e7eb',
  borderRadius: '10px',
  fontWeight: 600,
  color: '#111827',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: active ? '0 12px 30px rgba(15, 23, 42, 0.08)' : '0 6px 18px rgba(15, 23, 42, 0.04)',
});

const Donate = () => {
  const navigate = useNavigate();
  const campaignId = useCampaignIdFromQuery();
  const { isConnected, address, balance, isConnecting, connectWallet, disconnectWallet } = useWallet();
  const { donate, getAllCampaigns, loading: contractLoading } = useContract();

  // Form state
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [campaignsLoading, setCampaignsLoading] = useState(false);
  const [campaignsError, setCampaignsError] = useState(null);
  const [amount, setAmount] = useState('');
  const [gasSpeed, setGasSpeed] = useState('normal');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // Transaction state
  const [isSending, setIsSending] = useState(false);
  const [txStatus, setTxStatus] = useState(null); // pending | confirming | success | failed
  const [txHash, setTxHash] = useState('');

  // Quick amount presets
  const quickAmounts = [
    { value: 0.01, glow: 'blue' },
    { value: 0.05, glow: 'purple' },
    { value: 0.1, glow: 'green' },
    { value: 0.5, glow: 'orange' },
  ];

  // Handle copy address
  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle amount selection
  const handleQuickAmount = (value) => {
    setAmount(value.toString());
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setCampaignsLoading(true);
        setCampaignsError(null);
        const response = await getAllCampaigns();
        if (!response.success) {
          throw new Error(response.error || 'Failed to load campaigns');
        }
        setCampaigns(response.data);
      } catch (err) {
        setCampaignsError(err.message);
      } finally {
        setCampaignsLoading(false);
      }
    };

    fetchCampaigns();
  }, [getAllCampaigns]);

  useEffect(() => {
    if (!campaignId || campaigns.length === 0) return;
    const matched = campaigns.find((campaign) => String(campaign.id) === String(campaignId));
    if (matched) {
      setSelectedCampaign(matched);
    }
  }, [campaignId, campaigns]);

  // Calculate total
  const gasFees = {
    slow: 0.001,
    normal: 0.002,
    fast: 0.004,
  };
  const gasFee = gasFees[gasSpeed];
  const total = parseFloat(amount || 0) + gasFee;
  const usdRate = 2500; // Mock USD rate
  const totalUSD = (total * usdRate).toFixed(2);

  // Handle send transaction
  const handleSendTransaction = async () => {
    if (!isConnected) {
      alert('Please connect wallet first');
      return;
    }

    if (!selectedCampaign) {
      alert('Please select a campaign');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (parseFloat(amount) + gasFee > balance) {
      alert('Insufficient balance');
      return;
    }

    setIsSending(true);
    setTxStatus('pending');
    setTxHash('');

    try {
      const result = await donate({
        campaignId: selectedCampaign.id,
        amount: parseFloat(amount),
      });

      if (!result.success) {
        throw new Error(result.error || 'Transaction failed');
      }

      setTxHash(result.txResponse.hash);
      setTxStatus('confirming');

      const receipt = await result.txResponse.wait();
      if (receipt.status !== 1) {
        throw new Error('Transaction failed');
      }

      const gasFee = receipt.effectiveGasPrice
        ? parseFloat(ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice)))
        : 0;

      const transaction = {
        hash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
        amount: parseFloat(amount),
        gasFee,
        timestamp: new Date().toISOString(),
      };

      setTxStatus('success');
      navigate('/success', { 
        state: { 
          transaction,
          campaign: selectedCampaign,
        } 
      });
    } catch (error) {
      console.error('Transaction error:', error);
      setTxStatus('failed');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <motion.h1
          style={{
            fontSize: 'clamp(32px, 5vw, 40px)',
            fontWeight: 500,
            color: '#111827',
            marginBottom: '8px',
          }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Quyên góp
        </motion.h1>
        <motion.p
          style={{ fontSize: '1.05rem', color: '#4b5563', marginBottom: '24px', lineHeight: 1.6 }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          Gửi donation trực tiếp lên blockchain với giao diện tối giản, rõ ràng và không hiệu ứng màu mè.
        </motion.p>

        <motion.div
          style={{ ...cardStyle, marginBottom: '24px' }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {isConnected ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '10px',
                    background: '#f9fafb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 28px rgba(15, 23, 42, 0.06)',
                  }}
                >
                  <IoCheckmarkCircle size={26} color="#16a34a" />
                </div>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111827' }}>Wallet Connected</div>
                  <div style={{ fontSize: '0.95rem', color: '#6b7280' }}>Ready to donate</div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  marginBottom: '12px',
                  background: '#fff',
                }}
              >
                <SiEthereum size={18} color="#111827" />
                <span style={{ flex: 1, fontFamily: 'monospace', color: '#4b5563', fontSize: '0.95rem' }}>
                  {formatAddress(address)}
                </span>
                <button
                  onClick={handleCopy}
                  style={{ background: 'none', border: 'none', color: '#4b5563', cursor: 'pointer', padding: '6px' }}
                  aria-label="Copy address"
                >
                  {copied ? <IoCheckmark size={18} /> : <IoCopyOutline size={18} />}
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: '#6b7280', fontSize: '0.95rem' }}>Your Balance</span>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#111827' }}>
                    {balance.toFixed(4)} ETH
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>≈ ${(balance * usdRate).toFixed(2)}</div>
                </div>
              </div>

              <button
                style={{ ...glassButtonStyle, width: '100%' }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.7)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 14px 36px rgba(15,23,42,0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.5)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 28px rgba(15,23,42,0.06)';
                }}
                onClick={disconnectWallet}
              >
                Disconnect Wallet
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '88px',
                  height: '88px',
                  margin: '0 auto 16px',
                  borderRadius: '18px',
                  background: '#f9fafb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08)',
                }}
              >
                <IoWalletOutline size={42} color="#111827" />
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>
                Please connect wallet
              </h3>
              <p style={{ color: '#4b5563', marginBottom: '18px' }}>Bạn cần kết nối ví để thực hiện donation.</p>
              <button
                style={glassButtonStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.7)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 14px 36px rgba(15,23,42,0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.5)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 28px rgba(15,23,42,0.06)';
                }}
                onClick={connectWallet}
                disabled={isConnecting}
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            </div>
          )}
        </motion.div>

        {isConnected && (
          <>
            <motion.div
              style={{ ...cardStyle, marginBottom: '20px' }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <label style={labelStyle}>Chọn chiến dịch</label>
              <div style={{ display: 'grid', gap: '12px', maxHeight: '320px', overflowY: 'auto' }}>
                {campaignsLoading && (
                  <div style={{ color: '#6b7280', fontSize: '0.95rem' }}>Loading campaigns...</div>
                )}
                {campaignsError && (
                  <div style={{ color: '#b91c1c', fontSize: '0.95rem' }}>{campaignsError}</div>
                )}
                {campaigns
                  .filter((c) => c.status === 'active')
                  .map((campaign) => (
                    <button
                      key={campaign.id}
                      onClick={() => setSelectedCampaign(campaign)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        width: '100%',
                        textAlign: 'left',
                        background: selectedCampaign?.id === campaign.id ? '#f9fafb' : '#fff',
                        border: selectedCampaign?.id === campaign.id ? '1px solid #d1d5db' : '1px solid #e5e7eb',
                        borderRadius: '10px',
                        boxShadow: selectedCampaign?.id === campaign.id
                          ? '0 14px 36px rgba(15, 23, 42, 0.1)'
                          : '0 8px 24px rgba(15, 23, 42, 0.06)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 18px 44px rgba(15,23,42,0.12)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = selectedCampaign?.id === campaign.id
                          ? '0 14px 36px rgba(15, 23, 42, 0.1)'
                          : '0 8px 24px rgba(15, 23, 42, 0.06)';
                      }}
                    >
                      {campaign.image ? (
                        <img
                          src={campaign.image}
                          alt={campaign.title}
                          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '10px' }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, rgba(17,24,39,0.9), rgba(59,130,246,0.6))',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                          }}
                        >
                          {campaign.title?.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, color: '#111827', marginBottom: '4px', display: 'flex', alignItems: 'center' }}>
                          {campaign.title}
                          {selectedCampaign?.id === campaign.id && (
                            <IoCheckmarkCircle size={22} color="#22c55e" style={{ marginLeft: 8, verticalAlign: 'middle' }} />
                          )}
                        </div>
                        <div style={{ color: '#6b7280', fontSize: '0.95rem' }}>
                          {campaign.raised.toFixed(2)} / {campaign.goal.toFixed(2)} ETH
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </motion.div>

            <motion.div
              style={{ ...cardStyle, marginBottom: '20px' }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label style={labelStyle}>Chọn số tiền</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px', marginBottom: '12px' }}>
                {quickAmounts.map((preset) => (
                  <button
                    key={preset.value}
                    style={{ ...pillButtonStyle(amount === preset.value.toString()), display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                    onClick={() => handleQuickAmount(preset.value)}
                  >
                    <span>{preset.value} ETH</span>
                    {amount === preset.value.toString() && (
                      <IoCheckmarkCircle size={20} color="#22c55e" style={{ marginLeft: 8, verticalAlign: 'middle' }} />
                    )}
                  </button>
                ))}
              </div>

              <div style={{ position: 'relative' }}>
                <input
                  type="number"
                  placeholder="Hoặc nhập số tiền tùy chỉnh"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{ ...inputStyle, paddingLeft: '38px' }}
                />
                <SiEthereum size={18} color="#6b7280" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
              {amount && (
                <div style={{ marginTop: '8px', textAlign: 'right', color: '#6b7280', fontSize: '0.95rem' }}>
                  ≈ ${(parseFloat(amount) * usdRate).toFixed(2)} USD
                </div>
              )}
            </motion.div>

            <GasFeeDisplay selectedSpeed={gasSpeed} onSpeedChange={setGasSpeed} amount={parseFloat(amount || 0)} />

            <motion.div
              style={{ ...cardStyle, margin: '20px 0' }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <label style={labelStyle}>Tin nhắn (tùy chọn)</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Để lại tin nhắn (sẽ được ghi trên blockchain)"
                maxLength={200}
                style={{
                  ...inputStyle,
                  minHeight: '110px',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                }}
              />
              <div style={{ marginTop: '6px', textAlign: 'right', color: '#6b7280', fontSize: '0.9rem' }}>{message.length}/200</div>
            </motion.div>

            <motion.div
              style={{ ...cardStyle, marginBottom: '20px' }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#4b5563' }}>
                <span>Số tiền</span>
                <span>{amount || '0'} ETH</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', marginBottom: '10px', borderBottom: '1px solid #e5e7eb', color: '#4b5563' }}>
                <span>Gas fee</span>
                <span>{gasFee.toFixed(4)} ETH</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 600, color: '#111827' }}>Total</span>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#111827' }}>{total.toFixed(4)} ETH</div>
                  <div style={{ color: '#6b7280', fontSize: '0.95rem' }}>≈ ${totalUSD} USD</div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <GlassButton
                style={{ ...glassButtonStyle, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                onClick={handleSendTransaction}
                disabled={!selectedCampaign || !amount || parseFloat(amount) <= 0 || isSending || contractLoading}
                loading={isSending || contractLoading}
                icon={<IoSend size={20} />}
              >
                Gửi Transaction
              </GlassButton>
            </motion.div>
          </>
        )}

        <AnimatePresence>
          {txStatus && (
            <motion.div
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                zIndex: 9999,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              onClick={() => {
                if (txStatus === 'failed') {
                  setTxStatus(null);
                }
              }}
            >
              <div style={{ width: '100%', maxWidth: '460px' }} onClick={(e) => e.stopPropagation()}>
                <TransactionStatus
                  status={txStatus}
                  txHash={txHash}
                  steps={[
                    { completed: txStatus !== 'pending', active: txStatus === 'pending' },
                    { completed: txStatus === 'success', active: txStatus === 'confirming' },
                    { completed: txStatus === 'success', active: txStatus === 'success' },
                  ]}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Donate;