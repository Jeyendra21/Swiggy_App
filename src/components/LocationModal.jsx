import React, { useState } from 'react';
import { MapPin, X, Navigation, Search, Check } from 'lucide-react';
import { LOCATIONS } from '../data/mockData';
import './LocationModal.css';

export default function LocationModal({ isOpen, onClose, currentLocation, onSelectLocation }) {
  const [filter, setFilter] = useState('');

  if (!isOpen) return null;

  const filteredLocations = LOCATIONS.filter(loc => 
    loc.area.toLowerCase().includes(filter.toLowerCase()) || 
    loc.city.toLowerCase().includes(filter.toLowerCase()) ||
    loc.landmark.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Choose Delivery Location</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="location-search-box">
            <Search size={18} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search area, landmark or city..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              autoFocus
            />
          </div>

          <button 
            className="gps-btn"
            onClick={() => {
              onSelectLocation({ id: 'current', area: 'Koramangala 4th Block', city: 'Bengaluru (GPS Detected)', landmark: 'Current Location' });
              onClose();
            }}
          >
            <Navigation size={18} />
            <div>
              <span>Use Current GPS Location</span>
              <div style={{ fontSize: '11px', opacity: 0.8, fontWeight: 400 }}>Using high accuracy location</div>
            </div>
          </button>

          <div className="location-list-title">Saved & Popular Locations</div>

          <div className="location-list">
            {filteredLocations.map(loc => {
              const isSelected = currentLocation.id === loc.id || currentLocation.area === loc.area;
              return (
                <div 
                  key={loc.id} 
                  className={`location-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    onSelectLocation(loc);
                    onClose();
                  }}
                >
                  <MapPin size={18} color={isSelected ? 'var(--primary)' : 'var(--text-muted)'} style={{ marginTop: '2px' }} />
                  <div className="loc-info" style={{ flex: 1 }}>
                    <h4>{loc.area}</h4>
                    <p>{loc.landmark}, {loc.city}</p>
                  </div>
                  {isSelected && <Check size={18} color="var(--primary)" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
