// Mock data cho blockchain charity system

/**
 * CAMPAIGNS DATA
 * Mock campaigns với blockchain details
 */
export const campaigns = [
  {
    id: 1,
    title: "Xây dựng trường học vùng cao",
    description: "Xây dựng trường học cho trẻ em vùng núi phía Bắc, trang bị cơ sở vật chất hiện đại và sách vở cho các em.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800",
    category: "Education",
    raised: 45.67,
    goal: 100,
    contractAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    donors: 234,
    transactions: 145,
    lastTxHash: "0x8f9a3c2e1b5d6a4c7e9f2b8a6c3d1e4f7a9b2c5d8e1f4a7b",
    createdAt: "2025-11-15",
    status: "active",
  },
  {
    id: 2,
    title: "Mổ tim miễn phí cho trẻ em",
    description: "Chương trình phẫu thuật tim bẩm sinh miễn phí cho trẻ em có hoàn cảnh khó khăn trên toàn quốc.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
    category: "Healthcare",
    raised: 78.34,
    goal: 150,
    contractAddress: "0x5a86f1c7b2e3d9a4c8f2b6d1e5a9c3f7b2d8e4a1c6f9",
    donors: 456,
    transactions: 289,
    lastTxHash: "0x3f7b2a9c5d1e8f4a6b3c9d2e7f1a4b8c5d9e2f6a3b7c",
    createdAt: "2025-10-20",
    status: "active",
  },
  {
    id: 3,
    title: "Trồng rừng bảo vệ môi trường",
    description: "Dự án trồng 100,000 cây xanh tại các khu vực bị tàn phá, góp phần chống biến đổi khí hậu.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
    category: "Environment",
    raised: 92.15,
    goal: 80,
    contractAddress: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2",
    donors: 789,
    transactions: 512,
    lastTxHash: "0x9c5d2f6a3b7e1c4d8f2a5b9c6e3d1f7a4b8c2e5d9f1a",
    createdAt: "2025-09-05",
    status: "completed",
  },
  {
    id: 4,
    title: "Hỗ trợ khẩn cấp lũ lụt miền Trung",
    description: "Cứu trợ khẩn cấp người dân vùng lũ: lương thực, thuốc men, nhu yếu phẩm và hỗ trợ xây dựng lại nhà cửa.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800",
    category: "Emergency",
    raised: 156.89,
    goal: 200,
    contractAddress: "0x7f3e9a2c5b1d8f6a4c7e2b9d5a1f3c8e6b4d7a2c9f5e",
    donors: 1234,
    transactions: 867,
    lastTxHash: "0x2b7c5d9f1a4e8c3b6d2f7a9c5e1d4f8b3a6c9d2e5f7a",
    createdAt: "2025-11-28",
    status: "active",
  },
  {
    id: 5,
    title: "Nhà cộng đồng cho người cao tuổi",
    description: "Xây dựng trung tâm chăm sóc và sinh hoạt cho người cao tuổi không nơi nương tựa tại TP.HCM.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
    category: "Community",
    raised: 34.52,
    goal: 120,
    contractAddress: "0xc8d2e6f9a3b1c5d7e4f2a8b6c9d3e1f5a7b2c8d4e6f9",
    donors: 189,
    transactions: 98,
    lastTxHash: "0x5f8a3c2b9d1e7f4a6c3b8d2e5f9a1c4b7d3e6f8a2c5b",
    createdAt: "2025-11-10",
    status: "active",
  },
  {
    id: 6,
    title: "Bữa ăn dinh dưỡng cho trẻ em",
    description: "Cung cấp bữa ăn dinh dưỡng hàng ngày cho 500 trẻ em mồ côi và có hoàn cảnh khó khăn.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
    category: "Children",
    raised: 67.23,
    goal: 90,
    contractAddress: "0x3d5a7b2c9f1e4d6a8c2e5f7b9d3a1c4e6f8b2d5a7c9e",
    donors: 567,
    transactions: 345,
    lastTxHash: "0x8d3f2a5c9b1e6f4a7c2d8f5b3e9a1c6d4f7b2a5c8e3d",
    createdAt: "2025-10-15",
    status: "active",
  },
  {
    id: 7,
    title: "Học bổng cho sinh viên nghèo vượt khó",
    description: "Trao học bổng toàn phần cho 100 sinh viên có thành tích xuất sắc nhưng hoàn cảnh khó khăn.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
    category: "Education",
    raised: 123.45,
    goal: 180,
    contractAddress: "0x9e2f5a7c3b1d8f6a4e2c9d7b5a3f1e8c6d4b2a7f9c5e",
    donors: 892,
    transactions: 534,
    lastTxHash: "0x4c7b2f9a5d1e8c3b6f2a9d5c7e1f4b8a3c6d9f2e5a7b",
    createdAt: "2025-09-20",
    status: "active",
  },
  {
    id: 8,
    title: "Thiết bị y tế cho bệnh viện tuyến",
    description: "Trang bị máy móc y tế hiện đại cho các bệnh viện tuyến huyện vùng sâu vùng xa.",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800",
    category: "Healthcare",
    raised: 210.67,
    goal: 250,
    contractAddress: "0x1f4b7c2d9e5a3f8c6b1d4e7a9c2f5b8d3a6e9c1f4b7d",
    donors: 1567,
    transactions: 923,
    lastTxHash: "0x7d2f9c5a3b1e8f6a4c2d9f7b5e3a1c8d6f4b2a9c7e5d",
    createdAt: "2025-08-12",
    status: "active",
  },
];

