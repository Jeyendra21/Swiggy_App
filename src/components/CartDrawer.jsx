import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Tag, ArrowRight, Check } from 'lucide-react';
import { COUPONS } from '../data/mockData';
import './CartDrawer.css';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  activeRestaurant,
  onAddToCart, 
  onRemoveFromCart,
  onProceedToCheckout
}) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const itemTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = itemTotal > 0 ? (itemTotal > 500 ? 0 : 35) : 0;
  const taxes = itemTotal > 0 ? Math.round(itemTotal * 0.05) : 0;

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = Math.min(Math.round((itemTotal * appliedCoupon.value) / 100), appliedCoupon.maxDiscount);
    } else if (appliedCoupon.discountType === 'flat') {
      discount = appliedCoupon.value;
    } else if (appliedCoupon.discountType === 'delivery') {
      discount = deliveryFee;
    }
  }

  const grandTotal = Math.max(0, itemTotal + deliveryFee + taxes - discount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const codeUpper = couponCode.trim().toUpperCase();
    const found = COUPONS.find(c => c.code === codeUpper);

    if (!found) {
      setCouponError('Invalid Coupon Code');
      return;
    }

    if (itemTotal < found.minOrder) {
      setCouponError(`Minimum order amount ₹${found.minOrder} required for ${codeUpper}`);
      return;
    }

    setAppliedCoupon(found);
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>
            <ShoppingBag size={20} color="var(--primary)" />
            Your Cart
          </h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart-view">
            <ShoppingBag size={56} color="var(--text-muted)" />
            <h4>Your cart is empty</h4>
            <p>Good food is always waiting for you. Add items from your favorite restaurants!</p>
          </div>
        ) : (
          <>
            {activeRestaurant && (
              <div className="cart-restaurant-banner">
                <div>
                  <h4>{activeRestaurant.name}</h4>
                  <p>{activeRestaurant.location}</p>
                </div>
              </div>
            )}

            <div className="cart-body">
              <div className="cart-items-list">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item-row">
                    <div className="cart-item-info">
                      <span className={item.isVeg ? "veg-icon" : "non-veg-icon"} />
                      <div>
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-price">₹{item.price} x {item.quantity}</div>
                      </div>
                    </div>

                    <div className="cart-qty-controls">
                      <button className="cart-qty-btn" onClick={() => onRemoveFromCart(item.id)}>
                        <Minus size={13} />
                      </button>
                      <span className="cart-qty-num">{item.quantity}</span>
                      <button className="cart-qty-btn" onClick={() => onAddToCart(item, activeRestaurant)}>
                        <Plus size={13} />
                      </button>
                    </div>

                    <div style={{ fontWeight: 800, fontSize: '14px', width: '60px', textAlign: 'right' }}>
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="coupon-section">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700 }}>
                  <Tag size={15} color="var(--primary)" />
                  <span>Apply Coupon</span>
                </div>

                {appliedCoupon ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px', background: 'var(--badge-green-bg)', padding: '8px 12px', borderRadius: '6px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--badge-green)' }}>
                      <Check size={14} style={{ display: 'inline', marginRight: '4px' }} />
                      Code {appliedCoupon.code} Applied (-₹{discount})
                    </div>
                    <button style={{ fontSize: '11px', color: '#E46D47', fontWeight: 700 }} onClick={() => setAppliedCoupon(null)}>
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="coupon-input-wrapper">
                    <input 
                      type="text" 
                      placeholder="e.g. SWIGGY50"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button type="submit" className="apply-coupon-btn">APPLY</button>
                  </form>
                )}

                {couponError && (
                  <div style={{ fontSize: '11px', color: '#E46D47', marginTop: '6px', fontWeight: 600 }}>
                    {couponError}
                  </div>
                )}
              </div>

              <div className="bill-details-card">
                <div className="bill-title">Bill Details</div>
                
                <div className="bill-row">
                  <span>Item Total</span>
                  <span>₹{itemTotal}</span>
                </div>

                <div className="bill-row">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? <span style={{ color: 'var(--veg-color)', fontWeight: 700 }}>FREE</span> : `₹${deliveryFee}`}</span>
                </div>

                <div className="bill-row">
                  <span>GSt and Restaurant Charges</span>
                  <span>₹{taxes}</span>
                </div>

                {discount > 0 && (
                  <div className="bill-row" style={{ color: 'var(--veg-color)', fontWeight: 700 }}>
                    <span>Discount Applied</span>
                    <span>-₹{discount}</span>
                  </div>
                )}

                <div className="bill-row total">
                  <span>TO PAY</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>
            </div>

            <div className="cart-footer">
              <button 
                className="checkout-btn"
                onClick={() => onProceedToCheckout({ grandTotal, itemTotal, discount })}
              >
                <div>
                  <div style={{ fontSize: '11px', opacity: 0.9 }}>{cartItems.length} ITEMS</div>
                  <div>₹{grandTotal}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>PROCEED TO PAY</span>
                  <ArrowRight size={18} />
                </div>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
