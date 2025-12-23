import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mockData from '../data/mockData';
import GlassCard from '../components/base/GlassCard';
import GlassButton from '../components/base/GlassButton';

const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Lấy danh sách campaigns từ localStorage nếu có, nếu không thì lấy từ mockData
  let campaigns = mockData.campaigns;
  try {
    const stored = localStorage.getItem('campaigns');
    if (stored) {
      campaigns = JSON.parse(stored);
    }
  } catch (e) {}
  const campaign = campaigns?.find(c => String(c.id) === String(id));

  if (!campaign) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2>Không tìm thấy chiến dịch</h2>
        <GlassButton onClick={() => navigate('/campaigns')}>Quay lại danh sách</GlassButton>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 24 }}>
      <GlassCard style={{ padding: 32 }}>
        <img src={campaign.image} alt={campaign.title} style={{ width: '100%', borderRadius: 16, marginBottom: 24 }} />
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>{campaign.title}</h1>
        <p style={{ fontSize: 18, color: '#555', marginBottom: 24 }}>{campaign.description}</p>
        <div style={{ marginBottom: 16 }}>
          <b>Địa chỉ ví:</b> {campaign.contractAddress || campaign.address || 'N/A'}
        </div>
        <div style={{ marginBottom: 16 }}>
          <b>Số tiền đã quyên góp:</b> {campaign.raised} / {campaign.goal} ETH
        </div>
        <GlassButton
          onClick={() => navigate('/donate')}
          style={{ background: '#f9a8d4', color: '#fff', fontWeight: 600, border: 'none', boxShadow: 'none' }}
        >
          Quyên góp ngay
        </GlassButton>
      </GlassCard>
    </div>
  );
};

export default CampaignDetail;
