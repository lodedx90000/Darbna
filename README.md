# Darbna دربنا - Carpooling Platform

**Your pick of rides at low prices across Saudi Arabia**

Darbna is a comprehensive carpooling platform designed specifically for Saudi Arabia, connecting drivers with empty seats to passengers seeking affordable rides. The platform promotes community building, environmental sustainability, and cost-effective transportation across the Kingdom.

## 🚀 Project Overview

### Vision
To create the largest and most trusted carpooling community in Saudi Arabia, making transportation accessible, affordable, and sustainable for everyone.

### Mission
Connecting travelers across Saudi Arabia through a safe, reliable, and user-friendly platform that benefits both drivers and passengers while reducing environmental impact.

## ✅ Currently Completed Features

### 🏠 Core Pages
- **Homepage (`index.html`)** - Landing page with hero section, search functionality, and value propositions
- **How It Works (`how-it-works.html`)** - Step-by-step guides for passengers and drivers with comprehensive FAQ
- **Offer a Ride (`offer-ride.html`)** - Multi-step form for drivers to post trips
- **Find a Ride (`find-ride.html`)** - Advanced search and filtering interface for passengers
- **About Us (`about.html`)** - Company mission, values, team, and timeline
- **Login (`login.html`)** - User authentication interface
- **Sign Up (`signup.html`)** - User registration with role selection

