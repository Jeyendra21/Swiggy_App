from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import sqlite3
import json
import random
import os
try:
    from backend.database import get_db_connection, init_db
except ImportError:
    from database import get_db_connection, init_db

app = FastAPI(
    title="Swiggy Clone Backend API",
    description="Python FastAPI backend powered by SQLite database for Swiggy web app",
    version="1.0.0"
)

# Enable CORS for React frontend (Vite default: http://localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()

# Pydantic Request Models
class CouponApplyRequest(BaseModel):
    code: str
    item_total: float

class OrderItemSchema(BaseModel):
    id: str
    name: str
    price: float
    quantity: int
    isVeg: bool

class BillSummarySchema(BaseModel):
    grandTotal: float
    itemTotal: float
    discount: float

class CreateOrderRequest(BaseModel):
    restaurantId: str
    restaurantName: str
    items: List[OrderItemSchema]
    bill: BillSummarySchema
    address: Optional[str] = "Koramangala 5th Block, Bengaluru"

# API Endpoints
@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Swiggy Python FastAPI Backend",
        "database": "SQLite (swiggy.db)",
        "docs": "/docs"
    }

@app.get("/api/locations")
def get_locations():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM locations").fetchall()
    conn.close()
    return [dict(r) for r in rows]

@app.get("/api/categories")
def get_categories():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM categories").fetchall()
    conn.close()
    return [dict(r) for r in rows]

@app.get("/api/offers")
def get_offers():
    conn = get_db_connection()
    banners = conn.execute("SELECT id, title, subtitle, tag, bg_gradient as bgGradient, image FROM offer_banners").fetchall()
    coupons = conn.execute("SELECT code, title, min_order as minOrder, discount_type as discountType, value, max_discount as maxDiscount FROM coupons").fetchall()
    conn.close()
    return {
        "banners": [dict(b) for b in banners],
        "coupons": [dict(c) for c in coupons]
    }

@app.get("/api/restaurants")
def get_restaurants(
    search: Optional[str] = None,
    category: Optional[str] = None,
    fast_delivery: bool = False,
    rating_4plus: bool = False,
    pure_veg: bool = False,
    offers: bool = False,
    favorites_only: bool = False,
    sort_by: str = "relevance"
):
    conn = get_db_connection()
    query = "SELECT * FROM restaurants WHERE 1=1"
    params = []

    if favorites_only:
        query += " AND is_favorite = 1"
    if rating_4plus:
        query += " AND rating >= 4.5"
    if pure_veg:
        query += " AND veg_only = 1"
    if offers:
        query += " AND discount IS NOT NULL AND discount != ''"

    rows = conn.execute(query, params).fetchall()
    restaurants = []

    for r in rows:
        item = dict(r)
        item['cuisines'] = json.loads(item['cuisines'])
        item['promoted'] = bool(item['promoted'])
        item['vegOnly'] = bool(item['veg_only'])
        item['isFavorite'] = bool(item['is_favorite'])
        item['ratingCount'] = item['rating_count']
        item['costForTwo'] = item['cost_for_two']
        item['deliveryTime'] = item['delivery_time']
        item['licenseNo'] = item['license_no']

        # Apply Fast Delivery filter
        if fast_delivery:
            try:
                mins = int(item['deliveryTime'].split('-')[0])
                if mins > 25:
                    continue
            except Exception:
                pass

        # Apply Category Filter
        if category and category != 'ALL':
            cat_lower = category.lower()
            matches_cuisine = any(cat_lower in c.lower() for c in item['cuisines'])
            
            # Check menu items for category match
            menu_rows = conn.execute("SELECT name FROM menu_items WHERE restaurant_id = ?", (item['id'],)).fetchall()
            matches_menu = any(cat_lower in m['name'].lower() for m in menu_rows)
            
            if not matches_cuisine and not matches_menu:
                continue

        # Apply Global Search Query Filter
        if search and search.strip():
            q = search.lower().strip()
            matches_name = q in item['name'].lower()
            matches_location = q in item['location'].lower()
            matches_cuisines = any(q in c.lower() for c in item['cuisines'])
            
            menu_rows = conn.execute("SELECT name, description FROM menu_items WHERE restaurant_id = ?", (item['id'],)).fetchall()
            matches_menu = any(q in m['name'].lower() or q in m['description'].lower() for m in menu_rows)
            
            if not matches_name and not matches_location and not matches_cuisines and not matches_menu:
                continue

        restaurants.append(item)

    # Sorting
    if sort_by == 'rating':
        restaurants.sort(key=lambda x: x['rating'], reverse=True)
    elif sort_by == 'time':
        restaurants.sort(key=lambda x: int(x['deliveryTime'].split('-')[0]) if '-' in x['deliveryTime'] else 99)
    elif sort_by == 'costLow':
        restaurants.sort(key=lambda x: x['costForTwo'])
    elif sort_by == 'costHigh':
        restaurants.sort(key=lambda x: x['costForTwo'], reverse=True)

    conn.close()
    return restaurants

