export const CATEGORIES = [
  {
    id: 'c1',
    name: 'Biryani',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80',
    keyword: 'biryani'
  },
  {
    id: 'c2',
    name: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&auto=format&fit=crop&q=80',
    keyword: 'pizza'
  },
  {
    id: 'c3',
    name: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop&q=80',
    keyword: 'burger'
  },
  {
    id: 'c4',
    name: 'North Indian',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&auto=format&fit=crop&q=80',
    keyword: 'north indian'
  },
  {
    id: 'c5',
    name: 'South Indian',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=300&auto=format&fit=crop&q=80',
    keyword: 'south indian'
  },
  {
    id: 'c6',
    name: 'Chinese',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&auto=format&fit=crop&q=80',
    keyword: 'chinese'
  },
  {
    id: 'c7',
    name: 'Desserts',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=300&auto=format&fit=crop&q=80',
    keyword: 'dessert'
  },
  {
    id: 'c8',
    name: 'Rolls & Wrap',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&auto=format&fit=crop&q=80',
    keyword: 'roll'
  },
  {
    id: 'c9',
    name: 'Healthy Bowls',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&auto=format&fit=crop&q=80',
    keyword: 'healthy'
  },
  {
    id: 'c10',
    name: 'Coffee & Drinks',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&auto=format&fit=crop&q=80',
    keyword: 'coffee'
  }
];

export const OFFER_BANNERS = [
  {
    id: 'b1',
    title: '50% OFF UP TO ₹100',
    subtitle: 'Use code SWIGGY50 | Min order ₹199',
    tag: 'FLAT DEAL',
    bgGradient: 'linear-gradient(135deg, #FF512F 0%, #DD2476 100%)',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'b2',
    title: 'FREE DELIVERY ON FIRST 3 ORDERS',
    subtitle: 'No minimum order value applied',
    tag: 'NEW USER SPECIAL',
    bgGradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'b3',
    title: 'GOURMET SPECIALS AT ₹199',
    subtitle: 'Handcrafted dishes from top chefs',
    tag: 'SWIGGY GOURMET',
    bgGradient: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80'
  }
];

export const LOCATIONS = [
  { id: 'loc1', area: 'Koramangala 5th Block', city: 'Bengaluru', landmark: 'Near Forum Mall' },
  { id: 'loc2', area: 'Indiranagar 100ft Road', city: 'Bengaluru', landmark: 'Opposite Metro Station' },
  { id: 'loc3', area: 'HSR Layout Sector 1', city: 'Bengaluru', landmark: 'Near BDA Complex' },
  { id: 'loc4', area: 'Madhapur Metro Pillar 24', city: 'Hyderabad', landmark: 'Cyber Towers Road' },
  { id: 'loc5', area: 'Connaught Place Block M', city: 'New Delhi', landmark: 'Near Inner Circle' },
  { id: 'loc6', area: 'Bandra West Hill Road', city: 'Mumbai', landmark: 'Near Elco Arcade' }
];

export const COUPONS = [
  {
    code: 'SWIGGY50',
    title: '50% OFF up to ₹100',
    minOrder: 199,
    discountType: 'percentage',
    value: 50,
    maxDiscount: 100
  },
  {
    code: 'WELCOME100',
    title: 'Flat ₹100 OFF on orders above ₹299',
    minOrder: 299,
    discountType: 'flat',
    value: 100,
    maxDiscount: 100
  },
  {
    code: 'FREEDEL',
    title: 'Free Delivery on orders above ₹149',
    minOrder: 149,
    discountType: 'delivery',
    value: 40,
    maxDiscount: 40
  }
];