### 🎨 Design System
- **Complete CSS Framework** with consistent design variables
- **Responsive Design** optimized for desktop, tablet, and mobile
- **Arabic-English Bilingual Support** with proper RTL considerations
- **Modern UI Components** including cards, forms, buttons, and modals
- **Color Palette** featuring primary blue (#1A5F7A) and orange (#FF6B35)
- **Typography System** using Poppins, Inter, and Tajawal fonts

### ⚡ Interactive Features
- **Mobile-Responsive Navigation** with hamburger menu
- **Multi-Step Forms** with validation and progress tracking
- **FAQ Accordion** with expandable/collapsible sections
- **Search Filters** for price range, time, rating, and vehicle type
- **Interactive Elements** including hover effects and smooth transitions
- **Form Validation** with real-time feedback
- **Notification System** for user feedback and confirmations

## 🗺️ Functional Entry URIs (Routes)

### Main Pages
- `/` or `/index.html` - Homepage with search widget and platform overview
- `/how-it-works.html` - Guides and FAQ for new users
- `/offer-ride.html` - Driver interface to post new trips
- `/find-ride.html` - Passenger interface to search for rides
- `/about.html` - Company information and team details
- `/login.html` - User login interface
- `/signup.html` - User registration interface

### Navigation Parameters
- **Search Form**: `from`, `to`, `date`, `passengers`
- **Filters**: `time[]`, `price`, `rating[]`, `vehicle[]`, `booking[]`
- **View Toggle**: `view=list` or `view=map`

### Form Endpoints
- **Offer Ride Form**: Multi-step process with route, schedule, and pricing data
- **Search Form**: Location-based ride discovery with filter options
- **Authentication Forms**: Login and registration with validation

## 🔧 Technical Architecture

### Frontend Stack
- **HTML5** with semantic markup and accessibility features
- **CSS3** with custom properties (CSS variables) and modern features
- **Vanilla JavaScript** with modular, event-driven architecture
- **Font Awesome** for consistent iconography
- **Google Fonts** for typography (Poppins, Inter, Tajawal)

### File Structure
```
/
├── index.html                 # Homepage
├── how-it-works.html         # Help and FAQ page
├── offer-ride.html           # Driver posting interface
├── find-ride.html            # Passenger search interface
├── about.html                # Company information
├── login.html                # User authentication
├── signup.html               # User registration
├── css/
│   └── style.css            # Main stylesheet with design system
├── js/
│   └── main.js              # Interactive functionality
└── README.md                # Project documentation
```

### Design System Components
- **Navigation System** with active states and mobile menu
- **Form Components** including multi-step wizards and validation
- **Card Components** for ride listings and information display
- **Button System** with primary, secondary, and outline variants
- **Modal System** for notifications and user feedback
- **Grid Layouts** for responsive content organization

## 🛠️ Features Not Yet Implemented

### Backend Integration
- [ ] User authentication and session management
- [ ] Database integration for ride and user data
- [ ] Payment processing system
- [ ] Real-time messaging between users
- [ ] Push notifications for ride updates
- [ ] Email confirmation and verification system

### Advanced Features
- [ ] **Real-time GPS Tracking** for active rides
- [ ] **Interactive Map Integration** with route visualization
- [ ] **Rating and Review System** for drivers and passengers
- [ ] **Booking Management** with cancellation policies
- [ ] **Payment Gateway** integration (Mada, Visa, Mastercard)
- [ ] **SMS Integration** for ride confirmations and updates
- [ ] **Driver Verification** system with document upload
- [ ] **Emergency Features** including SOS button and emergency contacts
- [ ] **Multi-language Support** with full Arabic localization
- [ ] **Admin Dashboard** for platform management

### API Integration Needs
- [ ] **Google Maps API** for route planning and visualization
- [ ] **Payment Gateway APIs** for secure transactions
- [ ] **SMS Service API** for notifications
- [ ] **Email Service API** for user communications
- [ ] **Vehicle Verification APIs** for driver validation

## 🎯 Recommended Next Steps for Development

### Phase 1: Backend Foundation (Weeks 1-4)
1. **Database Design**
   - User profiles (drivers/passengers)
   - Ride listings with availability
   - Booking system with status tracking
   - Reviews and ratings

2. **Authentication System**
   - JWT-based user authentication
   - Role-based access control
   - Password reset functionality
   - Email verification

3. **Core API Development**
   - User registration and login endpoints
   - Ride CRUD operations
   - Search and filtering API
   - Booking management endpoints

### Phase 2: Essential Features (Weeks 5-8)
1. **Real-time Features**
   - WebSocket integration for live updates
   - Real-time ride availability
   - Instant booking confirmations
   - Chat system for user communication

2. **Payment Integration**
   - Payment gateway integration
   - Secure transaction processing
   - Refund and cancellation handling
   - Financial reporting for drivers

3. **Advanced Search**
   - Geolocation-based search
   - Route optimization
   - Price recommendations
   - Smart matching algorithms

### Phase 3: Enhanced User Experience (Weeks 9-12)
1. **Mobile Optimization**
   - Progressive Web App (PWA) features
   - Offline functionality
   - Push notifications
   - App-like experience

2. **Safety Features**
   - User verification system
   - Emergency contact integration
   - Ride tracking and sharing
   - Safety rating system

3. **Analytics and Insights**
   - User behavior tracking
   - Platform analytics dashboard
   - Performance monitoring
   - Business intelligence reports

## 💡 Data Models and Storage Services

### Recommended Database Schema

#### Users Table
```sql
- id (UUID, Primary Key)
- email (String, Unique)
- phone (String, Unique)
- first_name (String)
- last_name (String)
- profile_picture (String, URL)
- is_driver (Boolean)
- is_verified (Boolean)
- rating (Decimal)
- created_at (Timestamp)
- updated_at (Timestamp)
```

#### Rides Table
```sql
- id (UUID, Primary Key)
- driver_id (UUID, Foreign Key)
- departure_city (String)
- destination_city (String)
- departure_date (Date)
- departure_time (Time)
- available_seats (Integer)
- price_per_seat (Decimal)
- vehicle_type (String)
- status (Enum: active, completed, cancelled)
- created_at (Timestamp)
- updated_at (Timestamp)
```

#### Bookings Table
```sql
- id (UUID, Primary Key)
- ride_id (UUID, Foreign Key)
- passenger_id (UUID, Foreign Key)
- seats_booked (Integer)
- total_amount (Decimal)
- status (Enum: pending, confirmed, cancelled, completed)
- created_at (Timestamp)
- updated_at (Timestamp)
```

### Recommended Technology Stack

#### Backend Options
- **Node.js + Express** with MongoDB or PostgreSQL
- **Python + Django/FastAPI** with PostgreSQL
- **PHP + Laravel** with MySQL
- **Ruby on Rails** with PostgreSQL

#### Cloud Services (AWS/GCP/Azure)
- **Database**: Managed database service (RDS, CloudSQL)
- **File Storage**: Object storage for profile pictures and documents
- **Authentication**: Auth service or custom JWT implementation
- **Notifications**: SMS and email services
- **Maps**: Google Maps Platform or Mapbox

## 🌟 Key Differentiators

### Saudi-Specific Features
- **Cultural Sensitivity**: Designed with Saudi cultural norms in mind
- **Arabic Language Support**: Full RTL support and Arabic fonts
- **Local Payment Methods**: Mada card integration
- **Regional Optimization**: Tailored for Saudi geography and cities
- **Compliance**: Aligned with Saudi regulations and requirements

### Safety and Trust
- **Comprehensive Verification**: Multi-step user and driver verification
- **Community Ratings**: Transparent rating system for all users
- **Emergency Features**: Built-in safety measures and emergency contacts
- **Insurance Integration**: Partnership opportunities with local insurance providers

### Environmental Impact
- **Carbon Footprint Tracking**: Show environmental savings to users
- **Green Incentives**: Rewards for frequent carpoolers
- **Sustainability Reports**: Regular impact reporting to the community

## 📞 Contact and Support

### Development Team
- **Technical Lead**: Ready for backend integration and API development
- **UI/UX**: Complete design system implemented and ready for enhancement
- **Frontend**: Fully responsive and interactive interface ready for production

### Deployment Ready
The current static website is fully functional and ready for deployment. All core user interfaces are complete and responsive, providing an excellent foundation for backend integration and advanced feature development.

---

*Last Updated: October 2025*
*Version: 1.0.0*
*Status: Frontend Complete - Ready for Backend Integration*