@app.get("/api/restaurants/{restaurant_id}")
def get_restaurant_detail(restaurant_id: str):
    conn = get_db_connection()
    row = conn.execute("SELECT * FROM restaurants WHERE id = ?", (restaurant_id,)).fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Restaurant not found")

    restaurant = dict(row)
    restaurant['cuisines'] = json.loads(restaurant['cuisines'])
    restaurant['promoted'] = bool(restaurant['promoted'])
    restaurant['vegOnly'] = bool(restaurant['veg_only'])
    restaurant['isFavorite'] = bool(restaurant['is_favorite'])
    restaurant['ratingCount'] = restaurant['rating_count']
    restaurant['costForTwo'] = restaurant['cost_for_two']
    restaurant['deliveryTime'] = restaurant['delivery_time']

    # Fetch menu items and group by category
    menu_rows = conn.execute("SELECT * FROM menu_items WHERE restaurant_id = ?", (restaurant_id,)).fetchall()
    
    categories_map = {}
    for m in menu_rows:
        item = dict(m)
        cat = item['category']
        item['isVeg'] = bool(item['is_veg'])
        item['isBestseller'] = bool(item['is_bestseller'])
        item['ratingCount'] = item['rating_count']
        
        if cat not in categories_map:
            categories_map[cat] = []
        categories_map[cat].append(item)

    menu = []
    for cat_name, items in categories_map.items():
        menu.append({
            "category": cat_name,
            "items": items
        })

    restaurant['menu'] = menu
    conn.close()
    return restaurant

@app.post("/api/favorites/{restaurant_id}/toggle")
def toggle_favorite(restaurant_id: str):
    conn = get_db_connection()
    row = conn.execute("SELECT is_favorite FROM restaurants WHERE id = ?", (restaurant_id,)).fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Restaurant not found")

    new_fav = 0 if row['is_favorite'] == 1 else 1
    conn.execute("UPDATE restaurants SET is_favorite = ? WHERE id = ?", (new_fav, restaurant_id))
    conn.commit()
    conn.close()
    return {"restaurantId": restaurant_id, "isFavorite": bool(new_fav)}

@app.post("/api/coupons/apply")
def apply_coupon(payload: CouponApplyRequest):
    conn = get_db_connection()
    row = conn.execute("SELECT * FROM coupons WHERE code = ?", (payload.code.upper(),)).fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=400, detail="Invalid Coupon Code")

    coupon = dict(row)
    if payload.item_total < coupon['min_order']:
        raise HTTPException(
            status_code=400, 
            detail=f"Minimum order of ₹{coupon['min_order']} required for {coupon['code']}"
        )

    discount = 0.0
    if coupon['discount_type'] == 'percentage':
        discount = min((payload.item_total * coupon['value']) / 100.0, coupon['max_discount'])
    elif coupon['discount_type'] == 'flat':
        discount = coupon['value']
    elif coupon['discount_type'] == 'delivery':
        discount = 35.0

    return {
        "success": True,
        "code": coupon['code'],
        "title": coupon['title'],
        "discountAmount": round(discount, 2)
    }

@app.post("/api/orders")
def create_order(payload: CreateOrderRequest):
    conn = get_db_connection()
    order_id = "SWG-" + str(random.randint(10000, 99999))
    
    delivery_fee = 0.0 if payload.bill.itemTotal > 500 else 35.0
    taxes = round(payload.bill.itemTotal * 0.05, 2)

    conn.execute('''
        INSERT INTO orders (id, restaurant_id, restaurant_name, status, item_total, delivery_fee, taxes, discount, grand_total, address)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        order_id,
        payload.restaurantId,
        payload.restaurantName,
        'Confirmed',
        payload.bill.itemTotal,
        delivery_fee,
        taxes,
        payload.bill.discount,
        payload.bill.grandTotal,
        payload.address
    ))

    for item in payload.items:
        conn.execute('''
            INSERT INTO order_items (order_id, item_id, item_name, price, quantity, is_veg)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (order_id, item.id, item.name, item.price, item.quantity, 1 if item.isVeg else 0))

    conn.commit()
    conn.close()

    return {
        "success": True,
        "orderId": order_id,
        "status": "Confirmed",
        "estimatedTimeMinutes": 25,
        "grandTotal": payload.bill.grandTotal,
        "message": "Order successfully created and saved in SQL Database"
    }

@app.get("/api/orders/{order_id}")
def get_order_tracking(order_id: str):
    conn = get_db_connection()
    order_row = conn.execute("SELECT * FROM orders WHERE id = ?", (order_id,)).fetchone()
    if not order_row:
        conn.close()
        raise HTTPException(status_code=404, detail="Order not found")

    order = dict(order_row)
    item_rows = conn.execute("SELECT * FROM order_items WHERE order_id = ?", (order_id,)).fetchall()
    order['items'] = [dict(i) for i in item_rows]
    conn.close()
    return order
