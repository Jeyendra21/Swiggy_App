import React from 'react';
import { Star, Heart } from 'lucide-react';
import './RestaurantCard.css';

export default function RestaurantCard({ restaurant, isFavorite, onToggleFavorite, onClick }) {
  return (
    <div className="restaurant-card" onClick={() => onClick(restaurant)}>
      <div className="card-img-wrapper">
        <img src={restaurant.image} alt={restaurant.name} loading="lazy" />
        
        {restaurant.promoted && (
          <span className="promoted-tag">AD</span>
        )}

        <button 
          className={`favorite-heart-btn ${isFavorite ? 'is-fav' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(restaurant.id);
          }}
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart size={18} fill={isFavorite ? "#E63946" : "none"} />
        </button>

        {restaurant.discount && (
          <div className="discount-banner-overlay">
            {restaurant.discount}
          </div>
        )}
      </div>

      <div className="card-content">
        <h3 className="restaurant-title">{restaurant.name}</h3>

        <div className="card-meta-row">
          <span className="rating-badge">
            <Star size={11} fill="#FFF" color="#FFF" />
            {restaurant.rating}
          </span>
          <span className="meta-dot"></span>
          <span>{restaurant.deliveryTime}</span>
          <span className="meta-dot"></span>
          <span>₹{restaurant.costForTwo} for two</span>
        </div>

        <div className="cuisines-text">
          {restaurant.cuisines.join(', ')}
        </div>

        <div className="location-text">
          {restaurant.location} • {restaurant.distance}
        </div>
      </div>
    </div>
  );
}
