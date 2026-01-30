// Shared helpers and UI metadata for the charity system

/**
 * CATEGORIES
 * Danh mục chiến dịch
 */
export const categories = [
  { id: "all", name: "Tất cả", color: "cyan" },
  { id: "education", name: "Giáo dục", color: "blue" },
  { id: "healthcare", name: "Y tế", color: "green" },
  { id: "environment", name: "Môi trường", color: "green" },
  { id: "emergency", name: "Cứu trợ khẩn cấp", color: "orange" },
  { id: "community", name: "Cộng đồng", color: "purple" },
  { id: "children", name: "Trẻ em", color: "cyan" },
];


/**
 * CHART DATA - Donation Volume (7 days)
 */
export const donationVolumeData = [
  { date: "03/12", amount: 45.5 },
  { date: "04/12", amount: 52.3 },
  { date: "05/12", amount: 38.7 },
  { date: "06/12", amount: 67.2 },
  { date: "07/12", amount: 71.8 },
  { date: "08/12", amount: 59.4 },
  { date: "09/12", amount: 83.6 },
];

/**
 * CHART DATA - Campaign Distribution
 */
export const campaignDistributionData = [
  { name: "Xây dựng trường học", value: 45.67 },
  { name: "Mổ tim trẻ em", value: 78.34 },
  { name: "Trồng rừng", value: 92.15 },
  { name: "Cứu trợ lũ lụt", value: 156.89 },
  { name: "Nhà người cao tuổi", value: 34.52 },
];

/**
 * CHART DATA - Donor Activity (24h)
 */
export const donorActivityData = [
  { name: "Active", value: 156, color: "#00D9FF" },
  { name: "Occasional", value: 89, color: "#A855F7" },
  { name: "First-time", value: 43, color: "#34D399" },
  { name: "Returning", value: 72, color: "#FB923C" },
];

/**
 * NFT BADGES DATA
 */
export const nftBadges = [
  {
    id: 1,
    name: "First Donor",
    description: "Donated for the first time",
    icon: "🎉",
    color: "cyan",
    unlocked: true,
    unlockedAt: "2025-11-20",
  },
  {
    id: 2,
    name: "Top Contributor",
    description: "Donated more than 10 ETH",
    icon: "⭐",
    color: "purple",
    unlocked: true,
    unlockedAt: "2025-11-28",
  },
  {
    id: 3,
    name: "Blockchain Hero",
    description: "Completed 50 donations",
    icon: "🦸",
    color: "green",
    unlocked: true,
    unlockedAt: "2025-12-05",
  },
  {
    id: 4,
    name: "Early Adopter",
    description: "Joined in first 100 users",
    icon: "🚀",
    color: "orange",
    unlocked: true,
    unlockedAt: "2025-11-15",
  },
  {
    id: 5,
    name: "Community Leader",
    description: "Referred 10+ donors",
    icon: "👑",
    color: "blue",
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: 6,
    name: "Charity Champion",
    description: "Donated to all campaigns",
    icon: "🏆",
    color: "purple",
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: 7,
    name: "Consistency Master",
    description: "Donated 30 days in a row",
    icon: "🔥",
    color: "orange",
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: 8,
    name: "Whale Donor",
    description: "Donated more than 100 ETH",
    icon: "🐋",
    color: "cyan",
    unlocked: false,
    unlockedAt: null,
  },
];

/**
 * HELPER FUNCTIONS
 */

// Format ETH với 2 decimal places
export const formatETH = (amount) => {
  return amount.toFixed(2);
};

// Rút gọn address: 0x1234...5678
export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Rút gọn transaction hash
export const formatTxHash = (hash) => {
  if (!hash) return '';
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
};

// Tính phần trăm progress
export const calculateProgress = (raised, goal) => {
  return Math.min((raised / goal) * 100, 100);
};

// Get category color
export const getCategoryColor = (category) => {
  const categoryMap = {
    Education: 'blue',
    Healthcare: 'green',
    Environment: 'green',
    Emergency: 'orange',
    Community: 'purple',
    Children: 'cyan',
  };
  return categoryMap[category] || 'cyan';
};

// Format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format time ago
export const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

// Format date and time
export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Chỉ export default một lần ở cuối file, không lặp lại nếu đã export ở trên
