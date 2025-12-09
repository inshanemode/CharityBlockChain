import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  IoCheckmarkCircle,
  IoPersonOutline,
  IoCopyOutline,
  IoCheckmark,
} from 'react-icons/io5';
import { SiEthereum } from 'react-icons/si';
import {
  formatETH,
  formatAddress,
  formatTxHash,
  calculateProgress,
  getCategoryColor,
} from '../data/mockData';

/**
 * CampaignCard Component - Glass card cho campaign
 * 
 * Features:
 * - Glass card container với hover effects
 * - Image với glass overlay
 * - Category badge với glow
 * - Progress bar animated
 * - Smart contract address với copy button
 * - Donor count và last transaction
 * - Donate button với glow
 */
const CampaignCard = ({
  id,
  title,
  description,
  image,
  category,
  raised,
  goal,
  donors,
  contractAddress,
  lastTxHash,
  status = 'active',
}) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const progress = calculateProgress(raised, goal);
  const categoryColor = getCategoryColor(category);

  // Copy contract address
  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Navigate to campaign detail
  const handleDonate = () => {
    navigate(`/campaigns/${id}`);
  };

  const statsHighlights = [
    { label: 'ETH đã quyên góp', value: '1,234+', color: 'text-gray-800' },
    { label: 'Giao dịch', value: '5,678+', color: 'text-gray-800' },
    { label: 'Người ủng hộ', value: '3,456+', color: 'text-gray-800' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -2 }}
      className="relative rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
      style={{ fontFamily: 'Inter, "Helvetica Neue", sans-serif' }}
    >
      <div className="flex flex-col gap-6">
        <div className="overflow-hidden rounded-lg border border-gray-100">
          <img
            src={image}
            alt={title}
            className="h-56 w-full object-cover"
          />
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.28em] text-gray-500">BlockCharity</p>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 leading-snug">Từ thiện minh bạch với Blockchain</h2>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="text-sm leading-relaxed text-gray-700 line-clamp-2">{description}</p>
          </div>
          {status === 'completed' && (
            <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-800">
              <IoCheckmarkCircle size={16} />
              Hoàn thành
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-gray-900"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-900">
            <span className="font-semibold">{formatETH(raised)} ETH</span>
            <span className="text-gray-600">/ {formatETH(goal)} ETH</span>
          </div>
          <div className="text-xs font-semibold text-gray-700">{progress.toFixed(0)}% đạt được</div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white px-4 py-3">
          <SiEthereum size={18} className="text-gray-800" />
          <span className="flex-1 font-mono text-sm text-gray-700">{formatAddress(contractAddress)}</span>
          <button
            onClick={handleCopy}
            className="rounded-md border border-gray-200 bg-white/50 px-2 py-2 text-gray-600 backdrop-blur-md transition-all duration-300 hover:bg-white/70 hover:shadow-md hover:-translate-y-[1px]"
            title="Copy address"
          >
            {copied ? <IoCheckmark size={18} /> : <IoCopyOutline size={18} />}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 rounded-lg border border-gray-100 bg-white p-4">
          {statsHighlights.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className={`text-lg font-semibold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-800">
              <IoPersonOutline size={18} />
            </div>
            <div>
              <div className="text-xs text-gray-600">Donors</div>
              <div className="text-base font-semibold text-gray-900">{donors.toLocaleString()}</div>
            </div>
          </div>

          {lastTxHash && (
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-wide text-gray-500">Last TX</div>
              <div className="font-mono text-xs text-gray-700">{formatTxHash(lastTxHash)}</div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleDonate}
            className="flex-1 rounded-md border border-gray-200 bg-white/50 px-5 py-2.5 font-medium text-gray-800 backdrop-blur-md transition-all duration-300 hover:bg-white/70 hover:shadow-md hover:-translate-y-[1px]"
          >
            {status === 'completed' ? 'Xem chi tiết' : 'Quyên góp ngay'}
          </button>
          <button
            onClick={() => navigate(`/campaigns/${id}`)}
            className="rounded-md border border-gray-200 bg-white/50 px-5 py-2.5 font-medium text-gray-800 backdrop-blur-md transition-all duration-300 hover:bg-white/70 hover:shadow-md hover:-translate-y-[1px]"
          >
            Xem chiến dịch
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CampaignCard;
