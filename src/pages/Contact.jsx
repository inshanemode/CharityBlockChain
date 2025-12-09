import React from 'react';

const Contact = () => {
  return (
    <div style={{ padding: '3rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', color: '#111827' }}>
        Contact Us
      </h1>
      <p style={{ fontSize: '1.125rem', lineHeight: 1.7, color: '#4b5563', maxWidth: '800px', marginBottom: '2rem' }}>
        Have questions or want to get involved? We'd love to hear from you.
      </p>
      <div style={{ fontSize: '1rem', color: '#6b7280' }}>
        <p><strong>Email:</strong> contact@blockcharity.example</p>
        <p><strong>Support:</strong> support@blockcharity.example</p>
      </div>
    </div>
  );
};

export default Contact;
