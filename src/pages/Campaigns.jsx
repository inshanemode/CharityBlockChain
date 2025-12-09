import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoSearchOutline } from 'react-icons/io5';
import CampaignCard from '../components/CampaignCard';
import { campaigns, categories } from '../data/mockData';

/**
 * Campaigns Page - Danh sách tất cả chiến dịch với filter và search
 */
const Campaigns = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [displayCount, setDisplayCount] = useState(6);

  // Filter campaigns
  const filteredCampaigns = campaigns.filter((campaign) => {
    // Filter by category
    const categoryMatch = selectedCategory === 'all' || 
      campaign.category.toLowerCase() === selectedCategory.toLowerCase();
    
    // Filter by search term
    const searchMatch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  // Paginated campaigns
  const displayedCampaigns = filteredCampaigns.slice(0, displayCount);
  const hasMore = displayCount < filteredCampaigns.length;

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 6);
  };

  return (
    <div className="bg-white" style={{ fontFamily: 'Inter, "Helvetica Neue", sans-serif' }}>
      <div className="border-b border-gray-100">
        <div className="mx-auto w-full max-w-6xl px-6 py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-medium text-gray-900">Tất cả chiến dịch</h1>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl">
                Khám phá và ủng hộ các chiến dịch từ thiện được ghi nhận trên blockchain.
              </p>
            </div>

            <div className="max-w-2xl">
              <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-md">
                <IoSearchOutline className="text-gray-500" size={20} />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm chiến dịch..."
                  className="w-full bg-transparent text-gray-900 placeholder:text-gray-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`rounded-md border px-4 py-2.5 text-sm font-medium transition-all duration-300 backdrop-blur-md ${
                    selectedCategory === category.id
                      ? 'border-gray-300 bg-white/80 text-gray-900 shadow-md -translate-y-[1px]'
                      : 'border-gray-200 bg-white/50 text-gray-700 hover:bg-white/70 hover:shadow-md hover:-translate-y-[1px]'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-sm text-gray-600"
        >
          Tìm thấy <span className="font-semibold text-gray-900">{filteredCampaigns.length}</span> chiến dịch
        </motion.div>

        {displayedCampaigns.length > 0 ? (
          <>
            <div className="grid gap-6 md:gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
              {displayedCampaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="transition-transform duration-300 hover:-translate-y-[2px]"
                >
                  <CampaignCard {...campaign} />
                </motion.div>
              ))}
            </div>

            {hasMore && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-10 flex justify-center"
              >
                <button
                  onClick={handleLoadMore}
                  className="rounded-md border border-gray-200 bg-white/50 px-5 py-2.5 font-medium text-gray-800 backdrop-blur-md transition-all duration-300 hover:bg-white/70 hover:shadow-md hover:-translate-y-[1px]"
                >
                  Xem thêm ({filteredCampaigns.length - displayCount} còn lại)
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="mx-auto max-w-md space-y-4 rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="text-4xl">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900">Không tìm thấy chiến dịch</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="rounded-md border border-gray-200 bg-white/50 px-5 py-2.5 font-medium text-gray-800 backdrop-blur-md transition-all duration-300 hover:bg-white/70 hover:shadow-md hover:-translate-y-[1px]"
              >
                Reset bộ lọc
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
