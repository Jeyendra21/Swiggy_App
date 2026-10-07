import React from 'react';
import { 
  MapPin, 
  Search, 
  Percent, 
  ShoppingBag, 
  User, 
  Sun, 
  Moon, 
  ChevronDown, 
  UtensilsCrossed 
} from 'lucide-react';
import './Header.css';

export default function Header({ 
  currentLocation, 
  onOpenLocationModal, 
  searchQuery, 
  setSearchQuery, 
  cartCount, 
  cartTotal,
  onOpenCart,
  darkMode,
  setDarkMode,
  onOpenOffers
}) {
  return (
    <header className="header-container">
      <div className="container header-content">
        <div className="header-left">
          <div className="logo-wrapper" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="logo-icon">
              <UtensilsCrossed size={24} />
            </div>
            <span className="logo-text">swiggy</span>
          </div>

          <div className="location-picker" onClick={onOpenLocationModal} title="Change Location">
            <span className="loc-title">
              <MapPin size={15} />
              {currentLocation.area}
            </span>
            <span className="loc-address">{currentLocation.city}</span>
            <ChevronDown size={14} color="var(--primary)" />
          </div>
        </div>

        <div className="header-center">
          <div className="search-box">
            <Search size={18} color="var(--text-muted)" />
            <input 
              type="text"
              placeholder="Search for restaurants, dishes or cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                style={{ fontSize: '12px', color: 'var(--text-muted)', background: 'none' }}
                onClick={() => setSearchQuery('')}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="header-right">
          <button className="nav-item" onClick={onOpenOffers}>
            <Percent size={18} />
            <span className="nav-text">Offers</span>
          </button>

          <button className="theme-toggle-btn" onClick={() => setDarkMode(!darkMode)} title="Toggle Theme">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button className="cart-btn" onClick={onOpenCart}>
            <ShoppingBag size={19} />
            <span className="cart-text">Cart</span>
            {cartCount > 0 ? (
              <div className="cart-count-badge">{cartCount}</div>
            ) : null}
            {cartTotal > 0 && <span style={{ fontSize: '13px', opacity: 0.9 }}>₹{cartTotal}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
