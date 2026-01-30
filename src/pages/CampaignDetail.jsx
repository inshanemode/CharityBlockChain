import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GlassCard from '../components/base/GlassCard';
import GlassButton from '../components/base/GlassButton';
import useContract from '../hooks/useContract';

const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCampaignInfo } = useContract();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getCampaignInfo(id);
        if (!response.success) {
          throw new Error(response.error || 'Campaign not found');
        }
        setCampaign(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [getCampaignInfo, id]);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2>Đang tải chiến dịch...</h2>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2>Không tìm thấy chiến dịch</h2>
        {error && <p style={{ color: '#b91c1c' }}>{error}</p>}
        <GlassButton onClick={() => navigate('/campaigns')}>Quay lại danh sách</GlassButton>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 24 }}>
      <GlassCard style={{ padding: 32 }}>
        {campaign.image ? (
          <img src={campaign.image} alt={campaign.title} style={{ width: '100%', borderRadius: 16, marginBottom: 24 }} />
        ) : (
          <div
            style={{
              width: '100%',
              borderRadius: 16,
              marginBottom: 24,
              height: 320,
              background: 'linear-gradient(135deg, rgba(17,24,39,0.9), rgba(59,130,246,0.6))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '2.5rem',
              fontWeight: 700,
            }}
          >
            {campaign.title?.slice(0, 2).toUpperCase()}
          </div>
        )}
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>{campaign.title}</h1>
        <p style={{ fontSize: 18, color: '#555', marginBottom: 24 }}>{campaign.description}</p>
        <div style={{ marginBottom: 16 }}>
          <b>Địa chỉ ví:</b> {campaign.contractAddress || campaign.address || 'N/A'}
        </div>
        <div style={{ marginBottom: 16 }}>
          <b>Số tiền đã quyên góp:</b> {campaign.raised} / {campaign.goal} ETH
        </div>
        <GlassButton
          onClick={() => navigate(`/donate?campaign=${campaign.id}`)}
          style={{ background: '#f9a8d4', color: '#fff', fontWeight: 600, border: 'none', boxShadow: 'none' }}
        >
          Quyên góp ngay
        </GlassButton>
      </GlassCard>
    </div>
  );
};

export default CampaignDetail;
