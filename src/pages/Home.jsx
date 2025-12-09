import React from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignCard from '../components/CampaignCard';
import { campaigns, stats } from '../data/mockData';

const glassButtonStyle = {
  background: 'rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(12px)',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '10px 16px',
  fontWeight: 600,
  color: '#1f2937',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.05)',
};

const Home = () => {
  const navigate = useNavigate();
  const featuredCampaigns = campaigns.slice(0, 6);

  return (
    <div style={{ background: '#ffffff', color: '#0f172a', fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '72px 20px 48px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center',
        }}
      >
        <div>
          <p style={{ fontSize: '0.95rem', color: '#6b7280', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Blockchain Charity
          </p>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 40px)',
              fontWeight: 500,
              color: '#111827',
              lineHeight: 1.25,
              marginBottom: '16px',
            }}
          >
            Minh bạch, tối giản và dễ dùng cho mọi chiến dịch từ thiện.
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#4b5563', lineHeight: 1.7, marginBottom: '24px', maxWidth: '640px' }}>
            Theo dõi mọi giao dịch trên blockchain, quản lý chiến dịch rõ ràng và kết nối nhà hảo tâm qua trải nghiệm tối giản lấy cảm hứng từ kyu-core.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              style={glassButtonStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.7)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(15,23,42,0.08)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.5)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,23,42,0.05)';
              }}
              onClick={() => navigate('/donate')}
            >
              Bắt đầu quyên góp
            </button>
            <button
              style={glassButtonStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.7)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(15,23,42,0.08)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.5)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,23,42,0.05)';
              }}
              onClick={() => navigate('/campaigns')}
            >
              Xem chiến dịch
            </button>
          </div>
        </div>

        <div
          style={{
            background: '#ffffff',
            border: '1px solid #f3f4f6',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: '0 20px 60px rgba(15, 23, 42, 0.08)',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '20px',
          }}
        >
          {[
            { label: 'Tổng quyên góp', value: `${stats.totalDonations.toFixed(2)} ETH` },
            { label: 'Tổng giao dịch', value: stats.totalTransactions.toLocaleString() },
            { label: 'Chiến dịch đang chạy', value: stats.activeCampaigns },
            { label: 'Người đóng góp', value: stats.uniqueDonors },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: '#fff',
                border: '1px solid #f3f4f6',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(15, 23, 42, 0.08)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(15, 23, 42, 0.04)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '8px' }}>{item.label}</p>
              <p style={{ color: '#111827', fontSize: '1.4rem', fontWeight: 600 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px 64px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 32px)', fontWeight: 500, color: '#111827', marginBottom: '12px' }}>
            Chiến dịch đang hoạt động
          </h2>
          <p style={{ color: '#4b5563', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Khám phá các chiến dịch minh bạch với đầy đủ thông tin và tiến độ.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
          }}
        >
          {featuredCampaigns.map((campaign) => (
            <div key={campaign.id} style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
              <CampaignCard {...campaign} />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '36px' }}>
          <button
            style={glassButtonStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.7)';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(15,23,42,0.08)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.5)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,23,42,0.05)';
            }}
            onClick={() => navigate('/campaigns')}
          >
            Xem tất cả chiến dịch →
          </button>
        </div>
      </section>

      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px 88px' }}>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #f3f4f6',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: 'clamp(26px, 4vw, 30px)', fontWeight: 500, color: '#111827', marginBottom: '12px' }}>
            Bạn cần hỗ trợ quyên góp?
          </h3>
          <p style={{ color: '#4b5563', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '620px', margin: '0 auto 20px' }}>
            Tạo chiến dịch từ thiện với quy trình rõ ràng, kiểm soát minh bạch và giao diện tối giản để người ủng hộ tin tưởng.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              style={glassButtonStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.7)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(15,23,42,0.08)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.5)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,23,42,0.05)';
              }}
              onClick={() => navigate('/donate')}
            >
              Tạo chiến dịch mới
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
