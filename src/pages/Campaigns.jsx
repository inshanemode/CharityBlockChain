import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoSearchOutline } from 'react-icons/io5';
import CampaignCard from '../components/CampaignCard';
import { categories } from '../data/mockData';
import useContract from '../hooks/useContract';

/**
 * Campaigns Page - Fetch real campaigns from blockchain
 */
const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [displayCount, setDisplayCount] = useState(6);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [error, setError] = useState(null);
  const { getAllCampaigns } = useContract();

  // Fetch campaigns from blockchain
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getAllCampaigns();
        if (!response.success) {
          throw new Error(response.error || 'Failed to fetch campaigns');
        }

        const campaignsData = response.data.map((campaign, index) => ({
          ...campaign,
          category: categories[index % categories.length]?.id || 'education',
        }));

        setCampaigns(campaignsData);
      } catch (err) {
        console.error('Error fetching campaigns:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, [getAllCampaigns]);

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
    <div style={{ background: '#f5f5f7', fontFamily: 'Inter, "Helvetica Neue", sans-serif' }}>
      <div className="border-b border-gray-100">
        <div className="mx-auto w-full max-w-6xl px-6 py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="flex items-center gap-2 rounded-lg bg-white/96 px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-white hover:shadow-md"
                  style={{
                    border: '1px solid rgba(226, 232, 240, 0.9)',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                  }}
                >
                  <IoSearchOutline size={16} />
                  Search
                </button>
              </div>

              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex-1 max-w-md"
                >
                  <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-md">
                    <IoSearchOutline className="text-gray-500" size={20} />
                    <input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Tìm kiếm chiến dịch..."
                      className="w-full bg-transparent text-gray-900 placeholder:text-gray-500 focus:outline-none"
                      autoFocus
                    />
                  </div>
                </motion.div>
              )}
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
        <div className="mb-6 space-y-2">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">All Campaigns</h1>
          <p className="text-base text-gray-700">
            {isLoading ? 'Loading campaigns from blockchain...' : 'Campaigns fetched from smart contract'}
          </p>
        </div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4"
          >
            <p className="text-sm text-red-800">
              <strong>Error:</strong> {error}
            </p>
            <p className="mt-2 text-xs text-red-600">
              Make sure you have MetaMask installed and the contract is deployed to the correct network.
            </p>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
            <p className="text-gray-600">Fetching campaigns from blockchain...</p>
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 text-sm text-gray-600"
            >
              Found <span className="font-semibold text-gray-900">{filteredCampaigns.length}</span> campaigns
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
                  Load More ({filteredCampaigns.length - displayCount} remaining)
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
              <h3 className="text-lg font-semibold text-gray-900">No Campaigns Found</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {campaigns.length === 0 
                  ? 'No campaigns have been created yet on this contract.' 
                  : 'Try changing your search filters.'}
              </p>
              {filteredCampaigns.length === 0 && campaigns.length > 0 && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="rounded-md border border-gray-200 bg-white/50 px-5 py-2.5 font-medium text-gray-800 backdrop-blur-md transition-all duration-300 hover:bg-white/70 hover:shadow-md hover:-translate-y-[1px]"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </motion.div>
        )}
          </>
        )}
      </div>
    </div>
  );
}

export default Campaigns;
