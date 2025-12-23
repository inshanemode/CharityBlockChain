import React, { useState, useEffect } from 'react';
import GlassModal from '../components/base/GlassModal';
import { motion } from 'framer-motion';
import { IoSearchOutline } from 'react-icons/io5';
import CampaignCard from '../components/CampaignCard';
import { campaigns as initialCampaigns, categories } from '../data/mockData';

/**
 * Campaigns Page - Danh sách tất cả chiến dịch với filter và search
 */
const Campaigns = () => {
  const [campaigns, setCampaigns] = useState(() => {
    const stored = localStorage.getItem('campaigns');
    return stored ? JSON.parse(stored) : initialCampaigns;
  });
    // Save campaigns to localStorage whenever campaigns change
    useEffect(() => {
      localStorage.setItem('campaigns', JSON.stringify(campaigns));
    }, [campaigns]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [displayCount, setDisplayCount] = useState(6);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    description: '',
    goal: '',
    image: '',
    category: categories[0]?.id || 'education',
  });
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editCampaign, setEditCampaign] = useState(null);

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
                  onClick={() => setIsCreateOpen(true)}
                  className="flex items-center gap-2 rounded-lg bg-white/96 px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-white hover:shadow-md"
                  style={{
                    border: '1px solid rgba(226, 232, 240, 0.9)',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                  }}
                >
                  <span style={{ fontSize: '16px' }}>+</span>
                  Create
                </button>
                      {/* Modal tạo chiến dịch mới */}
                      <GlassModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Tạo chiến dịch mới" size="md">
                        <form
                          onSubmit={e => {
                            e.preventDefault();
                            setCampaigns(prev => [
                              {
                                id: Date.now(),
                                title: newCampaign.title,
                                description: newCampaign.description,
                                  goal: Number((newCampaign.goal + '').replace(',', '.')),
                                image: newCampaign.image,
                                category: newCampaign.category,
                                raised: 0,
                                donors: 0,
                                contractAddress: '',
                                transactions: 0,
                                status: 'active',
                              },
                              ...prev
                            ]);
                            setIsCreateOpen(false);
                            setNewCampaign({ title: '', description: '', goal: '', image: '', category: categories[0]?.id || 'education' });
                          }}
                          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
                        >
                          <label>
                            Tiêu đề
                            <input
                              type="text"
                              value={newCampaign.title}
                              onChange={e => setNewCampaign({ ...newCampaign, title: e.target.value })}
                              required
                              className="w-full rounded border px-3 py-2 mt-1"
                            />
                          </label>
                          <label>
                            Mô tả
                            <textarea
                              value={newCampaign.description}
                              onChange={e => setNewCampaign({ ...newCampaign, description: e.target.value })}
                              required
                              className="w-full rounded border px-3 py-2 mt-1"
                              rows={3}
                            />
                          </label>
                          <label>
                            Số tiền mục tiêu (ETH)
                            <input
                                type="text"
                                value={newCampaign.goal}
                                onChange={e => setNewCampaign({ ...newCampaign, goal: e.target.value })}
                              required
                              min={0.01}
                              step={0.01}
                              className="w-full rounded border px-3 py-2 mt-1"
                            />
                          </label>
                          <label>
                            Ảnh đại diện (URL)
                            <input
                              type="text"
                              value={newCampaign.image}
                              onChange={e => setNewCampaign({ ...newCampaign, image: e.target.value })}
                              className="w-full rounded border px-3 py-2 mt-1"
                            />
                          </label>
                          <label>
                            Danh mục
                            <select
                              value={newCampaign.category}
                              onChange={e => setNewCampaign({ ...newCampaign, category: e.target.value })}
                              className="w-full rounded border px-3 py-2 mt-1"
                            >
                              {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                              ))}
                            </select>
                          </label>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                            <button type="button" onClick={() => setIsCreateOpen(false)} className="rounded px-4 py-2 bg-gray-200 font-medium">Hủy</button>
                            <button type="submit" className="rounded px-4 py-2 bg-blue-500 text-white font-medium">Tạo mới</button>
                          </div>
                        </form>
                      </GlassModal>
                
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
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">Tất cả chiến dịch</h1>
          <p className="text-base text-gray-700">Danh sách các chiến dịch đang hiển thị bên dưới.</p>
        </div>
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
                  <div style={{ position: 'relative' }}>
                    <CampaignCard {...campaign} />
                    <button
                      style={{ position: 'absolute', top: 12, right: 12, zIndex: 2, background: '#f3f4f6', borderRadius: 6, padding: '4px 10px', fontSize: 13, border: '1px solid #e5e7eb', cursor: 'pointer' }}
                      onClick={() => {
                        setEditCampaign(campaign);
                        setIsEditOpen(true);
                      }}
                    >
                      Chỉnh sửa
                    </button>
                  </div>
                </motion.div>
              ))}
                  {/* Modal chỉnh sửa chiến dịch */}
                  <GlassModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Chỉnh sửa chiến dịch" size="md">
                    {editCampaign && (
                      <form
                        onSubmit={e => {
                          e.preventDefault();
                          setCampaigns(prev => prev.map(c =>
                            c.id === editCampaign.id
                              ? {
                                  ...c,
                                  title: editCampaign.title,
                                  description: editCampaign.description,
                                  goal: Number((editCampaign.goal + '').replace(',', '.')),
                                  image: editCampaign.image,
                                  category: editCampaign.category,
                                }
                              : c
                          ));
                          setIsEditOpen(false);
                          setEditCampaign(null);
                        }}
                        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
                      >
                        <label>
                          Tiêu đề
                          <input
                            type="text"
                            value={editCampaign.title}
                            onChange={e => setEditCampaign({ ...editCampaign, title: e.target.value })}
                            required
                            className="w-full rounded border px-3 py-2 mt-1"
                          />
                        </label>
                        <label>
                          Mô tả
                          <textarea
                            value={editCampaign.description}
                            onChange={e => setEditCampaign({ ...editCampaign, description: e.target.value })}
                            required
                            className="w-full rounded border px-3 py-2 mt-1"
                            rows={3}
                          />
                        </label>
                        <label>
                          Số tiền mục tiêu (ETH)
                          <input
                            type="text"
                            value={editCampaign.goal}
                            onChange={e => setEditCampaign({ ...editCampaign, goal: e.target.value })}
                            required
                            min={0.01}
                            step={0.01}
                            className="w-full rounded border px-3 py-2 mt-1"
                          />
                        </label>
                        <label>
                          Ảnh đại diện (URL)
                          <input
                            type="text"
                            value={editCampaign.image}
                            onChange={e => setEditCampaign({ ...editCampaign, image: e.target.value })}
                            className="w-full rounded border px-3 py-2 mt-1"
                          />
                        </label>
                        <label>
                          Danh mục
                          <select
                            value={editCampaign.category}
                            onChange={e => setEditCampaign({ ...editCampaign, category: e.target.value })}
                            className="w-full rounded border px-3 py-2 mt-1"
                          >
                            {categories.map(cat => (
                              <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                          </select>
                        </label>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                          <button type="button" onClick={() => { setIsEditOpen(false); setEditCampaign(null); }} className="rounded px-4 py-2 bg-gray-200 font-medium">Hủy</button>
                          <button type="submit" className="rounded px-4 py-2 bg-blue-500 text-white font-medium">Lưu thay đổi</button>
                        </div>
                      </form>
                    )}
                  </GlassModal>
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
}

export default Campaigns;
