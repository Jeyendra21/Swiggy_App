import sqlite3
import json
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'swiggy.db')

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # 1. Locations Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS locations (
            id TEXT PRIMARY KEY,
            area TEXT NOT NULL,
            city TEXT NOT NULL,
            landmark TEXT NOT NULL
        )
    ''')

    # 2. Categories Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS categories (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            image TEXT NOT NULL,
            keyword TEXT NOT NULL
        )
    ''')

    # 3. Offer Banners Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS offer_banners (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            subtitle TEXT NOT NULL,
            tag TEXT NOT NULL,
            bg_gradient TEXT NOT NULL,
            image TEXT NOT NULL
        )
    ''')

    # 4. Coupons Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS coupons (
            code TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            min_order REAL NOT NULL,
            discount_type TEXT NOT NULL,
            value REAL NOT NULL,
            max_discount REAL NOT NULL
        )
    ''')

    # 5. Restaurants Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS restaurants (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            rating REAL NOT NULL,
            rating_count TEXT NOT NULL,
            cost_for_two REAL NOT NULL,
            cuisines TEXT NOT NULL, -- JSON array
            location TEXT NOT NULL,
            distance TEXT NOT NULL,
            delivery_time TEXT NOT NULL,
            image TEXT NOT NULL,
            promoted BOOLEAN NOT NULL DEFAULT 0,
            discount TEXT,
            veg_only BOOLEAN NOT NULL DEFAULT 0,
            is_favorite BOOLEAN NOT NULL DEFAULT 0,
            address TEXT NOT NULL,
            license_no TEXT NOT NULL
        )
    ''')

    # 6. Menu Items Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS menu_items (
            id TEXT PRIMARY KEY,
            restaurant_id TEXT NOT NULL,
            category TEXT NOT NULL,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            description TEXT NOT NULL,
            image TEXT NOT NULL,
            is_veg BOOLEAN NOT NULL DEFAULT 0,
            is_bestseller BOOLEAN NOT NULL DEFAULT 0,
            rating REAL NOT NULL,
            rating_count INTEGER NOT NULL,
            FOREIGN KEY (restaurant_id) REFERENCES restaurants (id) ON DELETE CASCADE
        )
    ''')

    # 7. Orders Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id TEXT PRIMARY KEY,
            restaurant_id TEXT NOT NULL,
            restaurant_name TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status TEXT NOT NULL DEFAULT 'Confirmed',
            item_total REAL NOT NULL,
            delivery_fee REAL NOT NULL,
            taxes REAL NOT NULL,
            discount REAL NOT NULL,
            grand_total REAL NOT NULL,
            address TEXT NOT NULL
        )
    ''')

    # 8. Order Items Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS order_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id TEXT NOT NULL,
            item_id TEXT NOT NULL,
            item_name TEXT NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER NOT NULL,
            is_veg BOOLEAN NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE
        )
    ''')

    conn.commit()
    seed_initial_data(conn)
    conn.close()