export const RESTAURANTS = [
  {
    id: 'r1',
    name: 'Meghana Foods',
    rating: 4.6,
    ratingCount: '10K+ ratings',
    costForTwo: 450,
    cuisines: ['Biryani', 'Andhra', 'South Indian', 'North Indian'],
    location: 'Koramangala',
    distance: '2.1 km',
    deliveryTime: '25-30 mins',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80',
    promoted: true,
    discount: '50% OFF UPTO ₹100',
    vegOnly: false,
    isFavorite: false,
    address: 'No 124, 80 Feet Road, 5th Block Koramangala, Bengaluru',
    licenseNo: '11220334000189',
    menu: [
      {
        category: 'Bestsellers',
        items: [
          {
            id: 'm101',
            name: 'Meghana Special Chicken Biryani',
            price: 340,
            description: 'Boneless chicken marinated with secret spices served with long grain fragrant basmati rice.',
            image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80',
            isVeg: false,
            isBestseller: true,
            rating: 4.8,
            ratingCount: 1420
          },
          {
            id: 'm102',
            name: 'Paneer Biryani',
            price: 290,
            description: 'Tender cottage cheese cubes tossed in spicy Andhra style gravy layer over basmati rice.',
            image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=300&auto=format&fit=crop&q=80',
            isVeg: true,
            isBestseller: true,
            rating: 4.5,
            ratingCount: 890
          }
        ]
      },
      {
        category: 'Starters',
        items: [
          {
            id: 'm103',
            name: 'Chicken 65 (Dry)',
            price: 280,
            description: 'Crispy fried chicken chunks coated in curry leaves, green chillies & spicy yogurt mix.',
            image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=300&auto=format&fit=crop&q=80',
            isVeg: false,
            isBestseller: true,
            rating: 4.6,
            ratingCount: 650
          },
          {
            id: 'm104',
            name: 'Chilli Paneer',
            price: 240,
            description: 'Batter fried paneer tossed with capsicum, onion and hot garlic chilli sauce.',
            image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&auto=format&fit=crop&q=80',
            isVeg: true,
            isBestseller: false,
            rating: 4.3,
            ratingCount: 310
          }
        ]
      },
      {
        category: 'Desserts & Beverages',
        items: [
          {
            id: 'm105',
            name: 'Gulab Jamun (2 Pcs)',
            price: 70,
            description: 'Soft melt-in-mouth milk solid dumplings dipped in warm cardamom sugar syrup.',
            image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&auto=format&fit=crop&q=80',
            isVeg: true,
            isBestseller: false,
            rating: 4.7,
            ratingCount: 510
          },
          {
            id: 'm106',
            name: 'Sweet Lassi (300ml)',
            price: 80,
            description: 'Traditional thick churned sweet yogurt drink topped with malai.',
            image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=300&auto=format&fit=crop&q=80',
            isVeg: true,
            isBestseller: false,
            rating: 4.4,
            ratingCount: 290
          }
        ]
      }
    ]
  },
  {
    id: 'r2',
    name: 'Leon Grill - Burgers & Wings',
    rating: 4.4,
    ratingCount: '5K+ ratings',
    costForTwo: 350,
    cuisines: ['Burgers', 'American', 'Fast Food', 'Beverages'],
    location: 'Indiranagar',
    distance: '3.4 km',
    deliveryTime: '20-25 mins',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    promoted: false,
    discount: 'ITEMS AT ₹129',
    vegOnly: false,
    isFavorite: true,
    address: '100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru',
    licenseNo: '11220445000921',
    menu: [
      {
        category: 'Bestsellers',
        items: [
          {
            id: 'm201',
            name: 'Leon Gourmet Chicken Burger',
            price: 220,
            description: 'Crispy fried chicken patty topped with melted cheddar, smoked mayo & jalapeños.',
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop&q=80',
            isVeg: false,
            isBestseller: true,
            rating: 4.7,
            ratingCount: 1100
          },
          {
            id: 'm202',
            name: 'Peri Peri Crispy Wings (6 Pcs)',
            price: 240,
            description: 'Juicy chicken wings tossed in fiery spicy peri peri seasoning.',
            image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=300&auto=format&fit=crop&q=80',
            isVeg: false,
            isBestseller: true,
            rating: 4.6,
            ratingCount: 840
          }
        ]
      },
      {
        category: 'Veg Delights',
        items: [
          {
            id: 'm203',
            name: 'Ultimate Veggie Crunch Burger',
            price: 180,
            description: 'Crispy potato & herb patty with fresh lettuce, tomatoes & tangy garlic mayo.',
            image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&auto=format&fit=crop&q=80',
            isVeg: true,
            isBestseller: false,
            rating: 4.2,
            ratingCount: 430
          },
          {
            id: 'm204',
            name: 'Loaded Cheese Fries',
            price: 150,
            description: 'Crispy golden fries smothered in creamy hot cheese sauce & jalapeño bits.',
            image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=300&auto=format&fit=crop&q=80',
            isVeg: true,
            isBestseller: true,
            rating: 4.5,
            ratingCount: 920
          }
        ]
      }
    ]
  },
  {
    id: 'r3',
    name: 'Truffles Cafe & Bistro',
    rating: 4.7,
    ratingCount: '15K+ ratings',
    costForTwo: 600,
    cuisines: ['American', 'Italian', 'Continental', 'Desserts'],
    location: 'Koramangala 5th Block',
    distance: '1.8 km',
    deliveryTime: '30-35 mins',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
    promoted: true,
    discount: '₹125 OFF ABOVE ₹499',
    vegOnly: false,
    isFavorite: false,
    address: 'Apex Building, 5th Block Koramangala, Bengaluru',
    licenseNo: '11220111000452',
    menu: [
      {
        category: 'Bestsellers',
        items: [
          {
            id: 'm301',
            name: 'Creamy Alfredo Pasta (Chicken)',
            price: 330,
            description: 'Penne tossed in rich parmesan garlic white sauce with tender grilled chicken slices.',
            image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281293?w=300&auto=format&fit=crop&q=80',
            isVeg: false,
            isBestseller: true,
            rating: 4.8,
            ratingCount: 1950
          },
          {
            id: 'm302',
            name: 'All Star Club Sandwich',
            price: 270,
            description: 'Triple-decker toasted bread filled with grilled chicken, bacon, fried egg & cheddar.',
            image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300&auto=format&fit=crop&q=80',
            isVeg: false,
            isBestseller: true,
            rating: 4.7,
            ratingCount: 1240
          }
        ]
      },
      {
        category: 'Thick Shakes',
        items: [
          {
            id: 'm303',
            name: 'Ferrero Rocher Nutella Shake',
            price: 210,
            description: 'Ultra rich hazelnut chocolate shake topped with crushed Ferrero and whipped cream.',
            image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&auto=format&fit=crop&q=80',
            isVeg: true,
            isBestseller: true,
            rating: 4.9,
            ratingCount: 2300
          }
        ]
      }
    ]
  },
  {
    id: 'r4',
    name: 'Corner House Ice Cream',
    rating: 4.8,
    ratingCount: '20K+ ratings',
    costForTwo: 300,
    cuisines: ['Desserts', 'Ice Cream', 'Sundaes'],
    location: 'Jayanagar',
    distance: '3.9 km',
    deliveryTime: '15-20 mins',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80',
    promoted: false,
    discount: '20% OFF',
    vegOnly: true,
    isFavorite: true,
    address: '9th Main, 4th Block Jayanagar, Bengaluru',
    licenseNo: '11220999000100',
    menu: [
      {
        category: 'Legendary Sundaes',
        items: [
          {
            id: 'm401',
            name: 'Death By Chocolate (DBC)',
            price: 280,
            description: 'Rich dark chocolate cake layered with vanilla ice cream, hot chocolate fudge, nuts & cherry.',
            image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&auto=format&fit=crop&q=80',
            isVeg: true,
            isBestseller: true,
            rating: 4.9,
            ratingCount: 4500
          },
          {
            id: 'm402',
            name: 'Brownie Fudge Sundae',
            price: 220,
            description: 'Warm gooey chocolate brownie topped with double vanilla scoops and hot fudge.',
            image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=300&auto=format&fit=crop&q=80',
            isVeg: true,
            isBestseller: true,
            rating: 4.7,
            ratingCount: 1890
          }
        ]
      }
    ]
  },
  {
    id: 'r5',
    name: 'La Pino\'z Pizza',
    rating: 4.3,
    ratingCount: '8K+ ratings',
    costForTwo: 400,
    cuisines: ['Pizzas', 'Italian', 'Pasta', 'Fast Food'],
    location: 'HSR Layout',
    distance: '2.8 km',
    deliveryTime: '25-30 mins',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    promoted: true,
    discount: '50% OFF UPTO ₹100',
    vegOnly: false,
    isFavorite: false,
    address: '27th Main Road, Sector 1 HSR Layout, Bengaluru',
    licenseNo: '11220777000888',
    menu: [
      {
        category: 'Monster Pizzas',
        items: [
          {
            id: 'm501',
            name: 'Cheesy 7 Pizza (Medium)',
            price: 495,
            description: 'Loaded with 7 delicious cheese blends: Mozzarella, Cream Cheese, Cheddar, Gouda & more.',
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&auto=format&fit=crop&q=80',
            isVeg: true,
            isBestseller: true,
            rating: 4.6,
            ratingCount: 2100
          },
          {
            id: 'm502',
            name: 'Chicken Tikka Lababdar Pizza',
            price: 520,
            description: 'Spicy chicken tikka chunks, capsicum, red paprika, onion with signature makhani sauce base.',
            image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=300&auto=format&fit=crop&q=80',
            isVeg: false,
            isBestseller: true,
            rating: 4.5,
            ratingCount: 1600
          }
        ]
      }
    ]
  },
  {
    id: 'r6',
    name: 'Third Wave Coffee',
    rating: 4.6,
    ratingCount: '4K+ ratings',
    costForTwo: 500,
    cuisines: ['Beverages', 'Cafe', 'Bakery', 'Healthy Bowls'],
    location: 'Indiranagar',
    distance: '1.2 km',
    deliveryTime: '15-20 mins',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80',
    promoted: false,
    discount: 'FLAT ₹75 OFF',
    vegOnly: false,
    isFavorite: false,
    address: '12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru',
    licenseNo: '11220444000333',
    menu: [
      {
        category: 'Artisanal Coffee',
        items: [
          {
            id: 'm601',
            name: 'Iced Sea Salt Caramel Latte',
            price: 240,
            description: 'Espresso poured over milk, rich sea salt caramel syrup and ice.',
            image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=300&auto=format&fit=crop&q=80',
            isVeg: true,
            isBestseller: true,
            rating: 4.8,
            ratingCount: 1420
          },
          {
            id: 'm602',
            name: 'Butter Croissant',
            price: 160,
            description: 'Flaky, buttery French croissant baked fresh daily.',
            image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&auto=format&fit=crop&q=80',
            isVeg: true,
            isBestseller: false,
            rating: 4.4,
            ratingCount: 560
          }
        ]
      }
    ]
  },
  {
    id: 'r7',
    name: 'Haldiram\'s Sweets & Snacks',
    rating: 4.5,
    ratingCount: '12K+ ratings',
    costForTwo: 350,
    cuisines: ['North Indian', 'South Indian', 'Sweets', 'Chaats'],
    location: 'MG Road',
    distance: '4.5 km',
    deliveryTime: '30-40 mins',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=80',
    promoted: false,
    discount: '15% OFF ABOVE ₹350',
    vegOnly: true,
    isFavorite: false,
    address: 'MG Road Metro Station Complex, Bengaluru',
    licenseNo: '11220888000555',
    menu: [
      {
        category: 'Street Chaat & Thalis',
        items: [
          {
            id: 'm701',
            name: 'Raj Kachori Special',
            price: 140,
            description: 'Large crispy kachori stuffed with sprouts, potatoes, sweet yogurt, chutneys & pomegranate.',
            image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&auto=format&fit=crop&q=80',
            isVeg: true,
            isBestseller: true,
            rating: 4.7,
            ratingCount: 3100
          },
          {
            id: 'm702',
            name: 'Chole Bhature (2 Pcs)',
            price: 190,
            description: 'Fluffy fried bhaturas served with spicy Punjabi chickpeas, pickled onions and green chilli.',
            image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=300&auto=format&fit=crop&q=80',
            isVeg: true,
            isBestseller: true,
            rating: 4.8,
            ratingCount: 4200
          }
        ]
      }
    ]
  },
  {
    id: 'r8',
    name: 'Empire Restaurant - Midnight Specials',
    rating: 4.4,
    ratingCount: '18K+ ratings',
    costForTwo: 550,
    cuisines: ['Kebabs', 'North Indian', 'Biryani', 'Arabian'],
    location: 'Church Street',
    distance: '3.1 km',
    deliveryTime: '25-30 mins',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    promoted: true,
    discount: '40% OFF UPTO ₹80',
    vegOnly: false,
    isFavorite: false,
    address: 'Church Street, Off Brigade Road, Bengaluru',
    licenseNo: '11220333000666',
    menu: [
      {
        category: 'Signature Kebabs',
        items: [
          {
            id: 'm801',
            name: 'Empire Special Grill Chicken (Half)',
            price: 320,
            description: 'Juicy whole chicken pieces marinated in Arabian herbs cooked to perfection over charcoal.',
            image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=300&auto=format&fit=crop&q=80',
            isVeg: false,
            isBestseller: true,
            rating: 4.6,
            ratingCount: 2900
          },
          {
            id: 'm802',
            name: 'Coin Parotta with Chicken Curry',
            price: 240,
            description: '4 mini flaky layered coin parottas served with spicy thick coconut gravy.',
            image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=300&auto=format&fit=crop&q=80',
            isVeg: false,
            isBestseller: true,
            rating: 4.7,
            ratingCount: 1800
          }
        ]
      }
    ]
  }
];
