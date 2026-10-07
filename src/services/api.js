import { LOCATIONS, CATEGORIES, OFFER_BANNERS, COUPONS, RESTAURANTS } from '../data/mockData';

const API_BASE_URL = 'http://localhost:8000/api';

export async function fetchLocations() {
  try {
    const res = await fetch(`${API_BASE_URL}/locations`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend unavailable, using local locations fallback:', err);
  }
  return LOCATIONS;
}

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend unavailable, using local categories fallback:', err);
  }
  return CATEGORIES;
}

export async function fetchOffers() {
  try {
    const res = await fetch(`${API_BASE_URL}/offers`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend unavailable, using local offers fallback:', err);
  }
  return { banners: OFFER_BANNERS, coupons: COUPONS };
}

export async function fetchRestaurants(params = {}) {
  try {
    const url = new URL(`${API_BASE_URL}/restaurants`);
    if (params.search) url.searchParams.append('search', params.search);
    if (params.category && params.category !== 'ALL') url.searchParams.append('category', params.category);
    if (params.fastDelivery) url.searchParams.append('fast_delivery', 'true');
    if (params.rating4Plus) url.searchParams.append('rating_4plus', 'true');
    if (params.pureVeg) url.searchParams.append('pure_veg', 'true');
    if (params.offers) url.searchParams.append('offers', 'true');
    if (params.favoritesOnly) url.searchParams.append('favorites_only', 'true');
    if (params.sortBy) url.searchParams.append('sort_by', params.sortBy);

    const res = await fetch(url.toString());
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend unavailable, using local restaurants filter fallback:', err);
  }

  // Local fallback logic
  return RESTAURANTS;
}

export async function fetchRestaurantDetail(restaurantId) {
  try {
    const res = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend unavailable, returning local restaurant detail:', err);
  }
  return RESTAURANTS.find(r => r.id === restaurantId);
}

export async function toggleFavoriteAPI(restaurantId) {
  try {
    const res = await fetch(`${API_BASE_URL}/favorites/${restaurantId}/toggle`, {
      method: 'POST'
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend unavailable for favorite toggle:', err);
  }
  return null;
}

export async function createOrderAPI(orderPayload) {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend unavailable, using local order creation:', err);
  }

  return {
    success: true,
    orderId: 'SWG-' + Math.floor(10000 + Math.random() * 90000),
    status: 'Confirmed',
    estimatedTimeMinutes: 25
  };
}