/**
 * STATS DATA
 * Tổng hợp thống kê hệ thống
 */
export const stats = {
  totalDonations: 1234.56, // ETH
  totalTransactions: 5678,
  activeCampaigns: 12,
  uniqueDonors: 3456,
  totalCampaigns: 45,
  completedCampaigns: 33,
};

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
 * TRANSACTIONS HISTORY
 * Full transaction history (20+ items)
 */
export const transactionsHistory = [
  {
    hash: "0x8f9a3c2e1b5d6a4c7e9f2b8a6c3d1e4f7a9b2c5d8e1f4a7b",
    from: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    to: "0x5a86f1c7b2e3d9a4c8f2b6d1e5a9c3f7b2d8e4a1c6f9",
    campaign: "Xây dựng trường học vùng cao",
    amount: 2.5,
    gasUsed: 21000,
    gasFee: 0.002,
    timestamp: "2025-12-09T10:30:00Z",
    status: "success",
    blockNumber: 18234567,
    type: "sent",
  },
  {
    hash: "0x3f7b2a9c5d1e8f4a6b3c9d2e7f1a4b8c5d9e2f6a3b7c",
    from: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2",
    to: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    campaign: "Mổ tim miễn phí cho trẻ em",
    amount: 0.5,
    gasUsed: 21000,
    gasFee: 0.0015,
    timestamp: "2025-12-09T09:15:00Z",
    status: "success",
    blockNumber: 18234556,
    type: "received",
  },
  {
    hash: "0x9c5d2f6a3b7e1c4d8f2a5b9c6e3d1f7a4b8c2e5d9f1a",
    from: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    to: "0x3d5a7b2c9f1e4d6a8c2e5f7b9d3a1c4e6f8b2d5a7c9e",
    campaign: "Hỗ trợ khẩn cấp lũ lụt miền Trung",
    amount: 1.25,
    gasUsed: 0,
    gasFee: 0,
    timestamp: "2025-12-09T08:45:00Z",
    status: "pending",
    blockNumber: null,
    type: "sent",
  },
  {
    hash: "0x2b7c5d9f1a4e8c3b6d2f7a9c5e1d4f8b3a6c9d2e5f7a",
    from: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    to: "0x7f3e9a2c5b1d8f6a4c7e2b9d5a1f3c8e6b4d7a2c9f5e",
    campaign: "Trồng rừng bảo vệ môi trường",
    amount: 3.8,
    gasUsed: 21000,
    gasFee: 0.0025,
    timestamp: "2025-12-08T18:20:00Z",
    status: "success",
    blockNumber: 18234320,
    type: "sent",
  },
  {
    hash: "0x5f8a3c2b9d1e7f4a6c3b8d2e5f9a1c4b7d3e6f8a2c5b",
    from: "0xc8d2e6f9a3b1c5d7e4f2a8b6c9d3e1f5a7b2c8d4e6f9",
    to: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    campaign: "Nhà cộng đồng cho người cao tuổi",
    amount: 0.75,
    gasUsed: 21000,
    gasFee: 0.0018,
    timestamp: "2025-12-08T14:10:00Z",
    status: "success",
    blockNumber: 18234198,
    type: "received",
  },
  {
    hash: "0x8d3f2a5c9b1e6f4a7c2d8f5b3e9a1c6d4f7b2a5c8e3d",
    from: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    to: "0x9e2f5a7c3b1d8f6a4e2c9d7b5a3f1e8c6d4b2a7f9c5e",
    campaign: "Bữa ăn dinh dưỡng cho trẻ em",
    amount: 0.95,
    gasUsed: 21000,
    gasFee: 0.002,
    timestamp: "2025-12-07T22:30:00Z",
    status: "success",
    blockNumber: 18233950,
    type: "sent",
  },
  {
    hash: "0x4c7b2f9a5d1e8c3b6f2a9d5c7e1f4b8a3c6d9f2e5a7b",
    from: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    to: "0x1f4b7c2d9e5a3f8c6b1d4e7a9c2f5b8d3a6e9c1f4b7d",
    campaign: "Học bổng cho sinh viên nghèo vượt khó",
    amount: 5.2,
    gasUsed: 0,
    gasFee: 0,
    timestamp: "2025-12-07T16:45:00Z",
    status: "failed",
    blockNumber: null,
    type: "sent",
  },
  {
    hash: "0x7d2f9c5a3b1e8f6a4c2d9f7b5e3a1c8d6f4b2a9c7e5d",
    from: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    to: "0x5a86f1c7b2e3d9a4c8f2b6d1e5a9c3f7b2d8e4a1c6f9",
    campaign: "Thiết bị y tế cho bệnh viện tuyến",
    amount: 2.1,
    gasUsed: 21000,
    gasFee: 0.0022,
    timestamp: "2025-12-07T11:20:00Z",
    status: "success",
    blockNumber: 18233720,
    type: "sent",
  },
  {
    hash: "0x6e4f1c8b3a9d2e7f5a1c4b9d6e2f8a3c7b5d1e9f4a6c",
    from: "0x3d5a7b2c9f1e4d6a8c2e5f7b9d3a1c4e6f8b2d5a7c9e",
    to: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    campaign: "Xây dựng trường học vùng cao",
    amount: 1.5,
    gasUsed: 21000,
    gasFee: 0.0019,
    timestamp: "2025-12-06T20:15:00Z",
    status: "success",
    blockNumber: 18233456,
    type: "received",
  },
  {
    hash: "0x9a2f5c8e1b4d7f3a6c9e2b5d8f1a4c7e3b6d9f2a5c8e",
    from: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    to: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2",
    campaign: "Mổ tim miễn phí cho trẻ em",
    amount: 4.3,
    gasUsed: 21000,
    gasFee: 0.0028,
    timestamp: "2025-12-06T15:40:00Z",
    status: "success",
    blockNumber: 18233280,
    type: "sent",
  },
  {
    hash: "0x1c5e9f2a4b8d3e7f6a2c5d9e1f4b7c3a6e8d2f5a9c1e",
    from: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    to: "0x7f3e9a2c5b1d8f6a4c7e2b9d5a1f3c8e6b4d7a2c9f5e",
    campaign: "Trồng rừng bảo vệ môi trường",
    amount: 0.85,
    gasUsed: 21000,
    gasFee: 0.0017,
    timestamp: "2025-12-05T19:25:00Z",
    status: "success",
    blockNumber: 18232890,
    type: "sent",
  },
  {
    hash: "0x3e7f2a9c5d1b8f4e6a3c9d2e7f5a1c8d4f6b9e2a5c7d",
    from: "0x9e2f5a7c3b1d8f6a4e2c9d7b5a3f1e8c6d4b2a7f9c5e",
    to: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    campaign: "Bữa ăn dinh dưỡng cho trẻ em",
    amount: 2.2,
    gasUsed: 21000,
    gasFee: 0.0021,
    timestamp: "2025-12-05T10:50:00Z",
    status: "success",
    blockNumber: 18232640,
    type: "received",
  },
  {
    hash: "0x8b4f1c7e2a9d5f3c6b1e8d4f7a2c9e5f1b6d3a8c2e7f",
    from: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    to: "0xc8d2e6f9a3b1c5d7e4f2a8b6c9d3e1f5a7b2c8d4e6f9",
    campaign: "Nhà cộng đồng cho người cao tuổi",
    amount: 1.65,
    gasUsed: 21000,
    gasFee: 0.002,
    timestamp: "2025-12-04T16:35:00Z",
    status: "success",
    blockNumber: 18232340,
    type: "sent",
  },
  {
    hash: "0x5d9f2a7c4e1b8f6a3c5d9e2f7a1c4b8d6e3f9a2c5d7e",
    from: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    to: "0x1f4b7c2d9e5a3f8c6b1d4e7a9c2f5b8d3a6e9c1f4b7d",
    campaign: "Học bổng cho sinh viên nghèo vượt khó",
    amount: 3.5,
    gasUsed: 21000,
    gasFee: 0.0024,
    timestamp: "2025-12-04T09:10:00Z",
    status: "success",
    blockNumber: 18232120,
    type: "sent",
  },
  {
    hash: "0x2f7e1a4c9b5d8e3f6a2c7d9f1e4b5c8d3a6e9f2b5c7a",
    from: "0x5a86f1c7b2e3d9a4c8f2b6d1e5a9c3f7b2d8e4a1c6f9",
    to: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    campaign: "Thiết bị y tế cho bệnh viện tuyến",
    amount: 6.8,
    gasUsed: 21000,
    gasFee: 0.003,
    timestamp: "2025-12-03T21:45:00Z",
    status: "success",
    blockNumber: 18231850,
    type: "received",
  },
  {
    hash: "0x9e3f7a2c5d1b8f4e6a3c9d2f7e5a1c8b4d6f9e2a5c7d",
    from: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    to: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2",
    campaign: "Xây dựng trường học vùng cao",
    amount: 1.15,
    gasUsed: 21000,
    gasFee: 0.0018,
    timestamp: "2025-12-03T14:20:00Z",
    status: "success",
    blockNumber: 18231620,
    type: "sent",
  },
  {
    hash: "0x4a8f2c9e1b5d7f3c6a9e2d5f8c1a4e7b3d6f9a2c5e8d",
    from: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    to: "0x7f3e9a2c5b1d8f6a4c7e2b9d5a1f3c8e6b4d7a2c9f5e",
    campaign: "Hỗ trợ khẩn cấp lũ lụt miền Trung",
    amount: 7.5,
    gasUsed: 21000,
    gasFee: 0.0035,
    timestamp: "2025-12-02T18:55:00Z",
    status: "success",
    blockNumber: 18231280,
    type: "sent",
  },
  {
    hash: "0x7c2f9a5e1d4b8f3c6a9d2e5f7c1a4b8e3d6f9a2c5e7d",
    from: "0x3d5a7b2c9f1e4d6a8c2e5f7b9d3a1c4e6f8b2d5a7c9e",
    to: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    campaign: "Mổ tim miễn phí cho trẻ em",
    amount: 0.95,
    gasUsed: 21000,
    gasFee: 0.0017,
    timestamp: "2025-12-02T11:30:00Z",
    status: "success",
    blockNumber: 18231050,
    type: "received",
  },
  {
    hash: "0x6f9e2a5c8d1b4f7e3a6c9d2f5e8a1c4b7d3e6f9a2c5d",
    from: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    to: "0x9e2f5a7c3b1d8f6a4e2c9d7b5a3f1e8c6d4b2a7f9c5e",
    campaign: "Trồng rừng bảo vệ môi trường",
    amount: 2.75,
    gasUsed: 21000,
    gasFee: 0.0023,
    timestamp: "2025-12-01T20:15:00Z",
    status: "success",
    blockNumber: 18230780,
    type: "sent",
  },
  {
    hash: "0x1d8f3a9c5e2b7f4a6c3d9e2f5a8c1b4d7e3f6a9c2e5d",
    from: "0xc8d2e6f9a3b1c5d7e4f2a8b6c9d3e1f5a7b2c8d4e6f9",
    to: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    campaign: "Bữa ăn dinh dưỡng cho trẻ em",
    amount: 4.1,
    gasUsed: 21000,
    gasFee: 0.0026,
    timestamp: "2025-12-01T13:40:00Z",
    status: "success",
    blockNumber: 18230520,
    type: "received",
  },
];

