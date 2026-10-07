import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LocationModal from './components/LocationModal';
import CategorySlider from './components/CategorySlider';
import OfferBanners from './components/OfferBanners';
import FilterBar from './components/FilterBar';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import CartDrawer from './components/CartDrawer';
import OrderTracker from './components/OrderTracker';
import Footer from './components/Footer';

import { 
  fetchLocations, 
  fetchCategories, 
  fetchOffers, 
  fetchRestaurants, 
  fetchRestaurantDetail, 
  toggleFavoriteAPI, 
  createOrderAPI 
} from './services/api';
import { LOCATIONS, CATEGORIES } from './data/mockData';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [locationsList, setLocationsList] = useState(LOCATIONS);
  const [currentLocation, setCurrentLocation] = useState(LOCATIONS[0]);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  
  const [categoriesList, setCategoriesList] = useState(CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  
  const [activeFilters, setActiveFilters] = useState({
    fastDelivery: false,
    rating4Plus: false,
    pureVeg: false,
    offers: false
  });
  
  const [sortBy, setSortBy] = useState('relevance');
  const [favorites, setFavorites] = useState(['r2', 'r4']);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  
  const [cartItems, setCartItems] = useState([
    {
      id: 'm101',
      name: 'Meghana Special Chicken Biryani',
      price: 340,
      isVeg: false,
      quantity: 1
    }
  ]);
  const [activeCartRestaurant, setActiveCartRestaurant] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [activeOrder, setActiveOrder] = useState(null);

  // Initial loads from Python API
  useEffect(() => {
    async function initData() {
      const locs = await fetchLocations();
      setLocationsList(locs);
      if (locs.length > 0) setCurrentLocation(locs[0]);

      const cats = await fetchCategories();
      setCategoriesList(cats);
    }
    initData();
  }, []);

  // Fetch restaurants whenever filters/search/sort change
  useEffect(() => {
    let isMounted = true;
    setLoadingRestaurants(true);

    async function loadRestaurants() {
      const data = await fetchRestaurants({
        search: searchQuery,
        category: selectedCategory,
        fastDelivery: activeFilters.fastDelivery,
        rating4Plus: activeFilters.rating4Plus,
        pureVeg: activeFilters.pureVeg,
        offers: activeFilters.offers,
        favoritesOnly: showFavoritesOnly,
        sortBy
      });
      if (isMounted) {
        setRestaurantsList(data);
        setLoadingRestaurants(false);
      }
    }

    const timer = setTimeout(() => {
      loadRestaurants();
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [searchQuery, selectedCategory, activeFilters, sortBy, showFavoritesOnly]);

  // Sync theme with html root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [darkMode]);

  // Cart operations
  const handleAddToCart = (item, restaurant) => {
    if (activeCartRestaurant && activeCartRestaurant.id !== restaurant.id) {
      if (!window.confirm(`Your cart contains items from ${activeCartRestaurant.name}. Replace with items from ${restaurant.name}?`)) {
        return;
      }
      setCartItems([{ ...item, quantity: 1 }]);
      setActiveCartRestaurant(restaurant);
      return;
    }

    setActiveCartRestaurant(restaurant);
    setCartItems(prevItems => {
      const existing = prevItems.find(i => i.id === item.id);
      if (existing) {
        return prevItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(i => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return prevItems.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
      }
      const updated = prevItems.filter(i => i.id !== itemId);
      if (updated.length === 0) {
        setActiveCartRestaurant(null);
      }
      return updated;
    });
  };

  const handleToggleFavorite = async (restId) => {
    setFavorites(prev => 
      prev.includes(restId) ? prev.filter(id => id !== restId) : [...prev, restId]
    );
    await toggleFavoriteAPI(restId);
  };

  const handleToggleFilter = (filterKey) => {
    setActiveFilters(prev => ({ ...prev, [filterKey]: !prev[filterKey] }));
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setActiveFilters({
      fastDelivery: false,
      rating4Plus: false,
      pureVeg: false,
      offers: false
    });
    setSortBy('relevance');
    setShowFavoritesOnly(false);
  };

  const handleOpenRestaurantDetail = async (restaurant) => {
    const fullDetail = await fetchRestaurantDetail(restaurant.id);
    setSelectedRestaurant(fullDetail || restaurant);
  };

  const handleProceedToCheckout = async (billSummary) => {
    const payload = {
      restaurantId: activeCartRestaurant ? activeCartRestaurant.id : 'r1',
      restaurantName: activeCartRestaurant ? activeCartRestaurant.name : 'Meghana Foods',
      items: cartItems,
      bill: billSummary,
      address: `${currentLocation.area}, ${currentLocation.city}`
    };

    const res = await createOrderAPI(payload);

    setActiveOrder({
      orderId: res.orderId || ('SWG-' + Math.floor(10000 + Math.random() * 90000)),
      restaurant: activeCartRestaurant,
      items: cartItems,
      bill: billSummary
    });

    setCartItems([]);
    setActiveCartRestaurant(null);
    setIsCartOpen(false);
    if (selectedRestaurant) setSelectedRestaurant(null);
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-root">
      <Header 
        currentLocation={currentLocation}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenOffers={() => handleToggleFilter('offers')}
      />

      <main>
        <CategorySlider 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <OfferBanners onApplyCoupon={() => setIsCartOpen(true)} />

        <FilterBar 
          activeFilters={activeFilters}
          onToggleFilter={handleToggleFilter}
          sortBy={sortBy}
          onSelectSort={setSortBy}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
        />

        <RestaurantList 
          restaurants={restaurantsList}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectRestaurant={handleOpenRestaurantDetail}
          onResetFilters={handleResetFilters}
        />
      </main>

      <Footer />

      {/* Modals & Drawers */}
      <LocationModal 
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={currentLocation}
        onSelectLocation={setCurrentLocation}
      />

      {selectedRestaurant && (
        <RestaurantDetail 
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
        />
      )}

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        activeRestaurant={activeCartRestaurant}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {activeOrder && (
        <OrderTracker 
          orderDetails={activeOrder}
          onClose={() => setActiveOrder(null)}
        />
      )}
    </div>
  );
}
