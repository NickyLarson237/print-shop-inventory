# Print Shop Inventory Management System

A comprehensive inventory management system designed for print shops, built with React frontend and Node.js/Express backend using SQLite database.

## Features

- **Point of Sale (POS)**: Fast and intuitive sales interface
- **Inventory Management**: Track items, services, and stock levels
- **Dashboard Analytics**: Real-time business insights with charts
- **Sales History**: Complete transaction records with filtering
- **Reports**: Daily, weekly, monthly, and inventory reports
- **Category Management**: Organize items into categories
- **Low Stock Alerts**: Automatic notifications for inventory management

## Tech Stack

- **Frontend**: React 18, React Router, Chart.js, Axios, Lucide Icons
- **Backend**: Node.js, Express.js, SQLite (better-sqlite3)
- **Database**: SQLite with foreign keys and indexes
- **Styling**: CSS modules with responsive design

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd print-shop-inventory
```

### 2. Install dependencies
```bash
# Install all dependencies (backend and frontend)
npm run install:all

# Or install manually:
# Backend
cd backend
npm install
cd ..

# Frontend
cd frontend
npm install
cd ..
```

### 3. Set up the database
```bash
# Seed the database with sample data
cd backend
npm run seed
```

### 4. Configure environment (optional)
Create a `.env` file in the `backend` directory:
```env
PORT=5000
DB_PATH=./database/printshop.db
NODE_ENV=development
```

## Running the Application

### Development Mode
```bash
# Run both frontend and backend concurrently
npm run dev
```

### Manual Startup
```bash
# Terminal 1: Start backend
npm run server

# Terminal 2: Start frontend
npm run client
```

### Production Build
```bash
# Build frontend
npm run build

# Start production server
npm run start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Items
- `GET /api/items` - Get all items (with filters)
- `GET /api/items/:id` - Get item by ID
- `POST /api/items` - Create item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item
- `GET /api/items/low-stock` - Get low stock items

### Sales
- `GET /api/sales` - Get all sales (with pagination)
- `GET /api/sales/:id` - Get sale by ID
- `POST /api/sales` - Create new sale
- `GET /api/sales/transaction/:transactionId` - Get sale by transaction ID

### Dashboard
- `GET /api/dashboard/summary` - Get dashboard summary
- `GET /api/dashboard/top-items` - Get top selling items
- `GET /api/dashboard/sales-trend` - Get sales trend data
- `GET /api/dashboard/revenue-by-category` - Get revenue by category

### Reports
- `GET /api/reports/daily` - Daily sales report
- `GET /api/reports/weekly` - Weekly sales report
- `GET /api/reports/monthly` - Monthly sales report
- `GET /api/reports/inventory` - Inventory report

## Database Schema

### Categories
```sql
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Items
```sql
CREATE TABLE items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category_id INTEGER,
  unit_price INTEGER NOT NULL DEFAULT 0,
  quantity INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 10,
  description TEXT,
  is_service INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
```

### Sales & Sale Items
```sql
CREATE TABLE sales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  transaction_id TEXT NOT NULL UNIQUE,
  customer_name TEXT,
  total_amount INTEGER NOT NULL DEFAULT 0,
  payment_method TEXT DEFAULT 'cash',
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sale_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sale_id INTEGER NOT NULL,
  item_id INTEGER NOT NULL,
  item_name TEXT NOT NULL,
  unit_price INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  subtotal INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE,
  FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE SET NULL
);
```

## Usage Guide

### Adding Items
1. Go to Inventory → Add New Item
2. Fill in item details (name, category, price, stock)
3. Mark as "service" for non-physical items
4. Set low stock threshold for inventory alerts

### Processing Sales
1. Go to POS page
2. Search and click items to add to cart
3. Adjust quantities as needed
4. Enter customer name (optional)
5. Select payment method
6. Click "Complete Sale"

### Viewing Reports
1. Go to Reports page
2. Select report type and date range
3. Click "Generate Report"
4. Export to CSV if needed

## Sample Data

The system comes with sample data including:
- Print shop categories (Photocopy, Printing, Binding, etc.)
- Common print shop items and services
- Sample sales transactions

Run `npm run seed` in the backend directory to populate the database.

## Deployment

### Environment Variables
```env
PORT=5000
DB_PATH=./database/printshop.db
NODE_ENV=production
```

### Build Commands
```bash
# Build frontend
npm run build

# Start production server
npm run start
```

### Database Backup
The SQLite database file (`printshop.db`) should be regularly backed up. The database is located in `backend/database/` by default.

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the PORT in backend/.env
   - Or kill the process using the port

2. **Database errors**
   - Ensure the database directory exists
   - Check file permissions
   - Run `npm run seed` to initialize database

3. **Frontend not loading**
   - Ensure backend is running on port 5000
   - Check CORS settings in backend

### Logs
- Backend logs are displayed in the terminal
- Check browser console for frontend errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support or questions, please open an issue in the repository.