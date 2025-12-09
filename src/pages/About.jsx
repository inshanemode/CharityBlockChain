import React from 'react';
import { motion } from 'framer-motion';
import {
  IoEyeOutline,
  IoLockClosedOutline,
  IoCashOutline,
  IoFlashOutline,
  IoWalletOutline,
  IoHeartOutline,
  IoSendOutline,
  IoCheckmarkCircleOutline,
} from 'react-icons/io5';
import { SiEthereum, SiSolidity, SiReact, SiIpfs } from 'react-icons/si';

const cardBaseStyle = {
  background: '#ffffff',
  border: '1px solid #f3f4f6',
  borderRadius: '14px',
  padding: '24px',
  boxShadow: '0 20px 60px rgba(15, 23, 42, 0.08)',
};

const About = () => {
  const benefits = [
    { icon: IoEyeOutline, title: 'Minh bạch 100%', description: 'Mọi giao dịch được ghi nhận công khai trên blockchain' },
    { icon: IoLockClosedOutline, title: 'Không thể thay đổi', description: 'Dữ liệu không thể bị sửa đổi hoặc xóa' },
    { icon: IoCashOutline, title: 'Chi phí thấp', description: 'Phí giao dịch tối thiểu, không trung gian' },
    { icon: IoFlashOutline, title: 'Trực tiếp', description: 'Tiền đến tay người cần ngay lập tức' },
  ];

  const steps = [
    { number: 1, icon: IoWalletOutline, title: 'Kết nối ví', description: 'Kết nối ví Metamask của bạn' },
    { number: 2, icon: IoHeartOutline, title: 'Chọn chiến dịch', description: 'Tìm chiến dịch bạn muốn hỗ trợ' },
    { number: 3, icon: IoSendOutline, title: 'Quyên góp', description: 'Gửi ETH trực tiếp đến smart contract' },
    { number: 4, icon: IoCheckmarkCircleOutline, title: 'Xác nhận', description: 'Giao dịch được ghi nhận vĩnh viễn' },
  ];

  const techStack = [
    { name: 'Ethereum', icon: SiEthereum },
    { name: 'Solidity', icon: SiSolidity },
    { name: 'React', icon: SiReact },
    { name: 'IPFS', icon: SiIpfs },
  ];

  return (
    <div style={{ background: '#ffffff', color: '#111827', fontFamily: "'Inter', 'Helvetica Neue', sans-serif", padding: '64px 20px 88px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ ...cardBaseStyle, textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ width: '88px', height: '88px', margin: '0 auto 20px', borderRadius: '16px', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 30px rgba(15, 23, 42, 0.06)' }}>
            <SiEthereum size={48} color="#111827" />
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 40px)', fontWeight: 500, color: '#0f172a', marginBottom: '12px' }}>
            Về chúng tôi
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#4b5563', lineHeight: 1.7, maxWidth: '740px', margin: '0 auto' }}>
            Chúng tôi tin vào sự minh bạch tuyệt đối trong từ thiện thông qua công nghệ blockchain, với giao diện tối giản và rõ ràng.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 32px)', fontWeight: 500, color: '#0f172a', textAlign: 'center', marginBottom: '28px' }}>
            Tại sao chọn Blockchain Charity?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                  style={{
                    background: '#fff',
                    border: '1px solid #f3f4f6',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 16px 40px rgba(15, 23, 42, 0.06)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(15, 23, 42, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(15, 23, 42, 0.06)';
                  }}
                >
                  <div style={{ width: '52px', height: '52px', background: '#f9fafb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', boxShadow: '0 10px 24px rgba(15, 23, 42, 0.05)' }}>
                    <Icon size={26} color="#111827" />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>{benefit.title}</h3>
                  <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.6 }}>{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 32px)', fontWeight: 500, color: '#0f172a', textAlign: 'center', marginBottom: '28px' }}>
            Cách hoạt động
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + index * 0.05 }}
                  style={{
                    background: '#fff',
                    border: '1px solid #f3f4f6',
                    borderRadius: '12px',
                    padding: '22px',
                    textAlign: 'center',
                    boxShadow: '0 16px 40px rgba(15, 23, 42, 0.06)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(15, 23, 42, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(15, 23, 42, 0.06)';
                  }}
                >
                  <div style={{ width: '64px', height: '64px', margin: '0 auto 12px', borderRadius: '50%', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#111827', boxShadow: '0 12px 30px rgba(15, 23, 42, 0.06)' }}>
                    {step.number}
                  </div>
                  <Icon size={28} color="#111827" style={{ marginBottom: '10px' }} />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>{step.title}</h3>
                  <p style={{ fontSize: '0.98rem', color: '#4b5563', lineHeight: 1.6 }}>{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 32px)', fontWeight: 500, color: '#0f172a', textAlign: 'center', marginBottom: '24px' }}>
            Công nghệ sử dụng
          </h2>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {techStack.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 + index * 0.05 }}
                  style={{
                    background: 'rgba(255,255,255,0.6)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '10px',
                    padding: '12px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 12px 30px rgba(15, 23, 42, 0.05)',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 18px 40px rgba(15, 23, 42, 0.08)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.75)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(15, 23, 42, 0.05)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.6)';
                  }}
                >
                  <Icon size={22} color="#111827" />
                  <span style={{ fontSize: '1rem', fontWeight: 600, color: '#111827' }}>{tech.name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
