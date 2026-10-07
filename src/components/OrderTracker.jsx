import React, { useState, useEffect } from 'react';
import { Check, Clock, Bike, Phone, X, MapPin, ChefHat, PackageCheck, Home } from 'lucide-react';
import './OrderTracker.css';

export default function OrderTracker({ orderDetails, onClose }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 mins in seconds

  const stages = [
    { title: 'Order Confirmed', desc: 'Restaurant has accepted your order', icon: Check },
    { title: 'Preparing Food', desc: 'Chef is cooking your fresh meal', icon: ChefHat },
    { title: 'Valet Assigned', desc: 'Rajesh (Swiggy Delivery Partner) arrived at restaurant', icon: Bike },
    { title: 'Out for Delivery', desc: 'Valet is on the way to your location', icon: PackageCheck },
    { title: 'Order Delivered', desc: 'Enjoy your meal!', icon: Home }
  ];

  useEffect(() => {
    // Advance stage every 5 seconds for simulation demonstration
    const stageTimer = setInterval(() => {
      setCurrentStage(prev => (prev < stages.length - 1 ? prev + 1 : prev));
    }, 6000);

    const countdown = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(stageTimer);
      clearInterval(countdown);
    };
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!orderDetails) return null;

  return (
    <div className="tracker-modal-overlay" onClick={onClose}>
      <div className="tracker-container" onClick={(e) => e.stopPropagation()}>
        <div className="tracker-header">
          <div className="tracker-header-title">
            <h3>Live Order Status</h3>
            <span className="order-id-badge">Order #{orderDetails.orderId || 'SWG-84920'}</span>
          </div>

          <div className="tracker-timer-box">
            <div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>ESTIMATED DELIVERY TIME</div>
              <div className="timer-count">{formatTime(timeLeft)} Mins</div>
            </div>
            <Clock size={32} style={{ opacity: 0.8 }} />
          </div>
        </div>

        <div className="tracker-body">
          <div className="map-placeholder">
            <div className="map-pulse-dot" style={{ top: '40%', left: '45%' }} />
            <div className="map-overlay-text">
              <MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />
              Live Delivery Tracking active
            </div>
          </div>

          <div className="timeline-list">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isCompleted = idx < currentStage;
              const isActive = idx === currentStage;

              return (
                <div 
                  key={idx} 
                  className={`timeline-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                >
                  <div className="step-icon-wrapper">
                    <Icon size={14} />
                  </div>
                  <div className="step-info">
                    <h5>{stage.title}</h5>
                    <p>{stage.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="driver-card">
            <div className="driver-info">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
                alt="Delivery Partner"
                className="driver-avatar" 
              />
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: 800 }}>Rajesh Kumar</h5>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Swiggy Executive (Vaccinated)</p>
              </div>
            </div>

            <button className="call-driver-btn" onClick={() => alert('Calling delivery partner Rajesh at +91 98765 43210')}>
              <Phone size={14} />
              Call Executive
            </button>
          </div>

          <button 
            style={{ width: '100%', marginTop: '20px', padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', fontWeight: 700, color: 'var(--text-primary)', cursor: 'pointer' }}
            onClick={onClose}
          >
            Back to Swiggy Home
          </button>
        </div>
      </div>
    </div>
  );
}
