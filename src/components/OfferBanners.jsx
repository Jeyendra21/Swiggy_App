import React, { useState } from 'react';
import { Tag, Check } from 'lucide-react';
import { OFFER_BANNERS } from '../data/mockData';
import './OfferBanners.css';

export default function OfferBanners({ onApplyCoupon }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (banner) => {
    setCopiedId(banner.id);
    if (onApplyCoupon) {
      onApplyCoupon('SWIGGY50');
    }
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="offers-section">
      <div className="container">
        <div className="offers-grid">
          {OFFER_BANNERS.map(banner => (
            <div 
              key={banner.id} 
              className="banner-card"
              style={{ background: banner.bgGradient }}
              onClick={() => handleCopy(banner)}
            >
              <div className="banner-content">
                <span className="banner-tag">{banner.tag}</span>
                <h3 className="banner-title">{banner.title}</h3>
                <p className="banner-subtitle">{banner.subtitle}</p>
                <button className="copy-coupon-btn">
                  {copiedId === banner.id ? (
                    <>
                      <Check size={14} color="var(--primary)" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Tag size={14} />
                      Claim Offer
                    </>
                  )}
                </button>
              </div>

              <div className="banner-img-wrapper">
                <img src={banner.image} alt={banner.title} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
