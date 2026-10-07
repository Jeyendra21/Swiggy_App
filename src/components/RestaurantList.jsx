import React from 'react';
import RestaurantCard from './RestaurantCard';
import { UtensilsCrossed } from 'lucide-react';
import './RestaurantList.css';

export default function RestaurantList({ 
  restaurants, 
  favorites, 
  onToggleFavorite, 
  onSelectRestaurant,
  onResetFilters
}) {
  return (
    <section className="restaurant-section">
      <div className="container">
        <h2 className="restaurant-section-title">
          Top Restaurant Chains in your Area ({restaurants.length})
        </h2>

        {restaurants.length === 0 ? (
          <div className="empty-state">
            <UtensilsCrossed size={48} color="var(--primary)" />
            <h3>No Restaurants Found</h3>
            <p>We couldn't find any match for your active search or filters.</p>
            <button className="reset-filters-btn" onClick={onResetFilters}>
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="restaurant-grid">
            {restaurants.map(rest => (
              <RestaurantCard 
                key={rest.id} 
                restaurant={rest}
                isFavorite={favorites.includes(rest.id)}
                onToggleFavorite={onToggleFavorite}
                onClick={onSelectRestaurant}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