/**
 * RECENT TRANSACTIONS (for live feed)
 */
export const recentTransactions = transactionsHistory.slice(0, 10);

/**
 * BLOCKS DATA
 */
export const blocksData = [
  {
    blockNumber: 18234567,
    timestamp: "2025-12-09T10:30:15Z",
    transactions: 234,
    miner: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    gasUsed: 4920000,
    difficulty: "15.5 T",
  },
  {
    blockNumber: 18234556,
    timestamp: "2025-12-09T10:15:08Z",
    transactions: 189,
    miner: "0x5a86f1c7b2e3d9a4c8f2b6d1e5a9c3f7b2d8e4a1c6f9",
    gasUsed: 3980000,
    difficulty: "15.5 T",
  },
  {
    blockNumber: 18234545,
    timestamp: "2025-12-09T10:00:42Z",
    transactions: 156,
    miner: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2",
    gasUsed: 3290000,
    difficulty: "15.4 T",
  },
  {
    blockNumber: 18234534,
    timestamp: "2025-12-09T09:45:28Z",
    transactions: 201,
    miner: "0x7f3e9a2c5b1d8f6a4c7e2b9d5a1f3c8e6b4d7a2c9f5e",
    gasUsed: 4230000,
    difficulty: "15.4 T",
  },
  {
    blockNumber: 18234523,
    timestamp: "2025-12-09T09:30:11Z",
    transactions: 178,
    miner: "0xc8d2e6f9a3b1c5d7e4f2a8b6c9d3e1f5a7b2c8d4e6f9",
    gasUsed: 3750000,
    difficulty: "15.4 T",
  },
  {
    blockNumber: 18234512,
    timestamp: "2025-12-09T09:15:56Z",
    transactions: 223,
    miner: "0x3d5a7b2c9f1e4d6a8c2e5f7b9d3a1c4e6f8b2d5a7c9e",
    gasUsed: 4690000,
    difficulty: "15.3 T",
  },
  {
    blockNumber: 18234501,
    timestamp: "2025-12-09T09:00:33Z",
    transactions: 165,
    miner: "0x9e2f5a7c3b1d8f6a4e2c9d7b5a3f1e8c6d4b2a7f9c5e",
    gasUsed: 3470000,
    difficulty: "15.3 T",
  },
  {
    blockNumber: 18234490,
    timestamp: "2025-12-09T08:45:19Z",
    transactions: 198,
    miner: "0x1f4b7c2d9e5a3f8c6b1d4e7a9c2f5b8d3a6e9c1f4b7d",
    gasUsed: 4170000,
    difficulty: "15.3 T",
  },
  {
    blockNumber: 18234479,
    timestamp: "2025-12-09T08:30:47Z",
    transactions: 187,
    miner: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    gasUsed: 3940000,
    difficulty: "15.2 T",
  },
  {
    blockNumber: 18234468,
    timestamp: "2025-12-09T08:15:22Z",
    transactions: 211,
    miner: "0x5a86f1c7b2e3d9a4c8f2b6d1e5a9c3f7b2d8e4a1c6f9",
    gasUsed: 4440000,
    difficulty: "15.2 T",
  },
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

export default {
  campaigns,
  stats,
  categories,
  recentTransactions,
  transactionsHistory,
  blocksData,
  donationVolumeData,
  campaignDistributionData,
  donorActivityData,
  nftBadges,
  formatETH,
  formatAddress,
  formatTxHash,
  calculateProgress,
  getCategoryColor,
  formatDate,
  formatTimeAgo,
  formatDateTime,
};
