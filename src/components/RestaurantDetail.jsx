import React, { useState } from 'react';
import { X, Star, Clock, MapPin, Search, Sparkles, Plus, Minus } from 'lucide-react';
import './RestaurantDetail.css';

export default function RestaurantDetail({ 
  restaurant, 
  onClose, 
  cartItems, 
  onAddToCart, 
  onRemoveFromCart 
}) {
  const [vegOnly, setVegOnly] = useState(false);
  const [menuSearch, setMenuSearch] = useState('');

  if (!restaurant) return null;

  const getItemQuantity = (itemId) => {
    const found = cartItems.find(item => item.id === itemId);
    return found ? found.quantity : 0;
  };

  return (
    <div className="detail-modal-overlay" onClick={onClose}>
      <div className="detail-container" onClick={(e) => e.stopPropagation()}>
        <button className="detail-close-btn" onClick={onClose} title="Close Menu">
          <X size={20} />
        </button>

        <div className="restaurant-hero-header">
          <img src={restaurant.image} alt={restaurant.name} />
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1 className="hero-title">{restaurant.name}</h1>
            <div className="hero-meta">
              <span className="rating-badge">
                <Star size={12} fill="#FFF" color="#FFF" />
                {restaurant.rating} ({restaurant.ratingCount})
              </span>
              <span>•</span>
              <span>{restaurant.cuisines.join(', ')}</span>
              <span>•</span>
              <span>₹{restaurant.costForTwo} for two</span>
            </div>
          </div>
        </div>

        <div className="detail-body">
          <div className="restaurant-info-card">
            <div className="info-item">
              <Clock size={16} color="var(--primary)" />
              <span>{restaurant.deliveryTime} delivery time</span>
            </div>
            <div className="info-item">
              <MapPin size={16} color="var(--primary)" />
              <span>{restaurant.address}</span>
            </div>
            {restaurant.discount && (
              <div className="info-item" style={{ color: 'var(--primary)', fontWeight: 700 }}>
                <Sparkles size={16} />
                <span>{restaurant.discount}</span>
              </div>
            )}
          </div>

          <div className="menu-controls">
            <label className="veg-toggle-label">
              <span className="veg-icon" />
              <span>Pure Veg Only</span>
              <div className="switch">
                <input 
                  type="checkbox" 
                  checked={vegOnly} 
                  onChange={(e) => setVegOnly(e.target.checked)} 
                />
                <span className="slider" />
              </div>
            </label>

            <div className="menu-search-input">
              <Search size={16} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder="Search in menu..."
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
              />
            </div>
          </div>

          {restaurant.menu.map((categoryGroup, index) => {
            const filteredItems = categoryGroup.items.filter(item => {
              const matchesVeg = vegOnly ? item.isVeg : true;
              const matchesSearch = item.name.toLowerCase().includes(menuSearch.toLowerCase()) || 
                                    item.description.toLowerCase().includes(menuSearch.toLowerCase());
              return matchesVeg && matchesSearch;
            });

            if (filteredItems.length === 0) return null;

            return (
              <div key={index} className="menu-category-block">
                <h3 className="menu-category-title">
                  {categoryGroup.category} ({filteredItems.length})
                </h3>

                <div className="menu-items-list">
                  {filteredItems.map(item => {
                    const qty = getItemQuantity(item.id);
                    return (
                      <div key={item.id} className="menu-item-card">
                        <div className="menu-item-left">
                          <div>
                            <span className={item.isVeg ? "veg-icon" : "non-veg-icon"} />
                            {item.isBestseller && (
                              <span className="bestseller-badge" style={{ marginLeft: '8px' }}>
                                <Sparkles size={12} /> BESTSELLER
                              </span>
                            )}
                          </div>

                          <h4 className="item-name">{item.name}</h4>
                          <span className="item-price">₹{item.price}</span>
                          <p className="item-desc">{item.description}</p>
                        </div>

                        <div className="menu-item-right">
                          <img src={item.image} alt={item.name} className="item-img" loading="lazy" />

                          <div className="add-btn-wrapper">
                            {qty === 0 ? (
                              <button 
                                className="add-btn-single"
                                onClick={() => onAddToCart(item, restaurant)}
                              >
                                ADD
                              </button>
                            ) : (
                              <>
                                <button 
                                  className="qty-counter-btn"
                                  onClick={() => onRemoveFromCart(item.id)}
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="qty-number">{qty}</span>
                                <button 
                                  className="qty-counter-btn"
                                  onClick={() => onAddToCart(item, restaurant)}
                                >
                                  <Plus size={14} />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
