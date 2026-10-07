import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import './CategorySlider.css';

export default function CategorySlider({ selectedCategory, onSelectCategory }) {
  const sliderRef = useRef(null);

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="category-section">
      <div className="container">
        <div className="category-header">
          <h2>What's on your mind?</h2>
          <div className="slider-controls">
            <button className="scroll-btn" onClick={() => handleScroll('left')}>
              <ChevronLeft size={20} />
            </button>
            <button className="scroll-btn" onClick={() => handleScroll('right')}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="category-slider" ref={sliderRef}>
          <div 
            className={`category-card ${selectedCategory === 'ALL' ? 'active' : ''}`}
            onClick={() => onSelectCategory('ALL')}
          >
            <div className="category-img-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--primary-light)' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary)' }}>ALL DISHES</span>
            </div>
            <span className="category-name">All Items</span>
          </div>

          {CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.name;
            return (
              <div 
                key={cat.id} 
                className={`category-card ${isActive ? 'active' : ''}`}
                onClick={() => onSelectCategory(isActive ? 'ALL' : cat.name)}
              >
                <div className="category-img-container">
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                </div>
                <span className="category-name">{cat.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
