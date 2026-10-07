import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown, Star, Sparkles, Leaf, Zap, Heart } from 'lucide-react';
import './FilterBar.css';

export default function FilterBar({ 
  activeFilters, 
  onToggleFilter, 
  sortBy, 
  onSelectSort,
  showFavoritesOnly,
  onToggleFavorites
}) {
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const sortLabels = {
    relevance: 'Relevance (Default)',
    rating: 'Rating: High to Low',
    time: 'Delivery Time',
    costLow: 'Cost: Low to High',
    costHigh: 'Cost: High to Low'
  };

  return (
    <div className="filter-container">
      <div className="container filter-wrapper">
        <div className="filter-pills">
          <button 
            className={`filter-btn ${activeFilters.fastDelivery ? 'active' : ''}`}
            onClick={() => onToggleFilter('fastDelivery')}
          >
            <Zap size={14} />
            Fast Delivery
          </button>

          <button 
            className={`filter-btn ${activeFilters.rating4Plus ? 'active' : ''}`}
            onClick={() => onToggleFilter('rating4Plus')}
          >
            <Star size={14} fill={activeFilters.rating4Plus ? 'var(--primary)' : 'none'} />
            Ratings 4.5+
          </button>

          <button 
            className={`filter-btn ${activeFilters.pureVeg ? 'active' : ''}`}
            onClick={() => onToggleFilter('pureVeg')}
          >
            <Leaf size={14} color="var(--veg-color)" />
            Pure Veg
          </button>

          <button 
            className={`filter-btn ${activeFilters.offers ? 'active' : ''}`}
            onClick={() => onToggleFilter('offers')}
          >
            <Sparkles size={14} />
            Offers & Deals
          </button>

          <button 
            className={`filter-btn ${showFavoritesOnly ? 'active' : ''}`}
            onClick={onToggleFavorites}
          >
            <Heart size={14} fill={showFavoritesOnly ? 'var(--primary)' : 'none'} color={showFavoritesOnly ? 'var(--primary)' : 'currentColor'} />
            Favorites
          </button>
        </div>

        <div className="sort-dropdown-container">
          <button 
            className="sort-btn"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
          >
            <SlidersHorizontal size={14} />
            <span>Sort By: {sortLabels[sortBy]}</span>
            <ChevronDown size={14} />
          </button>

          {showSortDropdown && (
            <div className="sort-dropdown" onClick={() => setShowSortDropdown(false)}>
              {Object.entries(sortLabels).map(([key, label]) => (
                <button
                  key={key}
                  className={`sort-option ${sortBy === key ? 'active' : ''}`}
                  onClick={() => onSelectSort(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