def seed_initial_data(conn):
    cursor = conn.cursor()

    # Check if locations seeded
    cursor.execute('SELECT COUNT(*) FROM locations')
    if cursor.fetchone()[0] == 0:
        locations = [
            ('loc1', 'Koramangala 5th Block', 'Bengaluru', 'Near Forum Mall'),
            ('loc2', 'Indiranagar 100ft Road', 'Bengaluru', 'Opposite Metro Station'),
            ('loc3', 'HSR Layout Sector 1', 'Bengaluru', 'Near BDA Complex'),
            ('loc4', 'Madhapur Metro Pillar 24', 'Hyderabad', 'Cyber Towers Road'),
            ('loc5', 'Connaught Place Block M', 'New Delhi', 'Near Inner Circle'),
            ('loc6', 'Bandra West Hill Road', 'Mumbai', 'Near Elco Arcade')
        ]
        cursor.executemany('INSERT INTO locations VALUES (?, ?, ?, ?)', locations)

    # Check if categories seeded
    cursor.execute('SELECT COUNT(*) FROM categories')
    if cursor.fetchone()[0] == 0:
        categories = [
            ('c1', 'Biryani', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80', 'biryani'),
            ('c2', 'Pizza', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&auto=format&fit=crop&q=80', 'pizza'),
            ('c3', 'Burgers', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop&q=80', 'burger'),
            ('c4', 'North Indian', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&auto=format&fit=crop&q=80', 'north indian'),
            ('c5', 'South Indian', 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=300&auto=format&fit=crop&q=80', 'south indian'),
            ('c6', 'Chinese', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&auto=format&fit=crop&q=80', 'chinese'),
            ('c7', 'Desserts', 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=300&auto=format&fit=crop&q=80', 'dessert'),
            ('c8', 'Rolls & Wrap', 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&auto=format&fit=crop&q=80', 'roll'),
            ('c9', 'Healthy Bowls', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&auto=format&fit=crop&q=80', 'healthy'),
            ('c10', 'Coffee & Drinks', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&auto=format&fit=crop&q=80', 'coffee')
        ]
        cursor.executemany('INSERT INTO categories VALUES (?, ?, ?, ?)', categories)

    # Check if coupons seeded
    cursor.execute('SELECT COUNT(*) FROM coupons')
    if cursor.fetchone()[0] == 0:
        coupons = [
            ('SWIGGY50', '50% OFF up to ₹100', 199, 'percentage', 50, 100),
            ('WELCOME100', 'Flat ₹100 OFF on orders above ₹299', 299, 'flat', 100, 100),
            ('FREEDEL', 'Free Delivery on orders above ₹149', 149, 'delivery', 40, 40)
        ]
        cursor.executemany('INSERT INTO coupons VALUES (?, ?, ?, ?, ?, ?)', coupons)

    # Check if offer banners seeded
    cursor.execute('SELECT COUNT(*) FROM offer_banners')
    if cursor.fetchone()[0] == 0:
        banners = [
            ('b1', '50% OFF UP TO ₹100', 'Use code SWIGGY50 | Min order ₹199', 'FLAT DEAL', 'linear-gradient(135deg, #FF512F 0%, #DD2476 100%)', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=80'),
            ('b2', 'FREE DELIVERY ON FIRST 3 ORDERS', 'No minimum order value applied', 'NEW USER SPECIAL', 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=80'),
            ('b3', 'GOURMET SPECIALS AT ₹199', 'Handcrafted dishes from top chefs', 'SWIGGY GOURMET', 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80')
        ]
        cursor.executemany('INSERT INTO offer_banners VALUES (?, ?, ?, ?, ?, ?)', banners)

    # Check if restaurants seeded
    cursor.execute('SELECT COUNT(*) FROM restaurants')
    if cursor.fetchone()[0] == 0:
        restaurants = [
            ('r1', 'Meghana Foods', 4.6, '10K+ ratings', 450, json.dumps(['Biryani', 'Andhra', 'South Indian', 'North Indian']), 'Koramangala', '2.1 km', '25-30 mins', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80', 1, '50% OFF UPTO ₹100', 0, 0, 'No 124, 80 Feet Road, 5th Block Koramangala, Bengaluru', '11220334000189'),
            ('r2', 'Leon Grill - Burgers & Wings', 4.4, '5K+ ratings', 350, json.dumps(['Burgers', 'American', 'Fast Food', 'Beverages']), 'Indiranagar', '3.4 km', '20-25 mins', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80', 0, 'ITEMS AT ₹129', 0, 1, '100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru', '11220445000921'),
            ('r3', 'Truffles Cafe & Bistro', 4.7, '15K+ ratings', 600, json.dumps(['American', 'Italian', 'Continental', 'Desserts']), 'Koramangala 5th Block', '1.8 km', '30-35 mins', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80', 1, '₹125 OFF ABOVE ₹499', 0, 0, 'Apex Building, 5th Block Koramangala, Bengaluru', '11220111000452'),
            ('r4', 'Corner House Ice Cream', 4.8, '20K+ ratings', 300, json.dumps(['Desserts', 'Ice Cream', 'Sundaes']), 'Jayanagar', '3.9 km', '15-20 mins', 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80', 0, '20% OFF', 1, 1, '9th Main, 4th Block Jayanagar, Bengaluru', '11220999000100'),
            ('r5', 'La Pino\'z Pizza', 4.3, '8K+ ratings', 400, json.dumps(['Pizzas', 'Italian', 'Pasta', 'Fast Food']), 'HSR Layout', '2.8 km', '25-30 mins', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80', 1, '50% OFF UPTO ₹100', 0, 0, '27th Main Road, Sector 1 HSR Layout, Bengaluru', '11220777000888'),
            ('r6', 'Third Wave Coffee', 4.6, '4K+ ratings', 500, json.dumps(['Beverages', 'Cafe', 'Bakery', 'Healthy Bowls']), 'Indiranagar', '1.2 km', '15-20 mins', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80', 0, 'FLAT ₹75 OFF', 0, 0, '12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru', '11220444000333'),
            ('r7', 'Haldiram\'s Sweets & Snacks', 4.5, '12K+ ratings', 350, json.dumps(['North Indian', 'South Indian', 'Sweets', 'Chaats']), 'MG Road', '4.5 km', '30-40 mins', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=80', 0, '15% OFF ABOVE ₹350', 1, 0, 'MG Road Metro Station Complex, Bengaluru', '11220888000555'),
            ('r8', 'Empire Restaurant', 4.4, '18K+ ratings', 550, json.dumps(['Kebabs', 'North Indian', 'Biryani', 'Arabian']), 'Church Street', '3.1 km', '25-30 mins', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80', 1, '40% OFF UPTO ₹80', 0, 0, 'Church Street, Off Brigade Road, Bengaluru', '11220333000666')
        ]
        cursor.executemany('INSERT INTO restaurants VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', restaurants)

    # Check if menu items seeded
    cursor.execute('SELECT COUNT(*) FROM menu_items')
    if cursor.fetchone()[0] == 0:
        menu_items = [
            ('m101', 'r1', 'Bestsellers', 'Meghana Special Chicken Biryani', 340, 'Boneless chicken marinated with secret spices served with long grain basmati rice.', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80', 0, 1, 4.8, 1420),
            ('m102', 'r1', 'Bestsellers', 'Paneer Biryani', 290, 'Tender cottage cheese cubes tossed in spicy Andhra style gravy over basmati rice.', 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=300&auto=format&fit=crop&q=80', 1, 1, 4.5, 890),
            ('m103', 'r1', 'Starters', 'Chicken 65 (Dry)', 280, 'Crispy fried chicken chunks coated in curry leaves and green chillies.', 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=300&auto=format&fit=crop&q=80', 0, 1, 4.6, 650),
            ('m104', 'r1', 'Starters', 'Chilli Paneer', 240, 'Batter fried paneer tossed with capsicum, onion and hot garlic chilli sauce.', 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&auto=format&fit=crop&q=80', 1, 0, 4.3, 310),
            ('m201', 'r2', 'Bestsellers', 'Leon Gourmet Chicken Burger', 220, 'Crispy fried chicken patty topped with melted cheddar & smoked mayo.', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop&q=80', 0, 1, 4.7, 1100),
            ('m202', 'r2', 'Bestsellers', 'Peri Peri Crispy Wings (6 Pcs)', 240, 'Juicy chicken wings tossed in fiery spicy peri peri seasoning.', 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=300&auto=format&fit=crop&q=80', 0, 1, 4.6, 840),
            ('m301', 'r3', 'Bestsellers', 'Creamy Alfredo Pasta (Chicken)', 330, 'Penne tossed in rich parmesan garlic white sauce with grilled chicken.', 'https://images.unsplash.com/photo-1621996346565-e3d5d6281293?w=300&auto=format&fit=crop&q=80', 0, 1, 4.8, 1950),
            ('m401', 'r4', 'Legendary Sundaes', 'Death By Chocolate (DBC)', 280, 'Rich dark chocolate cake layered with vanilla ice cream and hot chocolate fudge.', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&auto=format&fit=crop&q=80', 1, 1, 4.9, 4500),
            ('m501', 'r5', 'Monster Pizzas', 'Cheesy 7 Pizza (Medium)', 495, 'Loaded with 7 delicious cheese blends: Mozzarella, Cream Cheese, Cheddar & Gouda.', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&auto=format&fit=crop&q=80', 1, 1, 4.6, 2100),
            ('m601', 'r6', 'Artisanal Coffee', 'Iced Sea Salt Caramel Latte', 240, 'Espresso poured over milk, rich sea salt caramel syrup and ice.', 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=300&auto=format&fit=crop&q=80', 1, 1, 4.8, 1420)
        ]
        cursor.executemany('INSERT INTO menu_items VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', menu_items)

    conn.commit()

if __name__ == '__main__':
    init_db()
    print("SQLite Database initialized and seeded successfully at:", DB_PATH)
